const path = require('path');
const fs = require('fs-extra');

const AtendimentoModel = require('./atendimento.model');


class AtendimentoDAO {

    setAtendimento(req) {
        let atendimento = new AtendimentoModel(req.body);
        return atendimento.save()
    }

    findAtendimentos() {
        return AtendimentoModel.find()
          .populate('pacienteID',['nome'])
    }

    findAtendimentosDate(req) {
        let date = req.params.date;
        return AtendimentoModel.aggregate([{
            $match: {
                date: new Date(date)
            }
        }, {
            $group: {
                _id: {
                    profissional: '$profissional.nome'
                },
                ATTENDED: {
                    $sum: {
                        $cond: {
                            if: {
                                $eq: ['$attended', true]
                            },
                            then: 1,
                            else: '0'
                        }
                    }
                },
                NOTATTENDED: {
                    $sum: {
                        $cond: {
                            if: {
                                $eq: ['$attended', false]
                            },
                            then: 1,
                            else: '0'
                        }
                    }
                }
            }
        }])
    }

    findAtendimento(req) {
        let atendimento = req.params.id;

        return AtendimentoModel.findOne({
                _id: atendimento
            })
            .populate('pacienteID', ['nome', 'nascimento', 'documentos.cpf', 'informacoes', 'telefone', 'sexo','convenio'])
    }

    findAtendimentosProfissional(req) {
        let nome = new RegExp(req.params.name, "i");

        return AtendimentoModel.find({
                'profissional.nome': nome
            })
            .populate('pacienteID', ['nome', 'nascimento', 'documentos', 'sexo'])

    }

    findAtendimentosPaciente(req) {
        let _id = req.params.id;
        return AtendimentoModel.find({'pacienteID': _id})
          .select(['profissional', 'consulta','attended','date'])
    }

    findAtendimentoAgenda(req) {
        let agendaID = req.params.id;

        return AtendimentoModel.findOne({
                agendaID
            })
            /* .populate('pacienteID', ['nome', 'nascimento', 'documentos.cpf', 'telefone', 'sexo', 'informacoes', 'convenio']) */
    }

    findAtendimentosProfissionalDia(req) {
        let profissionalNome = new RegExp(req.params.name, "i");
        let date = req.params.date;

        return AtendimentoModel.find({
                $and: [{
                    'profissional.nome': profissionalNome
                }, {
                    date
                }]
            })
            .populate('pacienteID', ['nome', 'nascimento', 'documentos', 'sexo'])
    }

    setAttendAtendimento(req) {
        let atendimentoID = req.params.id;

        return AtendimentoModel.findByIdAndUpdate({
            _id: atendimentoID
        }, {
            $set: {
                attended: true
            }
        }, {
            new: false
        });
    }

    deleteAtendimento(req) {
        let atendimento = req.params.id;

        return AtendimentoModel.findByIdAndDelete(atendimento);

    }

    deleteAtendimentoAgenda(req) {
        let agendaID = req.params.id;

        return AtendimentoModel.findOneAndDelete({
            agendaID
        });
    }

    sendFichaMedica(req) {
        this.findAtendimento(req)
            .then(atendimento => {
                const fileName = `fichaMedica ${atendimento.pacienteID.nome}.pdf`;
                const filePath = path.join(__dirname, 'data', fileName);
                const file = fs.createReadStream(filePath);

            })
    }

    getAtendimentosFin(req) {
        let date = req.params.date;

        return AtendimentoModel.aggregate([
          {
            '$match': {
              '$and': [
                {
                  'date': new Date(date)
                }, {
                  'attended': true
                }
              ]
            }
          }, {
            '$project': {
              'profissional.nome': 1, 
              'consulta': 1, 
              'valorConsulta': 1
            }
          }, {
            '$facet': {
              'InfoMoney': [
                {
                  '$unwind': {
                    'path': '$consulta'
                  }
                }, {
                  '$group': {
                    '_id': {
                      'Profissional': '$profissional.nome', 
                      'Procedimentos': '$consulta.procedimento'
                    }, 
                    'Quant': {
                      '$sum': 1
                    }, 
                    'ValorBruto': {
                      '$sum': '$consulta.valor'
                    }, 
                    'ValorLiquido': {
                      '$sum': '$consulta.valorLiquidoProcedimento'
                    }, 
                    'Comissao': {
                      '$sum':
                      '$consulta.comissaoProfissional.valorComissaoCalc'
                    }
                  }
                }
              ], 
              'InfoPorProfissional': [
                {
                  '$unwind': {
                    'path': '$consulta'
                  }
                }, {
                  '$group': {
                    '_id': '$profissional.nome', 
                    'Receita': {
                      '$sum': '$consulta.valorLiquidoProcedimento'
                    }, 
                    'Comissao': {
                      '$sum': '$consulta.comissaoProfissional.valorComissaoCalc'
                    }
                  }
                }
              ], 
              'ReceitaTotal': [
                {
                  '$group': {
                    '_id': null, 
                    'ReceitaTotal': {
                      '$sum': '$valorConsulta'
                    }
                  }
                }
              ]
            }
          }
        ]);

    }

    getExamesDay(req){
        let date = req.params.date;

        return AtendimentoModel.aggregate([
            {
              '$match': {
                'date': new Date(date)
              }
            },{
                '$unwind':{
                    path:'$consulta'
                }
            }, {
              '$group': {
                '_id':{
                    PROCEDIMENTO: "$consulta.procedimento",
                    PROFISSIONAL: "$profissional.nome" 
                }, 
                'Atendidos': {
                  '$sum': {
                    '$cond': {
                      'if': {
                        '$eq': [
                          '$attended', true
                        ]
                      }, 
                      'then': 1, 
                      'else': 0
                    }
                  }
                }, 
                'NotAtendidos': {
                  '$sum': {
                    '$cond': {
                      'if': {
                        '$eq': [
                          '$attended', false
                        ]
                      }, 
                      'then': 1, 
                      'else': 0
                    }
                  }
                }
              }
            }
          ])
    }
}

module.exports = new AtendimentoDAO;
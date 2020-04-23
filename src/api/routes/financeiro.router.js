const express = require('express');
const EntradaDAO = require('../module_financeiro/DAO/entradaDao');
const FechamendoDiarioDAO = require('../module_financeiro/DAO/fechamentoDiarioDao');
const dayjs = require('dayjs');

const FinanceiroRouter = express.Router();

FinanceiroRouter.get('/',(req, res)=>{
    EntradaDAO.findValoresEntrada()
        .then(valores => res.json(valores));
});

FinanceiroRouter.post('/addEntrada',(req, res)=>{
    EntradaDAO.createValorEntrada(req)
        .then(valor => res.json(valor))
});

FinanceiroRouter.post('/fecharDia',(req, res) =>{
    FechamendoDiarioDAO.findDayDone(req)
        .then(fechamento =>{
            if(fechamento){
                res.json({message:'O fechamento desse dia já foi realizado!'})
            }else{
                FechamendoDiarioDAO.createFechamentoDiario(req)
                    .then(fechamento => res.json({message:`O fechamento no dia ${dayjs(fechamento.date).format('DD/MM/YYYY')} realizado com sucesso!`}));
            }
        });
});

FinanceiroRouter.get('/fechamentosDiarios',(req, res)=>{
    FechamendoDiarioDAO.findFechamentosDiarios()
        .then(fechamentos => res.json(fechamentos));
});

FinanceiroRouter.get('/fechamentoDiario/:date',(req, res)=>{
    FechamendoDiarioDAO.findDayDone(req)
        .then(day => res.json(day));
})

module.exports = FinanceiroRouter;
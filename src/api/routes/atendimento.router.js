const AtendimentoDao = require('../models/atendimento/atendimentoDAO');
const express = require('express');

const CreateFichaHelper = require('../helpers/createFicha.helper');


const AtendimentoRouter = express.Router();


AtendimentoRouter.post('/add', (req, res)=>{
    AtendimentoDao.setAtendimento(req)
        .then(()=>res.json({message:'atendimento marcada com sucesso!'}));
})

AtendimentoRouter.get('/',(req, res)=>{
    AtendimentoDao.findAtendimentos()
        .then(atendimentos =>res.json(atendimentos) )
});

AtendimentoRouter.get('/profissional/:name',(req, res)=>{
    AtendimentoDao.findAtendimentosProfissional(req)
        .then(atendimentos => res.json(atendimentos))
});

//Metódo usando FRAMEWORK AGGREGATION
AtendimentoRouter.get('/date/:date',(req, res)=>{
    AtendimentoDao.findAtendimentosDate(req)
        .then(atendimentos => res.json(atendimentos))
});

AtendimentoRouter.get('/paciente/:id',(req, res)=>{
   AtendimentoDao.findAtendimentosPaciente(req)
    .then(atendimentos => res.json(atendimentos))
});

AtendimentoRouter.get('/:id',(req, res) =>{
    AtendimentoDao.findAtendimento(req)
        .then(atendimento => res.json(atendimento))
});

AtendimentoRouter.get('/agenda/:id',(req, res)=>{
    AtendimentoDao.findAtendimentoAgenda(req)
        .then(atendimento => res.json(atendimento))
});

AtendimentoRouter.get('/profissional/valorDiario/:name/:data', (req, res)=>{
    AtendimentoDao.findAtendimentosProfissionalDia(req)
        .then(atendimentos =>{
            let valorDiario = atendimentos.reduce((sum, {atendimento:{totalAtendimento}})=>sum + totalAtendimento,0);
           res.json(valorDiario.toFixed(2));
        })
});

AtendimentoRouter.get('/profissional/:name/:date', (req, res)=>{
    AtendimentoDao.findAtendimentosProfissionalDia(req)
        .then(atendimentos => res.json(atendimentos))
});

AtendimentoRouter.patch('/:id',(req, res)=>{
    AtendimentoDao.setAttendAtendimento(req)
        .then(()=>res.json({message:"Atendimento realizado!"}));
})

AtendimentoRouter.delete('/:id',(req, res)=>{
    AtendimentoDao.deleteAtendimento(req)
        .then(()=>res.json({message:"Atendimento apagado com sucesso!"}));
});

AtendimentoRouter.delete('/agenda/:id',(req, res)=>{
    AtendimentoDao.deleteAtendimentoAgenda(req)
        .then(()=>res.json({message:"Atendimento desmarcado com sucesso!"}));
});

AtendimentoRouter.get('/ficha/:id',(req, res)=>{
    AtendimentoDao.findAtendimento(req)
        .then(atendimento =>{
            CreateFichaHelper.createPdf(atendimento)
                .then(res => console.log(res));
        })
        .then(res.json({message:"Ficha criada!"}));
});


AtendimentoRouter.get('/movimentacao/:date',(req, res)=>{
   
    AtendimentoDao.getAtendimentosFin(req)
        .then(resp => res.json(resp[0]));
});

AtendimentoRouter.get('/examesDay/:date',(req, res)=>{
    AtendimentoDao.getExamesDay(req)
        .then(exames => res.json(exames));
});


module.exports = AtendimentoRouter;
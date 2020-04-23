const express = require('express');
const CommonRouter = express.Router();

// Models/DAOS commons
const ExamesDAO = require('../models/exames/examesDAO');
const PlanilhaRiscosDAO = require('../models/planilhaRiscos/planilhaRiscosDAO');
const RiscosDAO = require('../models/riscos/riscosDAO');

//Exames
CommonRouter.post('/exames/add',(req, res)=>{
    ExamesDAO.createExame(req)
        .then(() => res.json({message:"Exames adicionado com sucesso!"}));
});

CommonRouter.get('/exames',(req, res) =>{
    ExamesDAO.findExames()
        .then(exames => res.json(exames));
});

CommonRouter.get('/exames/esocial',(req, res)=>{
    ExamesDAO.findExamesEsocial()
        .then(exames => res.json(exames));
});

CommonRouter.get('/exames/:categoria',(req, res)=>{
    ExamesDAO.findExamesByCategoria(req)
        .then(exames => res.json(exames));
});

CommonRouter.put('/exames/changeValor/:id',(req, res)=>{
    ExamesDAO.updateValorExame(req)
        .then(exame => res.json(exame));
});

CommonRouter.delete('/exames/:id',(req, res)=>{
    ExamesDAO.deleteExame(req)
        .then( _ => res.json({message:"Exame apagado com sucesso!"}));
});

//Riscos
CommonRouter.post('/riscos/add',(req, res)=>{
    RiscosDAO.createRisco(req)
        .then(() => res.json({message:"Risco(s) salvo(s) com sucesso!"}))
        .catch(err => console.log(err))
});

CommonRouter.get('/riscos/:id',(req, res)=>{
RiscosDAO.findByIdRiscos(req)
    .then(riscos => res.json(riscos));
});

CommonRouter.get('/riscos',(req, res)=>{
RiscosDAO.findRiscos()
    .then(riscos => res.json(riscos));
});

CommonRouter.get('/riscos/agente/:agente',(req, res)=>{
RiscosDAO.findRiscoByAgente(req)
    .then(riscos => res.json(riscos))
});

CommonRouter.get('/riscos/agenteEsocial/:agente',(req,res) =>{
RiscosDAO.findRiscoByAgenteEsocial(req)
    .then(riscos => res.json(riscos))
});

CommonRouter.get('/riscos/buscarCodigo/:codigo', (req,res)=>{
RiscosDAO.findRiscoByCodigoEsocial(req)
    .then(risco => res.json(risco));
});

CommonRouter.get("/riscos/fatorEsocial/:fator",(req,res)=>{
RiscosDAO.findByFatorRiscoEsocial(req)
    .then(risco => res.json(risco));
});

//Planilha de riscos

CommonRouter.post('/planilhariscos/add',(req, res)=>{
    PlanilhaRiscosDAO.createPlanilhaRiscos(req)
        .then(resp => res.json(resp));
});

CommonRouter.get('/planilhariscos',(req, res)=>{
    PlanilhaRiscosDAO.findPlanilhas()
        .then(planilhas => res.json(planilhas));
});

CommonRouter.get('/planilhariscos/:nome',(req, res) => {
    PlanilhaRiscosDAO.findPlanilhaPerName(req)
        .then(planilha => res.json(planilha));
});

CommonRouter.put('/planilhariscos/:id',(req, res) => {
    PlanilhaRiscosDAO.updatePlanilha(req)
        .then(planilha => res.json(planilha));
});

module.exports = CommonRouter;
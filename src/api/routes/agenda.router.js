const express = require('express');
const AgendaDAO = require('../models/agenda/agendaDAO');


const AgendaRouter = express.Router();

AgendaRouter.post('/add',(req, res)=>{
    AgendaDAO.setAgenda(req)
        .then(()=>res.json({message:`Agendamento realizado com sucesso!`}));
});

AgendaRouter.get('/',(req, res)=>{
    AgendaDAO.findAgendas()
        .then(agendamentos => res.json(agendamentos));
});

AgendaRouter.get('/profissional/:name',(req, res)=>{
    AgendaDAO.findAgendaProfissional(req)
        .then(agenda => res.json(agenda));
});

AgendaRouter.get('/profissional/:name/:date',(req, res)=>{
    AgendaDAO.findAgendaProfissionalData(req)
        .then(agenda => res.json(agenda));
});

AgendaRouter.get('/paciente/:id',(req, res)=>{
    AgendaDAO.findAgendamentoPaciente(req)
        .then(agendamentos => res.json(agendamentos) );
});

AgendaRouter.get('/paciente/:id/:date',(req, res)=>{
    AgendaDAO.findAgendamentoPacienteData(req)
        .then(agendamentos => res.json(agendamentos) );
});

AgendaRouter.put('/:id',(req, res)=>{
    AgendaDAO.updateAgendamento(req)
        .then(agendamento => res.json(agendamento));
});

AgendaRouter.patch('/confirmar/:id',(req, res) =>{
    AgendaDAO.setConfirmedAgendamento(req)
        .then(()=> res.json({message:"Atendimento confirmado!"}))
});

AgendaRouter.patch('/desconfirmar/:id',(req, res) =>{
    AgendaDAO.unSetConfirmedAgendamento(req)
        .then(()=> res.json({message:"Atendimento desmarcado!"}))
});

AgendaRouter.delete('/:id',(req, res)=>{
    AgendaDAO.deleteAgendamento(req)
        .then(()=> res.json({message:"Agendendamento apagado com sucesso!"}))
});


module.exports = AgendaRouter;
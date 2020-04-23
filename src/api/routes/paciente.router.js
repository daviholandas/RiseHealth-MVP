const express = require('express');
const PacienteDAO = require('../models/paciente/pacienteDAO');
const ColaboradorDAO = require('../models/colaborador/colaboradorDAO');
const PessoaDAO = require('../models/pessoa/pessoaDAO');

const PacienteRouter = express.Router();


PacienteRouter.get('/',  (req, res) => {
    PacienteDAO.buscaPacientes(req).then(pacientes =>
        res.json(pacientes)
    );
});

PacienteRouter.get('/all',  (req, res) => {
   PessoaDAO.getPessoas().then(pacientes =>
        res.render('pacientes',{pacientes})
    );
});

PacienteRouter.post('/add', (req, res) => {
    PessoaDAO.createPessoa(req).then(paciente =>
        res.json({message:`Paciente ${paciente.nome} foi adicionado com sucesso!`})
    );
});

PacienteRouter.post('/addColaborador', (req, res) =>{
    ColaboradorDAO.createColaborador(req)
        .then(colaborador => res.json(colaborador));
});

PacienteRouter.get('/colaboradores',(req, res)=>{
    ColaboradorDAO.getColaboradores()
        .then(colaboradores => res.json(colaboradores));
});

PacienteRouter.get('/colaboradores/:nome',(req, res)=>{
    ColaboradorDAO.getColaborador(req)
        .then(colaborador => res.json(colaborador));
});

PacienteRouter.get('/:name', (req, res) => {
    PacienteDAO.buscarPaciente(req).then(paciente =>res.json(paciente));
});

PacienteRouter.patch('/:name', (req, res) => {
    /* PacienteDAO.alteraPaciente(req).then(paciente =>
        res.json({message:`Paciente alterado com sucesso!`})
    ) */
    PessoaDAO.editPessoa(req).then(paciente=>
        res.json({message:`Paciente alterado com sucesso!`}));
});

PacienteRouter.delete('/:name',(req, res)=>{
    PacienteDAO.apagarPaciente(req).then(paciente =>
        res.json({message:`Paciente foi apagado com sucesso!`})
    );
   
});

PacienteRouter.delete('/', (req, res) =>{
    PacienteDAO.apagarTodos().then(()=>{
        res.json({message:"Todos os pacientes foram apagados!"})
    });
});

module.exports = PacienteRouter;
const express = require('express');
const ProfissionalDAO = require('../models/profissional/profissionalDAO');


const ProfissionalRouter = express.Router();

ProfissionalRouter.get('/', (req, res) =>{
    ProfissionalDAO.buscarProfissionais(req)
        .then(profissionais => res.json(profissionais));
});

ProfissionalRouter.get('/procedimentos',(req, res)=>{
    ProfissionalDAO.getProcedimentos()
        .then(procedimentos => res.json(procedimentos))
});
ProfissionalRouter.get('/procedimentos/:procedimento',(req, res)=>{
    ProfissionalDAO.getProcedimento(req)
        .then(procedimentos => res.json(procedimentos))
});

ProfissionalRouter.get('/nomes',(req,res)=>{
    ProfissionalDAO.getProfissionaisName()
        .then(profissionais => res.json(profissionais))
});

ProfissionalRouter.get('/:name', (req, res) =>{
    ProfissionalDAO.buscarProfissional(req)
        .then(profissional => res.json(profissional));
});

ProfissionalRouter.post('/add', (req, res) =>{
    ProfissionalDAO.gravarProfissional(req)
        .then(profissional =>
            res.json({
                message:`Profissional ${profissional.nome} gravado com sucesso!`
            })
        );
});

ProfissionalRouter.patch('/:id', (req, res) =>{
    ProfissionalDAO.updateProfissional(req)
        .then(()=> res.json({message:`Profissional foi alterado com sucesso!`}));
});

ProfissionalRouter.delete('/:name', (req, res) =>{
    ProfissionalDAO.apagarProfissional(req)
        .then(()=> res.json({message:"Profissional apagado com sucesso!"}));
});

ProfissionalRouter.delete('/', (req, res) =>{
    ProfissionalDAO.apagarTodos()
        .then(()=> res.json({message:"Todos profissionais foram apagados!"}));
});

ProfissionalRouter.delete('/delete/:id',(req, res) =>{
    ProfissionalDAO.deleteProfissionalId(req)
        .then(()=> res.json({message:"Profissional apagado com sucesso!"}))
});



module.exports = ProfissionalRouter;
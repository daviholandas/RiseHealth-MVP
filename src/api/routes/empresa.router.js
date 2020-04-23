const express = require('express');
const EmpresaDAO = require('../models/empresa/empresaDAO');

const EmpresaRouter = express.Router();

EmpresaRouter.get('/consulta/:cnpj',(req, res) =>{
    EmpresaDAO.getDadosEmpresa(req)
        .then( info =>res.json(info.data));        
});

EmpresaRouter.post('/add',(req, res)=>{
    EmpresaDAO.createEmpresa(req)
        .then(resp => res.json({message:"Empresa cadastrada com sucesso!"}))
        .catch(err => res.json({message:'CNPJ já cadastrado!'}));
});

EmpresaRouter.get('/',(req, res) =>{
    EmpresaDAO.findEmpresas()
        .then(empresas => res.json(empresas));
});

EmpresaRouter.get('/:id',(req, res)=>{
    EmpresaDAO.findEmpresa(req)
        .then(empresa => res.json(empresa))
});

EmpresaRouter.get('/nomeFantasia/:fantasia',(req, res)=>{
    EmpresaDAO.findEmpresaPerName(req)
        .then(empresa => res.json(empresa));
});

EmpresaRouter.get('/ocupacionais/:fantasia',(req, res)=>{
    EmpresaDAO.getEmpresaInfoOcupacionais(req)
        .then(empresa => res.json(empresa));
});

EmpresaRouter.put('/:id', (req, res)=>{
    EmpresaDAO.updateEmpresa(req)
        .then(resp => res.json({message:'Empresa modificada com sucesso!'}));
});

EmpresaRouter.delete('/:id',(req, res)=>{
    EmpresaDAO.deleteEmpresa(req)
        .then( _ => res.json({message:"Empresa apagada com sucesso!"}));
});

module.exports = EmpresaRouter;
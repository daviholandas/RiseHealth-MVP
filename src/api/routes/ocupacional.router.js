const express = require('express');
const OcupacionalRouter = express.Router();

const FichaDAO = require('../models/ocupacional/fichaDAO');
const CreateAso = require('../helpers/createASOhelper');


OcupacionalRouter.post('/ficha',(req, res)=>{
    FichaDAO.createFicha(req)
        .then(_=> res.json({message:"Ficha salva com sucesso!"}));
});

OcupacionalRouter.get('/fichas',(req, res)=>{
    FichaDAO.getFichas(req)
        .then(data => res.json(data));
});

OcupacionalRouter.put('/ficha/:id', (req, res)=>{
    FichaDAO.changeStatus(req)
        .then(ficha => res.json(ficha));
});

OcupacionalRouter.get('/generateAso',(req, res)=>{
    CreateAso.createPdf().then(res =>console.log(res));
})
module.exports = OcupacionalRouter;
const express = require('express');
const path = require('path');

const GerencialRouter = express.Router();

const caminho = path.join(__dirname,'../gerencial/index.html')

GerencialRouter.get('/', (req, res, next)=>{
    res.sendFile(caminho);
});

module.exports = GerencialRouter;
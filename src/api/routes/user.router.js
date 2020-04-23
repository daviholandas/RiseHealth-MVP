const UserDAO = require('../models/user/userDAO');
const express = require('express');

const UserRouter = express.Router();

UserRouter.post('/addUser',(req, res)=>{
    UserDAO.createUser(req)
        .then(()=>res.json({message:'Usuario criado com sucesso!'}))
});

UserRouter.get('/', (req, res)=>{
    UserDAO.findUsers()
        .then(users => res.json(users))
});

UserRouter.get('/:userName',(req, res)=>{
    UserDAO.findUser(req,'+password')
        .then(user => res.json(user));
});

UserRouter.patch('/:userName',(req, res)=>{
    UserDAO.updateUser(req)
        .then(user => res.json(user))
});

module.exports = UserRouter;
//Loader da environment
require('dotenv').config();
const chromeLauncher = require('chrome-launcher');


const {server, http} = require('./config/express');

//routes
const GerencialRouter = require('./routes/gerencial.route');


server.use('/gerencial', GerencialRouter);


server.get('/',(req, res, next)=>{
    res.sendFile('index.html');
    next();
});

/* chromeLauncher.launch({
    startingUrl:'http://localhost:4200'
}); */


server.listen(process.env.PORT ,()=>{});

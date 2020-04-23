const express = require('express');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const server = express();
const http = require('http').Server(server);
const axios = require('axios');



server.use(express.static('public'));


//Middleware HandleBars
server.engine('handlebars', exphbs({defaultLayout: 'main'}));
server.set('view engine', 'handlebars');

//Middleware Body-Parser
server.use(bodyParser.urlencoded({
    extended: false
}));
server.use(bodyParser.json({
    strict:true
}));


 server.use((req, res, next)=>{
   // Website you wish to allow to connect
   res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

   // Request methods you wish to allow
   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

   // Request headers you wish to allow
   res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

   // Set to true if you need the website to include cookies in the requests sent
   // to the API (e.g. in case you use sessions)
   res.setHeader('Access-Control-Allow-Credentials', true);
   
   /*  // Set content type of response application
   res.setHeader('Content-Type','application/json'); */
 
   // Pass to next layer of middleware
   next();
});



module.exports = {server, http, axios};
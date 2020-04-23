const express = require('express');
const server = require('express')();
const http = require('http').Server(server);
const cors = require('cors');
/* const modeHistory = require('connect-history-api-fallback');

server.use(modeHistory()); */
server.use(express.static('public'));
server.use(express.static('gerencial'));


server.use(cors());


module.exports = {server, http};
//Loader da ENV'S
require('dotenv').config();
//Module OS
const os = require('os')


const {server} = require('./config/express');
const {http} = require('./config/express');
const graphqlHTTP = require('express-graphql')
const { buildSchema } = require('graphql')
const cors = require('cors')
//Sockte.io
const io = require('socket.io')(http);

const schema = require('./graphql/schema')


//Connection DB
require('./config/conectionDB');
require('./module_financeiro/connectionDB');


//Routers
const PacienteRouter = require('./routes/paciente.router');
const ProfissionalRouter = require('./routes/profissional.router');
const AgendaRouter = require('./routes/agenda.router');
const AtendimentoRouter = require('./routes/atendimento.router');
const FinanceiroRouter = require('./routes/financeiro.router');
const EmpresaRouter = require('./routes/empresa.router');
const CommonRouter = require('./routes/common.router');
const OcupacionalRouter = require('./routes/ocupacional.router');

//Middleware Cors
server.use(cors())


//Bootstrap da API
server.get('/',(req, res)=>{
    res.render('index');
});


//Middleware Routers
server.use('/pacientes', PacienteRouter);
server.use('/profissionais', ProfissionalRouter);
server.use('/agendas', AgendaRouter);
server.use('/atendimentos',AtendimentoRouter);
server.use('/financeiro', FinanceiroRouter);
server.use('/empresas', EmpresaRouter);
server.use('/common',CommonRouter);
server.use('/ocupacional', OcupacionalRouter);

//Middleware GraphQl
server.use('/api', graphqlHTTP({
    graphiql:true,
    schema
}));

io.on('connection',(socket)=>{
    socket.emit('msg', 'Está conectado')
});

//Get hostname
const HOSTNAME = process.env.HOST_NAME || os.hostname();

 http.listen(process.env.PORT, HOSTNAME, ()=>{
    console.log(`Server is running in port: ${process.env.PORT} and host: ${HOSTNAME}`)
})
 
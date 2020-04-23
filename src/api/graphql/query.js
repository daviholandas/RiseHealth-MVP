const { pacienteQueries } = require('./pacientes/paciente.schema')
const { profissionaisQueries } = require('./profissionais/profissionais.schema')


module.exports = `
    type Query {
        ${pacienteQueries}
        ${profissionaisQueries}
    }
`


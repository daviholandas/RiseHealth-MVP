const { makeExecutableSchema } = require('graphql-tools')
const { merge } = require('lodash')

//Types
const { pacienteTypes } = require('./pacientes/paciente.schema')
const { profissionaisTypes } = require('./profissionais/profissionais.schema')


//Resolvers
const pacienteResolvers = require('./pacientes/paciente.resolvers')
const profissionalResolvers = require('./profissionais/profissional.resolvers')


const resolvers = merge( pacienteResolvers, profissionalResolvers)


const Query = require('./query')
const Mutation = require('./mutation')

const SchemaDefinition = `
    type Schema {
        query:Query
    }
`

const schema = makeExecutableSchema({
    typeDefs: [ SchemaDefinition, Query, pacienteTypes, profissionaisTypes ],
    resolvers
})

module.exports = schema
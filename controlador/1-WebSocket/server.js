const { ApolloServer } = require('apollo-server');
const { readFileSync } = require('fs');
const path = require('path');
const resolvers = require('./resolvers');

// Cargar el esquema GraphQL
const typeDefs = readFileSync(
    path.join(__dirname, 'schema', 'schema.graphql'),
    'utf-8'
);

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: () => ({}),
    playground: true,
    introspection: true
});

server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
    console.log(`🚀 Servidor GraphQL listo en ${url}`);
});
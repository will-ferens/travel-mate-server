const { GraphQLServer } = require('graphql-yoga')
const { Prisma } = require('prisma-binding')

const Query  = require('./src/resolvers/Query')
const Mutation = require('./src/resolvers/Mutation')
const AuthPayload = require('./src/resolvers/AuthPayload')


const resolvers = {
    Query,
    Mutation,
    AuthPayload
}

const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers,
    context: req => ({
        ...req,
        db: new Prisma({
            typeDefs: 'src/generated/prisma.graphql',
            endpoint: 'https://us1.prisma.sh/willferens/travel-mate/dev',
            secret: 'poopypoopybuttholes69',
            debug: true
        })
    })
})

server.start(() => console.log(`it's lit at http://localhost:4000`))
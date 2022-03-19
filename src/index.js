const { ApolloServer } = require('apollo-server');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');
const TrackAPI = require('./datasources/track-api');

const isProduction = process.env.NODE_ENV === 'production';

async function startApolloServer(typeDefs, resolvers) {
  const server = new ApolloServer({
    cors: isProduction ? {
      origin: ['https://studio.apollographql.com', 'https://emmiep-client-catstronauts.herokuapp.com'],
      credentials: true,
    } : true,
    typeDefs,
    resolvers,
    dataSources: () => {
      return {
        trackAPI: new TrackAPI(),
      };
    },
  });

  const { url, port } = await server.listen({ port: process.env.PORT || 4000 });
  console.log(`
      🚀  Server is running
      🔉  Listening on port ${port}
      📭  Query at ${url}
    `);
}

startApolloServer(typeDefs, resolvers);

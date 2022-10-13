const { ApolloServer } = require('apollo-server');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');
const TrackAPI = require('./datasources/track-api');
const { ApolloServerPluginLandingPageLocalDefault } = require ('@apollo/server/plugin/landingPage/default');

async function startApolloServer(typeDefs, resolvers) {
  const plugins = [ApolloServerPluginLandingPageLocalDefault({ embed: true })];
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    dataSources: () => {
      return {
        trackAPI: new TrackAPI(),
      };
    },
    plugins
  });

  const { url, port } = await server.listen({port: process.env.PORT || 4000});
  console.log(`
      🚀  Server is running
      🔉  Listening on port ${port}
      📭  Query at ${url}
    `);
}

startApolloServer(typeDefs, resolvers);

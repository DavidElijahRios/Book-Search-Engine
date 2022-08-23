const express = require('express');
// need to bring in the apollo server
const { ApolloServer } = require('apollo-server-express')
const path = require('path');
const db = require('./config/connection');
// no longer need routes will need to reconfigure to graphql
// const routes = require('./routes');

// Bring in middleware to be used in the apollo server through authmiddleware function
const { authMiddleware } = require('./utils/auth.js');

// Need to bring in typeDefs and resolvers
const { typeDefs, resolvers } = require('./schemas');

// need to create the apollo server instance
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
})

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

// Refactoring and no longer will need routes
// app.use(routes);

// starting the apollo server with graphql schema
const startApolloServer = async(typeDefs, resolvers) => {
  await server.start();
  server.applyMiddleware({ app });

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`🌍 Now listening on localhost:${PORT}`);
    console.log(`use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
  })
})
};

// call async function to start and run server
startApolloServer(typeDefs, resolvers);

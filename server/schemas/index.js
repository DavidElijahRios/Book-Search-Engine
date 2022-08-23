// need to bring in typeDefs and resolvers in order to export out to server to be used in apollo server for graphql
const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');

module.exports = { typeDefs, resolvers };
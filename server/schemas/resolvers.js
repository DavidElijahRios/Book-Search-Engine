const { User } = require('../models');

const resolvers = {
    // Queries are for get calls
    Query: {
       me: async () => {
        return User.find({})
       },
    },
    // Mutation are for post calls like updated, delete, post
    Mutation: {
       login: async () => {

       },
       addUser: async () => {

       },
       saveBook: async () => {

       },
       removeBook: async () => {

       },
    },
};

module.exports = resolvers;
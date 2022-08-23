const { User } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

const resolvers = {
    // Queries are for get calls
    Query: {
       me: async (parent, args, context) => {
        if (context.user) {
            const findUser = await User.findOne({
                $or: [{ _id: context.user._id }, { username: context.user.username }],
            })
            return findUser;
        }
        throw new AuthenticationError ("User not logged in!")
        
       },
    },
    // Mutation are for post calls like updated, delete, post
    Mutation: {
       login: async (parent, args, context) => {
            const user = await User.findOne(args.email)
            // TODO: need to add correct password
            // TODO: return token and user like add user
       },
       addUser: async (parent, args, context) => {
            const user = await User.create(args);
            const token = signToken(user);
            return ({ token, user });
       },
       saveBook: async () => {
       },
       removeBook: async () => {

       },
    },
};

module.exports = resolvers;
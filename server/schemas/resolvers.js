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
            const correctPw = await user.isCorrectPassword(args.password)
            
            if (correctPw) {
                const token = signToken(user)
                return ({ token, user });
            } else {
                throw new AuthenticationError ("incorrect Password")
            }
       },
       addUser: async (parent, args, context) => {
            const user = await User.create(args);
            const token = signToken(user);
            return ({ token, user });
       },
       saveBook: async (parent, args, context) => {
        const updatedUser = await User.findOneAndUpdate(
            { _id: context.user._id },
            {
                $addToSet: { savedBooks: args.input }
            },
            {
                new: true,
            }
        );
        return updatedUser
       },
       removeBook: async (parent, args, context) => {
          const updatedUser = await User.findOneAndUpdate(
            { _id: context.user._id },
            {
                $pull: { savedBooks: { bookId: args.bookId } }
            },
            {
                new: true
            }
          );
          return updatedUser
       },
    },
};

module.exports = resolvers;
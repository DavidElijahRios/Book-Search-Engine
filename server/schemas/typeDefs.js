const { gql } = require('apollo-server-express');
// ? do I need to put the match on the user models
// ? and how do I bring in bookschema?
// ? Why doesn't there need to be an _id for book type?
// ?Does the password need to be there or bookCount?
// ? Where is the Auth type coming from 
const typeDefs = gql`
type User {
    _id: ID!
    username: String!
    email: String!
    password: String!
    savedBooks: [Book]
}

type Book {
    bookId: String!
    authors: [String]
    description: String!
    image: String!
    link: String!
    title: String!
}

type Auth {
    token
    user
}

type Query {
    me: [User]
}

type Mutation {
    
}
`;

module.exports = typeDefs;
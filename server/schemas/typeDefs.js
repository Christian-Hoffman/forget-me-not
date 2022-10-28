const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Item{
    _id: ID
    body: String
  }
  type List{
    _id: ID
    title: String
    listItems: [String]
    createdAt: String
    isPublic: Boolean
    isOrdered: Boolean
  }
  type Note{
    _id: ID
    title: String
    body: String
    createdAt: String
    isPublic: Boolean
  }

  type User {
    _id: ID
    username: String
    email: String
    password: String
    notes: [Note]
    lists: [List]
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(id: ID!): User
    me: User
    
  }

  type Mutation {
    addUser(email:String!, username:String!, password:String!): Auth
    login(email:String!, password:String!): Auth
    addNote(title: String!, body: String!, isPublic: Boolean): User
    deleteNote(noteId: ID!): User
    editNote(noteId: ID!, title: String!, body: String!, isPublic: Boolean): User
    addList(title: String!, listItems: [String]!, isPublic: Boolean, isOrdered: Boolean): User
    deleteList(listId: ID!): User
    editList(listId: ID!, title: String!, listItems: [String]!, isPublic: Boolean, isOrdered: Boolean): User
  }
`;
// notes: [Note] save if applicable
module.exports = typeDefs;

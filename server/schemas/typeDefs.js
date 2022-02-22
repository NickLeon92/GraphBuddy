const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
    graphs: [Graph]
  }

  type Graph {
    _id: ID
    id: String!
    title: String
    labels: [String]
    data: [Int]
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(username: String!): User
    me: User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addGraph(id:String, title:String, labels:String, data:Int):User
    updateGraph(id:String, title:String, labels:String, data:Int):Graph
    removeGraph(graphId:String): User
  }
`;

module.exports = typeDefs;

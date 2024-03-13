const { gql } = require('apollo-server-express');

const typeDefs = gql`
  enum OperationType {
    transfer
    withdrawal
    deposit
    transfer_in
    transfer_out
  }

  type User {
    _id: ID!
    name: String!
    email: String!
    currentAddress: String!
    password: String!
    amount: Float!
    gender: String!
    contacts: [User]!
    transactions: [MonetaryOperation]!
  }
  
  type TransferOperationResult {
  operation: MonetaryOperation!
  fromUser: User!
  toUser: User!
}


  type MonetaryOperation {
    _id: ID!
    operationType: OperationType!
    amount: Float!
    date: String!
    user: User!
    message: String!
    balance: Float!
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  type Query {
    getUserById(_id: ID!): User
    getUserBalance(_id: ID!): Float!
    getAllMonetaryOperations(_id: ID!): [MonetaryOperation]!
    getAllUsers(name: String!, email: String!, amount: Float!): [User]!
  }

  type Mutation {
    registerUser(name: String!, email: String!, password: String!, currentAddress: String!, gender: String!): AuthPayload!
    loginUser(email: String!, password: String!): AuthPayload!
    addFunds(_id: ID!, amount: Float!): MonetaryOperation!
    transferFunds(fromUserId: ID!, toUserId: ID!, amount: Float!): MonetaryOperation!
    withdrawFunds(_id: ID!, amount: Float!): MonetaryOperation!
  }
`;

module.exports = typeDefs;


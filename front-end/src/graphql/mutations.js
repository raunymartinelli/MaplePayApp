// src/graphql/mutations.js
import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation LoginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      token
      user {
        _id
        name
        email
      }
    }
  }
`;

export const REGISTER_USER = gql`
  mutation RegisterUser($name: String!, $email: String!, $password: String!, $currentAddress: String!, $gender: String!) {
    registerUser(name: $name, email: $email, password: $password, currentAddress: $currentAddress, gender: $gender) {
      token
      user {
        _id
        name
        email
      }
    }
  }
`;

export const ADD_FUNDS = gql`
  mutation AddFunds($amount: Float!) {
    addFunds(amount: $amount) {
      _id
      amount
      date
      message
      user {
        name
      }
    }
  }
`;

export const TRANSFER_FUNDS = gql`
  mutation TransferFunds($toUserId: ID!, $amount: Float!) {
    transferFunds(toUserId: $toUserId, amount: $amount) {
      _id
      amount
      date
      message
      user {
        name
      }
    }
  }
`;

export const WITHDRAW_FUNDS = gql`
  mutation WithdrawFunds($userId: ID!, $amount: Float!) {
    withdrawFunds(_id: $userId, amount: $amount) {
      _id
      operationType
      amount
      date
      message
      user {
        _id
        name
      }
    }
  }
`;

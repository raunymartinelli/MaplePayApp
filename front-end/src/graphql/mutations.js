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
  mutation AddFunds($amount: Float!, $_id: ID!) {
    addFunds(_id: $_id, amount: $amount) {
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
  mutation TransferFunds($fromUserId: ID!, $toUserId: ID!, $amount: Float!) {
    transferFunds(fromUserId: $fromUserId, toUserId: $toUserId, amount: $amount) {
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
  mutation WithdrawFunds($_id: ID!, $amount: Float!) {
    withdrawFunds(_id: $_id, amount: $amount) {
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

export const UPDATE_USER_FIELD_MUTATION = gql`
  mutation UpdateUserField($_id: ID!, $field: String!, $value: String!) {
    updateUserField(_id: $_id, field: $field, value: $value) {
      _id
      name
      email
    }
  }
`;

export const ADD_PROFILE_PICTURE_MUTATION = gql`
  mutation AddProfilePicture($_id: ID!, $picture: String!) {
    addProfilePicture(_id: $_id, picture: $picture) {
      _id
      name
      email
      profilePicture
    }
  }
`;

import { gql } from '@apollo/client';

export const GET_USER_BY_ID = gql`
  query GetUserById($_id: ID!) { 
    getUserById(_id: $_id) { 
      _id
      name
      email
      amount
    }
  }
`;

export const GET_ALL_MONETARY_OPERATIONS = gql`
  query GetAllMonetaryOperations($_id: ID!) { 
    getAllMonetaryOperations(_id: $_id) {
      _id
      operationType
      date
      amount
    }
  }
`;
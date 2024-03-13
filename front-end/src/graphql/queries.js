import { gql } from '@apollo/client';

export const GET_USER_BY_ID = gql`
  query GetUserById($_id: ID!) { 
    getUserById(_id: $_id) { 
      _id
      name
      email
      amount
      transactions {
        _id
        operationType
        amount
        date
        message
      }
    }
  }
`;

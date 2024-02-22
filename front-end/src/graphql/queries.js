import { gql } from '@apollo/client';

export const GET_USER_WALLET = gql`
  query GetUserWallet($userId: ID!) {
    getUserWallet(userId: $userId) {
      balance
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
const { gql } = require("@apollo/client");

export const GET_USER = gql`
  query GetUser {
    getUser {
      _id
      address
      email
      firstName
      lastName
      phone
      username
    }
  }
`;

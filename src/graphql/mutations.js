import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      userId
      token
      tokenExpiration
      type
    }
  }
`;

export const ADD_VEHICLE = gql`
  input VehicleInput {
    reg_no: String!
    type: String
    brand: String
    model: String
    owner_name: String
    owner_mobile: String
    owner_address: String
    condition: String
    mileage: Float!
    last_service_date: String!
    service_period: Int!
    image: String!
    last_month_fuel_usage: Float!
  }
  mutation AddVehicle($input: VehicleInput!) {
    addVehicle(input: $input) {
      _id
      reg_no
      brand
      condition
      image
      last_month_fuel_usage
      last_service_date
      mileage
      model
      owner_address
      owner_mobile
      owner_name
      service_period
      type
    }
  }
`;

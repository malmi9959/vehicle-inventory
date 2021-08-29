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

export const GET_VEHICLE_ID = gql`
  query GetVehicleId {
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

export const GET_NEXT_VEHICLE_ID = gql`
  query NextVehicleId {
    nextVehicleId
  }
`;

export const VEHICLES = gql`
  query Vehicles {
    vehicles {
      _id
      reg_no
      type
      brand
      model
      fuel_usage {
        month
        year
        usage
        updatedAt
      }
      owner_address
      owner_mobile
      owner_name
      last_service_date
      mileage
      service_period
      image
      condition
      createdAt
      updatedAt
    }
  }
`;

export const VEHICLE_BY_ID = gql`
  query VehicleById($vehicleId: String!) {
    vehicleById(vehicleId: $vehicleId) {
      _id
      reg_no
      type
      brand
      condition
      fuel_usage {
        month
        year
        usage
        updatedAt
      }
      image
      last_service_date
      mileage
      model
      owner_address
      owner_mobile
      owner_name
      service_period
      createdAt
      updatedAt
    }
  }
`;

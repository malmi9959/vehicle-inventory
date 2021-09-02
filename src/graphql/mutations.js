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

export const DELETE_VEHICLE = gql`
  mutation DeleteVehicle($id: String!) {
    deleteVehicle(id: $id)
  }
`;

export const UPDATE_VEHICLE = gql`
  mutation UpdateVehicle(
    $reg_no: String
    $type: String
    $brand: String
    $model: String
    $owner_mobile: String
    $owner_name: String
    $owner_address: String
    $condition: String
    $mileage: Int
    $last_service_date: String
    $service_period: Int
    $image: Upload
    $id: String!
  ) {
    updateVehicle(
      id: $id
      input: {
        reg_no: $reg_no
        type: $type
        brand: $brand
        model: $model
        owner_name: $owner_name
        owner_mobile: $owner_mobile
        owner_address: $owner_address
        condition: $condition
        mileage: $mileage
        last_service_date: $last_service_date
        service_period: $service_period
        image: $image
      }
    ) {
      _id
    }
  }
`;

export const ADD_VEHICLE = gql`
  mutation AddVehicle(
    $reg_no: String!
    $type: String
    $brand: String
    $model: String
    $owner_name: String
    $owner_mobile: String
    $owner_address: String
    $condition: String
    $mileage: Int!
    $last_service_date: String!
    $service_period: Int!
    $image: Upload!
  ) {
    addVehicle(
      input: {
        reg_no: $reg_no
        type: $type
        brand: $brand
        model: $model
        owner_name: $owner_name
        owner_mobile: $owner_mobile
        owner_address: $owner_address
        condition: $condition
        mileage: $mileage
        last_service_date: $last_service_date
        service_period: $service_period
        image: $image
      }
    ) {
      _id
      reg_no
      brand
      condition
      image
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

const { gql } = require("@apollo/client");

export const FUEL_ADDED = gql`
  subscription FuelAdded {
    fuelUsageCreated {
      _id
      usage
      month
      year
      createdAt
      updatedAt
      vehicleId
    }
  }
`;

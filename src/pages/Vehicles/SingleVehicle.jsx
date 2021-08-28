import React, { Fragment } from "react";
import PageTitle from "../../components/Typography/PageTitle";

const SingleVehicle = (props) => {
  const vehicleId = props.match.params.id;
  return (
    <Fragment>
      <PageTitle>{vehicleId}</PageTitle>
    </Fragment>
  );
};

export default SingleVehicle;

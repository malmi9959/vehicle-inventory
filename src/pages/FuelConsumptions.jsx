import React, { useEffect, useRef, useState } from "react";
import { Fragment } from "react";
import PageTitle from "../components/Typography/PageTitle";
import { DateTime } from "luxon";
import {
  CardBody,
  Card,
  Label,
  Input,
  HelperText,
  Button,
} from "@windmill/react-ui";
import { useMutation, useQuery } from "@apollo/client";
import { VEHICLES } from "../graphql/queries";
import SectionTitle from "../components/Typography/SectionTitle";
import ReactSelect from "react-select";
import { ADD_FUEL_USAGE } from "../graphql/mutations";
import RecentFuelUsages from "../components/RecentFuelUsages/RecentFuelUsages";
import Spinner from "../components/Spinner";
import { FuelUsageChart } from "../components/FuelUsage/FuelUsageChart";
const { useToasts } = require("react-toast-notifications");

const FuelConsumptions = () => {
  const [vehicles, setVehicles] = useState([]);
  const [vehicleId, setVehicleId] = useState(null);
  const [usage, setUsage] = useState(null);

  //toast
  const { addToast } = useToasts();

  const inputRef = useRef(null);

  const date = new DateTime.now();
  const lastMonth = date.toLocaleString({ month: "numeric" }) - 1;
  const thisyear = date.toLocaleString({ year: "numeric" });
  const { data, loading, refetch } = useQuery(VEHICLES);
  const [addFuelUsage, { loading: loadingAddFuelUsage }] = useMutation(
    ADD_FUEL_USAGE,
    {
      onCompleted: () => {
        addToast(`${vehicleId} Last month Fuel Usage updated!`, {
          appearance: "success",
        });
      },
      onError: (error) => {
        addToast(`${error.graphQLErrors[0].message}`, {
          appearance: "error",
        });
      },
    }
  );

  const isUpdated = (fuelUsages) => {
    if (fuelUsages && fuelUsages.length !== 0 && Array.isArray(fuelUsages)) {
      return fuelUsages.some(
        (item) =>
          item.month === lastMonth && item.year === Number.parseInt(thisyear)
      );
    } else {
      return false;
    }
  };

  useEffect(() => {
    if (data?.vehicles) {
      const options = [];

      data.vehicles.forEach((item) => {
        options.push({
          isDisabled: isUpdated(item.fuel_usage),
          value: item._id,
          label: `${item._id} ${item.reg_no} ${item.brand} ${item.model}  ${
            isUpdated(item.fuel_usage) ? " - Updated" : ""
          }`,
        });
      });
      setVehicles([...options]);
    }
  }, [data]);

  const onAddFuelUsage = () => {
    if (vehicleId !== null && usage !== null) {
      addFuelUsage({
        variables: {
          vehicleId: vehicleId,
          usage: Number.parseFloat(usage),
        },
      })
        .then(() => {
          setVehicles([]);
          setVehicleId(null);
          setUsage(null);
          console.log((inputRef.current.value = ""));
          refetch();
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      addToast("All Fields are required!", {
        appearance: "warning",
      });
    }
  };

  return (
    <Fragment>
      <div>
        <PageTitle>Fuel Consumptions</PageTitle>
      </div>
      <section className="flex">
        {/* <span>{lastMonth}</span> */}
        <div className="w-1/2">
          <Card className="overflow-visible">
            <CardBody>
              <SectionTitle>Update last month fuel usage</SectionTitle>
              {loading && <div>Loading...</div>}
              {!loading && vehicles.length !== 0 && (
                <Label>
                  <span>Select Vehicle</span>
                  <ReactSelect
                    onChange={(option) => {
                      setVehicleId(option.value);
                    }}
                    options={vehicles}
                  />
                </Label>
              )}

              <div className="mt-4">
                <Label>
                  <Input
                    ref={inputRef}
                    type="number"
                    onChange={(e) => {
                      setUsage(e.target.value);
                    }}
                    placeholder="Fuel Usage in leters"
                  />
                  <HelperText>
                    ex: 56.6<span className="italic">L</span>
                  </HelperText>
                </Label>
              </div>

              <div className="mt-4">
                <Button onClick={onAddFuelUsage}>
                  {loadingAddFuelUsage ? <Spinner /> : "Add Fuel Usage"}
                </Button>
              </div>
            </CardBody>
          </Card>
        </div>
        <div className="w-1/2 px-6">
          <RecentFuelUsages />
        </div>
      </section>
      <section>
        <FuelUsageChart />
      </section>
    </Fragment>
  );
};

export default FuelConsumptions;

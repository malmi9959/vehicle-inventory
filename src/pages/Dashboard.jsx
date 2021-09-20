/* eslint-disable react-hooks/exhaustive-deps */
import { useQuery } from "@apollo/client";

import React, { useRef, useState } from "react";

import InfoCard from "../components/InfoCard";
import RoundIcon from "../components/RoundIcon";
import PageTitle from "../components/Typography/PageTitle";

import { VEHICLES } from "../graphql/queries";
import { FireIcon, VehicleIcon } from "../icons";
import { FuelUsageChart } from "../components/FuelUsage/FuelUsageChart";
import { Button } from "@windmill/react-ui";
import { FormsIcon } from "../icons";
import ReactToPrint from "react-to-print";

const Dashboard = () => {
  const { data, loading } = useQuery(VEHICLES);
  const [lastMonthFuelUsage, setLastMonthFuelUsage] = useState(null);

  const printComponent = useRef();
  return (
    <div>
      <div className="flex items-center justify-between">
        <PageTitle>Dashboard</PageTitle>

        <div>
          <ReactToPrint
            trigger={() => <Button icon={FormsIcon}>Print Report</Button>}
            content={() => printComponent.current}
          />
        </div>
      </div>
      <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
        {!loading ? (
          <InfoCard title="Total Vehicles" value={data?.vehicles?.length}>
            <RoundIcon
              icon={VehicleIcon}
              iconColorClass="text-orange-500 dark:text-orange-100"
              bgColorClass="bg-orange-100 dark:bg-orange-500"
              className="mr-4"
            />
          </InfoCard>
        ) : null}

        {lastMonthFuelUsage && (
          <InfoCard
            title="Last Month  Fuel Usage (L)"
            value={lastMonthFuelUsage}
          >
            <RoundIcon
              icon={FireIcon}
              iconColorClass="text-green-500 dark:text-green-100"
              bgColorClass="bg-green-100 dark:bg-green-500"
              className="mr-4"
            />
          </InfoCard>
        )}
      </div>

      <section ref={printComponent}>
        <FuelUsageChart
          onChangeLastMonthUsage={(usage) => {
            setLastMonthFuelUsage(usage);
          }}
        />
      </section>
    </div>
  );
};

export default Dashboard;

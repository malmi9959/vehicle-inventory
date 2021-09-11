import { useQuery } from "@apollo/client";
import { DateTime } from "luxon";
import React, { useEffect, useState } from "react";
import Chart from "../components/Charts/ChartCard";
import ChartLegend from "../components/Charts/ChartLegend";
import InfoCard from "../components/InfoCard";
import RoundIcon from "../components/RoundIcon";
import PageTitle from "../components/Typography/PageTitle";
import SectionTitle from "../components/Typography/SectionTitle";
import { FUEL_USAGES, VEHICLES } from "../graphql/queries";
import { FireIcon, VehicleIcon } from "../icons";
import { Line } from "react-chartjs-2";

const Dashboard = () => {
  const [lastMonthFuelUsage, setLastMonthFuelUsage] = useState(null);
  const [fuelUsageAnnual, setFuelUsageAnnual] = useState([]);

  const { data, loading } = useQuery(VEHICLES);

  const { data: fuelUsages, loading: fuelLoading } = useQuery(FUEL_USAGES);

  const totalFuelUsage = (usages) => {};

  const date = new DateTime.now();
  const lastMonth = date.toLocaleString({ month: "numeric" }) - 1;

  useEffect(() => {
    const array = fuelUsages?.fuelUsages;
    if (array && Array.isArray(array) && array.length !== 0) {
      // console.log(array);
      let lastMonthFuelUsage = 0;
      array.forEach((item) => {
        if (item.month !== undefined && item.month === lastMonth) {
          lastMonthFuelUsage += item.usage;
        }
      });
      setLastMonthFuelUsage(lastMonthFuelUsage);
    }

    // console.log(totalFuelUsage)
  }, [fuelUsages]);

  function mergeArrays(first, second) {
    var min = Math.min(first.length, second.length),
      i = 0,
      result = [];

    while (i < min) {
      result.push(first[i], second[i]);
      ++i;
    }
    return result.concat(first.slice(min), second.slice(min));
  }

  useEffect(() => {
    const array = fuelUsages?.fuelUsages;
    if (array && Array.isArray(array) && array.length !== 0) {
      const colors = ["#F59E0B", "#10B981", "#3B82F6", "#7C3AED", "#DC2626"];
      const monthIndex = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
      const chartData = [];
      array.forEach((item) => {
        const data = [];

        // console.log(chartData);

        for (let index = 0; index < monthIndex.length; index++) {
          const element = monthIndex[index];
          if (element === item.month) {
            data.push(item.usage);
          } else {
            data.push(null);
          }
        }

        const randomColor = Math.floor(Math.random() * colors.length);

        const indexExisting = chartData.findIndex(
          (i) => i.label === item.vehicleId
        );

        if (indexExisting !== -1) {
          if (Array.isArray(chartData[indexExisting].data)) {
            console.log(chartData[indexExisting].data, data);
            const removeIndex = item.month - 1;
            chartData[indexExisting].data.splice(removeIndex, 1, item.usage);
            console.log(chartData[indexExisting].data);
            // chartData[indexExisting].data.splice(item.month - 1)
          }
        } else {
          chartData.push({
            label: item.vehicleId,
            backgroundColor: colors[randomColor],
            borderColor: colors[randomColor],
            fill: false,
            data: data,
          });
        }
        colors.splice(randomColor, 1);
      });
      // console.log(array);
      setFuelUsageAnnual(chartData);
    }
  }, [fuelUsages]);

  return (
    <div>
      <PageTitle>Dashboard</PageTitle>
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

        {/* <InfoCard title="New sales" value="376">
          <RoundIcon
            icon={CartIcon}
            iconColorClass="text-blue-500 dark:text-blue-100"
            bgColorClass="bg-blue-100 dark:bg-blue-500"
            className="mr-4"
          />
        </InfoCard>

        <InfoCard title="Pending contacts" value="35">
          <RoundIcon
            icon={ChatIcon}
            iconColorClass="text-teal-500 dark:text-teal-100"
            bgColorClass="bg-teal-100 dark:bg-teal-500"
            className="mr-4"
          />
        </InfoCard> */}
      </div>

      <section>
        <SectionTitle>Charts Fuel Usage</SectionTitle>
        <div>
          <Chart title="Lines">
            <Line
              {...lineOptions}
              data={{
                labels: [
                  "January",
                  "February",
                  "March",
                  "April",
                  "May",
                  "June",
                  "July",
                  "Aug",
                  "Sept",
                  "Oct",
                  "Nov",
                  "Dec",
                ],
                datasets: fuelUsageAnnual,
              }}
            />
            <ChartLegend legends={lineLegends} />
          </Chart>
        </div>
      </section>
    </div>
  );
};

export const lineLegends = [
  // { title: "Organic", color: "bg-teal-600" },
  // { title: "Paid", color: "bg-purple-600" },
];

export const lineOptions = {
  options: {
    responsive: true,
    tooltips: {
      mode: "index",
      intersect: false,
    },
    hover: {
      mode: "nearest",
      intersect: true,
    },
    scales: {
      x: {
        display: true,
        scaleLabel: {
          display: true,
          labelString: "Month",
        },
      },
      y: {
        display: true,
        scaleLabel: {
          display: true,
          labelString: "Value",
        },
      },
    },
  },
  legend: {
    display: false,
  },
};

export default Dashboard;

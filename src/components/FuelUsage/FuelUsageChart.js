/* eslint-disable react-hooks/exhaustive-deps */
import { useQuery } from "@apollo/client";
import { DateTime } from "luxon";
import { Fragment, useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { FUEL_USAGES } from "../../graphql/queries";
import Chart from "../Charts/ChartCard";
import ChartLegend from "../Charts/ChartLegend";
import SectionTitle from "../Typography/SectionTitle";

export const FuelUsageChart = ({ onChangeLastMonthUsage = null }) => {
  const [fuelUsageAnnual, setFuelUsageAnnual] = useState([]);

  const { data: fuelUsages } = useQuery(FUEL_USAGES);

  // const totalFuelUsage = (usages) => {};

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
      if (onChangeLastMonthUsage) {
        onChangeLastMonthUsage(lastMonthFuelUsage);
      }
    }

    // console.log(totalFuelUsage)
  }, [fuelUsages]);

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
    <Fragment>
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
    </Fragment>
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

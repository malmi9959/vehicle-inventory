import {
  TableContainer,
  Table,
  TableHeader,
  TableBody,
  TableCell,
  TableFooter,
  TableRow,
  Badge,
  Button,
} from "@windmill/react-ui";
import { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import PageTitle from "../../components/Typography/PageTitle";
import SectionTitle from "../../components/Typography/SectionTitle";
import { EditIcon, EyeIcon } from "../../icons";
import { PlusIcon } from "@heroicons/react/solid";

import { DateTime } from "luxon";
import { useQuery } from "@apollo/client";
import { VEHICLES } from "../../graphql/queries";

const Vehicles = () => {
  const { data, loading, error } = useQuery(VEHICLES);

  function findNextServiceDate(lastServiceDate, period) {
    const dateToNumber = Number.parseInt(lastServiceDate);

    const nextServiceDate = DateTime.fromMillis(dateToNumber)
      .plus({ month: period })
      .toLocaleString(DateTime.DATE_SHORT);
    return nextServiceDate;
  }

  // useEffect(() => {
  //   console.log(data);
  //   findNextServiceDate(
  //     data?.vehicles[0].last_service_date,
  //     data?.vehicles[0].service_period
  //   );
  // }, [data]);
  return (
    <Fragment>
      <div className="flex items-center justify-between">
        <PageTitle>Vehicles</PageTitle>
        <div>
          <Button
            tag={Link}
            to="/app/vehicles/add"
            icon={PlusIcon}
            className="bg-green-400 hover:bg-green-500"
          >
            Add Vehicle
          </Button>
        </div>
      </div>

      <SectionTitle>Vehicle Information</SectionTitle>

      <TableContainer className="mb-8">
        <Table>
          <TableHeader>
            <tr>
              <TableCell>Vehicle ID</TableCell>
              <TableCell>Reg No</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Owner</TableCell>
              <TableCell>Mileage</TableCell>
              <TableCell>Next Service Date</TableCell>
              <TableCell>Actions</TableCell>
            </tr>
          </TableHeader>
          <TableBody>
            {data &&
              data?.vehicles &&
              Array.isArray(data.vehicles) &&
              data.vehicles.map((item) => {
                return (
                  <TableRow key={item._id}>
                    <TableCell>
                      <div className="flex items-center text-sm">
                        <div className="relative p-2 mr-4 overflow-hidden rounded-md shadow-md">
                          <img width={80} src={item.image} alt="" />
                        </div>
                        {/* <Avatar
                      className="hidden mr-3 md:block"
                      src={user.avatar}
                      alt="User avatar"
                    /> */}
                        <div>
                          <p className="font-semibold">{item._id}</p>
                          {/* <p className="text-xs text-gray-600 dark:text-gray-400">
                        {user.job}
                      </p> */}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm">{item.reg_no}</span>
                    </TableCell>
                    <TableCell>
                      <Badge type="primary">{item.type}</Badge>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm">{item.owner_name}</span>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm">{item.mileage}km</span>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm">
                        {findNextServiceDate(
                          item.last_service_date,
                          item.service_period
                        )}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-4">
                        <Button
                          tag={Link}
                          to={`/app/vehicle/${item._id}`}
                          layout="link"
                          size="icon"
                          aria-label="Edit"
                        >
                          <EyeIcon className="w-5 h-5" aria-hidden="true" />
                        </Button>
                        <Button layout="link" size="icon" aria-label="Edit">
                          <EditIcon className="w-5 h-5" aria-hidden="true" />
                        </Button>
                        {/* <Button layout="link" size="icon" aria-label="Delete">
                    <TrashIcon className="w-5 h-5" aria-hidden="true" />
                  </Button> */}
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
        <TableFooter>
          {/* <Pagination
            totalResults={totalResults}
            resultsPerPage={resultsPerPage}
            onChange={onPageChangeTable2}
            label="Table navigation"
          /> */}
        </TableFooter>
      </TableContainer>
    </Fragment>
  );
};

export default Vehicles;

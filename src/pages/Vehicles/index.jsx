import {
  TableContainer,
  Table,
  TableHeader,
  TableBody,
  TableCell,
  TableRow,
  Badge,
  Button,
} from "@windmill/react-ui";
import { Fragment, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import PageTitle from "../../components/Typography/PageTitle";
import SectionTitle from "../../components/Typography/SectionTitle";
import { EditIcon, EyeIcon, FormsIcon } from "../../icons";
import { PlusIcon } from "@heroicons/react/solid";

import { DateTime } from "luxon";
import { useQuery } from "@apollo/client";
import { VEHICLES } from "../../graphql/queries";
import ReactToPrint from "react-to-print";
import { useContext } from "react";
import { SearchContext } from "../../context/SearchContext";

const Vehicles = () => {
  const { data } = useQuery(VEHICLES);
  const [vehicles, setVehicles] = useState(null);
  const printComponent = useRef();

  const { searchTerm } = useContext(SearchContext);

  useEffect(() => {
    const searchTerms = searchTerm.split(" ");

    if (data?.vehicles) {
      const filterVehciles = data.vehicles;
      const filteredData =
        Array.isArray(filterVehciles) &&
        filterVehciles.filter(
          (item) =>
            item._id.toLowerCase().includes(searchTerms) ||
            item.brand.toLowerCase().includes(searchTerms) ||
            item.model.toLowerCase().includes(searchTerms) ||
            item.type.toLowerCase().includes(searchTerms)
        );
      setVehicles(filteredData);
    }
  }, [searchTerm, data]);

  useEffect(() => {
    if (data) {
      setVehicles(data.vehicles);
    }
  }, [data]);

  function findNextServiceDate(lastServiceDate, period) {
    const dateToNumber = Number.parseInt(lastServiceDate);

    const nextServiceDate = DateTime.fromMillis(dateToNumber)
      .plus({ month: period })
      .toLocaleString(DateTime.DATE_SHORT);
    return nextServiceDate;
  }

  const printStyle = () => `@media print {
  @page { size: landscape; }
}`;

  return (
    <Fragment>
      <div className="flex items-center justify-between">
        <PageTitle>Vehicles</PageTitle>
        <div>
          <Button
            tag={Link}
            to="/app/vehicles/add"
            icon={PlusIcon}
            className="mr-3 bg-green-400 hover:bg-green-500"
          >
            Add Vehicle
          </Button>
          <ReactToPrint
            pageStyle={<style>{printStyle}</style>}
            trigger={() => <Button icon={FormsIcon}>Print Report</Button>}
            content={() => printComponent.current}
          />
        </div>
      </div>

      <div className="flex items-center justify-between">
        <SectionTitle>Vehicle Information</SectionTitle>
      </div>

      <TableContainer ref={printComponent} className="mb-8">
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
            {vehicles &&
              Array.isArray(vehicles) &&
              vehicles.map((item) => {
                return (
                  <TableRow key={item._id}>
                    <TableCell>
                      <div className="flex items-center text-sm">
                        <div
                          style={{ width: 80 }}
                          className="relative p-2 mr-4 overflow-hidden rounded-md shadow-md"
                        >
                          <img width={80} src={item.image} alt="" />
                        </div>
                        <div>
                          <p className="font-semibold">{item._id}</p>
                          <span>
                            {item.brand} {item.model}
                          </span>
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
                        <Button
                          tag={Link}
                          to={`/app/vehicles/update/${item._id}`}
                          layout="link"
                          size="icon"
                          aria-label="Edit"
                        >
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
      </TableContainer>
    </Fragment>
  );
};

export default Vehicles;

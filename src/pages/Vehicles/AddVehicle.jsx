import { useQuery } from "@apollo/client";
import {
  Card,
  CardBody,
  HelperText,
  Input,
  Label,
  Select,
} from "@windmill/react-ui";
import React, { Fragment, useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import PageTitle from "../../components/Typography/PageTitle";
import SectionTitle from "../../components/Typography/SectionTitle";
import { GET_NEXT_VEHICLE_ID } from "../../graphql/queries";
import DatePicker from "react-datepicker";
import { DateTime } from "luxon";

const AddVehicle = () => {
  const [lastServiceDate, setLastServiceDate] = useState(new Date());
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(
    new Date().setMonth(startDate.getMonth() + 1)
  );
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const nextVehicleIdData = useQuery(GET_NEXT_VEHICLE_ID);

  return (
    <Fragment>
      <div className="py-4 mt-6 bg-white rounded-md">
        <nav aria-label="breadcrumb">
          <ol className="flex text-sm breadcrumb">
            <li className="text-gray-600 breadcrumb-item">
              <Link
                to="/app/"
                className="mx-2 text-gray-600 hover:text-primary-light"
              >
                Vehicles
              </Link>
            </li>
            <li
              className="mx-2 text-primary-light breadcrumb-item active hover:text-primary-light"
              aria-current="page"
            >
              Add
            </li>
          </ol>
        </nav>
      </div>
      <PageTitle>Add Vehicle</PageTitle>
      <div>
        <SectionTitle>Vehicle Information</SectionTitle>

        <form className="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
          <Card>
            <CardBody>
              <Label>
                <span>Vehicle ID</span>
                {!nextVehicleIdData?.loading ? (
                  <Input
                    disabled
                    className="mt-1"
                    value={nextVehicleIdData?.data?.nextVehicleId}
                  />
                ) : (
                  <div>Loading...</div>
                )}
              </Label>
              <Label className="mt-4">
                <span>Reg No</span>
                <Input className="mt-1" placeholder="Enter Vehicle Reg No" />
                <HelperText>ex: KN ****</HelperText>
              </Label>
              <Label className="mt-4">
                <span>Type</span>
                <Select className="mt-1">
                  <option>Light</option>
                  <option>Dual Purpose</option>
                  <option>Heavy Duty</option>
                  <option>Two Wheel/ Bikes</option>
                </Select>
              </Label>
              <Label className="mt-4">
                <span>Brand</span>
                <Input className="mt-1" placeholder="Vehicle Brand" />
                <HelperText>ex: Toyota, Nissan</HelperText>
              </Label>
              <Label className="mt-4">
                <span>Model</span>
                <Input className="mt-1" placeholder="Vehicle Model" />
                <HelperText>ex: Car, Bike</HelperText>
              </Label>

              <div className="mt-4">
                <Label>Condition</Label>
                <div className="mt-2">
                  <Label radio>
                    <Input type="radio" value="brand_new" name="condition" />
                    <span className="ml-2">Brand New</span>
                  </Label>
                  <Label className="ml-6" radio>
                    <Input type="radio" value="business" name="condition" />
                    <span className="ml-2">Used</span>
                  </Label>
                </div>
              </div>

              <Label className="mt-4">
                <span>Mileage</span>
                <Input className="mt-1" type="number" placeholder="Mileage" />
                <HelperText>ex: 20000 km</HelperText>
              </Label>
            </CardBody>
          </Card>

          <Card className="mt-4">
            <CardBody>
              <SectionTitle>Owner's Information</SectionTitle>
              <Label>
                <span>Owner Name</span>
                <Input className="mt-1" type="text" placeholder="Full Name" />
              </Label>
              <Label className="mt-4">
                <span>Owner Address</span>
                <Input className="mt-1" type="text" placeholder="Address" />
              </Label>
              <Label className="mt-4">
                <span>Owner Mobile</span>
                <Input
                  className="mt-1"
                  type="text"
                  placeholder="Mobile Number"
                />
              </Label>
            </CardBody>
          </Card>
          <Card className="mt-4 overflow-visible">
            <CardBody>
              <SectionTitle>Service Details</SectionTitle>
              <Label className="relative">
                <span>Last Service Date</span>
                <DatePicker
                  selected={lastServiceDate}
                  onChange={(date) => setLastServiceDate(date)}
                  nextMonthButtonLabel=">"
                  previousMonthButtonLabel="<"
                />
              </Label>
              <Label className="mt-4">
                <span>Service renewal period</span>
                <Input className="mt-1" type="number" placeholder="Months" />
                <HelperText>In months</HelperText>
              </Label>
            </CardBody>
          </Card>
        </form>
      </div>
    </Fragment>
  );
};

export default AddVehicle;

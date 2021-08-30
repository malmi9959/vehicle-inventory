import { useMutation, useQuery } from "@apollo/client";
import {
  Button,
  Card,
  CardBody,
  HelperText,
  Input,
  Label,
  Select,
} from "@windmill/react-ui";
import React, { Fragment, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import PageTitle from "../../components/Typography/PageTitle";
import SectionTitle from "../../components/Typography/SectionTitle";

import { GET_NEXT_VEHICLE_ID } from "../../graphql/queries";
import DatePicker from "react-datepicker";
import { DateTime } from "luxon";
import { useDropzone } from "react-dropzone";
import { ADD_VEHICLE } from "../../graphql/mutations";
import path from "path";

const thumbsContainer = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  marginTop: 16,
};

const thumb = {
  display: "inline-flex",
  borderRadius: 2,
  border: "1px solid #eaeaea",
  marginBottom: 8,
  marginRight: 8,
  height: 100,
  padding: 4,
  boxSizing: "border-box",
};

const thumbInner = {
  display: "flex",
  minWidth: 0,
  overflow: "hidden",
};

const img = {
  display: "block",
  width: "auto",
  height: "100%",
};

const baseStyle = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "20px",
  borderWidth: 2,
  borderRadius: 2,
  borderColor: "#eeeeee",
  borderStyle: "dashed",
  backgroundColor: "#fafafa",
  color: "#bdbdbd",
  outline: "none",
  transition: "border .24s ease-in-out",
};

const activeStyle = {
  borderColor: "#2196f3",
};

const acceptStyle = {
  borderColor: "#00e676",
};

const rejectStyle = {
  borderColor: "#ff1744",
};

const AddVehicle = () => {
  const [lastServiceDate, setLastServiceDate] = useState(new Date());
  const [preview, setPreview] = useState("");
  const [addVehicle] = useMutation(ADD_VEHICLE, {
    onError: (error) => {
      console.log(error);
    },
  });
  const [file, setFile] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    accept: "image/*",
    maxFiles: 1,
    onDrop: (acceptedFiles) => {
      setPreview(URL.createObjectURL(acceptedFiles[0]));
      setFile(acceptedFiles[0]);
    },
  });

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isDragActive ? activeStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isDragActive, isDragReject, isDragAccept]
  );

  const nextVehicleIdData = useQuery(GET_NEXT_VEHICLE_ID);

  const onSubmit = (data) => {
    if (!file) {
      console.log("Please add image");
      return;
    }

    // get ext of file
    const extName = path.extname(file.name);
    // rename file with reg_no.extname
    const renameFile = new File([file], `${data.reg_no}${extName}`, {
      type: file.type,
    });

    if (!lastServiceDate) {
      console.log("Select Last Service Date!");
      return;
    }

    //* Form Data
    const formData = {
      ...data,
      last_service_date: DateTime.fromJSDate(lastServiceDate).toISO(),
      mileage: Number.parseInt(data.mileage),
      image: renameFile,
      service_period: Number.parseInt(data.service_period),
    };

    // Mutation
    addVehicle({
      variables: {
        ...formData,
      },
    })
      .then(() => {
        window.location.href("/app/vehicles");
      })
      .catch((err) => {
        // TODO handle error
        console.log(err);
      });
  };

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

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800"
        >
          <div className="flex justify-end pt-4 pb-4">
            <Button
              type="submit"
              to="/app/vehicles/add"
              className="float-right w-1/3 bg-green-400 hover:bg-green-500"
            >
              Add Vehicle
            </Button>
          </div>
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
                <br />
                <HelperText>ex: KN ****</HelperText>
                <Input
                  valid={!errors?.reg_no}
                  {...register("reg_no", {
                    required: "This field is required",
                  })}
                  className="mt-1"
                  placeholder="Enter Vehicle Reg No"
                />
                {errors?.reg_no && (
                  <HelperText valid={false}>
                    {errors?.reg_no?.message}
                  </HelperText>
                )}
              </Label>
              <Label className="mt-4">
                <span>Type</span>
                <Select {...register("type")} className="mt-1">
                  <option>Light</option>
                  <option>Dual Purpose</option>
                  <option>Heavy Duty</option>
                  <option>Two Wheel/ Bikes</option>
                </Select>
              </Label>
              <Label className="mt-4">
                <span>Brand</span>
                <Input
                  {...register("brand")}
                  className="mt-1"
                  placeholder="Vehicle Brand"
                />
                <HelperText>ex: Toyota, Nissan</HelperText>
              </Label>
              <Label className="mt-4">
                <span>Model</span>
                <Input
                  {...register("model")}
                  className="mt-1"
                  placeholder="Vehicle Model"
                />
                <HelperText>ex: Corolla, Prius</HelperText>
              </Label>

              <div className="mt-4">
                <Label className="mt-4">
                  <span>Type</span>
                  <Select {...register("condition")} className="mt-1">
                    <option>Brand New</option>
                    <option>Used</option>
                  </Select>
                </Label>
              </div>

              <Label className="mt-4">
                <span>Mileage</span>
                <HelperText>ex: 20000 km</HelperText>
                <Input
                  valid={!errors?.mileage}
                  {...register("mileage", {
                    required: "This field is required",
                  })}
                  className="mt-1"
                  type="text"
                  placeholder="Mileage"
                />
                {errors?.mileage && (
                  <HelperText valid={!errors?.mileage}>
                    {errors?.mileage?.message}
                  </HelperText>
                )}
              </Label>
            </CardBody>
          </Card>

          <Card className="mt-4">
            <CardBody>
              <SectionTitle>Owner's Information</SectionTitle>
              <Label>
                <span>Owner Name</span>
                <Input
                  {...register("owner_name")}
                  className="mt-1"
                  type="text"
                  placeholder="Full Name"
                />
              </Label>
              <Label className="mt-4">
                <span>Owner Address</span>
                <Input
                  {...register("owner_address")}
                  className="mt-1"
                  type="text"
                  placeholder="Address"
                />
              </Label>
              <Label className="mt-4">
                <span>Owner Mobile</span>
                <Input
                  {...register("owner_mobile")}
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
                  onChange={(date) => {
                    setLastServiceDate(date);
                  }}
                  nextMonthButtonLabel=">"
                  previousMonthButtonLabel="<"
                />
              </Label>
              <Label className="mt-4">
                <span>Service renewal period</span>
                <Input
                  {...register("service_period")}
                  className="mt-1"
                  type="text"
                  placeholder="Months"
                />
                <HelperText>In months</HelperText>
              </Label>
            </CardBody>
          </Card>
          <Card className="mt-4">
            <CardBody>
              <Label className="mb-3">Vehicle Image</Label>
              <section>
                <div {...getRootProps({ style })}>
                  <input {...getInputProps()} />
                  <p>Drag 'n' drop some files here, or click to select files</p>
                </div>
                {preview && (
                  <>
                    <h4 className="mt-2">Preview</h4>
                    <aside className="mt-2" style={thumbsContainer}>
                      <ul>
                        <div style={thumb}>
                          <div style={thumbInner}>
                            <img alt="" src={preview} style={img} />
                          </div>
                        </div>
                      </ul>
                    </aside>
                  </>
                )}
              </section>
            </CardBody>
          </Card>

          <div className="flex justify-end pt-4">
            <Button
              type="submit"
              to="/app/vehicles/add"
              className="float-right w-1/3 bg-green-400 hover:bg-green-500"
            >
              Add Vehicle
            </Button>
          </div>
        </form>
      </div>
    </Fragment>
  );
};

export default AddVehicle;

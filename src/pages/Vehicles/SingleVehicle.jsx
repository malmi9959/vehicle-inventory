import { useMutation, useQuery } from "@apollo/client";
import {
  Badge,
  Button,
  Card,
  CardBody,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
} from "@windmill/react-ui";
import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import PageTitle from "../../components/Typography/PageTitle";
import SectionTitle from "../../components/Typography/SectionTitle";
import { VEHICLE_BY_ID } from "../../graphql/queries";
import { DateTime } from "luxon";
import { DELETE_VEHICLE } from "../../graphql/mutations";
import { useToasts } from "react-toast-notifications";
import Spinner from "../../components/Spinner";

const SingleVehicle = (props) => {
  const { addToast } = useToasts();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const vehicleId = props.match.params.id;
  const { data, loading } = useQuery(VEHICLE_BY_ID, {
    variables: {
      vehicleId: vehicleId,
    },
  });

  function openDeleteModal() {
    setIsDeleteModalOpen(true);
  }

  function closeDeleteModal() {
    setIsDeleteModalOpen(false);
  }

  const [deleteVehicle, { loading: deleteLoading }] =
    useMutation(DELETE_VEHICLE);

  function handleDeleteVehicle() {
    deleteVehicle({
      variables: {
        id: vehicleId,
      },
    })
      .then((data) => {
        addToast(data.data?.deleteVehicle, {
          appearance: "success",
        });
      })
      .then(() => {
        window.location.href = "/app/vehicles/";
      })
      .catch((err) => {
        addToast(err, {
          appearance: "error",
        });
      });
  }

  const lastServiceDate = (date) =>
    DateTime.fromMillis(Number.parseInt(date)).toLocaleString(
      DateTime.DATE_SHORT
    );
  const nextServiceDate = (date, period) =>
    DateTime.fromMillis(Number.parseInt(date))
      .plus({ month: period })
      .toLocaleString(DateTime.DATE_SHORT);

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
              {vehicleId}
            </li>
          </ol>
        </nav>
      </div>

      <div className="flex items-center justify-between">
        <PageTitle>Vehicle ID : {vehicleId}</PageTitle>

        <div>
          <Button
            tag={Link}
            to={`/app/vehicles/update/${vehicleId}`}
            className="mr-3 bg-orange-400 hover:bg-orange-500"
          >
            Update
          </Button>
          <Button
            onClick={openDeleteModal}
            className="bg-red-600 hover:bg-red-500"
          >
            Delete
          </Button>
          <Modal isOpen={isDeleteModalOpen} onClose={closeDeleteModal}>
            <ModalBody>Are you sure want to delete {vehicleId} ?</ModalBody>
            <ModalFooter>
              <div className="block w-full ">
                <Button
                  block
                  size="regular"
                  layout="outline"
                  onClick={closeDeleteModal}
                >
                  Cancel
                </Button>
              </div>
              <div className="block w-full ">
                <Button
                  className="bg-red-600 hover:bg-red-500"
                  block
                  size="regular"
                  onClick={handleDeleteVehicle}
                >
                  {!deleteLoading ? "Delete" : <Spinner />}
                </Button>
              </div>
            </ModalFooter>
          </Modal>
        </div>
      </div>

      <section>
        <Card className="bg-gray-50">
          <CardBody>
            <div className="flex">
              <div className="w-4/12 pr-4">
                <Card className="flex items-center justify-center overflow-hidden text-center h-96">
                  {loading && <div>Loading...</div>}
                  {!loading &&
                  typeof data?.vehicleById?.image === "undefined" ? (
                    <div>No Image</div>
                  ) : (
                    <img src={data?.vehicleById?.image} alt="" />
                  )}
                </Card>
              </div>
              <div className="w-8/12">
                <h2 className="mb-2 text-lg font-semibold text-gray-600 dark:text-gray-300">
                  Vehicle Information
                </h2>
                <Card className="">
                  <CardBody>
                    {!loading && data && data.vehicleById && (
                      <div className="g">
                        <div className="mb-4">
                          <Label>
                            <span className="text-gray-500">Reg No:</span>
                            <div className="py-2 text-lg font-semibold ">
                              {data.vehicleById.reg_no}
                            </div>
                          </Label>
                        </div>
                        <div className="grid grid-cols-3">
                          <div className="mb-4">
                            <Label>
                              <span className="text-gray-500">Type</span>
                              <div className="text-lg font-semibold">
                                {data.vehicleById.type}
                              </div>
                            </Label>
                          </div>
                          <div className="mb-4">
                            <Label>
                              <span className="text-gray-500">Brand</span>
                              <div className="text-lg font-semibold">
                                {data.vehicleById.brand}
                              </div>
                            </Label>
                          </div>
                          <div className="mb-4">
                            <Label>
                              <span className="text-gray-500">Model</span>
                              <div className="text-lg font-semibold">
                                {data.vehicleById.model}
                              </div>
                            </Label>
                          </div>
                        </div>
                        <div className="grid grid-cols-3">
                          <div className="mb-4">
                            <Label>
                              <span className="text-gray-500">Condition</span>
                              <div className="text-lg font-semibold">
                                {data.vehicleById.condition}
                              </div>
                            </Label>
                          </div>
                          <div className="mb-4">
                            <Label>
                              <span className="text-gray-500">Mileage</span>
                              <div className="text-lg font-semibold">
                                {data.vehicleById.mileage}km
                              </div>
                            </Label>
                          </div>
                        </div>
                      </div>
                    )}
                  </CardBody>
                </Card>
              </div>
            </div>
          </CardBody>
        </Card>
      </section>
      <section className="grid grid-cols-2 gap-5 mt-4 mb-10">
        <div>
          <SectionTitle>Owner's Information</SectionTitle>
          {!loading && data && data.vehicleById && (
            <Card>
              <CardBody>
                <div className="mb-4">
                  <Label>
                    <span className="text-gray-500">Owner Name</span>
                    <div className="text-lg font-semibold">
                      {data.vehicleById.owner_name}
                    </div>
                  </Label>
                </div>
                <div className="mb-4">
                  <Label>
                    <span className="text-gray-500">Owner Address</span>
                    <div className="text-lg font-semibold">
                      {data.vehicleById.owner_address}
                    </div>
                  </Label>
                </div>
                <div className="mb-4">
                  <Label>
                    <span className="text-gray-500">Owner Name</span>
                    <div className="text-lg font-semibold">
                      {data.vehicleById.owner_mobile}
                    </div>
                  </Label>
                </div>
              </CardBody>
            </Card>
          )}
        </div>
        <div>
          <SectionTitle>Other</SectionTitle>
          <Card>
            <CardBody>
              <div className="grid grid-cols-2">
                <div className="mb-4">
                  <Label>
                    <span className="text-gray-500">Last Service Date</span>

                    <div className="mt-2">
                      <Badge type="warning">
                        <div className="text-lg font-semibold">
                          {lastServiceDate(
                            data?.vehicleById?.last_service_date
                          )}
                        </div>
                      </Badge>
                    </div>
                  </Label>
                </div>
                <div className="mb-4">
                  <Label>
                    <span className="text-gray-500">Next Service Date</span>
                    <div className="mt-2">
                      <Badge type="success">
                        <div className="text-lg font-semibold">
                          {nextServiceDate(
                            data?.vehicleById?.last_service_date,
                            data?.vehicleById?.service_period
                          )}
                        </div>
                      </Badge>
                    </div>
                  </Label>
                </div>
                <div className="mb-4">
                  <Label>
                    <span className="text-gray-500">Service Period</span>
                    <div className="mt-2">
                      <div className="text-lg font-semibold">
                        {data?.vehicleById?.service_period} Month
                      </div>
                    </div>
                  </Label>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
      </section>
    </Fragment>
  );
};

export default SingleVehicle;

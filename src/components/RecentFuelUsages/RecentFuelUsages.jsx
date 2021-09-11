import { useQuery, useSubscription } from "@apollo/client";
import React, { Fragment, useEffect, useState } from "react";

import { FUEL_USAGES } from "../../graphql/queries";
import { FUEL_ADDED } from "../../graphql/subscribtions";
import { FireIcon } from "../../icons";
import SectionTitle from "../Typography/SectionTitle";
import { DateTime } from "luxon";
import { ChevronUpIcon } from "@heroicons/react/solid";
import { Disclosure } from "@headlessui/react";

const RecentFuelUsages = () => {
  const [fuelUsages, setFuelUsages] = useState([]);
  const { data, loading, refetch } = useQuery(FUEL_USAGES);
  const { data: subData } = useSubscription(FUEL_ADDED, {
    fetchPolicy: "network-only",
  });

  useEffect(() => {
    if (subData && subData.fuelUsageCreated) {
      setFuelUsages([...fuelUsages, subData.fuelUsageCreated]);
      refetch();
    }
  }, [subData]);

  useEffect(() => {
    if (data && data.fuelUsages) {
      setFuelUsages(data.fuelUsages);
    }
  }, [data]);

  return (
    <Fragment>
      <SectionTitle>Recent Fuel Updates</SectionTitle>
      <div>
        <div className="w-full ">
          <div className="w-full p-2 mx-auto bg-white rounded-2xl">
            {loading && <div>Loading...</div>}
            {fuelUsages.length !== 0 &&
              fuelUsages
                .map((item, index) => {
                  return (
                    <Disclosure as="div" className="mb-2" key={index}>
                      {({ open }) => (
                        <>
                          <Disclosure.Button className="flex justify-between w-full px-4 py-2 text-sm font-medium text-left text-blue-900 bg-blue-100 rounded-lg hover:bg-blue-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                            <div className="flex items-center">
                              <div className="w-5 h-5 mr-2">
                                <FireIcon className="text-orange-400" />
                              </div>
                              <span>
                                Fuel Usage Updated - Vehicle{" "}
                                <strong>{item.vehicleId}</strong>
                              </span>
                            </div>
                            <ChevronUpIcon
                              className={`${
                                open ? "transform rotate-180" : ""
                              } w-5 h-5 text-blue-500`}
                            />
                          </Disclosure.Button>
                          <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                            <div className="grid w-full grid-cols-2">
                              <div className="pb-4">
                                <div>Usage</div>
                                <div className="text-lg text-gray-700">
                                  {item.usage}
                                  <span className="font-mono ">l</span>
                                </div>
                              </div>
                              <div className="pb-4">
                                <div>Vehicle ID</div>
                                <div className="text-lg text-gray-700">
                                  {item.vehicleId}
                                </div>
                              </div>
                              <div className="pb-4">
                                <div>Vehicle ID</div>
                                <div className="text-lg text-gray-700">
                                  {item.month}
                                </div>
                              </div>
                              <div className="pb-4">
                                <div>Vehicle ID</div>
                                <div className="text-lg text-gray-700">
                                  {item.year}
                                </div>
                              </div>
                              <div className="pb-4">
                                <div>Updated at</div>
                                <div className="text-lg text-gray-700">
                                  {DateTime.fromMillis(
                                    Number.parseInt(item.createdAt)
                                  ).toLocaleString(DateTime.DATETIME_MED)}
                                </div>
                              </div>
                            </div>
                          </Disclosure.Panel>
                        </>
                      )}
                    </Disclosure>
                  );
                })
                .reverse()}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default RecentFuelUsages;

import { Fragment, useEffect } from "react";
import PageTitle from "../components/Typography/PageTitle";
import { Button, Card, CardBody } from "@windmill/react-ui";
import { EditIcon } from "../icons";
import { useQuery } from "@apollo/client";
import { GET_USER } from "../graphql/queries";

const Profile = () => {
  const { loading, data, error } = useQuery(GET_USER, {
    onError: (error) => {
      console.log(error);
    },
  });

  useEffect(() => {
    console.log(data);
  }, [data]);
  return (
    <Fragment>
      <PageTitle>Profile</PageTitle>

      {loading && !data?.getUser ? (
        <div>Loading..</div>
      ) : (
        <Card className="w-full lg:w-2/3">
          <CardBody>
            <p className="mb-4 font-semibold text-gray-600 dark:text-gray-300">
              Admin Information
            </p>
            <div className="py-4">
              <Card className="mb-6">
                <CardBody className="flex justify-between">
                  <div className="inline-flex items-center">
                    <span className="text-sm text-gray-500">Username: </span>
                    <div className="ml-4">{data?.getUser.username}</div>
                  </div>

                  <Button size="small" iconRight={EditIcon}>
                    Change
                  </Button>
                </CardBody>
              </Card>
              <div className="grid grid-cols-2">
                <div className="pb-9">
                  <div className="text-sm text-gray-500">First Name</div>
                  <div>{data.getUser.firstName}</div>
                </div>
                <div className="pb-9">
                  <div className="text-sm text-gray-500">Last Name</div>
                  <div>{data.getUser.lastName}</div>
                </div>
                <div className="pb-9">
                  <div className="text-sm text-gray-500">Email Address</div>
                  <div>{data.getUser.email}</div>
                </div>
                <div className="pb-9">
                  <div className="text-sm text-gray-500">Phone Number</div>
                  <div>{data.getUser.phone}</div>
                </div>
                <div className="pb-9">
                  <div className="text-sm text-gray-500">Address</div>
                  <div>{data.getUser.address}</div>
                </div>
              </div>
            </div>
          </CardBody>
        </Card>
      )}
    </Fragment>
  );
};

export default Profile;

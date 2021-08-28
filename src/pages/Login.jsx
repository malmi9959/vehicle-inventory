import React from "react";

import { Label, Button, Input } from "@windmill/react-ui";

import { useForm } from "react-hook-form";

import { useMutation } from "@apollo/client";
import { LOGIN } from "../graphql/mutations";
import { setWithExpiry } from "../utils/localStorage";
import { useToasts } from "react-toast-notifications";
import Spinner from "../components/Spinner";
const boxStyles = {
  backdropFilter: "saturate(180%) blur(20px)",
  background: "#0e2433",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  transition: "all .5s cubic-bezier(.68,-.27,.37,1.25) !important",
};

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { addToast } = useToasts();

  const [login, { loading }] = useMutation(LOGIN, {
    onCompleted: (data) => {
      setWithExpiry("user", data.login, data.login.tokenExpiration);
      window.location.replace("/app");
    },
    onError: ({ graphQLErrors }) => {
      const { message } = graphQLErrors[0];
      addToast(message, {
        appearance: "error",
      });
    },
  });

  function errorHandle(error) {
    if (error && error.type === "required") {
      return (
        <div className="capitalize ">
          {error.ref && error.ref.name} is required
        </div>
      );
    } else if (error && error.type === "pattern") {
      return (
        <div className="capitalize ">
          Enter Valid {error.ref && error.ref.name}
        </div>
      );
    }
    return;
  }

  const onSubmit = (data) => {
    login({
      variables: { email: data.email, password: data.password },
    })
      .then(() => {})
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="flex items-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
      <div className="flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-800">
        <div className="flex flex-col overflow-y-auto md:flex-row">
          <div style={boxStyles} className="h-32 md:h-auto md:w-1/2 ">
            <div className="text-2xl uppercase text-primary-light">
              AMD Learners
            </div>
            <div className="text-white">Vehicle Inventory</div>
          </div>
          <main className="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
            <div className="w-full">
              <h1 className="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200">
                Login
              </h1>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Label>
                  <div className="flex items-baseline justify-between">
                    <span>Email</span>
                    <span className="text-xs text-red-500">
                      {errors && errors.email?.message}
                    </span>
                  </div>
                  <Input
                    {...register("email", {
                      required: "Email Required",
                      pattern:
                        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                    })}
                    className="mt-1"
                    type="text"
                    placeholder="john@doe.com"
                  />
                  <div className="pt-2 text-sm text-red-500">
                    {errorHandle(errors.email)}
                    {/* <span>{errors?.name && "This field is required!"}</span> */}
                  </div>
                </Label>

                <Label className="mt-4">
                  <div className="flex items-baseline justify-between">
                    <span>Password</span>
                    <span className="text-xs text-red-500">
                      {errors && errors.password?.message}
                    </span>
                  </div>
                  <Input
                    {...register("password", { required: "Password Required" })}
                    className="mt-1"
                    type="password"
                    placeholder="***************"
                  />
                </Label>

                <Button
                  type="submit"
                  layout="primary"
                  className="mt-4"
                  block
                  to="/app"
                >
                  {loading ? <Spinner /> : "Log in"}
                </Button>
              </form>

              {/* <hr className="my-8" /> */}

              {/* <p className="mt-4">
                <Link
                  className="text-sm font-medium text-dark dark:text-purple-400 hover:underline"
                  to="/forgot-password"
                >
                  Forgot your password?
                </Link>
              </p> */}
              {/* <p className="mt-1">
                <Link
                  className="text-sm font-medium text-dark dark:text-purple-400 hover:underline"
                  to="/create-account"
                >
                  Create account
                </Link>
              </p> */}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Login;

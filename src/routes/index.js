import { lazy } from "react";
import Dashboard from "../pages/Dashboard";
import FuelConsumptions from "../pages/FuelConsumptions";
import AddVehicle from "../pages/Vehicles/AddVehicle";
import SingleVehicle from "../pages/Vehicles/SingleVehicle";
import UpdateVehicle from "../pages/Vehicles/UpdateVehicle";
const Profile = lazy(() => import("../pages/Profile"));
const Vehicles = lazy(() => import("../pages/Vehicles"));
const Page404 = lazy(() => import("../pages/404"));

const routes = [
  {
    path: "/dashboard",
    component: Dashboard,
  },
  {
    path: "/vehicles",
    component: Vehicles,
  },
  {
    path: "/vehicles/update/:id",
    component: UpdateVehicle,
  },
  {
    path: "/vehicles/add",
    component: AddVehicle,
  },
  {
    path: "/fuel-consumptions",
    component: FuelConsumptions,
  },
  {
    path: "/vehicle/:id",
    component: SingleVehicle,
  },
  {
    path: "/profile",
    component: Profile,
  },
  {
    path: "/404",
    component: Page404,
  },
];

export default routes;

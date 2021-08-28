import { lazy } from "react";
import SingleVehicle from "../pages/Vehicles/SingleVehicle";
const Profile = lazy(() => import("../pages/Profile"));
const Vehicles = lazy(() => import("../pages/Vehicles"));
const Page404 = lazy(() => import("../pages/404"));

const routes = [
  {
    path: "/vehicles",
    component: Vehicles,
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

import { lazy } from "react";
import Profile from "../pages/Profile";
const Page404 = lazy(() => import("../pages/404"));

const routes = [
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

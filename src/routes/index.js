import { lazy } from "react";
const Page404 = lazy(() => import("../pages/404"));

const routes = [
  {
    path: "/404",
    component: Page404,
  },
];

export default routes;

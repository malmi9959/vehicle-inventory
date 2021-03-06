import React from "react";
import routes from "../../routes/sidebar";
import { NavLink, Route } from "react-router-dom";
import * as Icons from "../../icons";
import SidebarSubmenu from "./SidebarSubmenu";
// import { Button } from "@windmill/react-ui";

function Icon({ icon, ...props }) {
  const Icon = Icons[icon];
  return <Icon {...props} />;
}

const boxStyles = {
  backdropFilter: "saturate(180%) blur(20px)",
  // background: "rgba(11, 39, 25, 1)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  transition: "all .5s cubic-bezier(.68,-.27,.37,1.25) !important",
};

function SidebarContent() {
  return (
    <div className="py-0 text-gray-500 dark:text-gray-400">
      <div style={boxStyles} className="w-full py-6 bg-primary-light">
        <a
          className="text-xl font-light text-gray-800 dark:text-gray-200"
          href="/#"
        >
          <h2 className="uppercase ">
            <span className="font-semibold">Vehicle</span> Learners
          </h2>
        </a>
      </div>

      <ul className="mt-6">
        {routes.map((route) =>
          route.routes ? (
            <SidebarSubmenu route={route} key={route.name} />
          ) : (
            <li className="relative px-6 py-3" key={route.name}>
              <NavLink
                exact
                to={route.path}
                className="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200"
                activeClassName="text-gray-800 dark:text-gray-100"
              >
                <Route path={route.path} exact={route.exact}>
                  <span
                    className="absolute inset-y-0 left-0 w-1 rounded-tr-lg rounded-br-lg bg-primary"
                    aria-hidden="true"
                  ></span>
                </Route>
                <Icon
                  className="w-5 h-5"
                  aria-hidden="true"
                  icon={route.icon}
                />
                <span className="ml-4">{route.name}</span>
              </NavLink>
            </li>
          )
        )}
      </ul>
      {/* <div className="px-6 my-6">
        <Button>
          Create account
          <span className="ml-2" aria-hidden="true">
            +
          </span>
        </Button>
      </div> */}
    </div>
  );
}

export default SidebarContent;

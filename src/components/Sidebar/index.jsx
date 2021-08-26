import React, { Fragment } from "react";

import DesktopSidebar from "./DesktopSidebar";
import MobileSidebar from "./MobileSidebar";

function Sidebar() {
  return (
    <Fragment>
      <DesktopSidebar />
      <MobileSidebar />
    </Fragment>
  );
}

export default Sidebar;

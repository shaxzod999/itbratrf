import { Outlet } from "react-router-dom";

import "./css/custom.css";

export default function CenterMenu() {
  return (
    <div className="w-full md:py-4">
      <div className="md:h-[calc(100vh-140px)] w-full ">
        <Outlet />
      </div>
    </div>
  );
}

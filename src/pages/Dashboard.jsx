import React from "react";
import { Outlet } from "react-router-dom";
import logo from "../assets/logo-h.png";
import Avatar from "@mui/material/Avatar";
import { Link } from "react-router-dom";

function Dashboard() {
  return (
    <div>
      <div className="p-2 bg-slate-200 flex items-center justify-between ">
        <div className="w-[10%]">
          <img src={logo} className="w-[50px] mix-blend-multiply" alt="" />
        </div>
        <div className="flex gap-5 w-[60%] font-semibold">
          <Link>Hospitals</Link>
          <Link>Doctors</Link>
          <Link>Help</Link>
        </div>
        <div className="w-[10%] flex justify-center">
          <Avatar>H</Avatar>
        </div>
      </div>
      <Outlet />
    </div>
  );
}

export default Dashboard;

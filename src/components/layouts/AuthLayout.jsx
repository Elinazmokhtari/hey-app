import React from "react";
import { Outlet } from "react-router";


export default function AuthLayout() {
  return (
    <div className="h-screen w-full flex p-4 ">
      <div className="bg-white p-4 w-[400px] m-auto rounded-2xl flex flex-col ">
        <div className="flex justify-between ">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

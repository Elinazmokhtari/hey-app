import React, { useState } from "react";
import { Outlet } from "react-router";
import SideBar from "../SideBar";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Bars3BottomRightIcon } from "@heroicons/react/20/solid";

export default function MainLayout() {
  const [isOpen, setIsOpen] = useState(false);

  function handleStatus() {
    setIsOpen(!isOpen);
  }

  return (
    <div className="max-w-[1000px] h-screen m-auto p-4">
      <div className=" flex justify-between gap-4 h-full">
        <div className="bg-white w-[280px] p-4 hidden md:flex rounded-xl">
          <SideBar />
        </div>

        <div className="bg-white flex-1 rounded-xl overflow-hidden p-4 relative flex flex-col">
          <div
            className=" px-4  absolute z-30  right-0 md:hidden"
            onClick={handleStatus}
          >
            {isOpen ? (
              <XMarkIcon className="size-8" />
            ) : (
              <Bars3BottomRightIcon className="size-8" />
            )}
          </div>
          {isOpen ? (
            <div className="absolute top-0 left-0 w-full h-full bg-white p-4 overflow-hidden  block md:hidden">
              <SideBar />
            </div>
          ) : null}
          <Outlet />
        </div>
      </div>
    </div>
  );
}

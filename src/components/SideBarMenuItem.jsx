import React from "react";
import { NavLink } from "react-router";

export default function SideBarMenuItem(props) {
  return (
    <NavLink className={"text-lg py-2 px-4 rounded-lg flex items-center gap-2"} to={props.path}>
     
        {props.icon}

        <p>{props.name}</p>
   
    </NavLink>
  );
}

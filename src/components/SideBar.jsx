import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import userImg from "../assets/img/user.png";
import PopularCard from "./PopularCard";
import SideBarMenuItem from "./SideBarMenuItem";
import {
    HomeIcon,
    UserIcon,
    ArrowLeftStartOnRectangleIcon,
} from "@heroicons/react/24/outline";
import { API } from "../utils/path";
import userSlice from "../redux/slices/userSlice";

function SideBar() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.userSlice.user);
    const [popularData, setPopularData] = useState(undefined);
    console.log(popularData);

    const token = localStorage.getItem("hey-token");

    useEffect(() => {
        fetch(API.populartweets, {
            method: "get",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                authorization: `Bearer ${token}`,
            },
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                } else {
                    console.log("res err");
                }
            })
            .then((data) => {
                console.log(data);
                setPopularData(data);
            })
            .then((err) => {
                console.log(err);
            });
    }, []);

    return (
        <div className="w-full h-full overflow-hidden flex flex-col  ">
            <div className="mb-3 flex md:justify-center justify-start ">
                <p className="font-bold text-2xl text-amber-400 text-center">
                    Hey <span>&#128075;</span>
                </p>
            </div>

            <div className="border-t-[1px] border-b-[1px]  border-gray-200 flex gap-2 py-2">
                <img className="size-12" src={userImg} alt="" />
                <div>
                    <p className="leading-6">{user.name}</p>
                    <p className="text-gray-400 text-[14px]">{user.email}</p>
                </div>
            </div>

            <div className="my-2 border-b-[1px] border-gray-200">
                <p className="mb-2 text-[14px] text-gray-400">Menu</p>
                <div className="flex flex-col gap-2 mb-3">
                    <SideBarMenuItem
                        name={"Home"}
                        icon={<HomeIcon className="size-6" />}
                        path={"/"}
                    />
                    <SideBarMenuItem
                        name={"Profile"}
                        icon={<UserIcon className="size-6" />}
                        path={"/profile"}
                    />
                    <div
                        onClick={() => {
                            dispatch(userSlice.actions.handleSaveUser(null));
                            localStorage.removeItem("hey-token");
                        }}
                    >
                        <SideBarMenuItem
                            name={"Logout"}
                            icon={
                                <ArrowLeftStartOnRectangleIcon className="size-6" />
                            }
                            path={"/logout"}
                        />
                    </div>
                </div>
            </div>

            <div className="overflow-auto no-scroll flex-1 h-full w-full">
                <div>
                    <p className="text-[14px] text-gray-400">Popular Tweets</p>
                </div>
                {popularData === undefined
                    ? "loader"
                    : popularData.map((item) => {
                          return <PopularCard key={item.id} item={item} />;
                      })}
            </div>
        </div>
    );
}

export default SideBar;

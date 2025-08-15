import React from "react";
import { useSelector } from "react-redux";
import moment from "moment/moment";

export default function Profile() {
    const user = useSelector((state) => state.userSlice.user);
    return (
        <div className="text-2xl w-full h-full ">
            <div className="text-2xl font-bold leading-6 mb-4">Profile</div>
            <div className="text-[17px] flex flex-col gap-2">
                <p>
                    Name: <span>{user.name}</span>{" "}
                </p>
                <p>
                    Email: <span>{user.email}</span>{" "}
                </p>
                <p>
                    Joined: <span>{moment(user.created_at).fromNow()}</span>
                </p>
            </div>
        </div>
    );
}

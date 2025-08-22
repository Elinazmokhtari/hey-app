import React, { useEffect, useState } from "react";
import SideBar from "../components/SideBar";
import TweetsCard from "../components/TweetsCard";
import Button from "../components/ui/Button";
import { PencilIcon } from "@heroicons/react/24/outline";
import { NavLink } from "react-router";

function Home() {
    const [tweets, setTweets] = useState([]);
    const token = localStorage.getItem("hey-token");

    useEffect(() => {
        fetch("https://hey.mahdisharifi.dev/api/tweets", {
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
                setTweets(data.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);
    return (
        <div className="h-full w-full flex flex-col overflow-hidden">
            <div>
                <p className="text-2xl font-bold mb-4">Recent Tweets</p>
            </div>
            <div className="mb-4">
                <NavLink to={"/createtweet"}>
                    <Button lable={"What's in your mind ?"} />
                </NavLink>
            </div>
            <div className="flex-1 flex flex-col overflow-auto no-scroll">
                {tweets.map((tweet, index) => {
                    return (
                        <TweetsCard key={index} className="" tweet={tweet} />
                    );
                })}
            </div>
        </div>
    );
}

export default Home;

import moment from "moment";
import React, { useState } from "react";
import userIcon from "../assets/img/user.png";
import {
    ChatBubbleBottomCenterTextIcon,
    HeartIcon,
    PencilSquareIcon,
    TrashIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router";
import { useSelector } from "react-redux";

export default function TweetsCard(props) {
    const user = useSelector((state) => state.userSlice.user);
    const token = localStorage.getItem("hey-token");
    const [loading, setLoading] = useState(false);

    function handleDeleteTweet() {
        setLoading(true);
        fetch(`https://hey.mahdisharifi.dev/api/tweets/${props.tweet.id}`, {
            method: "delete",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                authorization: `Bearer ${token}`,
            },
        })
            .then((res) => {
                if (res.ok) {
                    props.onTweetDelete(props.tweet.id);
                    return res.json();
                } else {
                    return console.log("error in tweet card ");
                }
            })
            .finally(() => {
                setLoading(false);
            });
    }

    return (
        <Link to={`/tweet/${props.tweet.id}`}>
            <div className="w-full p-4 border border-gray-300 rounded-lg mb-4  ">
                <div className="w-full flex justify-between flex-wrap ">
                    <div className="flex items-center gap-2">
                        <img className="size-8" src={userIcon} alt="" />
                        <div className="">
                            <p>{props.tweet.user.name}</p>

                            <div className="flex gap-2 items-center flex-wrap ">
                                <p className="text-[14px] leading-5 text-gray-400">
                                    {moment(props.tweet.created_at).fromNow()}
                                </p>
                                <p className="text-amber-500 text-[12px]">
                                    {props.tweet.category}
                                </p>
                                {user.id === props.tweet.user.id ? (
                                    <div className="flex gap-1">
                                        <TrashIcon
                                            className={`size-5 text-red-500 cursor-pointer ${
                                                loading ? "opacity-50" : ""
                                            }`}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                e.stopPropagation();
                                                if (!loading) {
                                                    handleDeleteTweet();
                                                }
                                            }}
                                        />
                                        <PencilSquareIcon className="size-5 text-gray-500" />
                                    </div>
                                ) : (
                                    ""
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="flex  gap-2 h-full ">
                        <div className="size-8 flex items-center gap-1  ">
                            <HeartIcon />
                            <span>{props.tweet.likes_count}</span>
                        </div>
                        <div className="size-8 flex items-center gap-1">
                            <ChatBubbleBottomCenterTextIcon />
                            <span>{props.tweet.replies_count}</span>
                        </div>
                    </div>
                </div>
                <div className="mt-4">
                    <p className="text-[14px] leading-5 text-gray-700">
                        {props.tweet.content}
                    </p>
                </div>
            </div>
        </Link>
    );
}

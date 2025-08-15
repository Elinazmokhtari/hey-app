import moment from "moment";
import React from "react";
import userIcon from "../assets/img/user.png";
import {
    ChatBubbleBottomCenterTextIcon,
    HeartIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router";

export default function TweetsCard(props) {
    return (
        <Link to={`/tweet/${props.tweet.id}`}>
            <div className="w-full p-4 border border-gray-300 rounded-lg mb-4  ">
                <div className="w-full flex justify-between flex-wrap">
                    <div className="flex items-center gap-2 ">
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
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-2   ">
                        <div className="size-5 ">
                            <HeartIcon />
                            <span>{props.tweet.likes_count}</span>
                        </div>
                        <div className="size-5">
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

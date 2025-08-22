import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import TweetsCard from "../components/TweetsCard";
import Button from "../components/ui/Button";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

export default function SingleTweet() {
    const schema = yup
        .object({
            content: yup.string().required(),
        })
        .required();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    const param = useParams();
    const token = localStorage.getItem("hey-token");
    const [tweet, setTweet] = useState(undefined);
    const navigate = useNavigate();

    useEffect(() => {
        handleGetTweet();
    }, []);

    function handleGetTweet() {
        fetch(`https://hey.mahdisharifi.dev/api/tweets/${param.id}`, {
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
                    console.log("error single tweet");
                }
            })
            .then((data) => {
                setTweet(data);
                console.log(data);
            });
    }

    const onSubmit = (data) => {
        fetch("https://hey.mahdisharifi.dev/api/tweets", {
            method: "post",
            body: JSON.stringify({
                tweet_id: tweet.id,
                category: tweet.category,
                content: data.content,
            }),

            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                authorization: `Bearer ${token}`,
            },
        })
            .then((res) => {
                if (res.ok) {
                    handleGetTweet();
                    return res.json();
                } else {
                    console.log("tweet not created");
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };
    return (
        <div>
            <p className="text-2xl font-bold leading-6 mb-4">Tweet</p>
            {tweet ? (
                <div className="">
                    <TweetsCard
                        tweet={tweet}
                        onTweetDelete={(id) => {
                            console.log(id, "single");
                            navigate("/");
                        }}
                    />
                    <form action="" onSubmit={handleSubmit(onSubmit)}>
                        <h1 className="text-2xl font-bold leading-6 mb-4">
                            Reply
                        </h1>
                        <div className="mb-4 gap-4 flex flex-col">
                            <p>content</p>
                            <textarea
                                className="w-full p-4 border border-gray-300 rounded-lg "
                                name=""
                                id=""
                                rows={5}
                                {...register("content")}
                            ></textarea>
                            {errors.conetnt?.message}
                            <Button type="submit" lable={"Create Twwet"} />
                        </div>
                    </form>

                    <h1 className="text-2xl font-bold leading-6 mb-4">
                        Replies
                    </h1>
                    {tweet.replies.length === 0
                        ? "no replies"
                        : tweet.replies.map((item, index) => {
                              return (
                                  <TweetsCard
                                      key={index}
                                      tweet={item}
                                      onTweetDelete={(id) => {
                                          console.log(id, "reply");
                                          handleGetTweet();
                                      }}
                                  />
                              );
                          })}
                </div>
            ) : (
                "loading"
            )}
        </div>
    );
}

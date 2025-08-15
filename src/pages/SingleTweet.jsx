import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import TweetsCard from "../components/TweetsCard";

export default function SingleTweet() {
    const params = useParams();
    const token = localStorage.getItem("hey-token");
    const [tweet, setTweet] = useState(undefined);

    useEffect(() => {
        fetch(`https://hey.mahdisharifi.dev/api/tweets/${params.id}`, {
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
                    console.log("single tweet response error");
                }
            })
            .then((data) => {
                setTweet(data);
                // console.log(data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return (
        <div>
            <div className="text-2xl font-bold leading-6 mb-4">tweets</div>
            {tweet ? (
                <div>
                    <TweetsCard tweet={tweet} />
                    <p className="text-2xl font-bold leading-6 mb-4 mt-4">
                        Replies
                    </p>
                    {tweet.replies.map((item, index) => {
                        return <TweetsCard key={index} tweet={item} />;
                    })}
                </div>
            ) : (
                "loading"
            )}
        </div>
    );
}

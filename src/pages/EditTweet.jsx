import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Button from "../components/ui/Button";
import { useNavigate, useParams } from "react-router";
import { API } from "../utils/path";

const schema = yup
    .object({
        category: yup.string().required(),
        content: yup.string().required(),
    })
    .required();

export default function EditTweet() {
    const params = useParams();
    const navigate = useNavigate();
    const [category, setCategorise] = useState([]);
    const token = localStorage.getItem("hey-token");
    const [loading, setLoading] = useState(true);
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: async () => {
            const response = await fetch(API.singletweet(params.id), {
                method: "get",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    authorization: `Bearer ${token}`,
                },
            });
            const data = await response.json();
            setLoading(false);
            return {
                category: data.category,
                content: data.content,
            };
        },
    });

    useEffect(() => {
        fetch(API.categories, {
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
                    console.log("category res error");
                }
            })
            .then((data) => {
                console.log(data);
                setCategorise(data);
            })
            .catch((err) => console.log(err));
    }, []);

    const onSubmit = (data) => {
        return fetch(API.edittweet(params.id), {
            method: "PATCH",
            body: JSON.stringify({
                category: data.category,
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
                    navigate("/");
                    return res.json();
                } else {
                    console.log("err in create tweet response");
                }
            })
            .then((data) => {
                console.log(data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <>
            <div className="text-2xl font-bold leading-6 mb-4">
                Edit Your Tweet
            </div>
            {loading ? (
                "loading"
            ) : (
                <form action="" onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col gap-2 ">
                            <label
                                className="text-[14px] text-[#6b7280]"
                                htmlFor="category"
                            >
                                Category
                            </label>
                            <select
                                className="w-full p-2 border border-gray-300 rounded-lg "
                                name=""
                                id=""
                                {...register("category")}
                            >
                                <option value={""}>choose...</option>
                                {category.map((item, index) => {
                                    return (
                                        <option
                                            key={index}
                                            value={item}
                                            className="w-full bg-amber-300"
                                        >
                                            {item}
                                        </option>
                                    );
                                })}
                            </select>
                            {errors.category?.message ? (
                                <span className="text-red-500">
                                    {errors.category.message}
                                </span>
                            ) : null}
                        </div>
                        <div className=" flex flex-col gap-2">
                            <label className="text-[14px] text-[#6b7280]">
                                Content
                            </label>
                            <textarea
                                className="w-full p-4 border border-gray-300 rounded-lg "
                                name=""
                                id=""
                                rows={5}
                                {...register("content")}
                            ></textarea>
                            {errors.content?.message ? (
                                <span className="text-red-500">
                                    {errors.content.message}
                                </span>
                            ) : null}
                        </div>
                        <Button
                            type="submit"
                            lable={"Edit tweet"}
                            disabled={isSubmitting}
                        />
                    </div>
                </form>
            )}
        </>
    );
}

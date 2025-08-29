import React from "react";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import { Link } from "react-router";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router";
import { API } from "../utils/path";

const schema = yup
    .object({
        name: yup.string().min(3).max(20).required(),
        email: yup.string().email().required(),
        password: yup.string().min(8).required(),
        passwordConfirmation: yup
            .string()
            .oneOf(
                [yup.ref("password"), null],
                "Password and confirmation must be the same"
            )
            .required(),
    })
    .required();

function Register() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    let navigate = useNavigate();

    const onSubmit = (data) => {
        fetch(API.register, {
            method: "post",
            body: JSON.stringify({
                email: data.email,
                name: data.name,
                password: data.password,
                password_confirmation: data.passwordConfirmation,
            }),
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
            })
            .then((data) => {
                navigate("/login");
                console.log(data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <div className="flex flex-col w-full">
            <div className="flex justify-between mb-4">
                <p className="text-[18px]">Register</p>
                <div className="font-bold text-2xl text-amber-400">
                    Hey <span>&#128075;</span>
                </div>
            </div>
            <div className="flex flex-col">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-4">
                        <Input
                            lable={"Name"}
                            placeholder={"Enter your name"}
                            {...register("name")}
                            error={errors.name?.message}
                        />
                    </div>
                    <div className="mb-4">
                        <Input
                            lable={"Email"}
                            placeholder={"Enter your email"}
                            {...register("email")}
                            error={errors.email?.message}
                        />
                    </div>
                    <div className="mb-4">
                        <Input
                            lable={"Password"}
                            placeholder={"Enter your password"}
                            type="password"
                            {...register("password")}
                            error={errors.password?.message}
                        />
                    </div>
                    <div className="mb-4">
                        <Input
                            lable={"Password confirmation"}
                            placeholder={"Enter your password confirmation"}
                            type="password"
                            {...register("passwordConfirmation")}
                            error={errors.passwordConfirmation?.message}
                        />
                    </div>
                    <Button type="submit" lable={"Register"} />
                    <Link
                        to={"/login"}
                        className="flex justify-center mt-4 text-amber-400"
                        href=""
                    >
                        You already have an account ?
                    </Link>
                </form>
            </div>
        </div>
    );
}

export default Register;

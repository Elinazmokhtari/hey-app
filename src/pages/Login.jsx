import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import { Link } from "react-router";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import userSlice from "../redux/slices/userSlice";
import { API } from "../utils/path";

const schema = yup
    .object({
        email: yup.string().email().required(),
        password: yup.string().min(8).required(),
    })
    .required();

function Login() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.userSlice.user);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });
    const onSubmit = (data) => {
        fetch(API.login, {
            method: "post",
            body: JSON.stringify({
                email: data.email,
                password: data.password,
            }),

            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                } else {
                    console.log("your email or password is incorrect");
                }
            })
            .then((data) => {
                localStorage.setItem("hey-token", data.token);
                fetch(API.me, {
                    method: "Get",
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                        authorization: `Bearer ${data.token}`,
                    },
                })
                    .then((res) => {
                        if (res.ok) {
                            return res.json();
                        } else {
                            console.log("err");
                        }
                    })
                    .then((data) => {
                        console.log(data);
                        dispatch(userSlice.actions.handleSaveUser(data));
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <div className="flex flex-col w-full">
            <div className="flex justify-between mb-4">
                <p className="text-[18px]">Login</p>
                <div className="font-bold text-2xl text-amber-400">
                    Hey <span>&#128075;</span>
                </div>
            </div>
            <div className="flex flex-col ">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-4">
                        <Input
                            lable={"Email"}
                            placeholder={"Enter your email"}
                            type={"text"}
                            {...register("email")}
                            error={errors.email?.message}
                        />
                    </div>
                    <div className="mb-4">
                        <Input
                            lable={"Password"}
                            placeholder={"Enter your password"}
                            type={"password"}
                            {...register("password")}
                            error={errors.password?.message}
                        />
                    </div>
                    <Button type="submit" lable={"Login"} />
                    <Link
                        to={"/register"}
                        className="flex justify-center mt-4 text-amber-400"
                        href=""
                    >
                        You dont have an account?
                    </Link>
                </form>
            </div>
            {user ? user.name : null}
        </div>
    );
}

export default Login;

import { Route, Routes } from "react-router";
import AuthLayout from "./components/layouts/AuthLayout";
import Login from "./pages/login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import userSlice from "./redux/slices/userSlice";
import { Navigate } from "react-router";
import MainLayout from "./components/layouts/MainLayout";
import Profile from "./pages/Profile";
import CreateTweet from "./pages/CreateTweet";
import SingleTweet from "./pages/SingleTweet";

function App() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.userSlice.user);

    console.log(user);
    useEffect(() => {
        const token = localStorage.getItem("hey-token");
        if (token) {
            fetch("https://hey.mahdisharifi.dev/api/auth/me", {
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
                        dispatch(userSlice.actions.handleSaveUser(null));
                    }
                })
                .then((data) => {
                    dispatch(userSlice.actions.handleSaveUser(data));
                })
                .catch((err) => {
                    console.log(err);
                });
        } else {
            dispatch(userSlice.actions.handleSaveUser(null));
        }
    }, []);

    if (user === undefined) {
        return <p>loading</p>;
    }

    if (user === null) {
        return (
            <Routes>
                <Route element={<AuthLayout />}>
                    <Route path="*" element={<Navigate to={"/login"} />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                </Route>
            </Routes>
        );
    }

    if (user) {
        return (
            <Routes>
                <Route path="*" element={<Navigate to={"/"} />} />
                <Route element={<MainLayout />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/createtweet" element={<CreateTweet />} />
                    <Route path="/tweet/:id" element={<SingleTweet />} />
                </Route>
            </Routes>
        );
    }
}

export default App;

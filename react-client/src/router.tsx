import { createBrowserRouter } from "react-router-dom";
import Login from "./views/auth/login.tsx";
import Register from "./views/auth/register.tsx";
import DefaultLayout from "./components/defaultLayout.tsx";
import GuestLayout from "./components/guestLayout.tsx";
import Users from "./views/user/users.tsx";
import Posts from "./views/post/posts.tsx";
import UserForm from "./views/user/userForm.tsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <DefaultLayout />,
        children: [
            {
                path: "/users",
                element: <Users />,
            },
            {
                path: "/users/new",
                element: <UserForm key="userCreate" />,
            },
            {
                path: "/users/:id",
                element: <UserForm key="userUpdate" />,
            },
        ],
    },

    {
        path: "/",
        element: <GuestLayout />,
        children: [
            {
                path: "/login",
                element: <Login />,
            },
            {
                path: "/register",
                element: <Register />,
            },
            {
                path: "/posts",
                element: <Posts />,
            },
        ],
    },
]);

export default router;

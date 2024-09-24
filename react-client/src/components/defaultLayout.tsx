import { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import axiosClient from "../axiosClient";
import { useStateContext } from "../contexts/contextProvider";

export default function DefaultLayout() {
    const { user, token, setUser, setToken } = useStateContext();
    if (!token) {
        return <Navigate to="/login" />;
    }

    const onLogout = (ev) => {
        ev.preventDefault();
        axiosClient.get("/logout").then(({}) => {
            setUser(null);
            setToken(null);
        });
    };

    useEffect(() => {
        axiosClient.get("/user").then(({ data }) => {
            setUser(data);
        });
    }, []);

    let isAdmin = false;
    if (user.roles) {
        isAdmin = user.roles.includes("admin");
    }

    return (
        <div id="defaultLayout">
            <div className="content">
                <header>
                    <div>Blog</div>
                    <div>
                        {user.name}
                        {isAdmin && (
                            <a href="/users" className="btn-logout">
                                {" "}
                                Users
                            </a>
                        )}
                        <a href="#" onClick={onLogout} className="btn-logout">
                            {" "}
                            Logout
                        </a>
                    </div>
                </header>
                <main>
                    <Outlet />
                </main>
            </div>
        </div>
    );
}

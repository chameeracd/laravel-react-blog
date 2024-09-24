import { useRef } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../../axiosClient";
import { useStateContext } from "../../contexts/contextProvider";

export default function login() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const [errors, setErrors] = useState(null);

    const { setUser, setToken } = useStateContext();

    const Submit = (ev) => {
        ev.preventDefault();
        const payload = {
            email: emailRef.current.value,
            password: passwordRef.current.value,
        };
        axiosClient
            .post("/login", payload)
            .then(({ data }) => {
                setUser(data.user);
                setToken(data.token);
            })
            .catch((err) => {
                const response = err.response;
                if (response && response.status === 422) {
                    setErrors(response.data.errors);
                }
            });
    };

    return (
        <div className="login-signup-form animated fadeinDown">
            <div className="form">
                <h1 className="title">Login To Your Account</h1>
                {errors && (
                    <div className="alert">
                        {Object.keys(errors).map((key) => (
                            <p key={key}>{errors[key][0]}</p>
                        ))}
                    </div>
                )}
                <form onSubmit={Submit}>
                    <input ref={emailRef} type="email" placeholder="Email" />
                    <input
                        ref={passwordRef}
                        type="password"
                        placeholder="Password"
                    />
                    <button className="btn btn-block">Login</button>
                    <p className="message">
                        Not Registered?{" "}
                        <Link to="/register">Create a new account</Link>
                    </p>
                </form>
            </div>
        </div>
    );
}

import React, { useState } from "react";
import './login.css';
import Cookies from "js-cookie";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = ({ currState, setCurrState, setcheck }) => {
    
    const url = "http://localhost:8008";
    const navigate = useNavigate();

    const [data, setData] = useState({
        name: "",
        email: "",
        password: ""
    });

    const [token, setToken] = useState("");

    function onChangeHandler(e) {
        const name = e.target.name;
        const value = e.target.value;
        setData(prev => ({
            ...prev, [name]: value
        }));
    }

    const onLogin = async (e) => {
        e.preventDefault();
        console.log("Form data submitted:", data);
        
        let newUrl = url;
        if (currState === "Login") {
            newUrl += "/api/user/login";
        } else {
            newUrl += "/api/user/register";
        }

        try {
            const response = await axios.post(newUrl, data);
            if (response.data.success) {
                Cookies.set("token", response.data.token);
                toast.success("Log in successful!");
                setToken(response.data.token);
                navigate("/web", { state: { see: setcheck } });
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error("An error occurred during the request.");
        }
    }

    return (
        <div id="login-form">
            <form onSubmit={onLogin} className="login-popup-container">
                <div className="login-popup-inputs">
                    <h1>{currState === "Login" ? "Log in" : "Sign Up"}</h1>
                    {currState === "Sign Up" && (
                        <input
                            name="name"
                            onChange={onChangeHandler}
                            value={data.name}
                            type="text"
                            placeholder="Your name"
                            required
                        />
                    )}
                    <input
                        name="email"
                        onChange={onChangeHandler}
                        value={data.email}
                        type="email"
                        placeholder="Your email"
                        required
                    />
                    <input
                        name="password"
                        onChange={onChangeHandler}
                        value={data.password}
                        type="password"
                        placeholder="Password"
                        required
                    />
                </div>
                <button type="submit">{currState === "Login" ? "Login" : "Create account"}</button>
                <div className="login-popup-condition">
                    <input type="checkbox" name="" id="" required />
                    <p>By continuing, I agree to the terms of use & privacy policy.</p>
                </div>
                {currState === "Login" ? (
                    <p>
                        Create a new account?{" "}
                        <span onClick={() => setCurrState("Sign Up")} style={{ cursor: "pointer" }}>Click here</span>
                    </p>
                ) : (
                    <p>
                        Already have an account?{" "}
                        <span onClick={() => setCurrState("Login")} style={{ cursor: "pointer" }}>Login here</span>
                    </p>
                )}
            </form>
        </div>
    )
}

export default Login;

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import styles from "./Login.module.css";

import { login } from "../services/api";

function Login() {

    const navigate = useNavigate();

    const [form, setForm] = useState({
        username: "",
        password: ""
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {

        setForm({
            ...form,
            [e.target.name]: e.target.value
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            setLoading(true);

            const res = await login(form);

            if (res.data.success) {

                localStorage.setItem("user", JSON.stringify(res.data));

                navigate("/dashboard");

            } else {

                alert(res.data.message);

            }

        } catch (err) {

            alert("Server Error",err);

        } finally {

            setLoading(false);

        }

    };

    return (

        <div className={styles.container}>

            <div className={styles.card}>

                <h1>School Management</h1>

                <p>Login to Continue</p>

                <form onSubmit={handleSubmit}>

                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        value={form.username}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={form.password}
                        onChange={handleChange}
                        required
                    />

                    <button disabled={loading}>

                        {loading ? "Logging In..." : "Login"}

                    </button>

                </form>

            </div>

        </div>

    );

}

export default Login;
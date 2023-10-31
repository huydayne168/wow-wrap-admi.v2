import { useCallback, useState } from "react";
import styles from "./Login.module.css";
import http from "../../utils/http";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/store/useStore";
import { authActions } from "../../toolkit/index";
import { AxiosError } from "axios";
function Login() {
    const navigate = useNavigate();
    const [emailValue, setEmailValue] = useState("");
    const [passwordValue, setPasswordValue] = useState("");
    const [errMess, setErrMess] = useState("");
    const dispatch = useAppDispatch();
    const currentUser = useAppSelector((state: any) => state.authentication);

    const logInHandler = useCallback(() => {
        async function login() {
            try {
                const res = await http.post(
                    "/login",
                    {
                        email: emailValue,
                        password: passwordValue,
                    },
                    {
                        headers: { "Content-Type": "application/json" },
                        withCredentials: true,
                    }
                );
                const userInfo = res.data?.userInfo;
                const accessToken = res.data?.accessToken;
                dispatch(
                    authActions.storeUser({
                        _id: userInfo._id,
                        accessToken,
                    })
                );
                navigate("/admin/dashboard");
            } catch (error: any) {
                if (error instanceof AxiosError) {
                    if (error.response?.status === 401) {
                        console.log("alo");
                        setErrMess("Email or password is not correct!");
                    }
                }
            }
        }
        login();
    }, [emailValue, passwordValue, dispatch, navigate]);

    return (
        <div className={styles["login-form"]}>
            <h1 className="content-heading">Login</h1>
            <form action="#">
                {errMess ? <p className={styles["err-msg"]}>{errMess}</p> : ""}
                <div className={styles["controls"]}>
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        placeholder="Enter your email"
                        value={emailValue}
                        onChange={(e) => {
                            setEmailValue(e.target.value);
                        }}
                        required
                    />
                </div>

                <div className={styles["controls"]}>
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        placeholder="Enter your password"
                        required
                        value={passwordValue}
                        onChange={(e) => {
                            setPasswordValue(e.target.value);
                        }}
                    />
                </div>

                <button
                    className="button"
                    onClick={(e) => {
                        e.preventDefault();
                        logInHandler();
                    }}
                >
                    Log In
                </button>
                <div className={styles["more"]}>
                    <p>
                        You can <Link to={"/sign-up"}>sign up here</Link>
                    </p>

                    <Link to="/forgot-password">Forgot Password?</Link>
                </div>
            </form>
        </div>
    );
}

export default Login;

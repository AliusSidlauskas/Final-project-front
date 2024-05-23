import React, { useState } from "react";
import styles from "./LoginForm.module.css";
import axios from "axios";
import { useRouter } from "next/router";
import Button from "../Button/Button";
import cookie from "js-cookie";

const LoginForm = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isError, setError] = useState(false);
  const [isBadData, setBadData] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const onLogin = async () => {
    setLoading(true);
    const loginBody = {
      email: email,
      password: password,
    };

    if (!email || !password) {
      setError(true);
      return;
    }
    setError(false);

    try {
      const response = await axios.post(
        `${process.env.SERVER_URL}/users/login`,
        loginBody
      );

      if (response.status === 200) {
        setBadData(false);
        cookie.set("jwt_token", response.data.jwt_token);
        router.push("/hero/Hero");
      }

      setLoading(false);
      
      console.log("response", response);
      
    } catch (err) {
      setBadData(true);
      console.log("err", err);
      setLoading(false);
    }
  };

  return (
    <div className={styles.form}>
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <Button isLoading={isLoading} onClick={onLogin} title="Login" />
      {isError && <div className={styles.error}>Fill all inputs</div>}

      {isBadData && <div className={styles.error}>Wrong data</div>}
    </div>
  );
};

export default LoginForm;

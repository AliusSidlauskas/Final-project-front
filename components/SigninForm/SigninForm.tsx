import React, { useState } from "react";
import styles from "./SigninForm.module.css";
import axios from "axios";
import { useRouter } from "next/router";
import Button from "../Button/Button";
import cookie from "js-cookie";

const SigninForm = () => {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isBadData, setBadData] = useState(false);
  const [isError, setError] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const onSignin = async () => {
    setLoading(true);
    const signInBody = {
      name: name,
      email: email,
      password: password,
    };

    if (!name || !email || !password) {
      setError(true);
      setLoading(false);
      return;
    }
    setError(false);

    try {
      const response = await axios.post(
        `${process.env.SERVER_URL}/users`,
        signInBody
      );

      if (response.status === 200) {
        setBadData(false);
        cookie.set("jwt_token", response.data.jwt_token);
        router.back();
      }

      setLoading(false);
      console.log("response", response);
    } catch (err) {
      console.log("err", err);
      setLoading(false);
    }
  };

  return (
    <div className={styles.form}>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
      />
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
      <Button isLoading={isLoading} onClick={onSignin} title="Sign In" />
      {isError && <div className={styles.error}>Fill all inputs</div>}
      {isBadData && <div className={styles.error}>Wrong data</div>}
    </div>
  );
};

export default SigninForm;

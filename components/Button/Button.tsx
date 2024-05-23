import React from "react";
import Spinner from "../Spinner/Spinner";
import styles from "./Button.module.css";

type ButtonProps = {
  onClick: () => void;
  isLoading: boolean;
  title: string;
  type?: "WARNING" | "NORMAL";
  className?: string;
};

const Button = ({
  onClick,
  isLoading,
  title,
  type,
  className,
}: ButtonProps) => {
  return (
    <button
    className={`${styles.main} ${type === "WARNING" && styles.warring} ${
      className && className
    }`}
    onClick={onClick}
  >
    {isLoading ? <Spinner /> : <>{title}</>}
  </button>
  );
};

export default Button;

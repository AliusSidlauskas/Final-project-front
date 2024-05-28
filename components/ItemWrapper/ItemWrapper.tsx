import React, { useState } from "react";
import axios from "axios";
import cookies from "js-cookie";
import { useRouter } from "next/router";
import { QuestionType } from "../../types/question";
import Button from "../Button/Button";
import styles from "./ItemWrapper.module.css";
import Modal from "../Modal/Modal";
import AnswerWrapper from "../AnswerWrapper/AnswerWrapper";

type ItemWrapperProps = {
  question: QuestionType;
};

const ItemWrapper = ({ question }: ItemWrapperProps) => {
  const router = useRouter();
  const [isShowWarning, setShowWarning] = useState(false);
  const [error, setError] = useState("");

  const deleteItem = async () => {
    try {
      const headers = {
        authorization: cookies.get("jwt_token"),
      };

      const response = await axios.delete(
        `${process.env.SERVER_URL}/questions/${question.id}`,
        { headers }
      );

      if (response.status === 200) {
        router.push("/hero/Hero");
      }

      console.log("response", response);
    } catch (err) {
      // @ts-expect-error
      if (err.response.status === 401) {
        router.push("/login");
      } else {
        console.log(err);
        setError("Failed to delete the question");
      }
    }
  };

  return (
    <main className={styles.wrapper}>
      <div className={styles.info}>
        <h1>{question.title}</h1>
        <h3>{question.questionText}</h3>
        <h6>{`Created in: ${question.date}`}</h6>
        </div>

        <AnswerWrapper questionId={question.id} />

        <Button
          className={styles.deleteButton}
          type="WARNING"
          isLoading={false}
          title="Delete question"
          onClick={() => setShowWarning(true)}
        />

        {error && <p className={styles.error}>{error}</p>}

      {isShowWarning && (
        <Modal
          message="Really want to delete this question?"
          onConfirm={deleteItem}
          onCancel={() => setShowWarning(false)}
        />
      )}
    </main>
  );
};

export default ItemWrapper;

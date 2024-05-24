import React, { useState } from "react";
import axios from "axios";
import cookies from "js-cookie";
import { useRouter } from "next/router";
import styles from "./CreateQuestion.module.css";
import PageTemplate from "../../components/PageTemplate/PageTemplate";
import Button from "../../components/Button/Button";

const CreateQuestion = () => {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [questionText, setQuestionText] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const createQuestion = async () => {
    try {
      setLoading(true);
      const headers = {
        authorization: cookies.get("jwt_token"),
      };

      const data = {
        userId: cookies.get("user_id"),
        title: title,
        questionText: questionText,
        date: new Date().toISOString(),
      };

      const response = await axios.post(
        `${process.env.SERVER_URL}/questions`,
        data,
        { headers }
      );

      if (response.status === 200) {
        console.log("Question created");
        router.push("/hero/Hero"); 
      } else {
        console.log(response.status)
        setError("Failed to create question");
      }

      setLoading(false);
    } catch (err) {
   console.log(err)
      // @ts-expect-error
      if (err.response?.status === 401) {
        router.push("/login");
      } else {
        console.log("2")
        setError("Failed to create question");
      }
      setLoading(false);
    }
  };

  return (
    <PageTemplate>
      <div className={styles.main}>
        <h1>Create a New Question</h1>
        <div className={styles.form}>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Question Title"
            disabled={isLoading}
          />
          <textarea
            value={questionText}
            onChange={(e) => setQuestionText(e.target.value)}
            placeholder="Question Text"
            disabled={isLoading}
          />
          <Button
            isLoading={isLoading}
            onClick={createQuestion}
            title="Post Question"
            disabled={isLoading}
          />
          {error && <p className={styles.error}>{error}</p>}
        </div>
      </div>
    </PageTemplate>
  );
};

export default CreateQuestion;

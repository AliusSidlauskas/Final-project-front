import React, { useState, useEffect } from "react";
import axios, { isAxiosError } from "axios";
import cookies from "js-cookie";
import { useRouter } from "next/router";
import { AnswerType } from "../../types/answer";
import Button from "../Button/Button";

type AnswerWrapperProps = {
  questionId: string;
};

const AnswerWrapper = ({ questionId }: AnswerWrapperProps) => {
  const router = useRouter();
  const [answers, setAnswers] = useState<AnswerType[]>([]);
  const [answerText, setAnswerText] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const fetchAnswers = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${process.env.SERVER_URL}/question/${questionId}/answers`
        );
        setAnswers(response.data.answers);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch answers:", err);
        setError("Failed to fetch answers");
        setLoading(false);
      }
    };

    fetchAnswers();
  }, [questionId]);

  const submitAnswer = async () => {
    try {
      setLoading(true);
      const headers = {
        authorization: cookies.get("jwt_token"),
      };

      const userId = cookies.get("user_id");
      const data = {
        userId: userId,
        answerText: answerText,
        date: new Date().toISOString(),
      };

      const response = await axios.post(
        `${process.env.SERVER_URL}/question/${questionId}/answer`,
        data,
        { headers }
      );

      if (response.status === 201) {
        console.log("Answer submitted");
        setAnswers((prevAnswers) => [...prevAnswers, response.data.answer]);
        setAnswerText(""); 
      }

      setLoading(false);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (err.response?.status === 401) {
          router.push("/login");
        } else {
          setError("Failed to submit answer");
        }
      }
      setLoading(false);
    }
  };

  const deleteAnswer = async(answerId:string) => {
    try{
      setLoading(true)
      const headers ={
        authorization:cookies.get("jwt_token")
      }
      const response = await axios.delete(
        `${process.env.SERVER_URL}/answer/${answerId}`,
        {headers}
      );
      if(response.status === 200){
        console.log("answer deleted");
        setAnswers((prevAnswers) => prevAnswers.filter(answer => answer.id !== answerId))
      }
      setLoading(false);
    } catch(err){
      if(isAxiosError(err) && err.response?.status === 401){
        router.push("/login")
      } else{
        setError("Failed to delete answer");
      }
      setLoading(false)
    }
  }

  return (
    <div>
      <input
        type="text"
        value={answerText}
        onChange={(e) => setAnswerText(e.target.value)}
        placeholder="Leave an answer"
        disabled={!cookies.get("jwt_token")}
      />

      <Button
        isLoading={isLoading}
        onClick={submitAnswer}
        title="Submit Answer"
        disabled={!cookies.get("jwt_token")}
      />

      {answers.map((answer) => (
        <div key={answer.id}>
          <p>{answer.answerText}</p>
          <span>{answer.date}</span>
          {cookies.get("jwt_token") && (
            <button onClick={() => deleteAnswer(answer.id)}>Delete</button>
          )}
        </div>
      ))}
    </div>
  );
};

export default AnswerWrapper;

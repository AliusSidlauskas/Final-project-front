import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./Hero.module.css";
import PageTemplate from "../../components/PageTemplate/PageTemplate";
import { QuestionType } from "../../types/question";
import CardsWrapper from "../../components/CardWrapper/CardsWrapper";

const Hero = () => {
  const [questions, setQuestions] = useState<QuestionType[] | null>(null);

  const fetchQuestions = async () => {
    try {
      const response = await axios.get(`${process.env.SERVER_URL}/questions`);
      setQuestions(response.data.questions);

      console.log("Questions:", response.data.createdQuestions);
      console.log(response);
    } catch (err) {
      console.log("err", err);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  return (
    <PageTemplate>
      <div className={styles.main}>
        {questions && <CardsWrapper questions={questions} />}
      </div>
    </PageTemplate>
  );
};

export default Hero;

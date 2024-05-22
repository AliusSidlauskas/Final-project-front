import React from "react";
import { QuestionType } from "../..//types/question";
import Card from "../Card/Card";
import styles from "./CardsWrapper.module.css"

type CardsWrapper = {
  questions: QuestionType[];
};

const CardsWrapper = ({questions}: CardsWrapper) => {
  return (
  <div className={styles.cardsWrapper}>
    {questions.map((question) => (
        <Card
        id={question.id}
        key={question.id}
        title={question.title}
        questionText={question.questionText}
        date={question.date}
        />

))}
</div>
);
};

export default CardsWrapper;

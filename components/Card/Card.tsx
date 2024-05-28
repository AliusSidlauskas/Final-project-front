import React, {useEffect, useState} from 'react'
import axios from 'axios';
import styles from "./Card.module.css"
import Link from "next/link";

type CardProps = {
   id:string,
   title:string,
   questionText:string,
   date:string
}

const Card = ({id, title, questionText, date}:CardProps) => {
  const [answerCount, setAnswerCount] = useState(0);

  useEffect(() => {
    const fetchAnswerCount = async () => {
      try {
        const response = await axios.get(
          `${process.env.SERVER_URL}/question/${id}/answers`
        );
        setAnswerCount(response.data.answers.length);
      } catch (error) {
        console.error('Err', error);
      }
    };

    fetchAnswerCount();
  }, [id]);

  return (
    <Link className={styles.link} href={`/question/${id}`} >
    <div className={styles.wrapper}>
        <h2>{title}</h2>
        <h4>{questionText}</h4>
        <h6>{`Created in: ${date}`}</h6>
        <p>{answerCount} {answerCount === 1 ? 'answer' : 'answers'}</p>
    </div>
    </Link>
  )
}

export default Card
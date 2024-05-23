import React from 'react'
import styles from "./Card.module.css"
import Link from "next/link";

type CardProps = {
   id:string,
   title:string,
   questionText:string,
   date:string
}

const Card = ({id, title, questionText, date}:CardProps) => {
  return (
    <Link href={`/question/${id}`} className={styles.wrapper}>
    <div className={styles.wrapper}>
        <h2>{title}</h2>
        <h4>{questionText}</h4>
        <h6>{date}</h6>
    </div>
    </Link>
  )
}

export default Card
import React, {useEffect, useState} from 'react'
import { useRouter } from 'next/router';
import axios from 'axios';
import ItemWrapper from "../../components/ItemWrapper/ItemWrapper"
import PageTemplate from '../../components/PageTemplate/PageTemplate';

const Question = () => {
  const [question, setQuestion] = useState()
  const router = useRouter();

  const fetchQuestion = async () => {
    try {
      const response = await axios.get(
        `${process.env.SERVER_URL}/questions/${router.query.id}`
      );
      setQuestion(response.data.question);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (router.query.id) {
      fetchQuestion();
    }
  }, [router]);

  return (
    <PageTemplate>
      {question && <ItemWrapper question={question} />}
    </PageTemplate>
  );
};

export default Question;
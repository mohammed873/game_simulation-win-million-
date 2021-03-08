import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/question.css";
import { useLocation, Redirect } from "react-router-dom";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Question() {
  const [questions, setQuestions] = useState([
    {
      quest: "",
      possible_answers: [],
    },
  ]);
  const [counter, changeCounter] = useState(0);

  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }
  let group_code = parseInt(useQuery().get("group_code"));

  //dispalying question
  async function getRndomQuestion() {
    await axios
      .get("http://localhost:5000/quest/getQuestion")
      .then((res) => {
        setQuestions(res.data);
        //    setAnswers(res.data.possible_answers);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  //storing answers
  async function storingAnswers(e) {
    //fetching data to send
    let id_question = document.querySelector("#id_question").value;
    const token = localStorage.getItem("data");

    await axios
      .post(
        "http://localhost:5000/qtoken/add",
        {
          id_question: id_question,
          participant_answer: e.target.value,
          group_code: group_code,
        },
        {
          headers: {
            "auth-token": token,
          },
        }
      )
      .then((res) => {
        toast.configure();
        toast.success("answer submitted");
      })
      .catch((err) => {
        toast.configure();
        toast.error(err.response.data);
        console.log(err);
      });
  }

  setTimeout(() => {
    changeCounter(counter + 1);
  }, 7000);

  useEffect(() => {
    getRndomQuestion();
  }, []);

  if (counter === 6) {
    setTimeout(() => {
      window.location.href = `/winner?group_code=${group_code}`;
    }, 3000);
  }
  //redirect to login page
  if (!localStorage.getItem("data")) {
    return <Redirect to="participant" />;
  }
  return (
    <div className="container">
      <div className="question_container">
        <h2>Question Number: {counter + 1}/7</h2>

        <h1>{questions[counter].quest}</h1>

        <input type="hidden" value={questions[counter]._id} id="id_question" />
        <div className="possible_answer_container">
          {questions[counter].possible_answers.map((answer) => {
            return (
              <input
                type="text"
                key={answer}
                value={answer}
                onClick={storingAnswers}
                name="participant_answer"
                readOnly
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

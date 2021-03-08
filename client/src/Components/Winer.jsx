import React, { useEffect } from "react";
import { useLocation, Link ,Redirect} from "react-router-dom";
import axios from "axios";
import "../styles/winner.css";
import winImage from "../images/source.gif"

export default function Winer() {
  const [winner, setWineer] = React.useState([]);

  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }
  let group_code = parseInt(useQuery().get("group_code"));

  async function getRndomQuestion() {
    await axios
      .post("http://localhost:5000/group/final", {
        group_code: group_code,
      })
      .then((res) => {
        setWineer(res.data[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    getRndomQuestion();
  }, []);

//redirect to login page
if (!localStorage.getItem("data")) {
  return <Redirect to="participant" />;
}
  return (
   
    <div className="winner_container">
      <div className="winner">
      <img src={winImage} style={{ width: 415,margin:'auto'}} alt="pic"/>
          <span className="winnerName">{winner.full_name}</span>
        <h2>
          Score : <span className='score'>{winner.score}</span>
        </h2>
        <Link to="/">
          <button>Back to dashboard</button>
        </Link>
      </div>
    </div>
  );
}

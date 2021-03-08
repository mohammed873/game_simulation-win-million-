import React, { useEffect } from "react";
import "../styles/lobby.css";
import { useLocation, useHistory , Redirect } from "react-router-dom";
import axios from "axios";
function useQuery() {
  return new URLSearchParams(useLocation().search);
}
export default function Lobby() {
  let history = useHistory();
  let group_code = parseInt(useQuery().get("group_code"));

  const [names, setNames] = React.useState([]);

  // group members
  async function getGroupMembers() {
    await axios
      .post("http://localhost:5000/group/groupMembers", {
        group_code: group_code,
      })
      .then((res) => {
        setNames(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    setInterval(() => {
      getGroupMembers();
    }, 1000);
  }, []);

  if (names.length === 2) {
    setTimeout(() => {
      history.push(`/show_question?group_code=${group_code}`);
    }, 5000);
  }

  //redirect to login page
  if (!localStorage.getItem("data")) {
    return <Redirect to="participant" />;
  }
  return (
    <div className="lobby_container">
      <div className="lobby">
        <h1>LOBBY</h1>
        <h3>Waitting for other players ...</h3>
        <br />
        <div className="palyers_container">
          {names.map((name) => {
            return (
              <h2 style={{ color: "yellow" }} key={name.participant[0]._id}>
                {name.participant[0].full_name}
              </h2>
            );
          })}
        </div>
      </div>
    </div>
  );
}

import React, { Component } from "react";
import { TextField, Button } from "@material-ui/core";
import { Link, Redirect } from "react-router-dom";
import "../styles/Admin.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/Admin.css";
import axios from "axios";

class add_question extends Component {
  constructor(props) {
    super(props);

    this.state = {
      question: "",
      answer: "",
      choice1: "",
      choice2: "",
      choice3: "",
      choice4: "",
      points: "",
    };

    this.logoutHandler = this.logoutHandler.bind(this);
    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.addQuestionHandler = this.addQuestionHandler.bind(this);
    this.clearInputs = this.clearInputs.bind(this);
  }

  componentDidMount() {
    if (sessionStorage.getItem("data")) {
    } else {
      this.setState({ redirect: true });
    }
  }

  //handle adding admins
  async addQuestionHandler(e) {
    e.preventDefault();

    if (
      this.state.question &&
      this.state.answer &&
      this.state.points &&
      this.state.choice1 &&
      this.state.choice2 &&
      this.state.choice3 &&
      this.state.choice4
    ) {
      const token = sessionStorage.getItem("data");
      await axios
        .post(
          "http://localhost:5000/quest/",
          {
            quest: this.state.question,
            answer: this.state.answer,
            possible_answers: [
              this.state.choice1,
              this.state.choice2,
              this.state.choice3,
              this.state.choice4,
            ],
            points: this.state.points,
          },
          {
            headers: {
              "auth-token": `${token}`,
            },
          }
        )
        .then((response) => {
          if (response) {
            toast.configure();
            toast.success("question is added");

            this.clearInputs();
          } else {
            console.log("adding error");
          }
        })
        .catch((err) => {
          toast.configure();
          toast.error(err.response);
        });
    } else {
      toast.configure();
      toast.error("fill all inputs");
    }
  }

  //clearing data after adding an admin
  clearInputs() {
    document.querySelector("#question").value = "";
    document.querySelector("#answer").value = "";
    document.querySelector("#choice1").value = "";
    document.querySelector("#choice2").value = "";
    document.querySelector("#choice3").value = "";
    document.querySelector("#choice4").value = "";
    document.querySelector("#points").value = "";
  }

  //logout
  logoutHandler() {
    sessionStorage.setItem("data", "");
    sessionStorage.clear();
    this.setState({ redirect: true });
  }

  //for inputs
  onChangeHandler(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    //redirect to login page
    if (this.state.redirect) {
      return <Redirect to="admin" />;
    }

    const Linkstyles = {
      color: "white",
    };

    return (
      <div className="admin_panel_container">
        <div className="admin_menu">
          <div className="link_container">
            <Link style={Linkstyles} to="/admin_panel/">
              <h3>Add new admin</h3>
            </Link>
            <Link style={Linkstyles} to="/validate">
              <h3>Validate participant acount</h3>
            </Link>
            <Link style={Linkstyles} to="/question">
              <h3>add new question</h3>
            </Link>
          </div>
          <Button
            style={{ borderRadius: 0 }}
            variant="contained"
            size="large"
            fullWidth
            color="default"
            onClick={this.logoutHandler}
          >
            log out
          </Button>
        </div>
        <div className="admin_body">
          <div className="formcontainer" style={{ width: 600 }}>
            <h1 className="title">Add new question</h1>
            <hr />
            <br />
            <br />
            <br />
            <form>
              <TextField
                id="question"
                name="question"
                fullWidth
                type="text"
                label="Question"
                variant="filled"
                onChange={this.onChangeHandler}
              />
              <br /> <br />
              <TextField
                id="answer"
                name="answer"
                fullWidth
                type="text"
                label="Answer"
                variant="filled"
                onChange={this.onChangeHandler}
              />
              <br /> <br />
              <TextField
                id="choice1"
                name="choice1"
                fullWidth
                type="text"
                label="Choice1"
                variant="filled"
                onChange={this.onChangeHandler}
              />
              <br />
              <br />
              <TextField
                id="choice2"
                name="choice2"
                fullWidth
                type="text"
                label="Choice2"
                variant="filled"
                onChange={this.onChangeHandler}
              />
              <br />
              <br />
              <TextField
                id="choice3"
                name="choice3"
                fullWidth
                type="text"
                label="Choice3"
                variant="filled"
                onChange={this.onChangeHandler}
              />
              <br />
              <br />
              <TextField
                id="choice4"
                name="choice4"
                fullWidth
                type="text"
                label="Choice4"
                variant="filled"
                onChange={this.onChangeHandler}
              />
              <br />
              <br />
              <TextField
                id="points"
                name="points"
                fullWidth
                type="number"
                label="Point"
                variant="filled"
                onChange={this.onChangeHandler}
              />
              <br />
              <br />
              <Button
                onClick={this.addQuestionHandler}
                variant="contained"
                size="large"
                fullWidth
                color="primary"
              >
                Add
              </Button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default add_question;

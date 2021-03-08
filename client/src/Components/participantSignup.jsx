import React, { Component } from "react";
import { TextField, Button } from "@material-ui/core";
import { Redirect, Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/home.css";
import image from "../images/win2.gif";
import axios from "axios";

class ParticipantSignup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      full_name: "",
      age: "",
      email: "",
      phone: "",
      password: "",
    };
    this.signupHandler = this.signupHandler.bind(this);
    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.clearInputs = this.clearInputs.bind(this);
  }

  clearInputs() {
    document.querySelector("#full_name").value = "";
    document.querySelector("#age").value = "";
    document.querySelector("#email").value = "";
    document.querySelector("#phone").value = "";
    document.querySelector("#password").value = "";
  }

  async signupHandler(e) {
    e.preventDefault();

    if (
      this.state.full_name &&
      this.state.email &&
      this.state.age &&
      this.state.phone &&
      this.state.password
    ) {
      await axios
        .post("http://localhost:5000/participant/", {
          full_name: this.state.full_name,
          age: this.state.age,
          email: this.state.email,
          phone: this.state.phone,
          password: this.state.password,
        })
        .then((response) => {
          if (response.data) {
            toast.configure();
            toast.success("signed up successfully , log in now");
            this.clearInputs()
          } else {
            console.log("sign up error");
          }
        })
        .catch((err) => {
          toast.configure();
          toast.error(err.response.data);
        });
    } else {
      toast.configure();
      toast.error("fill all inputs");
    }
  }

  onChangeHandler(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    //redirect to panel page
    if (this.state.redirect) {
      return <Redirect to="participant" />;
    }

    //redirect to panel page
    if (localStorage.getItem("data")) {
      return <Redirect to="participant" />;
    }

    return (
      <div className="login_container">
        <div className="left_section">
          <img src={image} alt="left_section_picture" />
        </div>
        <div className="right_section">
          <div className="formcontainer">
            <h1 className="title"> Participant Sign up</h1>
            <hr />
            <br />
            <br />
            <br />
            <p>{this.state.error}</p>
            <form>
              <TextField
                id="full_name"
                fullWidth
                type="text"
                name="full_name"
                label="Full name"
                variant="filled"
                onChange={this.onChangeHandler}
              />
              <br /> <br />
              <TextField
                id="phone"
                fullWidth
                type="phone"
                name="phone"
                label="Phone"
                variant="filled"
                onChange={this.onChangeHandler}
              />
              <br /> <br />
              <TextField
                id="age"
                fullWidth
                type="number"
                name="age"
                label="Age"
                variant="filled"
                onChange={this.onChangeHandler}
              />
              <br /> <br />
              <TextField
                id="email"
                fullWidth
                type="email"
                name="email"
                label="Email"
                variant="filled"
                onChange={this.onChangeHandler}
              />
              <br />
              <br />
              <TextField
                id="password"
                fullWidth
                type="password"
                name="password"
                label="Password"
                variant="filled"
                onChange={this.onChangeHandler}
              />
              <br />
              <br />
              <Button
                onClick={this.signupHandler}
                variant="contained"
                size="large"
                fullWidth
                color="primary"
              >
                Sign up
              </Button>
              <br />
              <p>
                Already have an acount ,
                <Link to="/">
                  <span>login now</span>
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default ParticipantSignup;

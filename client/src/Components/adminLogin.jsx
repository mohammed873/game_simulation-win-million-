import React, { Component } from "react";
import { TextField, Button } from "@material-ui/core";
import { Redirect } from "react-router-dom";
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import "../styles/adminLogin.css";
import image from "../images/win.gif";
import axios from "axios";

class AdminLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phone: "",
      password: ""
    };
    this.loginHandler = this.loginHandler.bind(this);
    this.onChangeHandler = this.onChangeHandler.bind(this);
  }


  async loginHandler(e) {
    e.preventDefault();

    if (this.state.phone && this.state.password) {
      await axios
        .post("http://localhost:5000/admin/login", this.state)
        .then((response) => {
          if (response.data) {
            sessionStorage.setItem("data", response.data.token);
            this.setState({ redirect: true });
          } else {
              
            console.log("login error");
          }
        })
        .catch((err) => {
            toast.configure();
            toast.error('wrong credenials')
        });
    } else {
        toast.configure();
        toast.error('fill all inputs')
    }
  }

  onChangeHandler(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {

    //redirect to panel page
    if (this.state.redirect) {
      return <Redirect to="admin_panel" />;
    }

    //redirect to panel page
    if (sessionStorage.getItem('data')) {
      return <Redirect to="admin_panel" />;
    }

    return (
      <div className="login_container">
        <div className="left_section">
          <img src={image} alt="left_section_picture" />
        </div>
        <div className="right_section">
          <div className="formcontainer">
            <h1 className="title"> Admin login</h1>
            <hr />
            <br />
            <br />
            <br />
            <p>{this.state.error}</p>
            <form>
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
                onClick={this.loginHandler}
                variant="contained"
                size="large"
                fullWidth
                color="primary"
              >
                login
              </Button>
              <br />
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default AdminLogin;

import React, { Component } from "react";
import { Button } from "@material-ui/core";
import { Redirect } from "react-router-dom";
import Tabes from "./tabes.jsx";
import '../styles/dashboard.css'

export default class Rdi extends Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.logoutHandler = this.logoutHandler.bind(this);
  }

  componentDidMount() {
    if (localStorage.getItem("data")) {
    } else {
      this.setState({ redirect: true });
    }
  }

  //logout
  logoutHandler() {
    localStorage.setItem("data", "");
    localStorage.clear();
    this.setState({ redirect: true });
  }

  render() {
    //redirect to login page
    if (this.state.redirect) {
      return <Redirect to="/" />;
    };
    return (
      <>
        <Button
          style={{ borderRadius: 0 }}
          variant="contained"
          size="large"
          fullWidth
          color="primary"
          onClick={this.logoutHandler}
        >
          log out
        </Button>
        <br /> <br />
        <div className="tabes_container">
          <Tabes />
        </div>
      </>
    );
  }
}

import React, { Component } from "react";
import { TextField, Button } from "@material-ui/core";
import { Link, Redirect } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/Admin.css";
import axios from "axios";

const Linkstyles = {
  color: "white",
};

class admin_panel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      full_name: "",
      phone: "",
      password: "",
    };

    this.logoutHandler = this.logoutHandler.bind(this);
    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.addAdminsHandler = this.addAdminsHandler.bind(this);
    this.clearInputs = this.clearInputs.bind(this);
  }

  componentDidMount() {
    if (sessionStorage.getItem("data")) {
    } else {
      this.setState({ redirect: true });
    }
  }

  //for inputs
  onChangeHandler(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  //handle adding admins
  async addAdminsHandler(e) {
    e.preventDefault();

    if (this.state.phone && this.state.password && this.state.full_name) {
      const token = sessionStorage.getItem("data");

      await axios
        .post("http://localhost:5000/admin/", this.state, {
          headers: {
            "auth-token": `${token}`,
          },
        })
        .then((response) => {
          if (response.data) {
            toast.configure();
            toast.success("admin is added");

            this.clearInputs();
          } else {
            console.log("adding error");
          }
        })
        .catch((err) => {
          toast.configure();
          toast.error(err.response.data.message);
        });
    } else {
      toast.configure();
      toast.error("fill all inputs");
    }
  }

  //clearing data after adding an admin
  clearInputs() {
    document.querySelector("#full_name").value = "";
    document.querySelector("#password").value = "";
    document.querySelector("#phone").value = "";
  }

  //logout
  logoutHandler() {
    sessionStorage.setItem("data", "");
    sessionStorage.clear();
    this.setState({ redirect: true });
  }

  render() {
    //redirect to login page
    if (this.state.redirect) {
      return <Redirect to="admin" />;
    }
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
            <h1 className="title">Add new admin</h1>
            <hr />
            <br />
            <br />
            <br />
            <form>
              <TextField
                id="full_name"
                name="full_name"
                fullWidth
                type="text"
                label="Full name"
                variant="filled"
                onChange={this.onChangeHandler}
              />
              <br /> <br />
              <TextField
                id="phone"
                name="phone"
                fullWidth
                type="phone"
                label="Phone"
                variant="filled"
                onChange={this.onChangeHandler}
              />
              <br /> <br />
              <TextField
                id="password"
                name="password"
                fullWidth
                type="password"
                label="Password"
                variant="filled"
                onChange={this.onChangeHandler}
              />
              <br />
              <br />
              <Button
                variant="contained"
                size="large"
                fullWidth
                color="primary"
                onClick={this.addAdminsHandler}
              >
                Add
              </Button>
              <br />
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default admin_panel;

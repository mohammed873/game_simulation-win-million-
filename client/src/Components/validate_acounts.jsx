import React, { Component } from "react";
import { Button } from "@material-ui/core";
import { Link, Redirect } from "react-router-dom";
import "../styles/Admin.css";
import Table from "./table.jsx";

class validate_acounts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
    };
    this.logoutHandler = this.logoutHandler.bind(this);
  }

  //logout
  logoutHandler() {
    sessionStorage.setItem("data", "");
    sessionStorage.clear();
    this.setState({ redirect: true });
  }

  componentDidMount() {
    if (sessionStorage.getItem("data")) {
    } else {
      this.setState({ redirect: true });
    }
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
      <div>
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
            <div className="formcontainer" style={{ width: 800 }}>
              <Table />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default validate_acounts;

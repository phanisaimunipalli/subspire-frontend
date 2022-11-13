import React, { useState } from "react";
import { post, get } from "axios";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import cover from "./subspire-signin-cover.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { HashRouter, Route } from "react-router-dom";
import CrudGridView from "./CrudGridView";
import { withRouter } from "react-router-dom";

// Define the Login form component
class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      crud: {},
      token: "",
      isRegister: false,
      message: "",
      loginResponse: null,
      history: this.props.history,
      isLogin: false,
      uuid: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateState = this.updateState.bind(this);
  }

  handleChange(event) {
    event.preventDefault();
    const target = event.target;
    this.setState({
      [target.name]: target.value,
    });
  }
  // componentDidMount() {
  //   const { history } = this.props;
  //   history.push("/dashboard");
  // }

  updateState() {
    this.setState({
      isRegister: true,
      // token: data.accesToken,
      // uuid: data.uuid,
    });
  }

  handleSubmit(event, props) {
    event.preventDefault();
    if (!this.state.email || !this.state.password) return;
    this.state.crud = {
      email: this.state.email,
      password: this.state.password,
    };
    console.log("this.state.crud: ", this.state.crud);
    const loginRequest = this.state.crud;
    console.log("loginRequest: ", loginRequest);
    async function callLogin() {
      try {
        const response = await post(
          "http://localhost:8080/api/auth/login",
          loginRequest
        );
        // this.setState({ loginResponse: response });
        // console.log("loginResponse: ", this.state.loginResponse);
        console.log("login.response: ", response);
        console.log("login.response.status: ", response.status);
        console.log("login.response.data: ", response.data);

        if (response.status == 200) {
          this.updateState();
          console.log(this.state.isRegister);
          console.log(this.state.token);
          console.log(this.state.uuid);
          // window.location.href = "/dashboard";
          this.props.navigation.navigate("/dashboard");
        }
      } catch (error) {
        console.log("error", error);
        console.log("login.error: ", error.code);
        alert(
          "Login Failed, Please Signup First if you don't have an account."
        );
      }
    }
    callLogin();
  }

  render() {
    return (
      <div>
        <Grid container>
          <Grid item md={6}>
            <h1 style={{ paddingTop: "10rem" }}>Sign in</h1>
            {/* <hr /> */}
            <div className="container-add" style={{ maxWidth: "500px" }}>
              <form className="form-group" onSubmit={this.handleSubmit}>
                <Box sx={{ flexGrow: 1 }}>
                  <Grid container spacing={2}>
                    <Grid item md={12}>
                      <div className="form-group">
                        <label>Email</label>
                        <input
                          name="email"
                          type="email"
                          pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,63}$"
                          placeholder="sammy.spartan@gmail.com"
                          required
                          value={this.state.email}
                          onChange={this.handleChange}
                          className="form-control"
                        />
                      </div>
                    </Grid>
                  </Grid>
                  <Grid container spacing={2}>
                    <Grid item md={12}>
                      <div className="form-group">
                        <label>Password</label>
                        <input
                          name="password"
                          type="password"
                          required
                          value={this.state.password}
                          onChange={this.handleChange}
                          className="form-control"
                        />
                      </div>
                    </Grid>
                  </Grid>
                </Box>

                <div className="btnCenter">
                  <div className="btn-group">
                    <input type="submit" value="Login" className="btn-submit" />
                    <button
                      type="button"
                      onClick={this.handleCancel}
                      className="btn btn-secondary"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </form>
              <div className="alignCenter">
                <a href="/register">No Account? Register Now</a>
              </div>
              {this.state.isRegister ? (
                <div className="alignCenter">
                  <a href="/">{this.state.message}</a>
                </div>
              ) : null}
            </div>
          </Grid>
          <Grid item md={6}>
            <div className="homebg" height="100%">
              <img src={cover} width={"100%"} height={"100%"} />
            </div>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default LoginForm;

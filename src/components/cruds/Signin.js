import React, { useState } from "react";
import { post, get } from "axios";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import cover from "./subspire-signin-cover.png";
import { useLocation } from "react-router-dom";

function Signin(props) {
  const location = useLocation();
  const loginState = location.state;
  if (loginState) {
    console.log("signin.loginState: ", loginState);
  }

  const [state, setState] = useState(location.state);
  const initialState = {
    email: "",
    password: "",
  };

  const loginDetails = {
    isLogin: false,
    uuid: "",
    accesToken: "",
  };

  const accesToken = "sample_token";

  const [crud, setCrud] = useState(initialState);
  const [token, setToken] = useState(accesToken);
  const [isRegister, setisRegister] = useState(false);
  const [details, setDetails] = useState(loginDetails);
  // const [isLogout, setisLogout] = useState(loginState.logout ? true : false);

  const navigate = useNavigate();

  // React.useEffect(() => {
  //   // Runs after the first render() lifecycle
  //   if (isLogout) {
  //     sessionStorage.clear();
  //     window.location.href = "/";
  //   }
  // }, []);

  function handleSubmit(event) {
    event.preventDefault();
    if (!crud.email || !crud.password) return;
    async function postCrud() {
      try {
        const response = await post(
          "http://localhost:8080/api/auth/login",
          crud
        );
        console.log("login.response: ", response);
        console.log("login.response.status: ", response.status);
        console.log("login.response.data: ", response.data);

        if (response) {
          details.isLogin = true;
          details.uuid = response.data.result.uuid;
          details.accesToken = response.data.result.accesToken;

          sessionStorage.setItem("uuid", details.uuid);
          sessionStorage.setItem("token", details.accesToken);

          navigate("/dashboard", {
            state: {
              data: details,
            },
          });
        }
      } catch (error) {
        console.log("error", error);
        console.log("login.error: ", error.code);
        alert(
          "Login Failed, Please Signup First if you don't have an account."
        );
      }
    }
    postCrud();
  }

  function saveToken(event) {
    console.log("verifyToken: ", event);
    setToken({ event });
    console.log("token saved: ", token);
  }

  function handleChange(event) {
    setCrud({ ...crud, [event.target.name]: event.target.value });
  }

  function handleCancel() {
    navigate("/");
  }

  return (
    <div>
      <Grid container>
        <Grid item md={6}>
          <h1 style={{ paddingTop: "10rem" }}>Sign in</h1>
          {/* <hr /> */}
          <div className="container-add" style={{ maxWidth: "500px" }}>
            <form className="form-group" onSubmit={handleSubmit}>
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
                        value={crud.email}
                        onChange={handleChange}
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
                        value={crud.password}
                        onChange={handleChange}
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
                    onClick={handleCancel}
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
            {isRegister ? (
              <div className="alignCenter">
                <a href="/">{loginState.msg}</a>
              </div>
            ) : null}
          </div>
        </Grid>
        <Grid item md={6}>
          {/* <div className="homebg" height="100%"> */}
          {/* <img src={cover} width={"100%"} height={"100%"} /> */}
          <div className="container-text" height="100%">
            <video className="bg-video" autoPlay muted loop>
              <source src="https://imgur.com/2cSaKIt.mp4" type="video/mp4" />
            </video>
            <p className="text">S U B S P I R E</p>
          </div>
          <p className="subtext">Subscription Data Company</p>
          {/* </div> */}
        </Grid>
      </Grid>
    </div>
  );
}

export default Signin;

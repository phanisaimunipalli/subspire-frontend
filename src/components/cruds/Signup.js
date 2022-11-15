import React, { useState } from "react";
import { post } from "axios";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import cover from "./subspire-signup-logo.png";
import RegisterBG from "./videos/ca-video.mp4";

function Signup(props) {
  const initialState = {
    name: "",
    email: "",
    password: "",
    zipcode: "",
  };
  const [crud, setCrud] = useState(initialState);

  const navigate = useNavigate();

  const localurl = "http://localhost:8080";
  const produrl =
    "http://subspire-bckndapp.eba-wdk9psbn.us-east-1.elasticbeanstalk.com";

  function handleSubmit(event) {
    event.preventDefault();
    if (!crud.name || !crud.email || !crud.password) return;
    async function postCrud() {
      try {
        const response = await post(produrl + "/api/auth/signup", crud);
        console.log("signup.response: ", response);
        console.log(
          "response.data.result.success: ",
          response.data.result.success
        );
        if (response.data.result.success) {
          alert(
            "Registeration Initiated, please complete verification from your email!"
          );
          navigate("/", {
            state: {
              register: true,
              msg: "Please Complete Verification from your email!",
            },
          });
          navigate(`/`);
        } else {
          let errMsg = "Registration Failed!";
          alert("Registarion Failed, Please re-check your email and password!");
          navigate(`/register?msg=${errMsg}`);
        }
      } catch (error) {
        console.log("error", error);
        alert("There is some issue, please check your data once again!");
      }
    }
    postCrud();
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
          <div className="homebg">
            {/* <img src={cover} width={"100%"} height={"100%"} /> */}
            <section class="outter option1">
              <section class="video-container">
                <video src={RegisterBG} autoPlay loop playsinline muted></video>
                <div className="callout">
                  <p className="title">Welcome to Subspire</p>
                  <div className="desc">
                    "The" Subscription Data Company, we value your data rights
                    and show the top membership service providers in your
                    location.
                  </div>
                </div>
              </section>
            </section>
          </div>
        </Grid>
        <Grid item md={6}>
          <h1 style={{ paddingTop: "4rem" }}>Register</h1>
          <div className="container-add" style={{ maxWidth: "600px" }}>
            <form class="form-group" onSubmit={handleSubmit}>
              <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                  <Grid item md={10}>
                    <div className="form-group">
                      <label>Full Name</label>
                      <input
                        name="name"
                        type="text"
                        placeholder="Sammy Spartan"
                        required
                        value={crud.name}
                        onChange={handleChange}
                        className="form-control"
                      />
                    </div>
                  </Grid>
                  <Grid item md={10}>
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
                  <Grid item md={10}>
                    <div className="form-group">
                      <label>Password</label>
                      <input
                        name="password"
                        type="password"
                        placeholder="Alphanumeric Password"
                        required
                        value={crud.password}
                        onChange={handleChange}
                        className="form-control"
                      />
                    </div>
                  </Grid>
                  <Grid item md={10}>
                    <div className="form-group">
                      <label>Confirm Password</label>
                      <input
                        name="password2"
                        type="text"
                        placeholder="Let's Confirm Once Again"
                        onChange={handleChange}
                        className="form-control"
                      />
                    </div>
                  </Grid>
                  <Grid item md={6}>
                    <div className="form-group">
                      <label>Zip Code</label>
                      <input
                        name="zipcode"
                        type="number"
                        placeholder="Eg: 95126"
                        value={crud.zipcode}
                        onChange={handleChange}
                        className="form-control"
                      />
                    </div>
                  </Grid>
                </Grid>
              </Box>

              <div className="btnCenter">
                <div className="btn-group">
                  <input
                    type="submit"
                    value="Register"
                    className="btn-submit"
                  />
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
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

export default Signup;

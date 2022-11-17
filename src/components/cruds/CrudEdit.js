import React, { useState, useEffect } from "react";
import { get, patch } from "axios";
import { useNavigate, useParams } from "react-router-dom";
import axios, { post } from "axios";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

function CrudEdit(props) {
  const location = useLocation();
  console.log("edit.location: ", location);
  const loginState = location.state;
  console.log("edit.loginState.data: ", loginState);

  const initialState = {
    service: "",
    planType: "",
    billingCycle: "",
    category: "",
    price: "",
    currency: "",
    startDate: "",
    endDate: "",
    notifyFlag: true,
  };
  const [crud, setCrud] = useState(loginState.data);
  const [userData, setUserData] = useState(loginState.userData);
  const [response, setResponse] = useState();
  const localurl = "http://localhost:8080";
  const produrl =
    "http://subspire-bckndapp.eba-wdk9psbn.us-east-1.elasticbeanstalk.com";

  const { _id } = useParams();
  console.log("edit.id: ", _id);
  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();
    async function updateCrud() {
      try {
        console.log("crud: ", crud);
        var config = {
          method: "put",
          url:
            produrl +
            "/api/users/" +
            `${crud.userUUID}` +
            "/subscriptions/" +
            `${crud.uuid}`,
          headers: {
            Authorization: "Bearer " + `${userData.accesToken}`,
            "Content-Type": "application/json",
          },
          data: crud,
        };
        console.log("edit.config: ", config);
        axios(config).then(function (response) {
          console.log("edit.response: ", response.data);
          setResponse(response.data);
          console.log(JSON.stringify(response.data));
          if (response.status == 200) {
            navigate("/dashboard", {
              state: {
                data: userData,
              },
            });
          } else {
            alert("Something wrong with the data or internal systems!");
          }
        });
        console.log("response: ", response);
      } catch (error) {
        console.log(error);
        // alert("Sorry, Cannot Update!");
      }
    }

    updateCrud();
  }

  function handleChange(event) {
    setCrud({ ...crud, [event.target.name]: event.target.value });
  }

  function handleCancel() {
    console.log("edit.cancel.userData: ", userData);
    navigate("/dashboard", {
      state: {
        data: userData,
      },
    });
  }

  return (
    <>
      {/* <Navbar /> */}
      <div className="container-add" style={{ maxWidth: "600px" }}>
        <h1>Edit Your Plan</h1>
        <hr />
        <form className="form-group" onSubmit={handleSubmit}>
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
              <Grid item md={6}>
                <div className="form-group">
                  <label>Service Name</label>
                  <input
                    name="service"
                    type="text"
                    placeholder="Netflix"
                    required
                    value={crud.service}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
              </Grid>
              <Grid item md={6}>
                <div className="form-group">
                  <label>Type</label>
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    onChange={handleChange}
                    name="planType"
                    value={crud.planType}
                    // defaultValue="Basic"
                    required
                  >
                    <option selected>Choose Plan</option>
                    <option value="Basic">Basic</option>
                    <option value="Standard">Standard</option>
                    <option value="Premium">Premium</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </Grid>
              <Grid item md={6}>
                <div className="form-group">
                  <label>Billing Cycle</label>
                  <input
                    name="billingCycle"
                    type="text"
                    placeholder="Month or Year"
                    required
                    value={crud.billingCycle}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
              </Grid>
              <Grid item md={6}>
                <div className="form-group">
                  <label>Category</label>
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    onChange={handleChange}
                    name="category"
                    value={crud.category}
                    // defaultValue="Entertainment"
                    required
                  >
                    <option selected>Choose Category</option>
                    <option value="Entertainment">Entertainment</option>
                    <option value="News">News</option>
                    <option value="Technology">Technology</option>
                    <option value="eCommerce">eCommerce</option>
                  </select>
                </div>
              </Grid>
              {/* <Grid item md={6}>
              <div className="form-group">
                <label>Email</label>
                <input
                  name="email"
                  type="email"
                  pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,63}$"
                  placeholder="ram.munipalli@gmail.com"
                  required
                  value={crud.email}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
            </Grid> */}

              <Grid item md={6}>
                <div className="form-group">
                  <label>Currency</label>
                  <input
                    name="currency"
                    type="text"
                    placeholder="USD"
                    value={crud.currency}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
              </Grid>
              <Grid item md={6}>
                <div className="form-group">
                  <label>Price</label>
                  <input
                    name="price"
                    type="number"
                    min="1"
                    max="100"
                    placeholder="24"
                    value={crud.price}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
              </Grid>
              <Grid item md={6}>
                <div className="form-group">
                  <label>Start Date</label>
                  <input
                    name="startDate"
                    type="date"
                    placeholder="10-02-2022"
                    required
                    value={crud.startDate}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
              </Grid>
              <Grid item md={6}>
                <div className="form-group">
                  <label>End Date</label>
                  <input
                    name="endDate"
                    type="date"
                    placeholder="09-03-2023"
                    required
                    value={crud.endDate}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
              </Grid>
              <Grid item md={6} className="textAlign">
                <div className="form-check form-switch">
                  <label className="form-check-label" htmlFor="notifyFlag">
                    Notify Before Expiry Date?
                  </label>
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="notifyFlag"
                    name="notifyFlag"
                    value={crud.notifyFlag}
                    onChange={handleChange}
                  />
                </div>
              </Grid>
            </Grid>
          </Box>

          <div className="btnCenter">
            <div className="btn-group">
              <input type="submit" value="Update" className="btn-submit" />
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
    </>
  );
}

export default CrudEdit;

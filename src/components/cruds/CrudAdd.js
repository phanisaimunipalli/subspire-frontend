import React, { useState } from "react";
import axios, { post } from "axios";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Navbar from "../../components/common/Navbar";
import { useLocation } from "react-router-dom";

function CrudAdd(props) {
  const location = useLocation();
  // console.log("location: ", location);
  const loginState = location.state;
  // if (loginState) {
  //   console.log("loginState: ", loginState);
  // }

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
  const [crud, setCrud] = useState(initialState);
  const [userData, setUserData] = useState(loginState.data);
  const [response, setResponse] = useState();
  const [receipt, setReceipt] = useState(new FormData());
  const [image, setImage] = useState({ preview: "", data: "" });

  const localurl = "http://localhost:8080";
  const produrl =
    "http://subspire-bckndapp.eba-wdk9psbn.us-east-1.elasticbeanstalk.com";

  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();

    async function postCrud() {
      try {
        console.log("crud: ", crud);
        var config = {
          method: "post",
          url: produrl + "/api/users/" + `${userData.uuid}` + "/subscriptions",
          headers: {
            Authorization: "Bearer " + `${userData.accesToken}`,
            "Content-Type": "application/json",
          },
          data: crud,
        };
        console.log("config: ", config);
        axios(config).then(function (response) {
          console.log(response.data);
          setResponse(response.data);
          console.log(JSON.stringify(response.data));
          if (response.data.status == 200) {
            navigate(0, {
              state: {
                data: userData,
                response: response,
              },
            });
          } else {
            alert("Something wrong with the data or internal systems!");
          }
        });
      } catch (error) {
        console.log("error", error);
      }
    }
    postCrud();
  }

  function handleChange(event) {
    // console.log("event.target.checked: ", event.target.checked);
    // setNotifyFlag(event.target.checked);
    setCrud({ ...crud, [event.target.name]: event.target.value });
  }

  function handleCancel() {
    navigate("/dashboard", {
      state: {
        data: userData,
      },
    });
  }

  function handleFileChange(event) {
    console.log(event.target.files[0]);

    const img = {
      preview: URL.createObjectURL(event.target.files[0]),
      data: event.target.files[0],
    };
    setImage(img);
  }
  // function handleUpload(event) {
  //   event.preventDefault();
  //   // Create an object of formData
  //   const formData = new FormData();

  //   // Update the formData object
  //   formData.append("receiptFile", selectedFile);

  //   // Details of the uploaded file
  //   console.log("formData: ", formData);
  // }

  return (
    <>
      {/* <Navbar /> */}
      <div className="container-add" style={{ maxWidth: "600px" }}>
        <h1>Add Plan</h1>
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
                    defaultValue="Entertainment"
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
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="notifyFlag"
                    name="notifyFlag"
                    value={crud.notifyFlag}
                    onChange={handleChange}
                  />
                  <label className="form-check-label" htmlFor="notifyFlag">
                    Notify Before Expiry Date?
                  </label>
                </div>
              </Grid>
              {/* <Grid item md={12} className="textAlign">
                <div class="input-group">
                  <input
                    type="file"
                    className="form-control"
                    id="receipt"
                    name="receipt"
                    // value={crud.receipt}
                    onChange={handleFileChange}
                    aria-describedby="inputGroupFileAddon04"
                    aria-label="Upload"
                  />
                </div>
              </Grid> */}
            </Grid>
          </Box>

          <div className="btnCenter">
            <div className="btn-group">
              <input type="submit" value="Submit" className="btn-submit" />
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

export default CrudAdd;

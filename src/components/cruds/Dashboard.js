import React, { useState } from "react";
import axios from "axios";
import { post, get } from "axios";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Switch from "@mui/material/Switch";
import Navbar from "../../components/common/Navbar";
import { useLocation } from "react-router-dom";
import CrudAdd from "./CrudAdd";
import CrudEdit from "./CrudEdit";
import ClipLoader from "react-spinners/ClipLoader";
import BounceLoader from "react-spinners/BounceLoader";
import PacmanLoader from "react-spinners/PacmanLoader";

export default class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      config: "http://localhost",
      cruds: [],
      loginFlag: false,
      location: this.props.location,
      userData: props.data,
      showComponent: false,
      showEditComponent: false,
      userAndResponse: { user: "", response: [] },
      loading: true,
      localurl: "http://localhost:8080",
      produrl:
        "http://subspire-bckndapp.eba-wdk9psbn.us-east-1.elasticbeanstalk.com",
    };
    console.log("this.props.location: ", this.props.location);
    console.log("userData in dashboard: ", this.state.userData);
  }

  componentDidMount() {
    const url =
      this.state.produrl +
      "/api/users/" +
      `${this.state.userData.uuid}` +
      "/subscriptions";
    const headers = {
      Authorization: "Bearer " + `${this.state.userData.accesToken}`,
    };
    console.log("headers: ", headers);

    console.log("url framed getPlans: ", url);
    try {
      axios.get(url, { headers: headers }).then(({ data }) => {
        // console.log("dash.data: ", data);
        this.setState({
          cruds: data,
        });
        console.log("dash.response: ", data);
        this.setState({
          userAndResponse: {
            user: this.state.userData,
            cruds: data,
          },
        });
      });
      this.setState({ loading: false });
      console.log("cruds: ", this.state.cruds);
    } catch (error) {
      console.log("error", error);
    }

    console.log("this.state.plansData: ", this.state.cruds);
  }

  goToNewPlan = () => {
    console.log("gotoNewplan");
    this.setState({ showComponent: true });
  };

  goToEditPlan = () => {
    console.log("goToEditPlan");
    console.log("userAndResponse: ", this.state.userAndResponse);
    this.setState({ showEditComponent: true });
  };

  render() {
    if (this.state.loading) {
      return <PacmanLoader color="#36d7b7" />;
      // return null; //app is not ready (fake request is in process)
    }
    return (
      <div>
        <Navbar />
        <ClipLoader
          color="blue"
          loading={this.state.loading}
          size={150}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
        {/* <BounceLoader color="#36d7b7" loading={this.state.loading} /> */}

        <div className="container">
          <h2>Subscriptions Deck</h2>
          <hr />
          <div>
            <p className="textAlign">
              <button
                type="button"
                className="btn-general"
                onClick={this.goToNewPlan}
              >
                New Plan?
              </button>
              {/* </Link> */}
              {this.state.showComponent ? (
                <div>
                  {(this.state.showComponent = false)}
                  <CrudAdd data={this.state.userData} />
                </div>
              ) : null}
            </p>
            <div className="d-flex flex-wrap">
              {this.state.cruds &&
                this.state.cruds.map((crud) => {
                  return (
                    <div
                      className="card"
                      style={{ width: 300, margin: 10 }}
                      key={crud.uuid}
                    >
                      <div className="card-header">
                        <h5 className="card-title">
                          <Link
                            to={`/cruds/${crud.uuid}`}
                            className="link-line"
                          >
                            {crud.service}
                          </Link>
                        </h5>
                      </div>
                      <div className="card-body">
                        <Box md={{ flexGrow: 1 }}>
                          <Grid container>
                            <Grid item md={6}>
                              <p className="card-label">Plan Type: </p>
                            </Grid>
                            <Grid item md={6}>
                              <p className="card-value">{crud.planType}</p>
                            </Grid>
                            <Grid item md={6}>
                              <p className="card-label">Billing Cycle: </p>
                            </Grid>
                            <Grid item md={6}>
                              <p className="card-value">{crud.billingCycle}</p>
                            </Grid>
                            <Grid item md={6}>
                              <p className="card-label">Price: </p>
                            </Grid>
                            <Grid item md={6}>
                              <p className="card-value">{crud.price}</p>
                            </Grid>
                            <Grid item md={6}>
                              <p className="card-label">Start Date: </p>
                            </Grid>
                            <Grid item md={6}>
                              <p className="card-value">{crud.startDate}</p>
                            </Grid>
                            <Grid item md={6}>
                              <p className="card-label">End Date: </p>
                            </Grid>
                            <Grid item md={6}>
                              <p className="card-value">{crud.endDate}</p>
                            </Grid>
                            <Grid item md={6}>
                              <p className="card-label">Category: </p>
                            </Grid>
                            <Grid item md={6}>
                              <p className="card-value">{crud.category}</p>
                            </Grid>
                            <Grid item md={6}>
                              <p className="card-label">Notification: </p>
                            </Grid>
                            <Grid item md={6}>
                              <p className="card-value">
                                {" "}
                                <Switch defaultChecked />
                              </p>
                            </Grid>
                          </Grid>
                        </Box>
                      </div>

                      <div className="card-footer d-flex align-items-center">
                        <Link
                          to={`/cruds/${crud.uuid}/edit`}
                          state={{ data: crud, userData: this.state.userData }}
                          className="btn-edit"
                        >
                          Edit
                        </Link>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

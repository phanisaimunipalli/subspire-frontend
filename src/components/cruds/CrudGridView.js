import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Switch from "@mui/material/Switch";
import Navbar from "../../components/common/Navbar";
import { useLocation } from "react-router-dom";
import Dashboard from "./Dashboard";
import Signin from "./Signin";

function PlanGridView(props) {
  const location = useLocation();
  const dashState = location.state;
  // const [loginFlag, setLoginFlag] = useState();

  const initState = {
    signinFlag: false,
    dataUser: "",
    userData: "",
  };

  if (dashState) {
    if (dashState.data) {
      if (dashState.data.isLogin) {
        initState.signinFlag = dashState.data.isLogin;
      }
    }
  }

  // setLoginFlag(initState.signinFlag);
  const [userData, setUserData] = useState(dashState ? dashState.data : "");

  // console.log("loginFlag: ", initState.signinFlag);
  // console.log("user.data.uuid: ", dashState.data.uuid);
  // console.log("user.data.accesToken: ", dashState.data.accesToken);

  return (
    <div>
      {initState.signinFlag ? <Dashboard data={userData} /> : <Signin />}
    </div>
  );
}

export default PlanGridView;

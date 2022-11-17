import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Navbar from "../common/Navbar";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

function Team() {
  const [cruds, setCruds] = useState([]);

  // useEffect(function () {
  //   async function getCruds() {
  //     try {
  //       const response = await axios.get("/api/cruds");
  //       setCruds(response.data);
  //     } catch (error) {
  //       console.log("error", error);
  //     }
  //   }
  //   getCruds();
  // }, []);

  return (
    <>
      <Navbar />
      <div className="container">
        <section class="bg-white dark:bg-gray-900">
          <div class="mx-auto max-w-screen-sm text-center mb-8 lg:mb-16">
            <h2 class="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
              Team Maverick
            </h2>
            {/* <p class="font-light text-gray-500 lg:mb-16 sm:text-xl dark:text-gray-400">
              Explore the whole collection of open-source web components and
              elements built with the utility classes from Tailwind
            </p> */}
          </div>
          <Grid container spacing={2}>
            <Grid item xs={3} md={3} className="textAlign">
              <div class="items-center bg-gray-50 rounded-lg shadow sm:flex dark:bg-gray-800 dark:border-gray-700">
                <a href="#">
                  <img
                    class="w-full rounded-lg sm:rounded-none sm:rounded-l-lg"
                    src="https://raw.githubusercontent.com/phanisaimunipalli/CMPE272TeamMaverick/main/team/priya.png"
                    alt="Priya Gupta"
                  />
                </a>
                <div class="p-4">
                  <h3 class="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                    <a href="#">Priya Gupta</a>
                  </h3>
                  <span class="text-gray-500 dark:text-gray-400">
                    Chief Executive Officer (CEO)
                  </span>
                  {/* <p class="mt-3 mb-4 font-light text-gray-500 dark:text-gray-400">
                    Bonnie drives the technical strategy of the flowbite
                    platform and brand.
                  </p> */}
                </div>
              </div>
            </Grid>
            <Grid item xs={3} md={3} className="textAlign">
              <div class="items-center bg-gray-50 rounded-lg shadow sm:flex dark:bg-gray-800 dark:border-gray-700">
                <a href="#">
                  <img
                    class="w-full rounded-lg sm:rounded-none sm:rounded-l-lg"
                    src="https://raw.githubusercontent.com/phanisaimunipalli/CMPE272TeamMaverick/main/team/phani.png"
                    alt="Jese Avatar"
                  />
                </a>
                <div class="p-4">
                  <h3 class="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                    <a href="#">Phani Sai Ram Munipalli</a>
                  </h3>
                  <span class="text-gray-500 dark:text-gray-400">
                    Chief Product Officer (CPO)
                  </span>
                  {/* <p class="mt-3 mb-4 font-light text-gray-500 dark:text-gray-400">
                    Jese drives the technical strategy of the flowbite platform
                    and brand.
                  </p> */}
                </div>
              </div>
            </Grid>
            <Grid item xs={3} md={3} className="textAlign">
              <div class="items-center bg-gray-50 rounded-lg shadow sm:flex dark:bg-gray-800 dark:border-gray-700">
                <a href="#">
                  <img
                    class="w-full rounded-lg sm:rounded-none sm:rounded-l-lg"
                    src="https://raw.githubusercontent.com/phanisaimunipalli/CMPE272TeamMaverick/main/team/piyush.png"
                    alt="Michael Avatar"
                  />
                </a>
                <div class="p-4">
                  <h3 class="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                    <a href="#">Piyush Mamidwar</a>
                  </h3>
                  <span class="text-gray-500 dark:text-gray-400">
                    Director of Engineering
                  </span>
                  {/* <p class="mt-3 mb-4 font-light text-gray-500 dark:text-gray-400">
                    Michael drives the technical strategy of the flowbite
                    platform and brand.
                  </p> */}
                </div>
              </div>
            </Grid>
            <Grid item xs={3} md={3} className="textAlign">
              <div class="items-center bg-gray-50 rounded-lg shadow sm:flex dark:bg-gray-800 dark:border-gray-700">
                <a href="#">
                  <img
                    class="w-full rounded-lg sm:rounded-none sm:rounded-l-lg"
                    src="https://raw.githubusercontent.com/phanisaimunipalli/CMPE272TeamMaverick/main/team/harsh.png"
                    alt="Sofia Avatar"
                  />
                </a>
                <div class="p-4">
                  <h3 class="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                    <a href="#">Harsh Patel</a>
                  </h3>
                  <span class="text-gray-500 dark:text-gray-400">
                    Head of R&D Engineering
                  </span>
                  {/* <p class="mt-3 mb-4 font-light text-gray-500 dark:text-gray-400">
                    Lana drives the technical strategy of the flowbite platform
                    and brand.
                  </p> */}
                </div>
              </div>
            </Grid>
          </Grid>
          {/* <div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6 "> */}

          <div class="grid grid-cols-3 divide-x"></div>
        </section>
      </div>
    </>
  );
}

export default Team;

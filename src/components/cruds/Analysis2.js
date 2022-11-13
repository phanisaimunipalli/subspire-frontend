import React from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import Navbar from "../common/Navbar";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Chart, registerables } from "chart.js";
import "chartjs-adapter-moment"; // or another adapter to avoid moment
Chart.register(...registerables);
// import { Bar } from 'react-charts';
// import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: "",
      charData: [],
      crud: {},
      input: "",
      errorMsg: "Not Found",
      labels: [],
      services: [],
      count: [],
      responseData: {},
      actualResponse: [],
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({ input: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();

    let inputVal = this.state.input;
    axios
      .get(`http://localhost:8080/api//search/${inputVal}`)
      .then((res) => {
        console.log("analysis.res: ", res);
        this.setState({ responseData: res.data });
        this.setState({ actualResponse: this.state.responseData.reponse });
        if (res.status == 200) {
          console.log("responseData: ", this.state.responseData);
          console.log("actualResponse: ", this.state.actualResponse);
          const serviceNames = [];
          const counts = [];
          this.state.actualResponse.forEach((mobile) => {
            for (let key in mobile) {
              console.log(`${key}: ${mobile[key]}`);
              if (key.match("service")) {
                serviceNames.push(mobile[key]);
              } else {
                counts.push(mobile[key]);
              }
            }
          });
          console.log("sericeNames: ", serviceNames);
          console.log("counts: ", counts);

          this.setState(
            {
              charData: {
                labels: this.state.actualResponse?.map((data) => data.service),
                datasets: [
                  {
                    label: "Popularity",
                    data: this.state.actualResponse?.map((data) => data.count),
                    backgroundColor: [
                      "rgba(54, 162, 235, 0.6)",
                      "rgba(255, 206, 86, 0.6)",
                      "rgba(75, 192, 192, 0.6)",
                      "rgba(153, 102, 255, 0.6)",
                      "rgba(255, 159, 64, 0.6)",
                      "rgba(255, 99, 132, 0.6)",
                      "rgba(255, 99, 132, 0.6)",
                    ],
                  },
                ],
              },
            },
            () => {
              //   console.log(this.state.charData.datasets[0].data[0]);
              console.log(this.state.charData);
            }
          );
        } else {
          this.setState({ errorMsg: "Error Occured!" });
        }
        // this.setState({ charData: [...this.state.charData, res.data] });

        // this.setState({
        //   charData: [
        //     {
        //       name: res.data.package,
        //       downloads: res.data.downloads
        //     },
        //   ]
        // }, ()=>console.log(this.state.charData[0].name))
      })
      .catch((err) => console.log(err));
  }

  render() {
    return (
      <div>
        <Navbar />
        <div>
          <Grid container>
            <Grid item md={12}>
              <h1 style={{ paddingTop: "1rem" }}>Analytics</h1>
              {/* <hr /> */}
              <div className="container-add" style={{ maxWidth: "500px" }}>
                <form className="form-group" onSubmit={this.handleSubmit}>
                  <Box sx={{ flexGrow: 1 }} className="textAlign">
                    <Grid container spacing={2}>
                      <Grid item md={12}>
                        <div className="form-group">
                          {/* <label>Email</label> */}
                          <input
                            name="text"
                            type="text"
                            placeholder="Eg: 95126"
                            required
                            value={this.state.input}
                            onChange={this.handleChange}
                            className="form-control"
                          />
                        </div>
                        <input
                          type="submit"
                          value="Search"
                          className="btn-search"
                        />
                      </Grid>
                    </Grid>
                  </Box>
                </form>
              </div>
            </Grid>
          </Grid>
        </div>

        {/* {this.state.charData.map(item => (
          <div>
            <p>
              {item.labels} {item.downloads}
            </p>
          </div>
        ))} */}

        {/* <Bar data={this.state.charData} options={{}} /> */}
        <h1>Subspire Geographical Analytics</h1>
        <div>
          <Bar data={this.state.chartData} redraw />
        </div>

        {/*
        <BarChart width={600} height={300} data={this.state.charData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="downloads" fill="#82ca9d" />
        </BarChart>
        */}
      </div>
    );
  }
}

export default App;

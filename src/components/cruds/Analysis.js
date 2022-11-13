import axios from "axios";
import Navbar from "../common/Navbar";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import React, { PureComponent } from "react";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
  PieChart,
  Pie,
} from "recharts";

const data = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

const pdata = [
  { name: "Group A", value: 400 },
  { name: "Group B", value: 300 },
  { name: "Group C", value: 300 },
  { name: "Group D", value: 200 },
  { name: "Group E", value: 278 },
  { name: "Group F", value: 189 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
const sdata = [
  {
    service: "Netflix",
    count: 10,
  },
  {
    service: "W+",
    count: 20,
  },
  {
    service: "Prime",
    count: 30,
  },
  {
    service: "Tech",
    count: 10,
  },
  {
    service: "Paramount",
    count: 67,
  },
  {
    service: "Lyft",
    count: 43,
  },
];

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
              console.log("sdata: ", sdata);
              console.log(
                "this.state.actualResponse: ",
                this.state.actualResponse
              );
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

          <Grid
            container
            rowSpacing={2}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            className="alignChart"
          >
            <Grid item md={6}>
              {this.state.actualResponse.length > 0 ? (
                <div
                  style={{ width: "80%", height: 300, alignContent: "right" }}
                >
                  <BarChart
                    width={600}
                    height={300}
                    data={this.state.actualResponse}
                    barSize={20}
                    margin={{
                      top: 0,
                      right: 0,
                      left: 0,
                      bottom: 15,
                    }}
                  >
                    <XAxis
                      dataKey="service"
                      scale="point"
                      interval="0"
                      padding={{ left: 10, right: 10 }}
                    />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Bar
                      dataKey="count"
                      fill="#ff9900"
                      background={{ fill: "#eee" }}
                    />
                  </BarChart>
                </div>
              ) : null}
            </Grid>
            <Grid item md={6}>
              <div style={{ width: "80%", height: 300, alignContent: "right" }}>
                <ResponsiveContainer>
                  <AreaChart
                    data={data}
                    margin={{
                      top: 10,
                      right: 30,
                      left: 0,
                      bottom: 0,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Area
                      type="monotone"
                      dataKey="uv"
                      stroke="#8884d8"
                      fill="#8884d8"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </Grid>
            {/* <Grid item md={4}></Grid> */}
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
        {/* <h1>Subspire Geographical Analytics</h1> */}
        {/* <div>
          <Bar data={this.state.chartData} redraw />
        </div> */}

        {/* <BarChart width={150} height={40} data={data}>
          <Bar dataKey="uv" fill="#8884d8" />
        </BarChart> */}

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

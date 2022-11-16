import axios from "axios";
import Navbar from "../common/Navbar";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import React, { FunctionComponent } from "react";
import { scaleOrdinal } from "d3-scale";
import { schemeCategory10 } from "d3-scale-chromatic";

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
  LineChart,
  Line,
} from "recharts";

const localurl = "http://localhost:8080";
const produrl =
  "http://subspire-bckndapp.eba-wdk9psbn.us-east-1.elasticbeanstalk.com";

const data = [
  {
    name: "Q1",
    Entertainment: 3334,
    eCommerce: 2400,
    Finance: 2400,
    Travel: 1000,
  },
  {
    name: "Q2",
    Entertainment: 1252,
    eCommerce: 1398,
    Finance: 2210,
    Travel: 3000,
  },
  {
    name: "Q3",
    Entertainment: 2932,
    eCommerce: 9800,
    Finance: 5210,
    Travel: 2290,
  },
  {
    name: "Q4",
    Entertainment: 3610,
    eCommerce: 4908,
    Finance: 2000,
    Travel: 6789,
  },
];

// const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const colors = scaleOrdinal(schemeCategory10).range();

const getPath = (x: number, y: number, width: number, height: number) => {
  return `M${x},${y + height}C${x + width / 3},${y + height} ${x + width / 2},${
    y + height / 3
  } 
  ${x + width / 2}, ${y}
  C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${
    x + width
  }, ${y + height}
  Z`;
};

const TriangleBar: FunctionComponent<any> = (props: any) => {
  const { fill, x, y, width, height } = props;

  return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
};

const CustomizedDot = (props) => {
  const { cx, cy, stroke, payload, value } = props;

  if (value > 2500) {
    return (
      <svg
        x={cx - 10}
        y={cy - 10}
        width={20}
        height={20}
        fill="red"
        viewBox="0 0 1024 1024"
      >
        <path d="M517.12 53.248q95.232 0 179.2 36.352t145.92 98.304 98.304 145.92 36.352 179.2-36.352 179.2-98.304 145.92-145.92 98.304-179.2 36.352-179.2-36.352-145.92-98.304-98.304-145.92-36.352-179.2 36.352-179.2 98.304-145.92 145.92-98.304 179.2-36.352zM663.552 261.12q-15.36 0-28.16 6.656t-23.04 18.432-15.872 27.648-5.632 33.28q0 35.84 21.504 61.44t51.2 25.6 51.2-25.6 21.504-61.44q0-17.408-5.632-33.28t-15.872-27.648-23.04-18.432-28.16-6.656zM373.76 261.12q-29.696 0-50.688 25.088t-20.992 60.928 20.992 61.44 50.688 25.6 50.176-25.6 20.48-61.44-20.48-60.928-50.176-25.088zM520.192 602.112q-51.2 0-97.28 9.728t-82.944 27.648-62.464 41.472-35.84 51.2q-1.024 1.024-1.024 2.048-1.024 3.072-1.024 8.704t2.56 11.776 7.168 11.264 12.8 6.144q25.6-27.648 62.464-50.176 31.744-19.456 79.36-35.328t114.176-15.872q67.584 0 116.736 15.872t81.92 35.328q37.888 22.528 63.488 50.176 17.408-5.12 19.968-18.944t0.512-18.944-3.072-7.168-1.024-3.072q-26.624-55.296-100.352-88.576t-176.128-33.28z" />
      </svg>
    );
  }

  return (
    <svg
      x={cx - 10}
      y={cy - 10}
      width={20}
      height={20}
      fill="green"
      viewBox="0 0 1024 1024"
    >
      <path d="M512 1009.984c-274.912 0-497.76-222.848-497.76-497.76s222.848-497.76 497.76-497.76c274.912 0 497.76 222.848 497.76 497.76s-222.848 497.76-497.76 497.76zM340.768 295.936c-39.488 0-71.52 32.8-71.52 73.248s32.032 73.248 71.52 73.248c39.488 0 71.52-32.8 71.52-73.248s-32.032-73.248-71.52-73.248zM686.176 296.704c-39.488 0-71.52 32.8-71.52 73.248s32.032 73.248 71.52 73.248c39.488 0 71.52-32.8 71.52-73.248s-32.032-73.248-71.52-73.248zM772.928 555.392c-18.752-8.864-40.928-0.576-49.632 18.528-40.224 88.576-120.256 143.552-208.832 143.552-85.952 0-164.864-52.64-205.952-137.376-9.184-18.912-31.648-26.592-50.08-17.28-18.464 9.408-21.216 21.472-15.936 32.64 52.8 111.424 155.232 186.784 269.76 186.784 117.984 0 217.12-70.944 269.76-186.784 8.672-19.136 9.568-31.2-9.12-40.096z" />
    </svg>
  );
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: "",
      charData: [],
      moneyCharData: [],
      crud: {},
      input: "",
      errorMsg: "Not Found",
      labels: [],
      services: [],
      count: [],
      responseData: {},
      actualResponse: [],
      actualMoneyResponse: [],
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
      .get(produrl + `/api/search/${inputVal}`)
      .then((res) => {
        console.log("analysis.res: ", res);
        this.setState({ responseData: res.data });
        this.setState({
          actualResponse: this.state.responseData.countResponse,
          actualMoneyResponse: this.state.responseData.moneyResponse,
        });

        if (res.status == 200) {
          console.log("responseData: ", this.state.responseData);
          console.log("actualResponse: ", this.state.actualResponse);
          console.log("moneyResponse: ", this.state.actualMoneyResponse);
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

          //Preparing chardata for Money Spent
          const mservices = [];
          const money = [];
          this.state.actualMoneyResponse.forEach((mobile) => {
            for (let key in mobile) {
              console.log(`${key}: ${mobile[key]}`);
              if (key.match("service")) {
                mservices.push(mobile[key]);
              } else {
                money.push(mobile[key]);
              }
            }
          });
          console.log("mservices: ", mservices);
          console.log("money: ", money);

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
              moneyCharData: {
                labels: this.state.actualMoneyResponse?.map(
                  (data) => data.service
                ),
                datasets: [
                  {
                    label: "Popularity",
                    data: this.state.actualMoneyResponse?.map(
                      (data) => data.moneyspent
                    ),
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
              console.log(
                "this.state.actualResponse: ",
                this.state.actualResponse
              );
              console.log(this.state.moneyCharData);
              console.log(
                "this.state.actualMoneyResponse: ",
                this.state.actualMoneyResponse
              );
            }
          );
        } else {
          this.setState({ errorMsg: "Error Occured!" });
        }
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
            <Grid item md={6} className="paddingBottomUp">
              {this.state.actualResponse.length > 0 ? (
                <div
                  style={{ width: "60%", height: 300, alignContent: "right" }}
                >
                  <p className="alignCenter">Users Count</p>
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
              {this.state.actualResponse.length > 0 ? (
                <div
                  style={{ width: "80%", height: 300, alignContent: "right" }}
                >
                  <p className="alignCenter">Users Graph</p>
                  <AreaChart
                    width={600}
                    height={300}
                    data={this.state.actualResponse}
                    margin={{
                      top: 0,
                      right: 0,
                      left: 0,
                      bottom: 15,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="service" />
                    <YAxis />
                    <Tooltip />
                    <Area
                      type="monotone"
                      dataKey="count"
                      stroke="#00a8e1"
                      fill="#00a8e1"
                    />
                  </AreaChart>
                </div>
              ) : null}
            </Grid>
            <Grid item md={6} className="paddingBottom">
              {this.state.actualResponse.length > 0 ? (
                <div
                  style={{ width: "80%", height: 300, alignContent: "right" }}
                >
                  <p className="alignCenter">Quarterly Money Distribution</p>
                  <LineChart
                    width={600}
                    height={350}
                    data={data}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="Entertainment"
                      stroke="#ffa600"
                    />
                    <Line
                      type="monotone"
                      dataKey="eCommerce"
                      stroke="#003f5c"
                    />
                    <Line
                      type="monotone"
                      dataKey="Finance"
                      dot={<CustomizedDot />}
                      stroke="#7a5195"
                    />
                    <Line dataKey="Travel" stroke="#ef5675" />
                  </LineChart>
                </div>
              ) : null}
            </Grid>
            <Grid item md={6} className="paddingBottom">
              {this.state.actualResponse.length > 0 ? (
                <div
                  style={{ width: "80%", height: 300, alignContent: "right" }}
                >
                  <p className="alignCenter">USD Spent</p>
                  <BarChart
                    width={650}
                    height={350}
                    data={this.state.actualMoneyResponse}
                    margin={{
                      top: 20,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="service" />
                    <YAxis />
                    <Bar
                      dataKey="moneyspent"
                      fill="#8884d8"
                      shape={<TriangleBar />}
                      label={{ position: "top" }}
                    >
                      {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={colors[index % 20]} />
                      ))}
                    </Bar>
                  </BarChart>
                </div>
              ) : null}
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
}

export default App;

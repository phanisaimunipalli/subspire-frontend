// import axios from "axios";
// import React, { useState, useEffect } from "react";
// import { Bar } from "react-chartjs-2";

// export const options = {
//   responsive: true,
//   plugins: {
//     legend: {
//       position: "top",
//     },
//     title: {
//       display: true,
//       text: "Chart.js Bar Chart",
//     },
//   },
// };

// const DynamicChart = () => {
//   // const [chartData, setChartData] = useState({
//   //   labels: [],
//   //   datasets: [
//   //     {
//   //       data: [],
//   //     },
//   //   ],
//   // });
//   const [chartData, setChartData] = useState({
//     labels: [],
//     datasets: [
//       {
//         label: [],
//         data: [],
//         backgroundColor: "gold",
//       },
//     ],
//   });

//   const [empSal, setEmpSal] = useState([]);
//   const [empAge, setEmpAge] = useState([]);
//   const [employeeSalary, setEmployeeSalary] = useState([]);
//   const [employeeAge, setEmployeeAge] = useState([]);
//   //   const isCancelled = React.useRef(false);

//   //   const Chart = (isMounted) => {};
//   useEffect(() => {
//     let isMounted = true;
//     // let empSal = [];
//     // let empAge = [];

//     axios
//       .get("http://dummy.restapiexample.com/api/v1/employees")
//       .then((res) => {
//         console.log(res);
//         for (const dataObj of res.data.data) {
//           setEmpSal(parseInt(dataObj.employee_salary));
//           setEmpAge(parseInt(dataObj.employee_age));
//           // empSal.push(parseInt(dataObj.employee_salary));
//           // empAge.push(parseInt(dataObj.employee_age));
//         }
//         console.log("empAge: ", empAge);
//         console.log("empSal: ", empSal);

//         if (isMounted) {
//           setChartData({
//             type: "bar",
//             labels: empAge ? empAge.map : null,
//             datasets: [
//               {
//                 label: "level of thicceness",
//                 data: empSal,
//                 backgroundColor: [
//                   "rgba(255, 99, 132, 0.2)",
//                   "rgba(54, 162, 235, 0.2)",
//                   "rgba(255, 206, 86, 0.2)",
//                   "rgba(75, 192, 192, 0.2)",
//                   "rgba(153, 102, 255, 0.2)",
//                   "rgba(255, 159, 64, 0.2)",
//                   "rgba(255, 99, 132, 0.2)",
//                   "rgba(54, 162, 235, 0.2)",
//                   "rgba(255, 206, 86, 0.2)",
//                   "rgba(75, 192, 192, 0.2)",
//                   "rgba(153, 102, 255, 0.2)",
//                   "rgba(255, 159, 64, 0.2)",
//                   "rgba(255, 99, 132, 0.2)",
//                   "rgba(54, 162, 235, 0.2)",
//                   "rgba(255, 206, 86, 0.2)",
//                   "rgba(75, 192, 192, 0.2)",
//                   "rgba(153, 102, 255, 0.2)",
//                   "rgba(255, 159, 64, 0.2)",
//                   "rgba(255, 99, 132, 0.2)",
//                   "rgba(54, 162, 235, 0.2)",
//                   "rgba(255, 206, 86, 0.2)",
//                   "rgba(75, 192, 192, 0.2)",
//                   "rgba(153, 102, 255, 0.2)",
//                   "rgba(255, 159, 64, 0.2)",
//                 ],
//                 borderColor: [
//                   "rgba(255, 99, 132, 1)",
//                   "rgba(54, 162, 235, 1)",
//                   "rgba(255, 206, 86, 1)",
//                   "rgba(75, 192, 192, 1)",
//                   "rgba(153, 102, 255, 1)",
//                   "rgba(255, 159, 64, 1)",
//                   "rgba(255, 99, 132, 1)",
//                   "rgba(54, 162, 235, 1)",
//                   "rgba(255, 206, 86, 1)",
//                   "rgba(75, 192, 192, 1)",
//                   "rgba(153, 102, 255, 1)",
//                   "rgba(255, 159, 64, 1)",
//                   "rgba(255, 99, 132, 1)",
//                   "rgba(54, 162, 235, 1)",
//                   "rgba(255, 206, 86, 1)",
//                   "rgba(75, 192, 192, 1)",
//                   "rgba(153, 102, 255, 1)",
//                   "rgba(255, 159, 64, 1)",
//                   "rgba(255, 99, 132, 1)",
//                   "rgba(54, 162, 235, 1)",
//                   "rgba(255, 206, 86, 1)",
//                   "rgba(75, 192, 192, 1)",
//                   "rgba(153, 102, 255, 1)",
//                   "rgba(255, 159, 64, 1)",
//                 ],
//                 borderWidth: 1,
//               },
//             ],
//           });
//         }
//       })
//       .catch((err) => {
//         console.log(err);
//       });

//     return () => {
//       isMounted = false;
//     };
//     console.log("chartData: ", chartData);
//   }, []);
//   return (
//     <div className="App">
//       <h1>Bar Chart</h1>
//       <div>
//         {chartData !== null && (
//           <Bar
//             data={chartData && chartData.map}
//             options={{
//               responsive: true,
//               title: { text: "THICCNESS SCALE", display: true },
//               scales: {
//                 yAxes: {
//                   ticks: {
//                     beginAtZero: true,
//                   },
//                 },
//               },
//             }}
//           />
//         )}
//       </div>
//     </div>
//   );
// };

// export default DynamicChart;

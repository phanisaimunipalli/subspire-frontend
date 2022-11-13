import PlotChart from "./PlotChart";

function App() {
  const barChartConfig = {
    type: "bar",
    data: {
      labels: ["Africa", "Asia", "Europe", "Latin America", "North America"],
      datasets: [
        {
          label: "Population (millions)",
          backgroundColor: [
            "#3e95cd",
            "#8e5ea2",
            "#3cba9f",
            "#e8c3b9",
            "#c45850",
          ],
          data: [2478, 5267, 734, 784, 433],
        },
      ],
    },
    options: {
      title: {
        display: true,
        text: "Predicted world population (millions) in 2050",
      },
    },
  };

  const lineChartConfig = {
    type: "line",
    data: {
      labels: ["Africa", "Asia", "Europe", "Latin America", "North America"],
      datasets: [
        {
          label: "Population (millions)",
          backgroundColor: [
            "#3e95cd",
            "#8e5ea2",
            "#3cba9f",
            "#e8c3b9",
            "#c45850",
          ],
          data: [2478, 5267, 734, 784, 433],
        },
      ],
    },
    options: {
      title: {
        display: true,
        text: "Predicted world population (millions) in 2050",
      },
    },
  };
  return (
    <>
      <div className="chart-container">
        <h3>Bar Chart</h3>
        <PlotChart data={barChartConfig.data} type={barChartConfig.type} />
      </div>

      <div className="chart-container">
        <h3>Line Chart</h3>
        <PlotChart data={lineChartConfig.data} type={lineChartConfig.type} />
      </div>
    </>
  );
}

export default App;

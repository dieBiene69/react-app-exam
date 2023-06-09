import "./App.css";
import { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import Header from "./components/Header";

function App() {
  const [tempSeries, setTempSeries] = useState([]);
  const [humSeries, setHumSeries] = useState([]);
  const [lightSeries, setLightSeries] = useState([]);
  const [dates, setDates] = useState([]);
  const [dataSeries, setDataSeries] = useState([]);


  // Updates the data series
  const updateData = () => {
    setDataSeries([

      {
        name: "Temperature",
        data: tempSeries,
      },
      {
        name: "Humidity",
        data: humSeries,
      },
      {
        name: "Light",
        data: lightSeries,
      },
    ]);
  };

  // Upon loading the page, load in data from file or server
  useEffect(() => {
    fetch("/Values")
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        const chartData = data.map((obj) => {
          return {
            temp: obj["temp"],
            hum: obj["hum"],
            light: obj["light"],
            date: new Date(obj["date"]).toLocaleString(),
          };
        });
        //toFixed rundet auf die zweite Nachkommastelle
        setTempSeries(chartData.map((obj) => obj.temp.toFixed(2)));
        setHumSeries(chartData.map((obj) => obj.hum.toFixed(2)));
        setLightSeries(chartData.map((obj) => obj.light));
        setDates(chartData.map((obj) => obj.date));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // if "tempSeries" is updated, we should also update the graph data
  useEffect(() => {
    updateData();
  }, [tempSeries, humSeries, lightSeries]);


  // ApexCharts needs some default options to know what to show
  const options = {

    colors: ['#ff6347', '#7ac5cd', '#ffb90f'],
    chart: {
      height: 350,
      type: "area",
      background: "#f5f5f5",
      fontFamily: "Helvetica,Arial, sans-serif",
      foreColor: "grey",
    },
    dataLabels: {
      enabled: true,
    },
    stroke: {
      show: true,
      curve: 'smooth',
      lineCap: 'butt',
      colors: undefined,
      width: 0,
      dashArray: 0,
    },
    noData: {
      text: "Loading...",
    },
    xaxis: {
        style: {
          fontSize: "14px",
          fontWeight: 600,
          fontFamily: "Helvetica,Arial, sans-serif",
          color: "#333333",
        },
      categories: dates,
    },
    yaxis: {
        style: {
          fontSize: "14px",
          fontWeight: 600,
          fontFamily: "Helvetica,Arial, sans-serif",
          color: "#333333",
            
        },
      },
    };

    return (
      <div className="App">
        <Header />
        <Chart
          options={{
            ...options,
            title: { text: "All values" },
            xaxis: {
              ...options.xaxis,
              categories: dates,
            },
          }}
          series={dataSeries}
          type="area"
          height={350}
        />
        <Chart
          options={{
            ...options,
            title: { text: "Temperature" },
            colors: ["#ff6347"],
            xaxis: {
              ...options.xaxis,
              categories: dates,
            },
          }}
          series={[{ name: "Temperature", data: tempSeries }]}
          type="area"
          height={350}
        />
        <Chart
          options={{
            ...options,
            title: { text: "Humidity" },
            colors: ["#7ac5cd"],
            xaxis: {
              ...options.xaxis,
              categories: dates,
            },
          }}
          series={[{ name: "Humidity", data: humSeries }]}
          type="area"
          height={350}
        />
        <Chart
          options={{
            ...options,
            title: { text: "Light" },
            colors: ["#ffb90f"],
            xaxis: {
              ...options.xaxis,
              categories: dates,
            },
          }}
          series={[{ name: "Light", data: lightSeries }]}
          type="area"
          height={350}
        />
      </div>
    );
    return (
      <div className="App">
        <Header />
        <Chart
          options={{
            ...options,
            title: { text: "All values" },
            xaxis: {
              ...options.xaxis,
              categories: dates,
            },
          }}
          series={dataSeries}
          type="area"
          height={350}
        />
        <Chart
          options={{
            ...options,
            title: { text: "Temperature" },
            colors: ["#ff6347"],
            xaxis: {
              ...options.xaxis,
              categories: dates,
            },
          }}
          series={[{ name: "Temperature", data: tempSeries }]}
          type="area"
          height={350}
        />
        <Chart
          options={{
            ...options,
            title: { text: "Humidity" },
            colors: ["#7ac5cd"],
            xaxis: {
              ...options.xaxis,
              categories: dates,
            },
          }}
          series={[{ name: "Humidity", data: humSeries }]}
          type="area"
          height={350}
        />
        <Chart
          options={{
            ...options,
            title: { text: "Light" },
            colors: ["#ffb90f"],
            xaxis: {
              ...options.xaxis,
              categories: dates,
            },
          }}
          series={[{ name: "Light", data: lightSeries }]}
          type="area"
          height={350}
        />
      </div>
    );
        
}

export default App;

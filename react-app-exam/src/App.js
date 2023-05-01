import "./App.css";
import { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import Header from "./components/Header";
//import Home from "./pages/Home";

function App() {

 
  const [tempSeries, setTempSeries] = useState([]);
  const [humSeries, setHumSeries] = useState([]);
  const [lightSeries, setLightSeries] = useState([]);
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
  // In this example, it just loads a static file from the "public" folder
  useEffect(() => {
    fetch("/Values")
      .then(function(response) {
        return response.json()
      }).then(function(data) {

        //NEU!!
      console.log(data)
        const chartData =data.map((obj)=>{
          return{
            temp: obj["temp"],
            hum: obj["hum"],
            light: obj["light"],
          };
        });
        setTempSeries(chartData.map((obj) => obj.temp));
        setHumSeries(chartData.map((obj) => obj.hum));
        setLightSeries(chartData.map((obj) => obj.light));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  /*    // Fetch data from ESP32
    fetch("http://your_esp32_ip_address/data")
      .then((response) => response.json())
      .then((data) => {
        // Extract temperature and time data
        const temperature = data.temperature;
        const time = data.time;*/

  // if "tempSeries" is updated, we should also update the graph data
  useEffect(() => {
    updateData();
  }, [tempSeries, humSeries, lightSeries]);

  // ApexCharts needs some default options to know what to show
  const options = {
    chart: {
      height: 350,
      type: "area",
    },
    dataLabels: {
      enabled: true,
    },
    stroke: {
      curve: "smooth",
    },
    noData: {
      text: "Loading...",
    },
    xaxis: {
      title: {
        text: "Zeit",
      },
    },
    yaxis: {
      title: {
        text: "Temperatur / Luftfeuchtigkeit / Licht",
      },
    },
  };
  return (
    <div className="App">
      <Header/>
      <Chart options={options} series={dataSeries} type="area" height={350} />
      
    </div>
  );
}

export default App;

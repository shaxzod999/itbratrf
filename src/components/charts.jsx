import ReactApexChart from "react-apexcharts";
import "./css/custom.css";
const Charts = () => {
  const chartOptions = {
    series: [
      {
        name: "Статистика",
        data: [10, 41, 35, 51, 49, 62],
      },
    ],
    options: {
      chart: {
        height: 195,
        type: "line",
        zoom: {
          enabled: false,
        },
      },
      colors: ['#777777'], // Set the color of the line
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "straight",
        width: 2, // Set the thickness of the line
      },
      markers: {
        size: 3, // Size of the marker points
        colors: ['#777777'], // Color of the marker points
        strokeColors: '#777777', // Border color of the marker points
        strokeWidth: 2, // Border width of the marker points
        hover: {
          size: 7, // Size of the marker points on hover
        },
      },
      title: {
        text: "Статистика",
        align: "left",
      },
      grid: {
        row: {
          colors: ["#760000", "#760000"], // takes an array which will be repeated on columns
          opacity: 0.2,
        },
      },
      xaxis: {
        categories: ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"],
      },
      tooltip: {
        theme: 'dark', // Set the theme to dark
        style: {
          backgroundColor: '#777777000', // Set the background color to black
          color: '#ffffff', // Set the text color to white
        },
      },
      annotations: {
        xaxis: [
          {
            x: "Пн",
            borderColor: '#777777',
            
          },
          {
            x: "Вт",
            borderColor: '#777777',
            
          },
          {
            x: "Ср",
            borderColor: '#777777',
            
          },
          {
            x: "Чт",
            borderColor: '#777777',
            
          },
          {
            x: "Пт",
            borderColor: '#777777',
            
          },
          {
            x: "Сб",
            borderColor: '#777777',
            
          },
          {
            
            borderColor: '#777777',
           
          }
        ]
      }
    },
  };
  
  
  

  return (
    <div>
      <div id="chart">
        <ReactApexChart
          options={chartOptions.options}
          series={chartOptions.series}
          type="line"
          height={295}
        />
      </div>
      <div id="html-dist"></div>
    </div>
  );
};

export default Charts;

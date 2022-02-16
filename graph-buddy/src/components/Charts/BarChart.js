import React from 'react';
import {Line} from 'react-chartjs-2'
import {
    Chart as ChartJS,
    defaults
  } from 'chart.js';
  import {
    Chart
  } from 'react-chartjs-2';

const BarChart = () => {
    return (
        <Line
  
  data={{
    labels: ['Jun', 'Jul', 'Aug', 'sf'],
    datasets: [
      {
        id: 1,
        label: '',
        data: [5, 6, 7,10],
      },
      {
        id: 2,
        label: '',
        data: [3, 2, 1, 4],
      },
    ],
  }}
/>
    );
};

export default BarChart;
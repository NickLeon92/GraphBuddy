import { Line } from 'react-chartjs-2'
import {Chart as ChartJS} from 'chart.js/auto'

const LineChart = (props) => {

  return (
    <Line
      data={{
        labels: props.l,
        datasets: [
          {
            label: props.title,
            data: props.d,
            backgroundColor: '#ff6384',
            borderColor: 'rgb(75, 192, 192)'
          },
        ],
      }}
    />
  );
};

export default LineChart;
import { Line } from 'react-chartjs-2'
import {Chart as ChartJS} from 'chart.js/auto'

const LineChart = (props) => {

  return (
    <Line
      data={{
        labels: props.l,
        datasets: [
          {
            label: '',
            data: props.d,
          },
        ],
      }}
    />
  );
};

export default LineChart;
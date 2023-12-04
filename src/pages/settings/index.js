import React, { useEffect, useState } from 'react';
import { DatePicker } from 'antd';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import JSAlert from 'js-alert';
import itemService from 'services/itemService';
import dayjs from 'dayjs';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const convertTime = (timestamp) => {
  const date = new Date(timestamp * 1000);
  const formattedTime = date.toLocaleString();
  return formattedTime
}

const disableTime = (current) => {
  return current && current > dayjs().endOf('day');
}

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Chart.js Line Chart',
    },
  },
};
    

const Settings = () => {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState(() => {
    return {
      labels: [],
      datasets: [
        {
          label: 'Dataset 1',
          data: [],
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
      ],
    }
  
  })
  const [time, setTime] = useState(() => {
    const time_from = dayjs().hour(0).minute(0).second(0).millisecond(0);
    const time_till = dayjs()
    return [time_from, time_till]
  })

  const handleDatePickerChange = (value, dateString) => {
    console.log(value);
    setTime([value[0], value[1]]);
  }
  


  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      const response = await itemService.getHistory(
        47063, 
        Math.floor(time[0]['$d'].getTime() / 1000), 
        Math.floor(time[1]['$d'].getTime() / 1000), 
      )
      
      if(response.error)
      {
        JSAlert.alert("Error", response.error.data)
        setLoading(false)
      }
      let labels = []
      let dataSet = []
      response.result.forEach(item => {
        labels.push(convertTime(item.clock))
        dataSet.push(Number(item.value))
      })
      console.log(labels)
      console.log(dataSet)
      setData({
        labels : labels,
        datasets: [
          {
            label: 'Dataset 1',
            data: dataSet,
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
          },
        ],
      })
      setLoading(false)
    }
    fetchData()
  }, [time])


  return (
    <>
      <Line options={options} data={data} />;
      <DatePicker.RangePicker showTime defaultValue={time} onChange={handleDatePickerChange} disabledDate={disableTime}/>
    </>
  )
};
export default Settings;
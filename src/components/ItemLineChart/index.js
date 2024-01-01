import React, { useEffect, useState } from "react";
import { DatePicker, Statistic, Col, Row, Space } from "antd";
import { LikeOutlined } from "@ant-design/icons";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import JSAlert from "js-alert";
import itemService from "services/itemService";
import dayjs from "dayjs";

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
  return formattedTime;
};

const disableTime = (current) => {
  return current && current > dayjs().endOf("day");
};

const ItemLineChart = ({ item, isLabel = true }) => {
  console.log(item)
  const [data, setData] = useState(() => {
    return {
      labels: [],
      datasets: [
        {
          label: "Dataset 1",
          data: [],
          borderColor: "rgb(255, 99, 132)",
          backgroundColor: "rgba(255, 99, 132, 0.5)",
        },
      ],
    };
  });
  const [time, setTime] = useState(() => {
    const delay = Number(item.delay.slice(0, -1));
    const delay_unit = item.delay[item.delay.length - 1];
    console.log(delay);
    console.log(delay_unit);
    const time_till = dayjs();
    let time_from = dayjs().subtract(1, "d");
    if (delay_unit === "m") {
      time_from = dayjs().subtract(100 * delay, "m");
    } else if (delay_unit === "h") {
      time_from = dayjs().subtract(100 * delay, "h");
    } else if (delay_unit === "d") {
      time_from = dayjs().subtract(100 * delay, "d");
    } else if (delay_unit === "s") {
      time_from = dayjs().subtract(100 * delay, "s");
    }
    return [time_from, time_till];
  });

  const options = {
    
  };

  const handleDatePickerChange = (value, dateString) => {
    console.log(value);
    setTime([value[0], value[1]]);
  };

  useEffect(() => {
    const fetchData = async () => {
      const history = await itemService.getHistory(
        item,
        Math.floor(time[0]["$d"].getTime() / 1000),
        Math.floor(time[1]["$d"].getTime() / 1000)
      );
      console.log(item)
      console.log(history);

      let labels = [];
      let dataSet = [];
      history.result.forEach((i) => {
        labels.push(convertTime(i.clock));
        
        switch (item.units) {
          case "GB":
            dataSet.push(Number(i.value) / 1024 / 1024 / 1024); // Convert from bytes to gigabytes
            break;
          case 'Mbps':
            dataSet.push(Number(i.value) / 1024 / 1024); // Convert from bytes to megabytes
            break;
          default:
              dataSet.push(Number(i.value));
        }
      });
      setData({
        labels: isLabel ? labels : labels.map(() => ""),
        datasets: [
          {
            label: isLabel ? item.name + " (" + item.units + ")" : "",
            data: dataSet,
            borderColor: "rgb(255, 99, 132)",
            backgroundColor: "rgba(255, 99, 132, 0.5)",
          },
        ],
      });
    };
    fetchData();
  }, [time]);

  return (
    <>
      <Line options={options} data={data} />
      <Space
        style={{
          width: "100%",
          justifyContent: "center",
        }}
        align="center"
        size={24}
      >
        {isLabel && (
          <>
            <DatePicker.RangePicker
              showTime
              defaultValue={time}
              onChange={handleDatePickerChange}
              disabledDate={disableTime}
            />
            <Statistic
              title="Max"
              value={Math.max(...data.datasets[0].data)}
              precision={2}
            />
            <Statistic
              title="Min"
              value={Math.min(...data.datasets[0].data)}
              precision={2}
            />
            <Statistic
              title="Avg"
              value={
                data.datasets[0].data.reduce((a, b) => a + b, 0) /
                data.datasets[0].data.length
              }
              precision={2}
            />
          </>
        )}
      </Space>
    </>
  );
};
export default ItemLineChart;

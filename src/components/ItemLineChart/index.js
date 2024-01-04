import React, { useEffect, useState } from "react";
import { DatePicker, Statistic, Col, Row, Space, Tabs } from "antd";
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
  console.log(item);
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
  const [trend, setTrend] = useState(() => {
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
    console.log([time_from, time_till]);
    return [time_from, time_till];
  });

  const [trendTime, setTrendTime] = useState([]);
  const [reload, setReload] = useState(false);

  const options = {};

  const handleDatePickerChange = (value, dateString) => {
    console.log(value);
    setTime([value[0], value[1]]);
    setReload(!reload);
  };

  const handleDatePickerChangeTrendTime = (value, dateString) => {
    console.log(value);
    setTrendTime([value[0], value[1]]);
    setReload(!reload);
  };

  useEffect(() => {
    const fetchData = async () => {
      console.log(trendTime)
      const history = await itemService.getHistory(
        item,
        Math.floor(time[0]["$d"].getTime() / 1000),
        Math.floor(time[1]["$d"].getTime() / 1000),
        10
      );
      let trend = null;
      console.log(trendTime)
      if (trendTime.length === 0) {
        trend = await itemService.getTrends(item, "", "", 10);
      } else {
        trend = await itemService.getTrends(
          item,
          Math.floor(trendTime[0]["$d"].getTime() / 1000),
          Math.floor(trendTime[1]["$d"].getTime() / 1000)
        );
      }
      console.log(item);
      console.log(history);
      console.log(trend);


      if (trend.result.length === 0) {
      } else {
        setTrendTime([
          dayjs(convertTime(trend.result[trend.result.length - 1].clock)),
          dayjs(convertTime(trend.result[0].clock)),
        ]);
      }
        let trendLabels = [];
        let trendSetAvg = [];
        let trendSetMin = [];
        let trendSetMax = [];
        trend.result.forEach((i) => {
          trendLabels.push(convertTime(i.clock));

          switch (item.units) {
            case "GB":
              trendSetAvg.push(Number(i.value_avg) / 1024 / 1024 / 1024); // Convert from bytes to gigabytes
              trendSetMax.push(Number(i.value_max) / 1024 / 1024 / 1024); // Convert from bytes to gigabytes
              trendSetMin.push(Number(i.value_min) / 1024 / 1024 / 1024); // Convert from bytes to gigabytes
              break;
            case "MB":
                trendSetAvg.push(Number(i.value_avg) / 1024 / 1024); // Convert from bytes to megabytes
                trendSetMax.push(Number(i.value_max) / 1024 / 1024); // Convert from bytes to megabytes
                trendSetMin.push(Number(i.value_min) / 1024 / 1024); // Convert from bytes to megabytes
                break;
            case "KB":
                trendSetAvg.push(Number(i.value_avg) / 1024); // Convert from bytes to kilobytes
                trendSetMax.push(Number(i.value_max) / 1024); // Convert from bytes to kilobytes
                trendSetMin.push(Number(i.value_min) / 1024); // Convert from bytes to kilobytes
                break;
            case "Mbps":
              trendSetAvg.push(Number(i.value_avg) / 1024 / 1024); // Convert from bytes to megabytes
              trendSetMax.push(Number(i.value_max) / 1024 / 1024); // Convert from bytes to megabytes
              trendSetMin.push(Number(i.value_min) / 1024 / 1024); // Convert from bytes to megabytes
              break;
            default:
              trendSetAvg.push(Number(i.value_avg));
              trendSetMax.push(Number(i.value_max));
              trendSetMin.push(Number(i.value_min));
          }

          
        });
        setTrend({
          labels: isLabel ? trendLabels : trendLabels.map(() => ""),
          datasets: [
            {
              label: isLabel
                ? item.name + " (" + item.units + ")" + "_AVG"
                : "",
              data: trendSetAvg,
              borderColor: "#fec4a3",
              backgroundColor: "#fec4a3",
            },
            {
              label: isLabel
                ? item.name + " (" + item.units + ")" + "_MAX"
                : "",
              data: trendSetMax,
              borderColor: "#92b9e5",
              backgroundColor: "#92b9e5",
            },
            {
              label: isLabel
                ? item.name + " (" + item.units + ")" + "_MIN"
                : "",
              data: trendSetMin,
              borderColor: "#c588ea",
              backgroundColor: "#c588ea",
            },
          ],
        });
      

      let labels = [];
      let dataSet = [];
      history.result.forEach((i) => {
        labels.push(convertTime(i.clock));

        switch (item.units) {
          case "GB":
            dataSet.push(Number(i.value) / 1024 / 1024 / 1024); // Convert from bytes to gigabytes
            break;
          case "MB":
            dataSet.push(Number(i.value) / 1024 / 1024); // Convert from bytes to megabytes
            break;
          case "KB":
            dataSet.push(Number(i.value) / 1024); // Convert from bytes to kilobytesw
            break;
          case "Mbps":
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
            borderColor: "#6c7de2",
            backgroundColor: "#6c7de2",
          },
        ],
      });
    };
    fetchData();
  }, [time, reload]);

  return (
    <>
      <Tabs
        defaultActiveKey="1"
        centered
        items={new Array(2).fill(null).map((_, i) => {
          const id = String(i + 1);
          if (id === "1")
            return {
              label: `History`,
              key: id,
              children: (
                <>
                  <Line
                    style={{
                      marginBottom: "24px",
                    }}
                  options={options} data={data} />
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
              ),
            };
          else
            return {
              label: `Trend`,
              key: id,
              children: (
                <>
                  <Line
                    style={{
                      marginBottom: "24px",
                    }}
                  options={options} data={trend} />
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
                          defaultValue={trendTime}
                          onChange={handleDatePickerChangeTrendTime}
                          disabledDate={disableTime}
                        />
                      </>
                    )}
                  </Space>
                </>
              ),
            };
        })}
      />
    </>
  );
};
export default ItemLineChart;

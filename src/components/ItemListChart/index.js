import React, { useEffect, useState } from 'react';
import JSAlert from 'js-alert';
import itemService from 'services/itemService';
import dayjs from 'dayjs';
import { DatePicker, List, Typography, Space } from 'antd';


const convertTime = (timestamp) => {
  const date = new Date(timestamp * 1000);
  const formattedTime = date.toLocaleString();
  return formattedTime
}
    
const disableTime = (current) => {
    return current && current > dayjs().endOf('day');
  }

const ItemListChart = ({item}) => {
    console.log(item)
  const [data, setData] = useState(() => [])
  
  const [time, setTime] = useState(() => {
    const delay = Number(item.delay.slice(0, -1))
    const delay_unit = item.delay[item.delay.length - 1]
    console.log(delay)
    console.log(delay_unit)
    const time_till = dayjs();
    console.log(convertTime(time_till.unix()))
    let time_from = dayjs().subtract(1, 'd');
    if(delay_unit === "m"){
      time_from = dayjs().subtract(10 * delay, 'm');
      console.log(convertTime(time_till.unix()))
      console.log(convertTime(time_from.unix()))
    }else if(delay_unit === "h"){
      time_from = dayjs().subtract(10 * delay, 'h');
    }else if(delay_unit === "d"){
      time_from = dayjs().subtract(10 * delay, 'd');
    }else if(delay_unit === "s"){
      time_from = dayjs().subtract(10 * delay, 's');
    }
    console.log(convertTime(time_from.unix()))
    return [time_from, time_till];
  });

  const handleDatePickerChange = (value, dateString) => {
    console.log(value);
    setTime([value[0], value[1]]);
  }

  useEffect(() => {
    const fetchData = async () => {
      const response = await itemService.getHistory(
        item, 
        Math.floor(time[0]['$d'].getTime() / 1000), 
        Math.floor(time[1]['$d'].getTime() / 1000), 
      )
      if(response.error)
      {
        JSAlert.alert("Error", response.error.data)
        return
      }
      console.log(response)
      setData(response.result.map(item => {
        return {
            clock: convertTime(item.clock),
            value: item.value
        }
      }))
    }
    fetchData()
  }, [time])


  return (
    <Space
        direction="vertical"
        style={{
            width: '100%',
        }}

    >
        <List
                style={{
                    width: '100%',
                }}
                pagination={true}
                bordered
                dataSource={data}
                renderItem={(item) => (
                  <List.Item>
                    <Typography.Text mark>{`${item.clock}`}</Typography.Text> {item.value}
                  </List.Item>
                )}
              />
        <Space
            style={{
                width: '100%',
                justifyContent: 'center'
            }}
        >
            <DatePicker.RangePicker
           showTime defaultValue={time} onChange={handleDatePickerChange} disabledDate={disableTime}
          />
        </Space>
    </Space>
  )
};
export default ItemListChart;
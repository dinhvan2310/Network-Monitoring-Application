import { useEffect, useState } from "react";
import problemService from "services/problemService";
import { Timeline, Space, Tag } from 'antd';
import { ClockCircleOutlined } from '@ant-design/icons';
import hostService from "services/hostService";
import { useNavigate } from "react-router-dom";

const convertTime = (timestamp) => {
    const date = new Date(timestamp * 1000);
    const formattedTime = date.toLocaleString();
    return formattedTime;
}

const PRIORITIES = {
    0: "Not classified",
    1: "Information",
    2: "Warning",
    3: "Average",
    4: "High",
    5: "Disaster"
}

const PRIORITIES_COLOR = {
    0: "#8c9ac5",
    1: "#2d99ae",
    2: "#c9b150",
    3: "#e67e22",
    4: "#e74c3c",
    5: "#9b59b6"
}

function Problem({item}) {
    const navigate = useNavigate()
    const [data, setData] = useState()
    useEffect(() => {
        const fetchData = async () => {
            let problem
            if(!item) {
                const hosts = await hostService.getHosts()
                if(hosts.error) return navigate("/login")
                const hostsid = (hosts).result.map((item) => [item.hostid, item.name])
                console.log(hostsid)
                const problems = hostsid.map(async (problem) => {
                    const problem_ = await problemService.getProblemByHost(problem[0])
                    return {
                        ...problem_,
                        name: problem[1]
                    }
                })
                problem = await Promise.all(problems)
                console.log(problem)
            }else{
                problem = await problemService.getProblemByHost(item.key)
            }
            console.log(problem)
            if (!item) {
                const rs = problem.map(i => {
                    const rss = i.result.map(ii => {
                        return {
                            label: (
                                <Space
                                >
                                    <Tag color="red">{i.name}</Tag>
                                    <p>{convertTime(ii.clock)}</p>
                                </Space>
                            ),
                            dot: <ClockCircleOutlined style={{ fontSize: '16px', color: 'red'}} />,
                            children: (
                                <>
                                    <Space
                                        direction="horizontal"
                                        style={{ width: "100%" }}
                                    >
                                        <p>{ii.name}</p>
                                        <Tag color={PRIORITIES_COLOR[ii.severity]}>{PRIORITIES[ii.severity]}</Tag>
                                        {ii.r_clock !== '0' ? 
                                            <Space direction="vertical">
                                                <Tag color="green">Resolved</Tag>
                                                <p>{convertTime(ii.r_clock)}</p>
                                            </Space>
                                        : null}
                                    </Space>
                                    
                                    
                                </>
                            )
                        }
                    })
                    console.log(rss)
                    return rss
                })
                console.log(rs)
                setData(rs.flat())
            } 
            else {
                const rs = problem.result.map((item) => {
                    console.log(item)
                    return {
                        label:  convertTime(item.clock),
                        dot: <ClockCircleOutlined style={{ fontSize: '16px', color: 'red'}} />,
                        children: (
                            <>
                                <Space
                                    direction="horizontal"
                                    style={{  backgroundColor: PRIORITIES_COLOR[item.severity],
                                            padding: "12px", borderRadius: "12px"
                                }}
                                >
                                    <p>{item.name}</p>
                                    <Tag color={PRIORITIES_COLOR[item.severity]}>{PRIORITIES[item.severity]}</Tag>
                                    {item.r_clock !== '0' ? 
                                        <Space direction="vertical">
                                            <Tag color="green">Resolved</Tag>
                                            <p>{convertTime(item.r_clock)}</p>
                                        </Space>
                                    : null}
                                </Space>
                                
                                
                            </>
                        )
                    }
                })
                setData(rs)
            }
        }
        fetchData()
    }, [])


    return ( 
        <>
            <Timeline
                mode="left"
                items={data}
            />
        </>
     );
}

export default Problem;
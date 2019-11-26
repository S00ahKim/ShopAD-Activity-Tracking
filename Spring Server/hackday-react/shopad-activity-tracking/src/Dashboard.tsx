import React, { useState, useEffect } from 'react';
import DashboardHeader from "./component/DashboardHeader";

import axios from "axios";
import moment from 'moment';

import { Link } from "react-router-dom";

import Table from 'antd/es/table';
import Row from 'antd/es/row';
import Col from 'antd/es/col';
import Avatar from 'antd/es/avatar';
import Tag from 'antd/es/tag';

import './style/Dashboard.css';

interface DashboardProps {
    numOfAppend: number
    setNumOfAppend: any
    numOfAppendTotal : number
    setNumOfAppendTotal : any
    renderData: any
    setRenderData: any
}

const Dashboard: React.FC<DashboardProps> = (props) => {
    const [renderData, setRenderData] = useState([]);
    const [viewModeIdx, setViewModeIdx] = useState<Number>(0);
    const [selectedLogSeqIdx, setSelectedLogSeqIdx] = useState<Number>(0);
    const columns = [
        {
            key: 'logIdx',
            title: '액티비티 번호',
            dataIndex: 'logIdx', 
            render: (text_a: any) => <a>#{text_a}</a>,
        },
        {
            key: 'logSeqIdx',
            title: '액티비티 로그 순서',
            dataIndex: 'logSeqIdx',
            render: (text: any) => <Link to={'/dashboard/seq/' + text}  onClick={() => {
                setSelectedLogSeqIdx(text);
            }}>#{text}</Link>,
        },
        {
            key: 'userIdx',
            title: '회원 번호',
            dataIndex: 'userIdx',
            render: (text: any) => <div>
                <Row>
                    <Col span={16}><Avatar icon="user" /></Col>
                </Row>
                <Row>
                    <Col span={16}><span>User #{text}</span></Col>
                </Row>
            </div>

        },
        {
            key: 'type',
            title: '로그 종류',
            dataIndex: 'type',
            render: (text: any) =>
                text == 0 ? <Tag color="blue">최초 접속</Tag> :
                    text == 1 ? <Tag color="volcano">Append</Tag> :
                        text == 2 ? <Tag color="green">카테고리 선택</Tag> :
                            <Tag></Tag>
        },
        {
            key: 'type',
            title: '카테고리',
            dataIndex: 'categoryName',
            render: (text: any) =>
                <Tag color="gray">{text}</Tag>
        },
        {
            key: 'numOfAppend',
            title: '해당 카테코리 내 Append 횟수',
            dataIndex: 'numOfAppend',
            render: (text: any) => <span>{text}번</span>,
        },
        {
            key: 'numOfAppendTotal',
            title: '총 Append 횟수',
            dataIndex: 'numOfAppendTotal',
            render: (text: any) => <span>{text}번</span>,
        },
        {
            key: 'timestamp',
            title: '로그 시간',
            dataIndex: 'timestamp',
            render: (text: any) => <span>{moment(text).format('YYYY-MM-DD / HH:mm:ss')}</span>,
        },
        {
            key: 'duration',
            title: '지속 시간',
            dataIndex: 'duration',
            render: (text: any) => <span>{moment.utc(text * 1000).format('HH:mm:ss')}</span>,
        },
    ]

    const fetchDashBoardData = () => {
        axios.get('http://localhost:8080/log')
            .then((response) => {
                setRenderData(response.data.data);
            });
    }

    useEffect(() => {
        fetchDashBoardData();
    }, []);

    useEffect(() => {
        console.log(renderData);
    }, [renderData]);

    return (
        <div>
            <DashboardHeader row={Row} col={Col} selectedHeaderIndex={0} />
            <Row>
                <Col span={20} offset={2}>
                    {
                        renderData != null ?
                            <Table columns={columns} dataSource={renderData} />
                            : null
                    }
                </Col>
            </Row>
        </div>
    );
};

export default Dashboard;
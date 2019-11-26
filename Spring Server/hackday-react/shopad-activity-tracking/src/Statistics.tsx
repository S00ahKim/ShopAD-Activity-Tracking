
/// <reference types="react-vis-types" />
import React, { useState, useEffect } from 'react';
import DashboardHeader from "./component/DashboardHeader";

import axios from "axios";
import moment from 'moment';

import { Link } from "react-router-dom";
import Row from 'antd/es/row';
import Col from 'antd/es/col';

import {
    XYPlot,
    XAxis,
    YAxis,
    VerticalGridLines,
    HorizontalGridLines,
    VerticalBarSeries,
    VerticalBarSeriesCanvas,
    LabelSeries
} from 'react-vis';


import './style/Dashboard.css';
import { render } from 'react-dom';

interface StatisticsProps {
    numOfAppend: number
    setNumOfAppend: any
    numOfAppendTotal: number
    setNumOfAppendTotal: any
    renderData: any
    setRenderData: any
}

const Statistics: React.FC<StatisticsProps> = (props) => {
    const [renderData, setRenderData] = useState();

    const greenData = [{ x: 'A', y: 10 }, { x: 'B', y: 5 }, { x: 'C', y: 15 }];

    const blueData = [{ x: 'A', y: 12 }, { x: 'B', y: 2 }, { x: 'C', y: 11 }];

    const labelData = greenData.map((d, idx) => ({
        x: d.x,
        y: Math.max(greenData[idx].y, blueData[idx].y)
    }));

    useEffect(() => {
        fetchStatClickData();
    },[]);
    
    const fetchStatClickData = () => {
        axios.get('http://localhost:8080/stat/click')
            .then((response) => {
                const res = response.data.data;
                setRenderData(res);
            });
    }
    

    return (
        <div>
            <DashboardHeader row={Row} col={Col} selectedHeaderIndex={1} />
            <Row>
                <Col span={8} offset={6}>
                    <XYPlot xType="ordinal" width={600} height={400} xDistance={100}>
                        <VerticalGridLines />
                        <HorizontalGridLines />
                        <XAxis />
                        <YAxis />
                        <VerticalBarSeries data={renderData} />
                    </XYPlot>
                </Col>
            </Row>
        </div>
    );
};

export default Statistics;
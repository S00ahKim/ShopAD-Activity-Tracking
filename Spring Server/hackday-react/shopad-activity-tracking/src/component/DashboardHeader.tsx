
import React from "react";

import '../style/DashboardHeader.css';
import { Link } from "react-router-dom";

interface DashboardHeaderProps {
    row : any,
    col : any,
    selectedHeaderIndex : number,
}

const DashboardHeader: React.FC<DashboardHeaderProps> = (props) => {

    const Row = props.row;
    const Col = props.col;

    return (
        <Row id="horizontal_category_text" className="horizontal_category_text dashboard" role="tablist">
            <Col offset={8} span={4} className="dashboard_list">
            <Link to='/dashboard'>
                <a href="#" className="link" role="tab" 
                aria-selected={props.selectedHeaderIndex == 0? true : false}>
                    로그</a>
                </Link>
            </Col>
            <Col span={4}className="dashboard_list">
                <Link to='/dashboard/stat'>
                    <a href="#" className="link" role="tab" 
                aria-selected={props.selectedHeaderIndex == 1? true : false}>
                통계</a>
               </Link>
            </Col>
        </Row>
    );

}

export default DashboardHeader;
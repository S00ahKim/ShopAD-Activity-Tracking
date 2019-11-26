import React, { useState, useEffect } from 'react';
import DashboardHeader from "./component/DashboardHeader";
import CategoryHeader from "./component/CategoryHeader";
import ContentsList from "./component/ContentsList";
import axios from "axios";
import moment from 'moment';

import { RouteComponentProps } from "react-router-dom";


import './style/Dashboard.css';

interface DashboardByLogSeqProps {

}

const DashboardByLogSeq = (props: RouteComponentProps<{seqIdx : string}>) => {

    return (
        <div>
            <span>{props.match.params.seqIdx}</span>
        </div>
    );
};

export default DashboardByLogSeq;
import React, { useState } from "react";
import axios from "axios";

import Header from "../component/Header";
import CategoryHeader from "../component/CategoryHeader";
import ContentsList from "../component/ContentsList";

const UserLog: React.FC = () => {
    // 카테고리 정의 (초기값 HOT)
    const [categoryId, setCategoryId] = useState("00000000");

    const url = '/log_send'
    
    function handleClick(event: React.MouseEvent) {
        let date: Date = new Date();  
        const tgt = event.target as HTMLElement;
        console.log('사용자 클릭', event.clientX, event.clientY, event.type, event.target, date)
        const logData = {
            cltX:event.clientX,
            cltY:event.clientY,
            eventType:event.type,
            eventTarget:tgt.outerHTML,
            eventDate:date
        };
        axios.post(url, logData)
            .then(res => console.log('Data send'))
            .catch(err => console.log(err))
    }

    function handleContext(event: React.MouseEvent) {
        let date: Date = new Date();  
        console.log('사용자 우클릭', event.clientX, event.clientY, event.type, event.target, date)
    }

    function handleWheel(event: React.WheelEvent) {
        let date: Date = new Date();  
        console.log('휠 내리기', event.type, event.deltaY, date)
    }

    return (
        <div onClick={handleClick} onContextMenu={handleContext} onWheel={handleWheel}> 
            <Header/>
            <CategoryHeader categoryId={categoryId} setCategoryId={setCategoryId}/>
            <ContentsList categoryId={categoryId}/>
        </div>
    )
        
        
}

export default UserLog;
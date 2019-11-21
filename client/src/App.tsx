import React, { useState } from 'react';

import Header from "./component/Header";
import CategoryHeader from "./component/CategoryHeader";
import ContentsList from "./component/ContentsList";

interface AppProps {
    userId: string
}

const App: React.FC<AppProps> = ({userId}) => {
    // 카테고리 정의 (초기값 HOT)
    const [categoryId, setCategoryId] = useState("00000000");
    return (
        <div id="content" className="trendpick womens sw_content">
            <Header />
            <CategoryHeader categoryId={categoryId} setCategoryId={setCategoryId}/>
            <ContentsList categoryId={categoryId} userId={userId}/>
        </div>
    );
};

export default App;

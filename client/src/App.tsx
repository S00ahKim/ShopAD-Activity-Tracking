import React from 'react';
import UserLog from './component/UserLog';

interface AppProps {
    userId: string
}

const App: React.FC<AppProps> = ({userId}) => {
    return (
        <div id="content" className="trendpick womens sw_content">
            <UserLog />
        </div>
    );
};

export default App;

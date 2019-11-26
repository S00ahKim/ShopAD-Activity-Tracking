import * as React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import App from "./App";
import Dashboard from "./Dashboard";
import DashboardByLogSeq from "./DashboardByLogSeq";
import Statistics from "./Statistics";

interface IProps { }

const Router: React.FC<IProps> = () => {

    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={App}/>       
                <Switch>
                    <Route  exact = {true} path="/dashboard" component={Dashboard}/>
                    <Route path="/dashboard/stat" component={Statistics}/>
                    <Route path="/dashboard/seq/:seqIdx" component={DashboardByLogSeq}/>
                </Switch>          
            </Switch>
        </BrowserRouter>
    );
};

export default Router;
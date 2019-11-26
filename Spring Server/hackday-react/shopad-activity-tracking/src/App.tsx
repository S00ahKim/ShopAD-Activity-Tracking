import React, {useState, useEffect} from 'react';
import Header from "./component/Header";
import CategoryHeader from "./component/CategoryHeader";
import ContentsList from "./component/ContentsList";
import Dashboard from './Dashboard';
import axios from "axios";
import { Prompt } from 'react-router';


interface AppProps {
    userId: string
}

const App: React.FC<AppProps> = ({userId}) => {

    const [categoryId, setCategoryId] = useState("00000000");
    const [categoryName, setCategoryName] = useState("HOT");
    const [numOfAppend, setNumOfAppend] = useState<number>(0);
    const [numOfAppendTotal, setNumOfAppendTotal] = useState<number>(0);
    const [renderData, setRenderData] = useState([]);
    const [clickData, setClickData] = useState();
    const [logSeqIdx, setLogSeqIdx] = useState<number>(0);
    const [currentLogIdx, setCurrentLogIdx] = useState<number>(0);


    /**
     *  최초 접속 시 (Type : INITIAL)
     */
    /*
    useEffect(() => {
        fetchLog("INITIAL", "");
        setLogSeqIdx(logSeqIdx + 1);
    },[]);
    */

    /**
     *  스크롤에 의한 페이지 추가 시 (Type : APPEND)
     */
    useEffect(() => {
        fetchLog("APPEND", numOfAppendTotal.toString());
        if(numOfAppendTotal != 0){
            setLogSeqIdx(logSeqIdx + 1);
        }
    },[numOfAppendTotal]);

    /**
     *  카테고리 헤더 클릭 시 (Type : HEADER_CLICK)
     */
    useEffect(() => {
        if(categoryName != null && categoryName != '' && categoryName != 'HOT') {
            setNumOfAppend(0);
            fetchLog("HEADER_CLICK", categoryName);
        }
    },[categoryName]);

    /**
     *  아이템 클릭 시 (Type : )
     */
    useEffect(() => {
        if(logSeqIdx > 0){
            fetchLog("ITEM_CLICK", clickData.productName)
        }
    },[clickData]);

    /**
     * 로그 Fetch
     * axios
     */
    /*
    const fetchLog = (type : number) => {
            axios.post('http://localhost:8080/log', {
                logIdx : 0,
                userIdx : 0,
                numOfAppend: numOfAppend,
                numOfAppendTotal : numOfAppendTotal,
                timestamp : new Date(),
                type : type,
                logSeqIdx : logSeqIdx,
                categoryName : categoryName,
                token : sessionStorage.getItem('token')
              })
              .then(function (response) {
                const token =  response.data.data.token;
                setCurrentLogIdx(response.data.data.logIdx);

                sessionStorage.setItem('token', token);
                fetchLogItemView(renderData, currentLogIdx);

              })
              .catch(function (error) {
                console.log(error);
              });
            };

            */
            const fetchLog = (actionType : string, value : any) => {
                axios.post('http://localhost:8080/log', {
                    logIdx : 0,
                    userIdx : 0,
                    numOfAppend: numOfAppend,
                    numOfAppendTotal : numOfAppendTotal,
                    timestamp : new Date(),
                    actionType : actionType,
                    logSeqIdx : logSeqIdx,
                    categoryName : categoryName,
                    token : sessionStorage.getItem('token'),
                    value : value
                  })
                  .then(function (response) {
                    const token =  response.data.data.token;
                    setCurrentLogIdx(response.data.data.logIdx);
                    sessionStorage.setItem('token', token);
                    //fetchLogItemView(renderData, currentLogIdx);
                    console.log(response);
    
                  })
                  .catch(function (error) {
                    console.log(error);
                  });
                };

    /**
     * 로그 아이템 뷰 Fetch
     * axios
     */
    const fetchLogItemView = (renderData : any, logIdx : number) => {
        const logItemViewReq : any[] = [];

        renderData.map((r : any)=>{
            logItemViewReq.push({            
                productIdx : r.productId,
                productName : r.productName,
                channelIdx : r.channelNo,
                channelName : r.channelNm,
                categoryIdx : r.categoryId,
                imageUrl : r.productImage.imageUrl,
                url : r.productUrl,
                logIdx : logIdx
            })
        })
        
        axios.post('http://localhost:8080/log/itemView', logItemViewReq)
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    };

    /**
     * 로그 클릭 뷰 Fetch
     * axios
     */
    const fetchLogItemClick = (c : any, logIdx : number) => {
        let logItemClickReq : any;

        logItemClickReq = {
            productIdx : c.productId,
            productName : c.productName,
            channelIdx : c.channelNo,
            channelName : c.channelNm,
            categoryIdx : c.categoryId,
            imageUrl : c.productImage.imageUrl,
            url : c.productUrl,
            logIdx : logIdx
        }
        
        axios.post('http://localhost:8080/log/itemClick', logItemClickReq)
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    };

    return (
        <div>
            <div id="content" className="trendpick womens sw_content">
                <Header />
                <CategoryHeader categoryId={categoryId} setCategoryId={setCategoryId}
                categoryName={categoryName} setCategoryName={setCategoryName}
                numOfAppend={numOfAppend} setNumOfAppend={setNumOfAppend}/>
                <ContentsList categoryId={categoryId} 
                numOfAppend={numOfAppend} setNumOfAppend = {setNumOfAppend}
                numOfAppendTotal={numOfAppendTotal} setNumOfAppendTotal={setNumOfAppendTotal}
                renderData={renderData} setRenderData = {setRenderData}
                clickData = {clickData} setClickData = {setClickData}/>
            </div>
            <div style={{display : "none"}}>
                <Dashboard numOfAppend={numOfAppend} setNumOfAppend={setNumOfAppend}
                numOfAppendTotal={numOfAppendTotal} setNumOfAppendTotal={setNumOfAppendTotal}
                renderData={renderData} setRenderData = {setRenderData}/>
            </div>
        </div>

    );
};

export default App;

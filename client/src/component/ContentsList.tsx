/* eslint-disable */

import React, {useEffect, useState} from "react";
import axios from "axios";
import {Contents} from "../model/Contents";
import {GridLayout} from "@egjs/react-infinitegrid";

interface ContentsListProps { //여기에 프롭스 미리 써둠 (그래야 전달 가능)
    categoryId: string,
    userId: string
}

interface LogData {
    userId: string, //사용자 아이디
    actionType: string, // 액션 타입
    actionTime: Date, // 액션 발생 시각 - UTC(-Z) 라서 차이가 좀 생김. 보통 timestamp로 전달하는 이유
    clientX: number, // 위치
    clientY: number,
    pageX: number, //위치 (페이지)
    pageY: number,
    wheelPosition: number, // 마우스 스크롤 위or아래
    category: string, // 카테고리
    page: number, // 페이지
    productId: string, // 상품아이디
    channelNm: string, // 가게아이디
    productName: string // 상품이름
}

const ContentsList: React.FC<ContentsListProps> = (props) => {

    const [contents, setContents] = useState<Contents[]>([]);
    const [page, setPage] = useState<number>(0);
    let log = {
        userId: props.userId, //사용자 아이디
        actionType: 'reloaded', // 액션 타입
        actionTime: new Date(), // 액션 발생 시각
        clientX: -1, // 위치
        clientY: -1,
        pageX: -1, //위치 (페이지)
        pageY: -1,
        wheelPosition: 0, // 마우스 스크롤 위or아래
        category: props.categoryId, // 카테고리
        page: page, // 페이지
        productId: '', // 상품아이디
        channelNm: '', // 가게아이디
        productName: ''
    } //prevent undefined
    const [LogData, setLogData] = useState<LogData>(log);

    /**
     *  카테고리ID가 변경시 해당 카테고리의 첫 페이지의 내용으로 새롭게 그린다.
     */
    useEffect(() => {
        loadItem(1, props.categoryId, true);
        let log = {
            userId: props.userId, //사용자 아이디
            actionType: 'category_changed', // 액션 타입
            actionTime: new Date(), // 액션 발생 시각
            clientX: -1, // 위치
            clientY: -1,
            pageX: -1, //위치 (페이지)
            pageY: -1,
            wheelPosition: 0, // 마우스 스크롤 위or아래
            category: props.categoryId, // 카테고리
            page: page, // 페이지
            productId: '', // 상품아이디
            channelNm: '', // 가게아이디
            productName: ''
        }
        setLogData(log)
    }, [props.categoryId]);

    /**
     * 페이지 변경시 해당 카테고리의 다음 페이지 내용으로 기존 리스트에 추가 한다.
     */
    useEffect(() => {
        loadItem(page, props.categoryId, false);
        let log = {
            userId: props.userId, //사용자 아이디
            actionType: 'page_changed', // 액션 타입
            actionTime: new Date(), // 액션 발생 시각
            clientX: -1, // 위치
            clientY: -1,
            pageX: -1, //위치 (페이지)
            pageY: -1,
            wheelPosition: 0, // 마우스 스크롤 위or아래
            category: props.categoryId, // 카테고리
            page: page, // 페이지
            productId: '', // 상품아이디
            channelNm: '', // 가게아이디
            productName: ''
        }
        setLogData(log)
    }, [page]);

    /**
     * 로그를 서버에 전송하는 함수
     */
    useEffect(() => {
        console.log(LogData, 'send')
        if (LogData) {
            axios.post('http://localhost:5000/log_send', LogData)
            .then(res => console.log('Data send')) // res 받으면
            .catch(err => console.log(err))
        }
    }, [LogData])

    function handleClick(event: React.MouseEvent, contents:Contents) {
        let log = {
            userId: props.userId, //사용자 아이디
            actionType: event.type, // 액션 타입
            actionTime: new Date(), // 액션 발생 시각
            clientX: event.clientX, // 위치
            clientY: event.clientY,
            pageX: event.pageX, //위치 (페이지)
            pageY: event.pageY,
            wheelPosition: 0, // 마우스 스크롤 위or아래
            category: props.categoryId, // 카테고리
            page: page, // 페이지
            productId: contents.productId, // 상품아이디
            channelNm: contents.channelNm, // 가게아이디
            productName: contents.productName
        }
        setLogData(log)
    }

    function handleContext(event: React.MouseEvent, contents:Contents) {
        let log = {
            userId: props.userId, //사용자 아이디
            actionType: event.type, // 액션 타입
            actionTime: new Date(), // 액션 발생 시각
            clientX: event.clientX, // 위치
            clientY: event.clientY,
            pageX: event.pageX, //위치 (페이지)
            pageY: event.pageY,
            wheelPosition: 0, // 마우스 스크롤 위or아래
            category: props.categoryId, // 카테고리
            page: page, // 페이지
            productId: contents.productId, // 상품아이디
            channelNm: contents.channelNm, // 가게아이디
            productName: contents.productName
        }
        setLogData(log)
    }

    function handleWheel(event: React.WheelEvent) {
        let log = {
            userId: props.userId, //사용자 아이디
            actionType: event.type, // 액션 타입
            actionTime: new Date(), // 액션 발생 시각
            clientX: -1, // 위치
            clientY: -1,
            pageX: -1, //위치 (페이지)
            pageY: -1,
            wheelPosition: event.deltaY, // 마우스 스크롤 위or아래
            category: props.categoryId, // 카테고리
            page: page, // 페이지
            productId: '', // 상품아이디
            channelNm: '', // 가게아이디
            productName: ''
        }
        setLogData(log)
    }
    
    /**
     * 기존 상용 API 를 호출하기 위한 모듈입니다.
     * api 내용 분석은 하실 필요가 없습니다.
     */
    const loadItem = (page: number, categoryId: string, initialize: boolean) => {
        let param = {
            "page": page
            ,"pageSize":20
            ,"sortField":"allScore.exposeIndex"
            ,"sortType":"ASC"
            ,"filter": (categoryId === "00000000")? {}:{"catIdLv1": categoryId}
            ,"expsTrtrCd":"000566"
        };

        if(page > 0) {
            axios.post('https://toptop.naver.com/m/api/v1/product/category', param).then(res => {
                if(res.data) {
                    let c = res.data.content.map((c: Contents) => renderItem(c));
                    if(initialize) {
                        setContents(c);
                    } else {
                        setContents(contents.concat(c));
                        let loaded_items:any = []
                        c.forEach((element:any) => {
                            loaded_items.push(element.key)
                        });
                        var ls_str = loaded_items.join(",");
                        let log = {
                            userId: props.userId, //사용자 아이디
                            actionType: 'view', // 액션 타입
                            actionTime: new Date(), // 액션 발생 시각
                            clientX: -1, // 위치
                            clientY: -1,
                            pageX: -1, //위치 (페이지)
                            pageY: -1,
                            wheelPosition: 0, // 마우스 스크롤 위or아래
                            category: props.categoryId, // 카테고리
                            page: page, // 페이지
                            productId: ls_str, // 상품아이디
                            channelNm: '', // 가게아이디
                            productName: ''
                        }
                        setLogData(log)
                    }
                }
            })
        }
    };

    /**
     * GridLayout 이 threshold 이하로 스크롤이 내려갔을때 불려지는 함수 입니다.
     */
    const onAppend = (params: any) => {
        params.startLoading();

        setPage(page + 1);
    };

    /**
     * GridLayout 의 레이아웃이 완료 되었을때 불려지는 함수 입니다. (다 그렸을 때, 계속 어펜드되는 것을 막기 위함)
     */
    const onLayoutComplete = (params: any) => {
        !params.isLayout && params.endLoading();
    };

    /**
     * 상품을 그리기 위한 함수입니다.
     * 기존 상용의 css 적용을 위한 className 및 tag 구조를 가져갔습니다.
     */
    const renderItem = (contents: Contents) => {
        return (
            <li className="item goods" key={contents.productId} onClick={(event) => handleClick(event, contents)} onContextMenu={(event) => handleContext(event, contents)} onWheel={handleWheel}>
                <div className="item_group">
                    <div className="thmb_area"><img src={contents.productImage.imageUrl} alt={contents.channelNm}/></div>
                    <div className="goodsinfo_area">
                        <p className="ellipsis">{contents.productName}</p>
                        <strong className="sign_tit "><span>{contents.channelNm}</span></strong>
                    </div>
                    <a href={contents.productUrl} target="_blank" className="item_group_link" rel="noopener noreferrer">바로가기</a>
                </div>
            </li>
        )
    };

    /*
        GridLayout 은
        https://naver.github.io/egjs-infinitegrid/
        https://github.com/naver/egjs-infinitegrid/tree/master/packages/react-infinitegrid
        을 참고 하기 바랍니다.
     */
    return (
        <div className="sw_lstitem">
            <GridLayout
                tag="ul"
                onAppend={param => onAppend(param)}
                onLayoutComplete={param => onLayoutComplete(param)}
                threshold={200}
            >
                {contents}
            </GridLayout>
        </div>
    );

};

export default ContentsList;
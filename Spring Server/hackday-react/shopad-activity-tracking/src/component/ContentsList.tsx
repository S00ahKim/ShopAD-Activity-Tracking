/* eslint-disable */

import React, {useEffect, useState} from "react";
import axios from "axios";
import {Contents} from "../model/Contents";
import {GridLayout} from "@egjs/react-infinitegrid";

interface ContentsListProps {
    categoryId: string
    numOfAppend : number
    setNumOfAppend : any
    numOfAppendTotal : number
    setNumOfAppendTotal : any
    renderData : any
    setRenderData : any,
    clickData : any
    setClickData : any
}

const ContentsList: React.FC<ContentsListProps> = (props) => {

    const [contents, setContents] = useState<Contents[]>([]);
    const [page, setPage] = useState<number>(0);
    const [isOut, setIsOut] = useState<boolean>(false);
    const [tempList, setTempList] = useState<any>([]);
    const [temp, setTemp] = useState<any>();

    /**
     *  카테고리ID가 변경시 해당 카테고리의 첫 페이지의 내용으로 새롭게 그린다.
     */
    useEffect(() => {
        loadItem(1, props.categoryId, true);
    }, [props.categoryId]);

    /**
     * 페이지 변경시 해당 카테고리의 다음 페이지 내용으로 기존 리스트에 추가 한다.
     */
    useEffect(() => {
        loadItem(page, props.categoryId, false);
    }, [page]);


    const addItems = (content : any) => {       
         setTempList(content);
      };

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
                    addItems(res.data.content);
                    props.setRenderData(tempList);
                   
                    let c = res.data.content.map((c: Contents) => renderItem(c));
                    if(initialize) {
                        setContents(c);
                    } else {
                        setContents(contents.concat(c));
                    }
                }
            })
        }
    };

    /**
     * GridLayout 이 threshold 이하려 스크롤이 내려갔을때 불려지는 함수 입니다.
     */
    const onAppend = (params: any) => {
        params.startLoading();

        setPage(page + 1);
        if(page > 0) props.setNumOfAppendTotal(props.numOfAppendTotal + 1)
    };

    /**
     * GridLayout 의 레이아웃이 완료 되었을때 불려지는 함수 입니다.
     */
    const onLayoutComplete = (params: any) => {
        !params.isLayout && params.endLoading();
    };

    const itemOnClickHandler = (contents : Contents) => {
        props.setClickData(contents);
    }

    /**
     * 상품을 그리기 위한 함수입니다.
     * 기존 상용의 css 적용을 위한 className 및 tag 구조를 가져갔습니다.
     */
    const renderItem = (contents: Contents) => {
        return (
            <li className="item goods" key={contents.productId}>
                <div className="item_group">
                    <div className="thmb_area"><img src={contents.productImage.imageUrl} alt={contents.channelNm}/></div>
                    <div className="goodsinfo_area">
                        <p className="ellipsis">{contents.productName}</p>
                        <strong className="sign_tit "><span>{contents.channelNm}</span></strong>
                    </div>
                    <a href={contents.productUrl} target="_blank" className="item_group_link" rel="noopener noreferrer"
                    onClick={()=>{itemOnClickHandler(contents)}}>바로가기</a>
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
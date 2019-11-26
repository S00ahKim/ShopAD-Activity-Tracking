/* eslint-disable */

import React from "react";

import {CategoryDummy} from "../data/DummyData";
import {Category} from "../model/Category";

interface CategoryHeaderProps {
    categoryId: string,
    setCategoryId: any,
    categoryName : string,
    setCategoryName : any
    numOfAppend : number,
    setNumOfAppend : any
}

const CategoryHeader: React.FC<CategoryHeaderProps> 
    = ({categoryId, setCategoryId, categoryName, setCategoryName,
    numOfAppend, setNumOfAppend}) => {

    // 카테고리 리스트 Item render
    const renderCategoryItem = (category: Category) => {
        const isSelected = categoryId === category.id;
        return (
            <li role="tab" aria-selected={isSelected} key={category.id}>
                <a href="#" className={category.iconName} onClick={e => {
                    setCategoryId(category.id);
                    setCategoryName(category.name);
                    setNumOfAppend(0);
                    }}>
                    <span className="img_category"/><em>{category.name}</em>
                </a>
            </li>
        )
    };

    return (
        <div className="category_circle_bg_area" style={{overflowX:"auto",WebkitOverflowScrolling:"touch"}}>
            <div className="category_box" id="category_list_wrap">
                <ul role="tablist" className="category" id="category_list_ul">
                    {/* /src/data/DummyData 기반으로 카테고리를 구현 */}
                    {CategoryDummy.map(c => renderCategoryItem(c))}
                </ul>
            </div>
        </div>
    );

};

export default CategoryHeader;
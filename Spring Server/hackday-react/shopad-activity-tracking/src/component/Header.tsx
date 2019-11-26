/* eslint-disable */

import React from "react";


const Header: React.FC = () => {
    return (
        <ul id="horizontal_category_text" className="horizontal_category_text" role="tablist">
            <li className="tab_list womens" role="presentation">
                <a href="#" className="link" role="tab" aria-selected="true">우먼</a>
            </li>
            <li className="tab_list mens" role="presentation">
                <a href="#" className="link" role="tab" aria-selected="false">멘즈</a>
            </li>
            <li className="tab_list cody_set" role="presentation">
                <a href="#" className="link" role="tab" aria-selected="false">코디셋</a>
            </li>
        </ul>
    );

}

export default Header;
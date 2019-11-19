import * as React from 'react';
import * as ReactDOM from 'react-dom';
/* import { render } from "react-dom";
    react-dom 모듈 중 특정한 것만 가지고 올 때 이렇게 쓴다.
    여러 개 가지고 올 때는 콤마로 구분
*/
import App from './App';

ReactDOM.render(<App userId={'shopad'}/>, document.getElementById('root'));

/* 
const rootElement: HTMLElement = document.getElementById("root");
render(<App userId={'shopad'}/>, rootElement);

: ~ 는 "타입"을 기술한 것 (위의 코드에서 해당 타입은 안 써도 됨)

타입스크립트는 값을 "추론"해서 타입을 넣어주기 때문에 안 써도 되는 경우가 있긴 한데
함수의 리턴 타입을 명시하지 않았을 경우 이렇게 받을 때 명시하기도 함
any라는 타입은 다 사용 가능하다 (그럼 왜 타입스크립트를 쓰는 걸까... 자바스크립트 화)
*/
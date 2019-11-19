export interface Contents {
    productId: string,              // 상품ID
    channelNm: string,              // 채널이름
    productImage : ProductImage,    // 상품이미지 정보
    productName: string,            // 상품이름
    productUrl: string              // 상품 URL
}

/* 
    (1) 타입을 정의하기 위한 interface 사용. (type 변수 쓸 수 있으나, 혼용은 지양)
        위의 인터페이스 Contents는 5개의 property를 받으며, 프로퍼티 타입도 지정 가능함
        렌더링할 때 필요한 프롭스를 빠뜨리면 오류가 난다.
        무엇이 필요한지 모를 경우 ctrl+space
    
    (2) 프로퍼티를 옵션으로 하기 위해서는 프로퍼티이름? 등으로 쓰면 됨

    (3) 컴포넌트가 특정 함수를 props로 받아와야 한다면 
        onClick: (name: string) => void; 이 경우 아무것도 리턴하지 않는다는 함수를 의미
        return <Greetings name="Hello" onClick={onClick} />; 처럼 쓸 수 있음

    (4) const ContentsList: React.FC<ContentsListProps> = (props) => {
                            React.FC : 리액트의 함수 컴포넌트
    
    (5) props 의 타입을 Generics 로 넣어서 사용
        a. 장점: props에 기본적으로 children 들어가 있음 + defaultProps, propTypes, contextTypes 를 설정 할 때 자동완성
        b. 단점: 컴포넌트의 props 의 타입이 명백하지 않음. 
                컴포넌트는 children이 무조건 있어야/없어야 하는 경우도 있는데 
                처리하려면 Props 타입 안에 children 을 명시해야 함

                그리고 >>> defaultProps <<< 안 됨 (하드코딩하는 것처럼 줘야 함 ㅠㅠ))
                ex. const Greetings: React.FC<GreetingsProps> = ({ name, mark = '!' }) => (

                React.FC를 아예 삭제하면 잘 돌아가기 때문에 없애라는 팁도 존재함
                ex. const Greetings = ({ name, mark }: GreetingsProps) => (

                애로우 펑션 사용하지 않는 것도 최근 추세라고 함
                ex. function Greetings({ name, mark }: GreetingsProps) {

    (6) Hook
    const [isPlay, togglePlay] = React.useState(props.monitoring);
    togglePlay(!isPlay);
    이런 식으로 상태관리하는 것을 Hook이라고 하는 듯.
*/

export interface ProductImage {
    imageUrl: string
}
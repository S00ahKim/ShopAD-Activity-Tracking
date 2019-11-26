> User Activity Tracking Tool 개발

# 필독
 - 사전모임을 위한 이슈 확인 부탁드립니다.
   - https://github.com/NAVER-CAMPUS-HACKDAY/shopad-activity-tracking/issues

# 주제
 - 서비스의 정교한 효율 측정을 위한 유저 이용행태의 수집 및 리포팅 tool 개발을 통하여 웹서비스의 전반적인 이해도 및 개발능력을 측정하고자 합니다.

# 프로젝트 설명
 - 저희팀에서 가장 기본이 되는 쇼핑몰 리스팅 광고를 목업화 시켰습니다.
   - 실제 서비스 주소 : http://m.trend.shopping.naver.com/trendpick/index.nhn
 - 유저의 view, click 뿐만 아니라 여러 행태의 유저의 로그로 남기고, 다양하게 조합하여 의미 있는 데이터를 만드는고 표현 하는것이 목표 입니다.
   - 기본적인 HTTP 스펙 및 javascript 의 동작 방식의 이해를 통해 최대한 의미 있는 로그를 추출해주시면 됩니다. 
   - 로그를 남기는 방법은 자유입니다. (console, file, api, db, queue...)
 - 해당 프론트 모듈을 자유롭게 수정 개발하여, web framework 에 적용하여도 진행하여도 됩니다. (spring, node, flask ...)
 - 노출, 클릭 통계와 유저 트래킹 결과는 과제 결과를 설명할수 있는 방법을 찾아 data(text), ui등으로 자유롭게 표현하세요. (ui 필수 아님)
   - Request정보 및 react의 이벤트를 어떤 방식으론 남기는게 좋을지 생각해보시기 바랍니다.
   - 어떤기준으로 특정 유저의 유입과 이탈을 한번의 이용과정으로 생각할수 있는지 생각해보시기 바랍니다.
   - EX) 특정유저ID : in(시간) -> 스크롤(시간)-> 카테고리A클릭(시간) -> 스크롤(시간) -> 카테고리B클릭(시간) -> out(시간)
 
 # 프로젝트 구조
 - React (16.11.0)
  - react-create-app 기반 (https://github.com/facebook/create-react-app)
  - Hook 기반의 상태관리 (https://reactjs.org/docs/hooks-intro.html)
  - typescript (https://www.typescriptlang.org/docs/home.html)
 
# 사용법
 - React 프로젝트 구동
    `yarn run start`
 - 프로젝트내 각자의 branch 를 생성하여 코드 개발 진행

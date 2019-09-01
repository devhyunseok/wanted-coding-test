
## 사용한 주요 라이브러리
- [create-react-app](https://create-react-app.dev/)
- [typescript](https://www.typescriptlang.org/)
- [axios](https://github.com/axios/axios)
- [connected-react-router](https://github.com/supasate/connected-react-router)
- [react-modal](https://github.com/reactjs/react-modal)
- [react-redux](https://redux.js.org/basics/usage-with-react)
- [styled-component](https://www.styled-components.com/)
- [redux-saga](https://github.com/redux-saga/redux-saga)
- [redux-saga-test-plan](https://github.com/jfairbank/redux-saga-test-plan)

### 개선 / 문제 해결
- jobs API의 locations string[] 타입으로 문서에는 명시가 되어 있으나,
  string[]로 보내면 적용되지 않아 URLSearchParams를 사용하여 locations string 타입으로 중복 파라미터를 전송하였습니다.
- jobs API의 links의 next 항목에 year에 관한 값이 누락되는 것으로 의심됩니다.
  내부 상태값으로 가지고 있던 year값으로 임시 방편으로 처리하였습니다.

#### 질문 사항
- 과제 스펙 이미지에 있는 '적극 채용 중인 회사 리스트'의 경우,
  사이트 홈페이지를 확인해보니 /advertising/targeting api를 사용해야 할 것 같은데,
  제시 해주신 API 스펙에는 해당 API가 없어 스펙 아웃으로 판단하여 구현 하지 않았습니다.
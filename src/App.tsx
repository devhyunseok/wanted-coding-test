import React, { Fragment } from 'react';
import GlobalStyle from "./GlobalStyles";
import ActionButton from "./components/ActionButton";
import FlexHorizontalWrapper from "./components/flexList/FlexHorizontalWrapper";
import FilterModal from "./components/FilterModal";
import ReactModal from 'react-modal';

ReactModal.setAppElement('#root');

const App: React.FC = () => {
  return (
    <Fragment>
      <GlobalStyle/>
      <ActionButton text={'최신순'} textColor={'#0092fc'}/>
      <ActionButton subText={'국가'} text={'한국'} textColor={'#0092fc'}/>
      <ActionButton subText={'지역'} text={'전국'}/>
      <ActionButton subText={'경력'} text={'전체'}/>
      <ActionButton text={'필터'} textColor={'#0092fc'}/>
      <FlexHorizontalWrapper/>
      <FilterModal/>
    </Fragment>
  );
};

export default App;

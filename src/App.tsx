import React, {Fragment, useEffect, useState} from 'react';
import GlobalStyle from "./GlobalStyles";
import ActionButton from "./components/ActionButton";
import FlexHorizontalWrapper from "./components/flexList/FlexHorizontalWrapper";
import FilterModal from "./components/FilterModal";
import CounterContainer from "./containers/jobsContainers";
import styled from 'styled-components';
import {fetchJobFilters, GET_JOB_FILTERS_ASYNC} from 'sagas/jobSagaModules';
import { useDispatch } from "react-redux";

const App: React.FC = () => {
  const [isOpenFilterModal, setFilterModalVisible] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({type: GET_JOB_FILTERS_ASYNC});
  }, []);

  return (
    <AppWrapper>
      <GlobalStyle/>
      <FilterWrapper>
        <div>
          <ActionButton text={'최신순'} textColor={'#0092fc'} onClick={() => {
            setFilterModalVisible(true);
          }}/>
          <ActionButton subText={'국가'} text={'한국'} textColor={'#0092fc'} onClick={() => {
            setFilterModalVisible(true);
          }}/>
          <ActionButton subText={'지역'} text={'전국'} onClick={() => {
            setFilterModalVisible(true);
          }}/>
          <ActionButton subText={'경력'} text={'전체'} onClick={() => {
            setFilterModalVisible(true);
          }}/>
        </div>
        <ActionButton text={'필터'} icon={'equalizer'} textColor={'#0092fc'} onClick={() => {
          setFilterModalVisible(true);
        }}/>
      </FilterWrapper>
      <FlexHorizontalWrapper/>
      <FilterModal isOpen={isOpenFilterModal} setVisible={setFilterModalVisible} onClickCloseButton={() => {
        setFilterModalVisible(false);
      }}/>
      <CounterContainer/>
    </AppWrapper>
  );
};

const AppWrapper = styled.div`
  position: relative;
  max-width: 1060px;
  width: 90%;
  margin: 0 auto;
  padding: 20px 0 80px;
`;

const FilterWrapper = styled.div`
  top 50px;
  margin-bottom: 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export default App;

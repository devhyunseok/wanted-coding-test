import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import ActionButton from "components/ActionButton";
import FlexHorizontalWrapper from "components/flexList/FlexHorizontalWrapper";
import FilterModal from "containers/FilterModal";
import styled from 'styled-components';
import CompanyItem from 'components/flexList/CompanyItem';
import { useDispatch } from "react-redux";
import { fetchJobList } from 'sagas/jobSagaModules';
import queryString from 'query-string';

const JobsContainer = () => {
  const [isOpenFilterModal, setFilterModalVisible] = useState(false);
  const dispatch = useDispatch();
  const search: any = useSelector((state: any) => state.router.location.search);

  // useEffect(() => {
  //   const query = queryString.parse(search);
  //   const { country, job_sort, year, locations } = query;

  //   const jobListParams = {
  //     tag_type_id: 669,
  //     country: country,
  //     job_sort: job_sort,
  //     year: year,
  //     location: locations
  //   }

  //   dispatch(fetchJobList(jobListParams));
  // }, []);

  return (
  <AppWrapper>
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
    <FlexHorizontalWrapper>
      <CompanyItem title='asdas'/>
    </FlexHorizontalWrapper>
    <FilterModal isOpen={isOpenFilterModal} setVisible={setFilterModalVisible} onClickCloseButton={() => {
      setFilterModalVisible(false);
    }}/>
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

export default JobsContainer;

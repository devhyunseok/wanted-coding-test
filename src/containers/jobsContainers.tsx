import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import ActionButton from "components/ActionButton";
import FlexHorizontalWrapper from "components/flexList/FlexHorizontalWrapper";
import FilterModal from "containers/FilterModal";
import styled from 'styled-components';
import CompanyItem from 'components/flexList/CompanyItem';
import { useDispatch } from "react-redux";
import { fetchNextJobList } from 'sagas/jobSagaModules';
import { IJob } from 'dataStructure/IJob';
import { WANTED_URL } from 'api/apis';
import useInfiniteScroll from "components/flexList/useInfiniteScroll";

const JobsContainer = () => {
  const [isOpenFilterModal, setFilterModalVisible] = useState(false);
  const dispatch = useDispatch();

  const { jobList, next } = useSelector((state: any) => state.jobs);
  const [, setIsFetching] = useInfiniteScroll(fetchMoreListItems);

  const filter: any = useSelector((state: any) => state.jobFilter);
  const { jobSort, selectedYearKey, selectedCountry, selectedSortKey, selectedLocations, years } = filter;

  const selectedSort = jobSort.filter((item:any) => item.key === selectedSortKey);
  const selectedSortName = selectedSort.length > 0 ? selectedSort[0].display : '';
  const selectedCountryName = selectedCountry && typeof selectedCountry !== 'undefined' ? selectedCountry.display : '';
  const selectedLocationName = selectedLocations[0] && typeof selectedLocations[0] !== 'undefined' ? selectedLocations[0].display : 'All'; 
  const selectedYear = years.filter((item:any) => item.key === selectedYearKey);
  const selectedYearName = selectedYear.length > 0 ? selectedYear[0].display : '';

  function fetchMoreListItems() {
    if(next && typeof next !== 'undefined') {
      dispatch(fetchNextJobList({
        country: next.country,
        tag_type_id: next.tag_type_id,
        job_sort: next.job_sort,
        year: selectedYearKey, // TODO: link.next에서 넘어오는 값중에 year값이 없음.
        locations: next.locations,
        limit: next.limit,
        offset: next.offset
      }));
    }
  
    console.log('setIsFetching');
    setIsFetching(false);
  }

  return (
  <AppWrapper>
    <FilterWrapper>
      <div>
        <ActionButton text={selectedSortName} textColor={'#0092fc'} onClick={() => {
          setFilterModalVisible(true);
        }}/>
        <ActionButton subText={'국가'} text={selectedCountryName} textColor={'#0092fc'} onClick={() => {
          setFilterModalVisible(true);
        }}/>
        <ActionButton subText={'지역'} text={selectedLocationName} onClick={() => {
          setFilterModalVisible(true);
        }}/>
        <ActionButton subText={'경력'} text={selectedYearName} onClick={() => {
          setFilterModalVisible(true);
        }}/>
      </div>
      <ActionButton text={'필터'} icon={'equalizer'} textColor={'#0092fc'} onClick={() => {
        setFilterModalVisible(true);
      }}/>
    </FilterWrapper>
    <FlexHorizontalWrapper>
      {
        jobList && jobList.map(((item: IJob, index: number) => {
          return <CompanyItem key={index} position={item.position} bgImg={item.title_img.thumb}
          likeCount={item.like_count} href={`${WANTED_URL}/wd/${item.id}`} 
          companyInfo={{ name: item.company.name, country: item.address.country, location: item.address.location}}/>
        }))
      }
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

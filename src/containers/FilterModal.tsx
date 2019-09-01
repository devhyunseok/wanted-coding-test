import React, {MouseEventHandler, Fragment} from 'react';
import Modal from '../components/StyledModal';
import styled from 'styled-components';
import Icon from "../components/Icon";
import { useDispatch, useSelector } from 'react-redux';
import { setFilterUsed, selectJobSort, selectCountry, selectYear, selectLocation, resetJobFilter } from 'modules/jobFilterReducer';
import SelectBox from '../components/SelectBox';
import FilterItemButton from 'components/FilterItemButton';
import { push } from 'connected-react-router';
import makeFilterQueryString from 'modules/makeFilterQueryString';
import { fetchJobList } from 'sagas/jobSagaModules';

interface Props {
  isOpen: boolean;
  onClickCloseButton?: MouseEventHandler;
  setVisible: (isVisible: boolean) => void;
}

const locationsView = (selectedCountry: any, selectedLocations: any, dispatch: any, selectLocation: any) => {
  const locations = selectedCountry.locations;

  console.log(locations);
  console.log(selectedLocations);
  if(locations && locations.length === 0) {
    return null;
  }

  return (
    <Fragment>
      <HeaderTitle>지역</HeaderTitle>
      {
        locations && locations.map((item:any, index: number) => {
          return <FilterItemButton key={index} value={item} 
          isSelected={selectedLocations.includes(item)} 
          onClick={(e, value)=> dispatch(selectLocation(value))}
          >
          {item.display}
          </FilterItemButton>
        })
      }
    </Fragment>
  )
};

const FilterModal: React.FC<Props> = (props) => {
  const { isOpen, onClickCloseButton, setVisible } = props;
  const dispatch = useDispatch();
  const filter: any = useSelector((state: any) => state.jobFilter);
  const { countries, selectedCountry, selectedSortKey, jobSort, selectedYearKey, years, selectedLocations } = filter;
  
  const onClickReset = () => {
    dispatch(resetJobFilter());
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={() => { setVisible(false)}}
      // onAfterOpen={this.props.onAfterOpen.bind(this)}
      // overlayClassName={[styles.overlay, 'bootstrap-dialog', this.props.overlayClassName].join(' ')}
      // className={setDefaultIsNull(this.props.overrideClassName, [styles.dialogContent, this.props.className].join(' '))}>
>
      <Header>
        <Reset onClick={onClickReset}>
          <Icon icon={'spinner11'}/>초기화
        </Reset>
        <span>필터</span>
        <Close onClick={onClickCloseButton}>
          <Icon icon={'cross'}/>
        </Close>
      </Header>
      <Content>
          <SortWrapper>
            <HeaderTitle>정렬</HeaderTitle>
            <SelectBox value={selectedSortKey} options={jobSort} 
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => dispatch(selectJobSort(e.target.value))}/>
          </SortWrapper>
          <CountriesWrapper>
            <HeaderTitle>국가</HeaderTitle>
            {
              countries && countries.map((item:any, index: number) => {
                return <FilterItemButton key={index} value={item} 
                isSelected={item.key === selectedCountry.key} 
                onClick={(e, value)=> dispatch(selectCountry(value))}>{item.display}</FilterItemButton>
              })
            }
          </CountriesWrapper>
          <LocationsWrapper>
            { locationsView(selectedCountry, selectedLocations, dispatch, selectLocation) }
          </LocationsWrapper>
          <CareerYearWrapper>
            <HeaderTitle>경력</HeaderTitle>
            <SelectBox value={selectedYearKey} options={years} 
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => dispatch(selectYear(e.target.value))}/>
          </CareerYearWrapper>
          <SavedFilterWrapper>
            <CheckBox type="checkbox" 
            checked={filter.isUsingFilter}
            onChange={(e) => dispatch(setFilterUsed(e.target.checked))}
            />
            적용된 필터를 저장하고 유지합니다.
          </SavedFilterWrapper>
      </Content>
      <Footer>
        <SubmitButton onClick={() => {
          const queryString = makeFilterQueryString(selectedCountry.key, selectedSortKey, selectedYearKey, selectedLocations);

          dispatch(push(queryString));
          dispatch(fetchJobList({
            country: selectedCountry.key,
            tag_type_id: 669,
            job_sort: selectedSortKey,
            year: selectedYearKey,
            locations: selectedLocations.map((item:any) => item.key)
          }));
          setVisible(false);
        }}>적용</SubmitButton>
      </Footer>
    </Modal>
    )
};

const Header = styled.header`
  height: 54px;
  padding: 16px 20px;
  position: relative;
  border-bottom: 1px solid #eee;
  color: #333;
  text-align: center;
  font-size: 16px;
  font-weight: 600;
  word-wrap: break-word;
`;

const Reset = styled.button`
  position: absolute;
  top: 50%;
  right: 0;
  left 0;
  transform: translateY(-50%);
  padding: 15px;
  line-height: 0;
  font-size: 15px;
  font-weight: 600;
  color: #999;
  text-align: left;
`;

const Close = styled.button`
  position: absolute;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
  padding: 15px;
  line-height: 0;
`;

const Content = styled.div`
  max-height: calc(100vh - 295px);
  overflow-x: hidden;
  overflow-y: scroll;
  padding: 20px;
`;

const SortWrapper = styled.div`
  margin: 10px 0 30px;
`;

const CountriesWrapper = styled.div`
  margin: 10px 0 20px;
`;

const LocationsWrapper = styled.div`
  margin: 10px 0 20px;
`;

const CareerYearWrapper = styled.div`
  margin: 10px 0 30px;
`;

const SavedFilterWrapper = styled.div`
  font-size: 16px;
  font-weight: 600;
  text-align: left;
  color: #333;
  margin-bottom: 10px;
`;

const HeaderTitle = styled.h6`
  font-size: 16px;
  font-weight: 400;
  color: #999;
  margin: 0 0 10px;
`;

const CheckBox = styled.input`
  margin: 0 8px 0 0;
  line-height: normal;
  box-sizing: border-box;
  padding: 0;
  color: inherit;
  font: inherit;
  font-family: inherit;
  font-size: inherit;
`;

const Footer = styled.footer`
  padding: 20px;
  border-top: 1px solid #eee;
`;

const SubmitButton = styled.button`
  color: #fff;
  background: #238ff4;
  font-size: 18px;
  font-weight: 600;
  padding: 12px 20px;
  width: 100%;
  border-radius: 3px;
`;

export default FilterModal;

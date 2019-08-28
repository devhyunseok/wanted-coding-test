import React from 'react';
import styled from 'styled-components';
import ActiveRecruitItem from "./ActiveRecruitItem";

interface Props {
}

const FlexHorizontalWrapper: React.FC<Props> = (props) => {

  return (
    <Ul>
      <ActiveRecruitItem title={'사이트'}
                         subTitle={'11개 포지션'}
                         bgImg={''}
                         profileImg={''}
      />
    </Ul>
  );
};

const Ul = styled.ul`
  list-style: none;
`;

export default FlexHorizontalWrapper;

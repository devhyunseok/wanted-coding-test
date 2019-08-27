import React from 'react';
import styled from 'styled-components';
import FlexListItem from "./FlexListItem";

interface Props {
}

const FlexHorizontalWrapper: React.FC<Props> = (props) => {

  return (
    <Ul>
      <FlexListItem title={'원티드랩'}
                    bgImg={'https://static.wanted.co.kr/images/company/79/4qrmtohvtuusxbj6__1080_790.jpg'}
                    profileImg={'https://static.wanted.co.kr/images/wdes/0_5.f4c95760.png'}
      />
    </Ul>
  );
};

const Ul = styled.ul`
  list-style: none;
`;

export default FlexHorizontalWrapper;

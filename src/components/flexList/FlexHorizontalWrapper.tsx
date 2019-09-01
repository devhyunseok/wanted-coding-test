import React, { ReactChildren } from 'react';
import styled from 'styled-components';
import ActiveRecruitItem from "./ActiveRecruitItem";

interface Props {
  children?: JSX.Element[] | JSX.Element
}

const FlexHorizontalWrapper: React.FC<Props> = (props) => {
  const { children } = props;
  return (
    <Ul>
      {children}
    </Ul>
  );
};

const Ul = styled.ul`
  list-style: none;
`;

export default FlexHorizontalWrapper;

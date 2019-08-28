import React from 'react';
import styled from 'styled-components';
import IcoMoon from "react-icomoon";

interface Props {
  icon: string;
  color?: string;
}

const Icon: React.FC<Props> = (props) => {
  const { icon, color } = props;

  return (
    <IconWrapper color={color}>
      <IcoMoon icon={icon} style={{ marginRight: '5px', verticalAlign: 'middle'}}/>
    </IconWrapper>
  )
};

const IconWrapper = styled.i`
  color: ${props => props.color};
  margin-right: 5px;
`;

export default Icon;

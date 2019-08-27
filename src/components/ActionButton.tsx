import React from 'react';
import styled from 'styled-components';

interface Props {
  subText?: string;
  text: string;
  textColor?: string;
  icon?: string;
}

const ActionButton: React.FC<Props> = (props) => {
  const { text, subText, textColor = '#333', icon} = props;

  return (
    <Button>
      {subText && <SubText>{subText}</SubText> }
      <Text color={textColor}>{text}</Text>
    </Button>
  );
};

// ActionButton.defaultProps = {
//   textColor: '#333',
// };

const Icon = styled.i`
  font-family: \'icomoon\';
  &:before {
    content: "\\ea0c";
    color: #0092fc; // props;
  }
`;

const SubText = styled.span`
  margin-right: 5px;
  color: #999;
`;

const Text = styled.span<{ color: string }>`
   font-weight: 600;
   color: ${props => props.color};
`;

const Button = styled.button`
  border-radius: 2px;
  border: 1px solid #e1e2e3;
  background: #fff;
  font-size: 13px;
 
  padding: 9px 15px;
  
  &:hover {
    background-color: #f9f9f9;
  }
`;

export default ActionButton;

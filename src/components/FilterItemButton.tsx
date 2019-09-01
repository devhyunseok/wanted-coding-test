import React from 'react';
import styled from 'styled-components';

interface Props {
  children: React.ReactChildren;
  onClick?: (e: any, key:string) => void;
  isSelected?: boolean;
  value: string;
}

const FilterItemButton: React.FC<Props> = (props) => {
  const { children, onClick, isSelected = false, value } = props;

  return (
    <Button value={value} onClick={(e) => {
      onClick && onClick(e, value)
    }} isSelected={isSelected}>{children}</Button>
  );
};

const Button = styled.button<{isSelected: boolean}>`
  margin-right: 9px;
  margin-bottom: 9px;
  border: 1px solid #e1e2e3;
  padding: 11px 13px;
  font-size: 15px;
  line-height: 1;
  font-weight: 600;
  color: ${props => props.isSelected ? '#fff': '#333'};
  background: ${props => props.isSelected ? '#0092fc': '#f8f8fa'};
  border-color: ${props => props.isSelected ? '#0092fc': ''};
`;

export default FilterItemButton;

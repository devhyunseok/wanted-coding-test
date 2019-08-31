import React, { ChangeEventHandler } from 'react';
import styled from 'styled-components';

interface Option {
  key: string;
  display: string;
  selected: boolean;
}

interface Props {
  value: string | number;
  options: Option[];
  onChange: ChangeEventHandler<Element>;
}
const SelectBox: React.FC<Props> = (props) => {
  const { value, options, onChange } = props;

  return (
    <Wrapper>
      <Select value={value} onChange={onChange}>
      {
          options && options.map((item) => {
              return (<option key={item.key} value={item.key}>{item.display}</option>);
          })
      }
      </Select>
    </Wrapper>
  );
};

const Select = styled.select`
  appearance: none;
  padding: 9px 20px;
  border: 0;
  border-radius: 3px;
  background-color: #f8f8fa;
  color: #333;
  font-size: 16px;
  font-weight: 600;
  width: 100%;
`;

const Wrapper = styled.div`
  position: relative;

  &:after {
    content: "";
    top: 50%;
    right: 20px;
    width: 0;
    height: 0;
    position: absolute;
    z-index: 1002;
    border-top: 6px solid #999;
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
    -webkit-transform: translateY(-50%);
    transform: translateY(-50%);
  }
`;

export default SelectBox;

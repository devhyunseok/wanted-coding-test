import React, {MouseEventHandler} from 'react';
import Modal from './StyledModal';
import styled from 'styled-components';
import Icon from "./Icon";

interface Props {
  isOpen: boolean;
  onClickCloseButton?: MouseEventHandler;
  setVisible: (isVisible: boolean) => void;
}

const FilterModal: React.FC<Props> = (props) => {
  const { isOpen, onClickCloseButton, setVisible } = props;

  return (
    <Modal
      isOpen={isOpen}
      // onRequestClose={this.props.onRequestClose.bind(this)}
      onRequestClose={() => { setVisible(false)}}
      // onAfterOpen={this.props.onAfterOpen.bind(this)}
      // overlayClassName={[styles.overlay, 'bootstrap-dialog', this.props.overlayClassName].join(' ')}
      // className={setDefaultIsNull(this.props.overrideClassName, [styles.dialogContent, this.props.className].join(' '))}>
>
      <Header>
        <Reset>
          <Icon icon={'spinner11'}/>초기화
        </Reset>
        <span>필터</span>
        <Close onClick={onClickCloseButton}>
          <Icon icon={'cross'}/>
        </Close>
      </Header>
      <div>

      </div>
      <footer>

      </footer>
      {/*{this.props.isHideHeader ? '' :*/}
        {/*<div className={['modal-header', styles.dialogHeader].join(' ')}>*/}
          {/*<div className="bootstrap-dialog bootstrap-dialog-close-button" hidden={this.props.isHiddenBtnClose}>*/}
            {/*<button className="close" onClick={this.props.onCloseButton}>×</button>*/}
          {/*</div>*/}
          {/*<div className="bootstrap-dialog-title" style={{ height: '18px'}}>{this.props.title}</div>*/}
        {/*</div>*/}
      {/*}*/}
      {/*<div className={isNull(this.props.contentClassName) ? styles.dialogContentContainer : this.props.contentClassName}>*/}
        {/*{this.props.children}*/}
      {/*</div>*/}
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


export default FilterModal;

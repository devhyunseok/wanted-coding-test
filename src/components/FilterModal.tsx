import React from 'react';
import Modal from './StyledModal';
import styled from 'styled-components';
import Icon from "./Icon";

interface Props {

}

const FilterModal: React.FC<Props> = (props) => {
  const {} = props;

  return (
    <Modal
      isOpen={true}
      // onRequestClose={this.props.onRequestClose.bind(this)}
      // shouldCloseOnOverlayClick={this.props.shouldCloseOnOverlayClick}
      // onAfterOpen={this.props.onAfterOpen.bind(this)}
      // overlayClassName={[styles.overlay, 'bootstrap-dialog', this.props.overlayClassName].join(' ')}
      // className={setDefaultIsNull(this.props.overrideClassName, [styles.dialogContent, this.props.className].join(' '))}>
>
      <Header>
        <Icon icon={'spinner11'}/>초기화
        <button>

        </button>
        <span>필터</span>
        <Icon icon={'cross'}/>
        <button>

        </button>
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


export default FilterModal;

import React from 'react';
import ReactModal from 'react-modal';
import styled from 'styled-components';

interface Props extends ReactModal.Props {
  className?: string;
}

const ReactModalAdapter: React.FC<Props> = ({ className, ...props }: Props) => {
  const contentClassName = `${className}__content`;
  const overlayClassName = `${className}__overlay`;
  return (
    <ReactModal
      portalClassName={className}
      className={contentClassName}
      overlayClassName={overlayClassName}
      {...props}
    />
  );
};

export const StyledModal = styled(ReactModalAdapter)`
  &__overlay {
    z-index: 1001;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    overflow: hidden;
    background-color: rgba(0, 0, 0, 0.5);
    
    &.ReactModal__Overlay--after-open {
    
    }
    &.ReactModal__Overlay--before-close {
    
    }
  }

  &__content {
    z-index: 5;
    top: 50%;
    left: 50%;
    width: 100%;
    max-width: 500px;
    max-height: calc(100vh - 150px);
    transform: translate(-50%, -50%);
    border-radius: 5px;
    background-color: #fff;
    position: absolute;
    overflow: hidden;
    
    &.ReactModal__Content--after-open {
      …
    }
    &.ReactModal__Content--before-close {
      …
    }
  }
`;

export default StyledModal;

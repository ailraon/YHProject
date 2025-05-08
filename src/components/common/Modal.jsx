import React, { useEffect } from 'react';
import styled from 'styled-components';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContainer = styled.div`
  background: white;
  border-radius: 10px;
  padding: 20px;
  width: 400px;
  max-width: 90%;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
`;

const ModalHeader = styled.div`
  font-size: 1.25rem;
  font-weight: bold;
`;

const ModalContent = styled.div`
  margin-top: 20px;
  font-size: 1rem;
`;

const ModalFooter = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
`;

const CloseButton = styled.button`
  background-color: #ff6f61;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;

  &:hover {
    background-color: #e75b50;
  }
`;

const Modal = ({ isOpen, onClose, title, children }) => {
  // ESC 키로 모달 닫기
  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  useEffect(() => {
    if (isOpen) {
      // ESC 키 이벤트 리스너 추가
      window.addEventListener('keydown', handleKeyDown);
    } else {
      // 모달이 닫히면 리스너 제거
      window.removeEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // 모달이 열려 있을 때만 모달을 표시
  if (!isOpen) return null;

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <ModalHeader>{title}</ModalHeader>
        <ModalContent>{children}</ModalContent>
        <ModalFooter>
          <CloseButton onClick={onClose}>닫기</CloseButton>
        </ModalFooter>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default Modal;

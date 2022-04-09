import GlobalPortal from '../GlobalPortal';
import { ReactNode, useEffect, useRef } from 'react';
import styled from '@emotion/styled';
import colors from '@constants/colors';

interface Props {
  children: ReactNode;
  onClose: () => void;
}

function Modal({ children, onClose }: Props) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent): void {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose, modalRef]);

  return (
    <GlobalPortal>
      <ModalContainer>
        <ModalBox ref={modalRef}>{children}</ModalBox>
      </ModalContainer>
    </GlobalPortal>
  );
}

const ModalContainer = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.3);
`;

const ModalBox = styled.div`
  width: calc(76.8rem * 0.9);
  height: auto;
  background-color: ${colors.white};
  box-shadow: ${colors.boxShadow};
  border-radius: 12px;
  padding: 20px;
`;
export default Modal;

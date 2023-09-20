import {ModalWrapper} from "./Modal.style";

interface ModalProps {
  children: JSX.Element;
}

export const Modal = ({children}: ModalProps) => (
  <ModalWrapper>{children}</ModalWrapper>
);

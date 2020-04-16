import React from "react";
import { createPortal } from "react-dom";
import usePortal from "src/hooks/usePortal";
import "./style.scss";
import FontAwesomeIcon, {
  icons
} from "src/components/common/font-awesome-icon";

const rootClassName = "modal";

interface Props {
  title?: string;
  isOpen?: boolean;
  close: () => void;
  children: JSX.Element | JSX.Element[];
}
const ModalWrapper: React.FC<Props> = ({ isOpen, ...props }) =>
  isOpen ? <Modal {...props} /> : null;

const ModalContent: React.FC<Props> = ({ title = "", children, close }) => {
  return (
    <>
      <div className="modal-blocker"></div>
      <div className={`${rootClassName}-content`}>
        <header className="modal-content-header">
          <h3 role="title">{title}</h3>
          <div onClick={close} className="modal-content-header-close-icon">
            <FontAwesomeIcon>{icons.close}</FontAwesomeIcon>
          </div>
        </header>
        <div className="modal-content-body">{children}</div>
      </div>
    </>
  );
};

const Modal: React.FC<Props> = props => {
  const target = usePortal(rootClassName);
  return createPortal(<ModalContent {...props} />, target);
};

export default ModalWrapper;

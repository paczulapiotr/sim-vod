import React from "react";
import Modal from "src/components/modal";
import VodPlayer from "src/components/content/vod-player";
import "./style.scss";

interface OwnProps {
  videoTitle: string;
  videoGuid: string;
}
type Props = ModalProps & OwnProps;
const VodPlayerModal = ({ close, isOpen, videoGuid, videoTitle }: Props) => {
  return (
    <Modal isOpen={isOpen} close={close} title={videoTitle}>
      <VodPlayer vodGuid={videoGuid} />
    </Modal>
  );
};

export default VodPlayerModal;

import React, { useState } from "react";
import Modal from "src/components/modal";
import "./style.scss";
import VideoDropzone from "src/components/content/vod-dropzone";
import { uploadUrl } from "src/api/urls";

function uploadToServer(file: File) {
  var data = new FormData();
  console.log(file);
  data.append("file", file);

  fetch(uploadUrl(file.name), {
    method: "POST",
    body: data,
  });
}

const VodUploadModal = (props: ModalProps) => {
  const [file, setFile] = useState<File>();

  const uploadHandler = async () => {
    uploadToServer(file!);
    props.close();
  };

  const cancelHandler = () => {
    setFile(undefined);
  };

  const newProps = { ...props, title: "Upload video" };

  return (
    <Modal {...newProps}>
      <div className="vod-upload">
        <div className="vod-upload-drop">
          <VideoDropzone fileDropped={(file) => setFile(file)} />
        </div>
        <div className="vod-upload-controls">
          <button
            hidden={file == null}
            className="default-button"
            onClick={uploadHandler}
          >
            Upload
          </button>
          <button className="default-button" onClick={cancelHandler}>
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default VodUploadModal;

import React, { useState } from "react";
import Modal from "src/components/modal";
import "./style.scss";
import VideoDropzone from "src/components/content/vod-dropzone";
import { uploadUrl } from "src/api/urls";

function uploadToServer(file: File, name: string) {
  var data = new FormData();
  var fileName = name || file.name;
  data.append("file", file);
  data.append("fileName", fileName);

  fetch(uploadUrl(), {
    method: "POST",
    body: data,
  })
    .then((response) => {
      if (response.status == 200) {
        alert(`File ${fileName} was uploaded succesfully`);
      } else {
        alert(`'${fileName}' upload failed. File might be corrupted!`);
      }
    })
    .catch(() =>
      alert(`'${fileName}' upload failed. File might be corrupted!`)
    );
}

const VodUploadModal = (props: ModalProps) => {
  const [file, setFile] = useState<File>();
  const [fileName, setFileName] = useState<string>();

  const uploadHandler = async () => {
    uploadToServer(file!, fileName!);
    onCloseOverride();
  };

  const cancelHandler = () => {
    onCloseOverride();
  };

  const onCloseOverride = () => {
    setFile(undefined);
    setFileName(undefined);
    props.close();
  };

  const newProps = { ...props, close: onCloseOverride, title: "Upload video" };

  return (
    <Modal {...newProps}>
      <div className="vod-upload">
        <div className="vod-upload-drop">
          <VideoDropzone
            fileDropped={(file) => {
              setFile(file);
              setFileName(file.name);
            }}
          />
        </div>
        <div className="vod-upload-controls">
          <div>
            <div hidden={file == null}>
              <span>File name:</span>
              <input
                id="file-name"
                placeholder="Enter file name"
                value={fileName}
                onChange={(e) => setFileName(e.target.value)}
              />
            </div>
          </div>
          <div>
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
      </div>
    </Modal>
  );
};

export default VodUploadModal;

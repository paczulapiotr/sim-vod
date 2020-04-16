import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
interface Props {
  fileDropped: (file: File) => void;
}
export default function VideoDropzone({ fileDropped }: Props) {
  const [file, setFile] = useState<File>();

  const onDrop = useCallback(acceptedFiles => {
    if (acceptedFiles.length !== 1) {
      alert("You can only upload one file at a time.");
      return;
    }

    const uploadedFile = acceptedFiles[0] as File;

    if (uploadedFile.type !== "video/mp4") {
      alert("File must have mp4 format");
      return;
    }

    setFile(uploadedFile);
    fileDropped(uploadedFile);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const textIfEmpty = () =>
    isDragActive ? (
      <p>Drop the files here ...</p>
    ) : (
      <p>Drag 'n' drop some files here, or click to select files</p>
    );
  const uploadedFileText = () =>
    isDragActive ? <p> Upload new file...</p> : <p>{file!.name}</p>;

  const isFileUploaded = file !== undefined;

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {isFileUploaded ? uploadedFileText() : textIfEmpty()}
    </div>
  );
}

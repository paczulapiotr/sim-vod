import React, { useState } from "react";
import SearchBar from "src/components/header/search-bar";
import LogoIcon from "src/components/header/logo-icon";
import UploadVideoIcon from "src/components/header/upload-video-icon";
import VodUploadModal from "src/components/content/vod-upload-modal";
interface Props {
  onSearch: (search: string) => void;
}

const AppHeader = ({ onSearch }: Props) => {
  const [uploadModalIsOpen, openUploadModal] = useState(false);
  return (
    <>
      <header className="app-header">
        <LogoIcon onClick={() => {}} />
        <SearchBar placeholder="Search" onSearch={onSearch} />
        <UploadVideoIcon onClick={() => openUploadModal(true)} />
      </header>
      <VodUploadModal
        isOpen={uploadModalIsOpen}
        close={() => openUploadModal(false)}
      />
    </>
  );
};

export default AppHeader;

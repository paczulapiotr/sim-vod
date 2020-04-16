import React, { useState, useCallback, useEffect } from "react";

import VodSection from "src/components/content/vod-section";
import VodItem from "src/components/content/vod-item";
import AppHeader from "src/components/header";
import { searchUrl, vodUrl } from "./api/urls";
import VodPlayerModal from "src/components/content/vod-player-modal";
import "./App.scss";

function App() {
  const [playerModalIsOpen, openPlayerModal] = useState(false);
  const [vodGuid, setVodGuid] = useState("");
  const [vodTitle, setVodTitle] = useState("");
  const [vods, setVods] = useState<VodSearchResult>({
    data: [],
    totalCount: 0
  });

  const page = 0;
  const pageSize = 10;

  useEffect(() => {
    onSearch();
  }, []);

  const onSearch = (search?: string) => {
    fetch(searchUrl(search || "", page, pageSize))
      .then(response => response.json())
      .then(json => setVods(json))
      .catch(err => console.error(err));
  };

  const setVodPropsForPlayer = (title: string, guid: string) => {
    setVodTitle(title);
    setVodGuid(guid);
    openPlayerModal(true);
  };

  return (
    <div className="app">
      <AppHeader onSearch={onSearch} />
      <div className="content">
        <VodSection title="Videos">
          {vods.data.map(v => (
            <VodItem key={v.videoGuid} {...v} onClick={setVodPropsForPlayer} />
          ))}
        </VodSection>
      </div>
      <VodPlayerModal
        videoGuid={vodGuid}
        videoTitle={vodTitle}
        close={() => openPlayerModal(false)}
        isOpen={playerModalIsOpen}
      />
    </div>
  );
}

export default App;

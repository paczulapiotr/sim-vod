import React, { useRef, useEffect, useState } from "react";
import Hls from "hls.js";
import { vodUrl } from "src/api/urls";
import {
  storeBandwidths,
  optimisticPrediction,
  pesimisticPrediction,
} from "src/player/player";
import "./style.scss";

const qualityResolutions = {
  0: "360p",
  1: "480p",
  2: "720p",
  3: "1080p",
};

const qualityOptions = {
  "0": "Auto",
  "1": "Optimistic",
  "2": "Pesimistic",
};

let bandwidthArray: number[] = [];
let bandwidthUpdateTimeout: NodeJS.Timeout;
let levelUpdateTimeout: NodeJS.Timeout;

interface Props {
  vodGuid: string;
}

const VodPlayer = ({ vodGuid }: Props) => {
  const ref = useRef<HTMLVideoElement>();
  const [hls, setHls] = useState<Hls>();
  const [qualityPrediction, setPrediction] = useState("0");
  const [nextClipResolution, setNextClipResolution] = useState("");
  const [currentResolution, setCurrentResolution] = useState("");

  useEffect(() => {
    if (hls == null) return;

    if (levelUpdateTimeout != null) {
      clearInterval(levelUpdateTimeout);
    }

    if (qualityPrediction === "1") {
      hls.loadLevel = optimisticPrediction(bandwidthArray);
      levelUpdateTimeout = setInterval(() => {
        const predLevel = optimisticPrediction(bandwidthArray);

        hls.loadLevel = predLevel;
      }, 4000);
    } else if (qualityPrediction === "2") {
      hls.loadLevel = pesimisticPrediction(bandwidthArray);
      levelUpdateTimeout = setInterval(() => {
        const predLevel = pesimisticPrediction(bandwidthArray);

        hls.loadLevel = predLevel;
      }, 4000);
    } else {
      hls.loadLevel = -1;
    }
    return () => {
      if (levelUpdateTimeout != null) {
        clearInterval(levelUpdateTimeout);
      }
    };
  }, [qualityPrediction]);

  useEffect(() => {
    const video = ref.current!;
    if (Hls.isSupported()) {
      var hls = new Hls();
      setHls(hls);
      const srcUrl = vodUrl(vodGuid);
      hls.loadSource(srcUrl);
      hls.attachMedia(video);
      hls.config.maxMaxBufferLength = 10;

      hls.on(Hls.Events.LEVEL_SWITCHED, () => {
        const level = (qualityResolutions as any)[hls.currentLevel];
        setCurrentResolution(level);
      });

      hls.on(Hls.Events.FRAG_LOADING, () => {
        const level = (qualityResolutions as any)[hls.nextLoadLevel];
        setNextClipResolution(level);
      });

      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.play();
      });

      bandwidthUpdateTimeout = storeBandwidths(bandwidthArray, hls);
    }

    return () => clearInterval(bandwidthUpdateTimeout);
  }, []);

  return (
    <div className="vod-player-container">
      <video controls ref={ref as any}></video>
      <div className="player-controls">
        <span>Video quality predictions: </span>
        <select
          value={qualityPrediction}
          onChange={(e) => setPrediction(e.target.value)}
        >
          <option value="0">Auto</option>
          <option value="1">Optimistic</option>
          <option value="2">Pesimistic</option>
        </select>
        <p>
          Current resolution:
          <span>{currentResolution}</span>
        </p>
        <p>
          Downloading resolution:
          <span>{nextClipResolution}</span>
        </p>
      </div>
    </div>
  );
};

export default VodPlayer;

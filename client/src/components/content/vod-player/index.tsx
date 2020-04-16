import React, { useRef, useEffect, useState } from "react";
import Hls from "hls.js";
import { vodUrl } from "src/api/urls";
import {
  storeBandwidths,
  bandwidths,
  optimisticPrediction,
  pesimisticPrediction,
} from "src/player/player";
import "./style.scss";

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

  useEffect(() => {
    console.log(
      "changed prediction to",
      (qualityOptions as any)[qualityPrediction]
    );
    if (hls == null) return;

    if (levelUpdateTimeout != null) {
      clearInterval(levelUpdateTimeout);
    }

    if (qualityPrediction === "1") {
      hls.loadLevel = optimisticPrediction(bandwidthArray);
      levelUpdateTimeout = setInterval(() => {
        const predLevel = optimisticPrediction(bandwidthArray);
        console.log("Prediction level:", predLevel);
        hls.loadLevel = predLevel;
      }, 4000);
    } else if (qualityPrediction === "2") {
      hls.loadLevel = pesimisticPrediction(bandwidthArray);
      levelUpdateTimeout = setInterval(() => {
        const predLevel = pesimisticPrediction(bandwidthArray);
        console.log("Prediction level:", predLevel);
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

      hls.on(Hls.Events.LEVEL_SWITCHED, function() {
        console.log("Level changed to:", hls.currentLevel);
      });

      hls.on(Hls.Events.MANIFEST_PARSED, function() {
        video.play();
      });

      console.log("HLS:");
      console.log(hls);
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
      </div>
    </div>
  );
};

export default VodPlayer;

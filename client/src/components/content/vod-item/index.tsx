import React from "react";
import MockImage from "src/mockData/video-thumbnail.jpg";
import "./style.scss";

interface Props {
  videoTitle: string;
  duration: number;
  videoGuid: string;
  uploadDateTime: Date;
  onClick: (title: string, guid: string) => void;
  // imgUrl: string;
}

const VodItem: React.FC<Props> = ({
  videoTitle,
  duration,
  videoGuid,
  // uploadDateTime,
  onClick,
}) => {
  const durationString = `${Math.floor(duration / 60).toFixed()}m ${duration %
    60}s`;
  return (
    <div className="vod-block" onClick={() => onClick(videoTitle, videoGuid)}>
      <div className="vod-block-img">
        <img src={MockImage} alt="thumbnail" />
        <div className="vod-timer">{durationString}</div>
      </div>
      <div className="vod-block-title">{videoTitle}</div>
    </div>
  );
};

export default VodItem;

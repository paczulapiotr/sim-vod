import React from "react";
import FontAwesomeIcon, {
  icons
} from "src/components/common/font-awesome-icon";
import "./style.scss";

interface Props {
  title: string;
  children?: JSX.Element | JSX.Element[];
}

const VodSection: React.FC<Props> = ({ title, children = [] }) => {
  return (
    <div className="vod-section">
      <span className="vod-section-header">
        <span className="void-section-icon">
          <FontAwesomeIcon>{icons.starOutlined}</FontAwesomeIcon>
        </span>
        <span className="vod-section-title">{title}</span>
      </span>
      <div className="vod-section-videos">{children}</div>
    </div>
  );
};

export default VodSection;

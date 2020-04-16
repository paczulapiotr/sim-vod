import React from "react";
import FontAwesomeIcon, {
  icons
} from "src/components/common/font-awesome-icon";
import "./style.scss";
interface Props {
  onClick: () => void;
}

const index: React.FC<Props> = ({ onClick }) => {
  return (
    <div className="upload-video-icon" onClick={onClick}>
      <FontAwesomeIcon>{icons.upload}</FontAwesomeIcon>
    </div>
  );
};

export default index;

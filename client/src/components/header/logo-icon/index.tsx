import React from "react";
import "./style.scss";

interface Props {
  onClick: () => void;
  tail?: string;
  head?: string;
}

const LogoIcon: React.FC<Props> = ({
  onClick,
  head = "vod.",
  tail = "now"
}) => {
  return (
    <div className="logo-icon" onClick={onClick}>
      <span className="logo-icon-head">{head}</span>
      <span className="logo-icon-tail">{tail}</span>
    </div>
  );
};

export default LogoIcon;

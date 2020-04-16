import React from "react";
import "@fortawesome/fontawesome-free/css/all.css";

interface Icons {
  magnifier: string;
  upload: string;
  starOutlined: string;
  close: string;
}

export const icons: Icons = {
  magnifier: "fas fa-search",
  upload: "fas fa-upload",
  starOutlined: "far fa-star",
  close: "fas fa-times"
};

interface Props {
  children: string;
}

/**
 * @example Use like
 * <FontAwesomeIcon>icons.close</FontAwesomeIcon>
 * @param childer
 * font awesome class name
 */
const FontAwesomeIcon: React.FC<Props> = ({ children }) => {
  return <i className={children} />;
};

export default FontAwesomeIcon;

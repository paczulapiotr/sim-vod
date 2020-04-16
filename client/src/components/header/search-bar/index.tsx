import React, { useState } from "react";
import "./style.scss";
import FontAwesomeIcon, { icons } from "../../common/font-awesome-icon";

interface Props {
  placeholder: string;
  onSearch: (searchTerm: string) => void;
}

const SearchBar = ({ placeholder, onSearch }: Props) => {
  const [searchTerm, setSearchTerm] = useState("");

  const updateSearchTerm = (event: React.ChangeEvent<HTMLInputElement>) =>
    setSearchTerm(event.target.value);

  const onSearchHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key.toLowerCase() === "enter") {
      onSearch(searchTerm);
    }
  };

  return (
    <div className="search-bar">
      <div className="search-bar-wrapper">
        <span className="search-icon">
          <FontAwesomeIcon>{icons.magnifier}</FontAwesomeIcon>
        </span>
        <input
          className="search-input"
          type="text"
          onChange={updateSearchTerm}
          value={searchTerm}
          placeholder={placeholder}
          onKeyPress={onSearchHandler}
        />
      </div>
    </div>
  );
};

export default SearchBar;

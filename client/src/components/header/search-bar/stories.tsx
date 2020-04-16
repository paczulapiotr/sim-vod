import React from "react";
import { action } from "@storybook/addon-actions";
import SearchBar from "./index";

const config: StoryConfig = {
  title: "header/Search Bar",
  component: SearchBar
};

export default config;

export const Default = () => (
  <SearchBar placeholder="Placeholder" onSearch={action("onSearch")} />
);

import React from "react";
import { action } from "@storybook/addon-actions";
import UploadIcon from "./index";

const config: StoryConfig = {
  title: "header/Upload Icon",
  component: UploadIcon
};

export default config;

export const Default = () => <UploadIcon onClick={action("onClick")} />;

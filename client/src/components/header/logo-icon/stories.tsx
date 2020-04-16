import React from "react";
import { action } from "@storybook/addon-actions";
import LogoIcon from "./index";

export default {
  title: "header/Logo icon",
  component: LogoIcon
};

export const Default = () => <LogoIcon onClick={action("logo clicked")} />;

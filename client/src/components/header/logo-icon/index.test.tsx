import React from "react";
import { render, fireEvent } from "@testing-library/react";
import LogoIcon from "./index";
describe("Logo icon tests", () => {
  it("should invoke callback on logo click", () => {
    var callbackInvoked = false;
    const setTrue = () => (callbackInvoked = true);
    const { getByText } = render(<LogoIcon onClick={setTrue} />);
    var elem = getByText("vod.");
    fireEvent.click(elem);
    expect(callbackInvoked).toBeTruthy();
  });
});

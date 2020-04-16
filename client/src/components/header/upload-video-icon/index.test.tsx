import React from "react";
import { render, fireEvent } from "@testing-library/react";
import UploadIcon from "./index";
describe("Upload icon tests", () => {
  it("should invoke callback on upload click", () => {
    var callbackInvoked = false;
    const setTrue = () => (callbackInvoked = true);
    const { container } = render(<UploadIcon onClick={setTrue} />);
    fireEvent.click(container.querySelector("i") || container);
    expect(callbackInvoked).toBeTruthy();
  });
});

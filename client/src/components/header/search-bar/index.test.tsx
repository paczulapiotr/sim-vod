import React from "react";
import { render, fireEvent } from "@testing-library/react";
import SearchBar from "./index";

describe("search bar component", () => {
  it("should show placeholder when empty", () => {
    const { getByPlaceholderText } = render(
      <SearchBar placeholder="placeholder" onSearch={() => {}} />
    );
    const elem1 = getByPlaceholderText(/placeholder/i);
    expect(elem1).toBeInTheDocument();
  });

  it("should fire action on enter key", () => {
    const onSearch = jest.fn();

    const { getByPlaceholderText } = render(
      <SearchBar placeholder="placeholder" onSearch={onSearch} />
    );
    const input = getByPlaceholderText("placeholder");
    fireEvent.keyPress(input, { key: "Enter", code: 13, charCode: 13 });

    expect(onSearch).toHaveBeenCalled();
  });
});

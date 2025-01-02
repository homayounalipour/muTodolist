import React from "react";
import { describe, expect, it, vi } from "vitest";
import { fireEvent, render } from "@testing-library/react";
import { Headers } from "./Headers";

describe("title in document", () => {
  const mockStateProps = {
    title: "MUI CRUD USERS",
    titleButton: "Add User",
    onclick: vi.fn(),
  };
  it("should have the correct title", () => {
    const { getByText } = render(<Headers {...mockStateProps} />);
    const titleElement = getByText(mockStateProps.title);
    expect(titleElement).toBeInTheDocument();
  });

  it("should have the correct title button", () => {
    const { getByText } = render(<Headers {...mockStateProps} />);
    const titleButtonElement = getByText(mockStateProps.titleButton);
    expect(titleButtonElement).toBeInTheDocument();
  });
  it("should call the onclick function when the title button is clicked", () => {
    const { getByText } = render(<Headers {...mockStateProps} />);
    const titleButtonElement = getByText(mockStateProps.titleButton);
    fireEvent.click(titleButtonElement);
    expect(mockStateProps.onclick).toBeCalledTimes(1);
  });
  it("should have correct style ", () => {
    const { getByText } = render(<Headers {...mockStateProps} />);
    const boxElement = getByText(mockStateProps.title).parentElement;
    const buttonElement = getByText(mockStateProps.titleButton);
    expect(buttonElement).toHaveStyle({
      textTransform: "capitalize",
    });
    expect(boxElement).toHaveStyle({
      backgroundColor: "#2C3E50",
    });
  });
});

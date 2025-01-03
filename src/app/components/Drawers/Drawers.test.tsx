import React from "react";
import { describe, expect, it, vi } from "vitest";
import { fireEvent, render } from "@testing-library/react";
import { Drawers } from "./Drawers";
import { FieldNames } from "./Drawers.types";

describe("Drawers Component", () => {
  const mockStateProps = {
    onClose: vi.fn(),
    open: true,
    updateField: vi.fn(),
    formValues: {
      name: "",
      age: "",
    },
    favoriteGenres: [],
    setFavoriteGenres: vi.fn(),
    selectedCountry: null,
    setSelectedCountry: vi.fn(),
    titleButton: "Add User",
    addBnClick: vi.fn(),
    error: {},
    clearError: vi.fn(),
    isTryCatch: false,
    setIsTryCatch: vi.fn(),
    disabled: false,
  };
  it("should renders the drawer when open", () => {
    const { getByText } = render(<Drawers {...mockStateProps} />);
    const button = getByText(mockStateProps.titleButton);
    expect(button).toBeInTheDocument();
  });
  it("calls onClose when the drawer is closed", () => {
    const { getByRole } = render(<Drawers {...mockStateProps} />);

    const drawerElement = getByRole("presentation");
    fireEvent.keyDown(drawerElement, { key: "Escape" });
    expect(mockStateProps.onClose).toHaveBeenCalled();
  });

  it("updates the form field values on change", () => {
    const { getByLabelText } = render(<Drawers {...mockStateProps} />);

    const nameInput = getByLabelText(/Name/i);
    fireEvent.change(nameInput, { target: { value: "John Doe" } });
    expect(mockStateProps.updateField).toHaveBeenCalledWith("name", "John Doe");
  });
  it("handles favorite genres selection", () => {
    const { getByText, getByRole } = render(<Drawers {...mockStateProps} />);

    const genreInput = getByRole("combobox", {
      name: /Favorite Genres/i,
    });
    fireEvent.mouseDown(genreInput);

    const option = getByText(/Action/i);
    fireEvent.click(option);

    expect(mockStateProps.setFavoriteGenres).toHaveBeenCalledWith([
      {
        value: "action",
        title: "Action",
      },
    ]);
  });

  it("handles country selection", () => {
    const { getByRole, getByText } = render(<Drawers {...mockStateProps} />);
    const countryInput = getByRole("combobox", {
      name: /Country/i,
    });
    fireEvent.mouseDown(countryInput);
    const option = getByText(/United Kingdom/i);
    fireEvent.click(option);
    expect(mockStateProps.setSelectedCountry).toHaveBeenCalled();
  });
  it("handles checkbox state change", () => {
    const { getByLabelText } = render(<Drawers {...mockStateProps} />);
    const checkbox = getByLabelText(/IsTryCatch/i);
    fireEvent.click(checkbox);
    expect(mockStateProps.setIsTryCatch).toHaveBeenCalledWith(true);
  });

  it("calls addBnClick when the button is clicked", () => {
    const { getByText } = render(<Drawers {...mockStateProps} />);
    const button = getByText(mockStateProps.titleButton);
    fireEvent.click(button);
    expect(mockStateProps.addBnClick).toHaveBeenCalled();
  });

  it("calls setFavoriteGenres and clearError when both are provided", () => {
    const mockSetFavoriteGenres = vi.fn();
    const mockClearError = vi.fn();

    const mockPropsWithDependencies = {
      ...mockStateProps,
      setFavoriteGenres: mockSetFavoriteGenres,
      clearError: mockClearError,
    };

    const { getByRole, getByText } = render(
      <Drawers {...mockPropsWithDependencies} />,
    );

    const genreInput = getByRole("combobox", {
      name: /Favorite Genres/i,
    });
    fireEvent.mouseDown(genreInput);

    const option = getByText(/Action/i);
    fireEvent.click(option);

    expect(mockSetFavoriteGenres).toHaveBeenCalledWith([
      { value: "action", title: "Action" },
    ]);

    expect(mockClearError).toHaveBeenCalledWith(FieldNames.FavoriteGenres);
  });

  it("does not call setFavoriteGenres if not provided", () => {
    const mockClearError = vi.fn();

    const mockPropsWithoutSetFavoriteGenres = {
      ...mockStateProps,
      setFavoriteGenres: undefined,
      clearError: mockClearError,
    };

    const { getByRole, getByText } = render(
      <Drawers {...mockPropsWithoutSetFavoriteGenres} />,
    );

    const genreInput = getByRole("combobox", {
      name: /Favorite Genres/i,
    });
    fireEvent.mouseDown(genreInput);

    const option = getByText(/Action/i);
    fireEvent.click(option);

    expect(mockClearError).toHaveBeenCalledWith(FieldNames.FavoriteGenres);

    expect(mockPropsWithoutSetFavoriteGenres.setFavoriteGenres).toBeUndefined();
  });

  it("does not call clearError if not provided", () => {
    const mockSetFavoriteGenres = vi.fn();

    const mockPropsWithoutClearError = {
      ...mockStateProps,
      setFavoriteGenres: mockSetFavoriteGenres,
      clearError: undefined,
    };

    const { getByRole, getByText } = render(
      <Drawers {...mockPropsWithoutClearError} />,
    );

    const genreInput = getByRole("combobox", {
      name: /Favorite Genres/i,
    });
    fireEvent.mouseDown(genreInput);

    const option = getByText(/Action/i);
    fireEvent.click(option);

    expect(mockSetFavoriteGenres).toHaveBeenCalledWith([
      { value: "action", title: "Action" },
    ]);

    expect(mockPropsWithoutClearError.clearError).toBeUndefined();
  });

  it("does nothing if setFavoriteGenres and clearError are undefined", () => {
    const mockPropsWithoutHandlers = {
      ...mockStateProps,
      setFavoriteGenres: undefined,
      clearError: undefined,
    };

    const { getByRole, getByText } = render(
      <Drawers {...mockPropsWithoutHandlers} />,
    );

    const genreInput = getByRole("combobox", {
      name: /Favorite Genres/i,
    });
    fireEvent.mouseDown(genreInput);

    const option = getByText("Action");
    fireEvent.click(option);

    expect(mockPropsWithoutHandlers.setFavoriteGenres).toBeUndefined();
    expect(mockPropsWithoutHandlers.clearError).toBeUndefined();
  });
});

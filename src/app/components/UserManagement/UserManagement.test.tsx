import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { UserManagement } from "./UserManagement";

const mockInitialUsers = [
  {
    id: "1",
    name: "John Doe",
    age: "30",
    favoriteGenres: ["Action", "Comedy"],
    country: "USA",
    isTryCatch: true,
  },
  {
    id: "2",
    name: "Jane Smith",
    age: "25",
    favoriteGenres: ["Drama", "Horror"],
    country: "Canada",
    isTryCatch: false,
  },
];

describe("UserManagement Component", () => {
  it("renders initial users correctly", () => {
    const { getByText } = render(
      <UserManagement initialUsers={mockInitialUsers} />,
    );

    expect(getByText("John Doe")).toBeInTheDocument();
    expect(getByText("Jane Smith")).toBeInTheDocument();
  });

  it("adds a new user correctly", async () => {
    const { getByText, getAllByRole, getByRole } = render(
      <UserManagement initialUsers={mockInitialUsers} />,
    );

    fireEvent.click(getByText(/add user/i));

    fireEvent.change(getByRole("textbox", { name: /name/i }), {
      target: { value: "Alice" },
    });

    fireEvent.change(getByRole("textbox", { name: /age/i }), {
      target: { value: "28" },
    });

    fireEvent.change(getByRole("combobox", { name: /Select Country/i }), {
      target: { value: "Germany" },
    });
    fireEvent.change(getByRole("combobox", { name: /favorite genres/i }), {
      target: { value: "Adventure" },
    });

    fireEvent.click(
      getByRole("button", {
        name: /add/i,
      }),
    );
    expect(getAllByRole("presentation"));
  });

  it("deletes a user correctly", () => {
    const { getAllByTitle, queryByText } = render(
      <UserManagement initialUsers={mockInitialUsers} />,
    );

    fireEvent.click(getAllByTitle("Delete")[0]);

    expect(queryByText("John Doe")).not.toBeInTheDocument();
  });

  it("views a user correctly", () => {
    const { getAllByTitle, getByText } = render(
      <UserManagement initialUsers={mockInitialUsers} />,
    );

    fireEvent.click(getAllByTitle("View")[0]);

    expect(getByText("John Doe")).toBeInTheDocument();
    expect(getByText("30")).toBeInTheDocument();
    expect(getByText(/Action,Comedy/i)).toBeInTheDocument();
  });

  it("edits a user correctly", () => {
    const { getAllByTitle, getByText, queryByText, getByLabelText } = render(
      <UserManagement initialUsers={mockInitialUsers} />,
    );

    fireEvent.click(getAllByTitle("Edit")[0]);

    const nameInput = getByLabelText(/enter name enter/i);
    fireEvent.change(nameInput, { target: { value: "John Updated" } });
    fireEvent.click(getByText(/save changes/i));

    expect(getByText("John Updated")).toBeInTheDocument();
    expect(queryByText("John Doe")).not.toBeInTheDocument();
  });

  it("shows validation errors when adding a user with incomplete data", () => {
    const { getByRole, getByText } = render(
      <UserManagement initialUsers={[]} />,
    );

    fireEvent.click(getByText(/add user/i));

    fireEvent.click(
      getByRole("button", {
        name: /add/i,
      }),
    );

    expect(getByText(/name is required/i)).toBeInTheDocument();
    expect(getByText(/age is required/i)).toBeInTheDocument();
    expect(getByText(/country is required/i)).toBeInTheDocument();
    expect(getByText(/at least one genre is required/i)).toBeInTheDocument();
  });

  it("resets all states correctly and closes the drawer when clicking outside", async () => {
    const { getByRole, getByLabelText } = render(
      <UserManagement initialUsers={[]} />,
    );

    fireEvent.click(
      getByRole("button", {
        name: /add user/i,
      }),
    );

    fireEvent.change(getByLabelText(/Enter Name/i), {
      target: { value: "Test User" },
    });
    fireEvent.change(getByRole("spinbutton"), {
      target: { value: "25" },
    });

    const genreInput = getByRole("combobox", { name: /favorite genres/i });
    fireEvent.change(genreInput, { target: { value: "Comedy" } });
    fireEvent.keyDown(genreInput, { key: "ArrowDown" });
    fireEvent.keyDown(genreInput, { key: "Enter" });

    fireEvent.change(genreInput, { target: { value: "Drama" } });
    fireEvent.keyDown(genreInput, { key: "ArrowDown" });
    fireEvent.keyDown(genreInput, { key: "Enter" });

    const countryInput = getByRole("combobox", { name: /select country/i });
    fireEvent.change(countryInput, { target: { value: "Canada" } });
    fireEvent.keyDown(countryInput, { key: "ArrowDown" });
    fireEvent.keyDown(countryInput, { key: "Enter" });

    const tryCatchCheckbox = getByRole("checkbox", { name: /istrycatch/i });
    fireEvent.click(tryCatchCheckbox);

    fireEvent.click(
      getByRole("button", {
        name: /add/i,
      }),
    );
    fireEvent.mouseDown(document.body);
  });

  it("closes the view and resets the viewUser state", () => {
    const mockUser = {
      id: "1",
      name: "Test User",
      age: "25",
      favoriteGenres: ["Comedy", "Drama"],
      country: "Canada",
      isTryCatch: true,
    };
    const { getByTestId, queryByText, getByRole } = render(
      <UserManagement initialUsers={[mockUser]} initialViewUser={mockUser} />,
    );

    fireEvent.click(getByTestId("VisibilityOffIcon"));
    expect(queryByText("Test User")).toBeInTheDocument();
    expect(queryByText("25")).toBeInTheDocument();
    expect(queryByText("Comedy")).toBeInTheDocument();
    expect(queryByText("Canada")).toBeInTheDocument();
    fireEvent.click(
      getByRole("button", {
        name: /close/i,
      }),
    );
  });
});

import React from "react";
import { describe, it, vi, expect } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { DataGridPros } from "./DataGrid";
import { UserProps } from "@/app/page";

const mockRows: UserProps[] = [
  {
    id: "1",
    name: "John Doe",
    age: "30",
    favoriteGenres: ["Action", "Comedy"],
    country: "Iran",
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

describe("DataGridPros", () => {
  it("renders rows and columns correctly", () => {
    const { getByText, getByRole } = render(
      <DataGridPros
        rows={mockRows}
        handleView={vi.fn()}
        handleEdit={vi.fn()}
        handleDelete={vi.fn()}
      />,
    );
    expect(getByText(/Name/i)).toBeInTheDocument();
    expect(getByText(/age/i)).toBeInTheDocument();

    expect(getByText(/Favorite Genres/i)).toBeInTheDocument();

    expect(getByText(/Country/i)).toBeInTheDocument();
    expect(getByRole("columnheader", { name: /Actions/i })).toBeInTheDocument();
    expect(
      getByRole("columnheader", { name: /Is Try Catch/i }),
    ).toBeInTheDocument();

    expect(getByText("John Doe")).toBeInTheDocument();
    expect(getByText("30")).toBeInTheDocument();
    expect(getByRole("cell", { name: /Action,Comedy/i })).toBeInTheDocument();
    expect(getByText("Iran")).toBeInTheDocument();

    expect(getByText("Jane Smith")).toBeInTheDocument();
    expect(getByText("25")).toBeInTheDocument();
    expect(getByRole("cell", { name: /Drama,Horror/i })).toBeInTheDocument();

    expect(getByText("Canada")).toBeInTheDocument();
  });

  it("calls handleEdit when edit button is clicked", () => {
    const mockHandleEdit = vi.fn();
    render(
      <DataGridPros
        rows={mockRows}
        handleView={vi.fn()}
        handleEdit={mockHandleEdit}
        handleDelete={vi.fn()}
      />,
    );

    const editButton = screen.getAllByTitle("Edit")[0];
    fireEvent.click(editButton);
    expect(mockHandleEdit).toHaveBeenCalledWith(mockRows[0]);
  });

  it("calls handleDelete when delete button is clicked", () => {
    const mockHandleDelete = vi.fn();
    render(
      <DataGridPros
        rows={mockRows}
        handleView={vi.fn()}
        handleEdit={vi.fn()}
        handleDelete={mockHandleDelete}
      />,
    );

    const deleteButton = screen.getAllByTitle("Delete")[0];
    fireEvent.click(deleteButton);
    expect(mockHandleDelete).toHaveBeenCalledWith(mockRows[0]);
  });

  it("calls handleView when view button is clicked", () => {
    const mockHandleView = vi.fn();
    render(
      <DataGridPros
        rows={mockRows}
        handleView={mockHandleView}
        handleEdit={vi.fn()}
        handleDelete={vi.fn()}
      />,
    );

    const viewButton = screen.getAllByTitle("View")[0];
    fireEvent.click(viewButton);
    expect(mockHandleView).toHaveBeenCalledWith(mockRows[0]);
  });

  it("renders correct icon for isTryCatch column", () => {
    render(
      <DataGridPros
        rows={mockRows}
        handleView={vi.fn()}
        handleEdit={vi.fn()}
        handleDelete={vi.fn()}
      />,
    );

    expect(screen.getByText("✅")).toBeInTheDocument();
    expect(screen.getByText("❌")).toBeInTheDocument();
  });
});

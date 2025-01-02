import { Meta, StoryObj } from "@storybook/react";
import { DataGridPros } from "@/app/components/DataGrid/DataGrid";

import { action } from "@storybook/addon-actions";
import { DataGridProsProps } from "./DataGrid.types";
import { UserProps } from "../UserManagement";

const meta: Meta<typeof DataGridPros> = {
  title: "Components/DataGridPros",
  component: DataGridPros,
  tags: ["autodocs"],
  argTypes: {
    handleEdit: action("edit"),
    handleDelete: action("delete"),
    handleView: action("view"),
  },
};

export default meta;
type Story = StoryObj<DataGridProsProps>;

const rows: UserProps[] = [
  {
    id: "1",
    name: "Alice",
    age: "28",
    country: "USA",
    favoriteGenres: ["Drama", "Action"],
    isTryCatch: true,
  },
  {
    id: "2",
    name: "Bob",
    age: "35",
    country: "Canada",
    favoriteGenres: ["Horror", "Comedy"],
    isTryCatch: false,
  },
  {
    id: "3",
    name: "Charlie",
    age: "24",
    country: "UK",
    favoriteGenres: ["Sci-Fi", "Fantasy"],
    isTryCatch: true,
  },
];
export const Template: (args: DataGridProsProps) => JSX.Element = (
  args: DataGridProsProps,
) => (
  <DataGridPros
    {...args}
    rows={rows.map((row) => ({
      ...row,
    }))}
  />
);
export const WithRows: Story = {
  render: Template,
  args: {
    rows,
    handleEdit: action("edit"),
    handleDelete: action("delete"),
    handleView: action("view"),
  },
};

export const EmptyRows: Story = {
  // render: Template,
  args: {
    rows: [],
  },
};

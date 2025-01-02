import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { UserManagement } from "@/app/components/UserManagement/UserManagement";
import { UserProps } from "@/app/components/UserManagement/UserManagement.types";

const meta: Meta<typeof UserManagement> = {
  title: "Components/UserManagement",
  component: UserManagement,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;

type Story = StoryObj<typeof UserManagement>;

const Template: (args: { initialUsers?: UserProps[] }) => JSX.Element = (
  args,
) => {
  return <UserManagement {...args} />;
};

export const Default: Story = {
  render: Template,
  args: {
    initialUsers: [],
  },
};

export const WithUsers: Story = {
  render: Template,
  args: {
    initialUsers: [{
      "id": "1",
      "name": "John Doe",
      "age": "30",
      "favoriteGenres": ["Action", "Comedy"],
      "country": "USA",
      "isTryCatch": true
    }, {
      "id": "2",
      "name": "Jane Smith",
      "age": "25",
      "favoriteGenres": ["Drama", "Horror"],
      "country": "Canada",
      "isTryCatch": false
    }],
  },
};

export const EditMode: Story = {
  render: Template,
  args: {
    initialUsers: [{
      "id": "1",
      "name": "John D",
      "age": "30",
      "favoriteGenres": ["Action", "Comedy"],
      "country": "USA",
      "isTryCatch": true
    }],
    initialEditUser: {
      "id": "1",
      "name": "John Do",
      "age": "30",
      "favoriteGenres": ["Action", "Comedy"],
      "country": "USA",
      "isTryCatch": true
    },
  },
};

export const ViewMode: Story = {
  render: Template,
  args: {
    initialUsers: [
      {
        id: "1",
        name: "John Doe",
        age: "30",
        favoriteGenres: ["Action", "Comedy"],
        country: "USA",
        isTryCatch: true,
      },
    ] as UserProps[],
    initialViewUser: {
      id: "1",
      name: "John Doe",
      age: "30",
      favoriteGenres: ["Action", "Comedy"],
      country: "USA",
      isTryCatch: true,
    } as UserProps,
  },
};

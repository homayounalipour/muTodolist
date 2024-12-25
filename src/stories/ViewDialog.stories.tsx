import { Meta, StoryObj } from "@storybook/react";
import { DialogProps, ViewDialog } from "@/app/components/ViewDialog";
import { action } from "@storybook/addon-actions";
import { useState } from "react";
import { UserProps } from "@/app/page";

const meta: Meta<typeof ViewDialog> = {
  title: "Components/ViewDialog",
  component: ViewDialog,
  tags: ["autodocs"],
  argTypes: {
    isViewOpen: { control: "boolean" },
    handleCloseView: action("closed"),
  },
};
export default meta;

type Story = StoryObj<DialogProps>;

export const Template: (args: DialogProps) => JSX.Element = (
  args: DialogProps,
) => {
  const [isViewOpen, setIsViewOpen] = useState(args.isViewOpen);
  const handleCloseView = () => setIsViewOpen(false);

  return (
    <ViewDialog
      {...args}
      isViewOpen={isViewOpen}
      handleCloseView={handleCloseView}
      viewUser={args.viewUser}
    />
  );
};

const exampleUser: UserProps = {
  id: "123",
  name: "John Doe",
  age: "29",
  country: "USA",
  favoriteGenres: ["Action", "Drama", "Comedy"],
  isTryCatch: true,
};

export const WithUser: Story = {
  render: Template,
  args: {
    isViewOpen: true,
    handleCloseView: action("closed"),
    viewUser: exampleUser,
  },
};

export const WithoutUser: Story = {
  render: Template,
  args: {
    isViewOpen: true,
    handleCloseView: action("closed"),
    viewUser: null,
  },
};

export const CloseDialog: Story = {
  render: Template,
  args: {
    isViewOpen: true,
    handleCloseView: action("closed"),
    viewUser: exampleUser,
  },
};

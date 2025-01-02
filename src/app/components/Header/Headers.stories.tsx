import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Headers } from "./Headers";
import { HeadersProps } from "./Headers.types";

const meta: Meta<typeof Headers> = {
  title: "Components/Headers",
  component: Headers,
  tags: ["autodocs"],
  argTypes: {
    onclick: { action: "button clicked" },
  },
};

export default meta;

type Story = StoryObj<HeadersProps>;

const Template: Story = {
  render: (args: HeadersProps) => <Headers {...args} />,
};

export const Default: Story = {
  ...Template,
  args: {
    title: "MUI CRUD USERS",
    titleButton: "add user",
    onclick: () => alert("Button clicked!"),
  },
};

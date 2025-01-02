import React, { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Drawers } from "@/app/components/Drawers/Drawers";
import { DrawerProps } from "@/app/components/Drawers/Drawers.types";
import { ErrorProps } from "@/app/components/UserManagement";

const meta: Meta<typeof Drawers> = {
  title: "Components/Drawers",
  component: Drawers,
  tags: ["autodocs"],
  argTypes: {
    onClose: { action: "closed" },
    addBnClick: { action: "button clicked" },
    updateField: { action: "field updated" },
    clearError: { action: "error cleared" },
    setFavoriteGenres: { action: "favorite genres set" },
    setSelectedCountry: { action: "selected country set" },
    setIsTryCatch: { action: "isTryCatch set" },
  },
};

export default meta;

type Story = StoryObj<DrawerProps>;

const Template: (args: DrawerProps) => JSX.Element = (args: DrawerProps) => {
  const [formValues, setFormValues] = useState(args.formValues);
  const [favoriteGenres, setFavoriteGenres] = useState(args.favoriteGenres);
  const [selectedCountry, setSelectedCountry] = useState(args.selectedCountry);
  const [isTryCatch, setIsTryCatch] = useState(args.isTryCatch);
  const [error, setError] = useState<ErrorProps>(args.error);

  const updateField = (field: string, value: string) => {
    setFormValues((prev) => ({ ...prev, [field]: value }));
  };

  const clearError = (field: string) => {
    setError((prev) => ({ ...prev, [field]: "" }));
  };

  return (
    <Drawers
      {...args}
      formValues={formValues}
      updateField={updateField}
      clearError={clearError}
      favoriteGenres={favoriteGenres}
      setFavoriteGenres={setFavoriteGenres}
      selectedCountry={selectedCountry}
      setSelectedCountry={setSelectedCountry}
      isTryCatch={isTryCatch}
      setIsTryCatch={setIsTryCatch}
    />
  );
};

export const Default: Story = {
  render: Template,
  args: {
    open: true,
    formValues: {
      name: "",
      age: "",
    },
    favoriteGenres: [],
    selectedCountry: null,
    titleButton: "Submit",
    error: {
      name: "",
      age: "",
      favoriteGenres: "",
      country: "",
    },
    isTryCatch: false,
    addBnClick: () => {
      alert("Button clicked!");
    },
  },
};

export const WithError: Story = {
  ...Default,
  args: {
    ...Default.args,
    error: {
      name: "Name is required.",
      age: "Age must be a number.",
      favoriteGenres: "Select at least one genre.",
      country: "Country is required.",
    },
  },
};

export const PreFilled: Story = {
  ...Default,
  args: {
    ...Default.args,
    formValues: {
      name: "john",
      age: "30",
    },
    favoriteGenres: [
      { value: "action", title: "Action" },
      { value: "comedy", title: "Comedy" },
    ],
    selectedCountry: { value: "usa", title: "USA" },
  },
};

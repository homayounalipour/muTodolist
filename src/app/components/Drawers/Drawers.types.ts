import React from "react";
import { ErrorProps } from "@/app/page";

export type DrawerProps = {
  open?: boolean;
  onClose?: () => void;
  formValues: {
    name: string;
    age: string;
  };
  updateField?: (field: string, value: string) => void;
  favoriteGenres: { value: string; title: string }[];
  setFavoriteGenres?: React.Dispatch<
    React.SetStateAction<{ value: string; title: string }[]>
  >;
  selectedCountry: { value: string; title: string } | null;
  setSelectedCountry?: React.Dispatch<
    React.SetStateAction<{ value: string; title: string } | null>
  >;
  titleButton: string;
  addBnClick?: () => void;
  error: ErrorProps;
  clearError?: (filed: string) => void;
  isTryCatch: boolean;
  setIsTryCatch?: React.Dispatch<React.SetStateAction<boolean>>;
  disabled?: boolean;
};
export enum FieldNames {
  FavoriteGenres = "favoriteGenres",
  Country = "country",
  IsTryCatch = "IsTryCatch",
  name = "name",
  age = "age",
}

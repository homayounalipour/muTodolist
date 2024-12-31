import { UserProps } from "@/app/page";

export type DataGridProsProps = {
  rows: UserProps[];
  handleEdit: (row: UserProps) => void;
  handleDelete: (row: UserProps) => void;
  handleView: (row: UserProps) => void;
};

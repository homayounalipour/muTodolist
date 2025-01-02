import React, { useCallback, useMemo, useState } from "react";
import { Headers } from "../Header";
import { Drawers } from "../Drawers";
import { DataGridPros } from "../../components/DataGrid";
import { Box } from "@mui/material";
import { ErrorProps, UserProps } from "./UserManagement.types";

export const UserManagement: React.FC<{
  initialUsers?: UserProps[];
  initialEditUser?: UserProps | null;
  initialViewUser?: UserProps | null;
}> = ({
  initialUsers = [],
  initialEditUser = null,
  initialViewUser = null,
}) => {
  const [open, setOpen] = useState(false);
  const [formValues, setFormValues] = useState({
    name: "",
    age: "",
  });
  const [favoriteGenres, setFavoriteGenres] = useState<
    { value: string; title: string }[]
  >([]);
  const [selectedCountry, setSelectedCountry] = useState<{
    value: string;
    title: string;
  } | null>(null);

  const [users, setUsers] = useState<UserProps[]>(initialUsers);
  const [error, setError] = useState<ErrorProps>({});
  const [isTryCatch, setIsTryCatch] = useState<boolean>(false);
  const [viewUser, setViewUser] = useState<UserProps | null>(initialViewUser);
  const [isViewOpen, setIsViewOpen] = useState<boolean>(false);
  const [isEditDrawerOpen, setIsEditDrawerOpen] = useState<boolean>(false);
  const [editUser, setEditUser] = useState<UserProps | null>(initialEditUser);
  const onCloseDrawer = () => {
    setOpen(false);
    setFormValues({ name: "", age: "" });
    setSelectedCountry(null);
    setFavoriteGenres([]);
    setIsTryCatch(false);
    setIsViewOpen(false);
  };
  const updateField = (field: string, value: string) => {
    setFormValues((prev) => ({
      ...prev,
      [field]: value,
    }));
  };
  const clearError = (field: string) => {
    setError((prev) => ({
      ...prev,
      [field]: "",
    }));
  };
  const handleAddUser = () => {
    console.log(formValues, "asghar madareto");
    console.log(favoriteGenres, "taghi madareto");
    console.log(selectedCountry, "hasan madareto");
    console.log(isTryCatch, "akbar madareto");

    const newErrors = {
      name: formValues.name ? "" : "Name is required",
      age: formValues.age ? "" : "Age is required",
      country: selectedCountry ? "" : "Country is required",
      favoriteGenres: favoriteGenres.length
        ? ""
        : "At least one genre is required",
    };
    setError(newErrors);
    if (Object.values(newErrors).some((error) => error)) {
      console.log("mamamad madareto");
      return;
    }
    const newUser = {
      id: Date.now().toString(),
      name: formValues.name,
      age: formValues.age,
      favoriteGenres: favoriteGenres.map((genre) => genre.title),
      country: selectedCountry?.title || "No country selected",
      isTryCatch,
    };
    setUsers((prev) => [...prev, newUser]);
    onCloseDrawer();
    console.log(newUser, "user added");
  };
  const handleDelete = useCallback((params: UserProps) => {
    setUsers((prev) => prev.filter((user) => user.id !== params.id));
  }, []);

  const handleView = useCallback((user: UserProps) => {
    setViewUser(user);
    setIsViewOpen(true);
  }, []);
  const handleCloseView = () => {
    setViewUser(null);
    setIsViewOpen(false);
  };

  const handleEdit = useCallback((user: UserProps) => {
    setEditUser(user);

    setFormValues({
      name: user.name,
      age: user.age,
    });
    setFavoriteGenres(
      user.favoriteGenres.map((genre) => ({ value: genre, title: genre })),
    );
    setSelectedCountry(
      user.country ? { value: user.country, title: user.country } : null,
    );
    setIsTryCatch(user.isTryCatch);

    setIsEditDrawerOpen(true);
  }, []);

  const handleCloseEditDrawer = () => {
    setIsEditDrawerOpen(false);
    setEditUser(null);
  };
  const handleSaveEdit = () => {
    if (!editUser) return;

    const updatedUser = {
      ...editUser,
      name: formValues.name,
      age: formValues.age,
      favoriteGenres: favoriteGenres.map((genre) => genre.title),
      country: selectedCountry?.title || "",
      isTryCatch,
    };

    setUsers((prev: UserProps[]) =>
      prev.map((user) => (user.id === updatedUser.id ? updatedUser : user)),
    );

    handleCloseEditDrawer();
    console.log("User updated:", updatedUser);
  };
  const openAddDrawer = () => {
    if (!isEditDrawerOpen) {
      setFormValues({ name: "", age: "" });
      setSelectedCountry(null);
      setFavoriteGenres([]);
      setIsTryCatch(false);
      setOpen(true);
    }
  };
  const memoizedRows = useMemo(() => users, [users]);
  const viewUsersGenres = useMemo(() => {
    return viewUser?.favoriteGenres.map((genre) => ({
      value: genre,
      title: genre,
    }));
  }, [viewUser?.favoriteGenres]);
  return (
    <Box>
      <Headers
        title="MUI CRUD USERS"
        titleButton="add user"
        onclick={openAddDrawer}
      />
      {isEditDrawerOpen ? (
        <Drawers
          open={isEditDrawerOpen}
          onClose={handleCloseEditDrawer}
          formValues={formValues}
          updateField={updateField}
          favoriteGenres={favoriteGenres}
          setFavoriteGenres={setFavoriteGenres}
          selectedCountry={selectedCountry}
          setSelectedCountry={setSelectedCountry}
          titleButton="Save Changes"
          addBnClick={handleSaveEdit}
          error={error}
          clearError={clearError}
          isTryCatch={isTryCatch}
          setIsTryCatch={setIsTryCatch}
        />
      ) : isViewOpen ? (
        <Drawers
          open={isViewOpen}
          onClose={handleCloseView}
          formValues={{
            age: viewUser?.age as string,
            name: viewUser?.name as string,
          }}
          favoriteGenres={viewUsersGenres || []}
          selectedCountry={{
            value: viewUser?.country as string,
            title: viewUser?.country as string,
          }}
          titleButton="close"
          addBnClick={handleCloseView}
          isTryCatch={viewUser?.isTryCatch as boolean}
          disabled={isViewOpen}
          error={error}
        />
      ) : (
        <Drawers
          open={open}
          onClose={onCloseDrawer}
          formValues={formValues}
          updateField={updateField}
          favoriteGenres={favoriteGenres}
          setFavoriteGenres={setFavoriteGenres}
          selectedCountry={selectedCountry}
          setSelectedCountry={setSelectedCountry}
          titleButton="add"
          addBnClick={handleAddUser}
          error={error}
          clearError={clearError}
          isTryCatch={isTryCatch}
          setIsTryCatch={setIsTryCatch}
        />
      )}
      <DataGridPros
        rows={memoizedRows}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
        handleView={handleView}
      />
      {/*<ViewDialog*/}
      {/*  handleCloseView={handleCloseView}*/}
      {/*  isViewOpen={isViewOpen}*/}
      {/*  viewUser={viewUser}*/}
      {/*/>*/}
    </Box>
  );
};

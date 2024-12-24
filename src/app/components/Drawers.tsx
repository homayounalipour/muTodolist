import React, { useCallback, useMemo } from "react";
import {
  Autocomplete,
  Box,
  Button,
  Checkbox,
  Drawer,
  FormControlLabel,
  FormGroup,
  TextField,
} from "@mui/material";
import { autoCompleteFields, fields } from "@/app/components/Data";
import { ErrorProps } from "@/app/page";

export type DrawerProps = {
  open?: boolean;
  onClose?: () => void;
  formValues: {
    name: string;
    age: string;
  };
  updateField: (field: string, value: string) => void;
  favoriteGenres: { value: string; title: string }[];
  setFavoriteGenres: React.Dispatch<
    React.SetStateAction<{ value: string; title: string }[]>
  >;
  selectedCountry: { value: string; title: string } | null;
  setSelectedCountry: React.Dispatch<
    React.SetStateAction<{ value: string; title: string } | null>
  >;
  titleButton: string;
  addBnClick: () => void;
  error: ErrorProps;
  clearError: (filed: string) => void;
  isTryCatch: boolean;
  setIsTryCatch: React.Dispatch<React.SetStateAction<boolean>>;
};
export enum FieldNames {
  FavoriteGenres = "favoriteGenres",
  Country = "country",
  IsTryCatch = "IsTryCatch",
  name = "name",
  age = "age",
}

export const Drawers: React.FC<DrawerProps> = (props) => {
  const {
    onClose,
    open,
    updateField,
    formValues,
    favoriteGenres,
    setFavoriteGenres,
    selectedCountry,
    setSelectedCountry,
    titleButton,
    addBnClick,
    error,
    clearError,
    isTryCatch,
    setIsTryCatch,
  } = props;

  const handleFavoriteGenresChange = useCallback(
    (value: { value: string; title: string }[]) => {
      setFavoriteGenres(value);
      clearError(FieldNames.FavoriteGenres);
    },
    [setFavoriteGenres, clearError],
  );

  const handleCountryChange = useCallback(
    (value: { value: string; title: string } | null) => {
      setSelectedCountry(value);
      clearError(FieldNames.Country);
    },
    [setSelectedCountry, clearError],
  );

  const handleFieldChange = useCallback(
    (field: string, value: string) => {
      updateField(field, value);
      clearError(field);
    },
    [updateField, clearError],
  );
  const handleIsTryCatch = useCallback((value: boolean) => {
    setIsTryCatch(value);
  }, []);

  const DrawerDetail = (
    <Box sx={{ padding: 2, width: 300 }}>
      {fields?.map((filed) => (
        <TextField
          key={filed.id}
          fullWidth
          id="outlined-basic"
          label={filed.label}
          variant="outlined"
          margin="normal"
          type={filed.type}
          value={formValues[filed.name as keyof typeof formValues]}
          onChange={(e) => handleFieldChange(filed.name, e.target.value)}
          error={!!error[filed.name as keyof ErrorProps]}
          helperText={error[filed.name as keyof ErrorProps]}
        />
      ))}

      {autoCompleteFields.map((field) => {
        if (field.name === FieldNames.FavoriteGenres) {
          return (
            <Box key={field.id} sx={{ py: 2 }}>
              <Autocomplete
                multiple
                options={field.options}
                getOptionLabel={(option) => option.title}
                value={favoriteGenres}
                onChange={(e, value) => handleFavoriteGenresChange(value || [])}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label={field.label}
                    variant="outlined"
                    error={!!error[FieldNames.FavoriteGenres]}
                    helperText={error[FieldNames.FavoriteGenres]}
                  />
                )}
              />
            </Box>
          );
        }

        if (field.name === FieldNames.Country) {
          return (
            <Box key={field.id} sx={{ py: 1 }}>
              <Autocomplete
                key={field.id}
                options={field.options}
                getOptionLabel={(option) => option.title}
                value={selectedCountry}
                onChange={(e, value) => handleCountryChange(value || null)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label={field.label}
                    variant="outlined"
                    error={!!error[FieldNames.Country]}
                    helperText={error[FieldNames.Country]}
                  />
                )}
              />
            </Box>
          );
        }
        return null;
      })}
      <Box>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                checked={isTryCatch}
                onChange={(e) => handleIsTryCatch(e.target.checked)}
              />
            }
            label={FieldNames.IsTryCatch}
          />
        </FormGroup>
      </Box>
      <Box pt={8}>
        <Button
          variant="contained"
          sx={{
            textTransform: "capitalize",
            width: "100%",
            backgroundColor: "#878484",
            "&:hover": {
              backgroundColor: "#5c5a5a",
              color: "#ffffff",
            },
          }}
          onClick={addBnClick}
        >
          {titleButton}
        </Button>
      </Box>
    </Box>
  );
  const DrawerDetailMemo = useMemo(
    () => DrawerDetail,
    [formValues, favoriteGenres, selectedCountry, error, isTryCatch],
  );
  return (
    <Drawer open={open} onClose={onClose} anchor="right">
      {DrawerDetailMemo}
    </Drawer>
  );
};

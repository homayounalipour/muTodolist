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
import { autoCompleteFields, fields } from "../../utils/Data";
import { ErrorProps } from "@/app/page";
import { DrawerProps, FieldNames } from "./Drawers.types";

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
    disabled,
  } = props;

  const handleFavoriteGenresChange = useCallback(
    (value: { value: string; title: string }[]) => {
      if (setFavoriteGenres) {
        setFavoriteGenres(value);
      }
      if (clearError) {
        clearError(FieldNames.FavoriteGenres);
      }
    },
    [setFavoriteGenres, clearError],
  );

  const handleCountryChange = useCallback(
    (value: { value: string; title: string } | null) => {
      if (setSelectedCountry) {
        setSelectedCountry(value);
      }
      if (clearError) {
        clearError(FieldNames.Country);
      }
    },
    [setSelectedCountry, clearError],
  );

  const handleFieldChange = useCallback(
    (field: string, value: string) => {
      if (updateField) {
        updateField(field, value);
      }
      if (clearError) {
        clearError(field);
      }
    },
    [updateField, clearError],
  );
  const handleIsTryCatch = useCallback((value: boolean) => {
    if (setIsTryCatch) {
      setIsTryCatch(value);
    }
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
          disabled={disabled}
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
                disabled={disabled}
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
                disabled={disabled}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label={field.label}
                    variant="outlined"
                    error={!!error[FieldNames.Country]}
                    helperText={error[FieldNames.Country]}
                    disabled={disabled}
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
                disabled={disabled}
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

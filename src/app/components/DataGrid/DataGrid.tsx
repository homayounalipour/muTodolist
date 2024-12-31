import React, { useMemo } from "react";
import Box from "@mui/material/Box";
import {
  DataGridPro,
  GridColDef,
  GridVisibilityOffIcon,
} from "@mui/x-data-grid-pro";
import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import { FieldNames } from "../Drawers/Drawers.types";
import { DataGridProsProps } from "./DataGrid.types";

export const DataGridPros: React.FC<DataGridProsProps> = (props) => {
  const { rows, handleView, handleEdit, handleDelete } = props;
  const columns: GridColDef[] = [
    { field: FieldNames.name, headerName: "Name", width: 200 },
    { field: FieldNames.age, headerName: "Age", width: 150 },
    {
      field: FieldNames.FavoriteGenres,
      headerName: "Favorite Genres",
      width: 250,
    },
    { field: FieldNames.Country, headerName: "Country", width: 150 },
    {
      field: "isTryCatch",
      headerName: "Is Try Catch",
      width: 150,
      renderCell: (params) => (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: "100%",
          }}
        >
          {params.value ? "✅" : "❌"}
        </Box>
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 250,
      renderCell: (params) => (
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            width: "100%",
          }}
        >
          <IconButton
            color="primary"
            onClick={() => handleEdit(params.row)}
            title="Edit"
          >
            <EditIcon />
          </IconButton>
          <IconButton
            color="error"
            onClick={() => handleDelete(params.row)}
            title="Delete"
          >
            <DeleteIcon />
          </IconButton>
          <IconButton
            color="success"
            onClick={() => handleView(params.row)}
            title="View"
          >
            <GridVisibilityOffIcon />
          </IconButton>
        </Box>
      ),
    },
  ];
  const memoizedColumns = useMemo(() => columns, [columns]);
  return (
    <Box sx={{ height: 520, width: "100%" }}>
      <DataGridPro
        rows={rows.map((row) => ({
          ...row,
        }))}
        aria-label="DataGrid for testing"
        columns={memoizedColumns}
        rowHeight={38}
        checkboxSelection
        disableRowSelectionOnClick
        autoPageSize
        disableVirtualization
      />
    </Box>
  );
};

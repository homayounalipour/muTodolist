"use client";

import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { AddCircle } from "@mui/icons-material";
import { HeadersProps } from "@/app/components/Header/Headers.types";

export const Headers: React.FC<HeadersProps> = (props) => {
  const { title, titleButton, onclick } = props;
  return (
    <Box
      padding={4}
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      bgcolor="#2C3E50"
    >
      <Typography variant="h6" color="#fff">
        {title}
      </Typography>
      <Button
        startIcon={<AddCircle />}
        sx={{ textTransform: "capitalize", color: "#fff" }}
        onClick={onclick}
      >
        {titleButton}
      </Button>
    </Box>
  );
};

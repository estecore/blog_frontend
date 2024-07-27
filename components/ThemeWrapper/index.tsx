"use client";

import { ThemeProvider, CssBaseline } from "@mui/material";

import { theme } from "./theme";

export const ThemeWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

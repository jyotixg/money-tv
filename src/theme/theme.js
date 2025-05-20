import { createTheme } from "@mui/material/styles";

export const getDesignTokens = (mode) => ({
  palette: {
    mode,
    ...(mode === "light"
      ? {
          // Light mode
          primary: {
            main: "#001691",
            light: "#1a2f9f",
            dark: "#001066",
          },
          background: {
            default: "#ffffff",
            paper: "#ffffff",
          },
          text: {
            primary: "#000000",
            secondary: "rgba(0, 0, 0, 0.7)",
          },
          custom: {
            brandBlue: "#001691",
          },
        }
      : {
          // Dark mode
          primary: {
            main: "#ffffff",
            light: "#ffffff",
            dark: "#e0e0e0",
          },
          background: {
            default: "#040C38",
            paper: "#0a1445",
          },
          text: {
            primary: "#ffffff",
            secondary: "rgba(255, 255, 255, 0.7)",
          },
          custom: {
            lightBlue: "#1a2152",
          },
          action: {
            selected: "#1a2152",
            hover: "#232b5e",
          },
        }),
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: "2.5rem",
      fontWeight: 600,
      "@media (max-width:600px)": {
        fontSize: "2rem",
      },
    },
    h2: {
      fontSize: "2rem",
      fontWeight: 500,
      "@media (max-width:600px)": {
        fontSize: "1.75rem",
      },
    },
    body1: {
      fontSize: "1rem",
      "@media (max-width:600px)": {
        fontSize: "0.95rem",
      },
    },
  },
  components: {
    MuiContainer: {
      styleOverrides: {
        root: {
          paddingLeft: "16px",
          paddingRight: "16px",
          "@media (min-width: 600px)": {
            paddingLeft: "24px",
            paddingRight: "24px",
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: mode === "dark" ? "#0a1445" : "#ffffff",
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: ({ theme }) => ({
          color: mode === "light" ? "#000000" : "#ffffff",
          "&.Mui-selected": {
            color: theme.palette.primary.main,
          },
          ...(mode === "dark" && {
            backgroundColor: theme.palette.custom.lightBlue,
            "&:hover": {
              backgroundColor: theme.palette.action.hover,
            },
          }),
        }),
      },
    },
    MuiChip: {
      styleOverrides: {
        root: ({ theme }) => ({
          ...(mode === "dark" && {
            backgroundColor: theme.palette.custom.lightBlue + " !important",
            "&:hover": {
              backgroundColor: theme.palette.action.hover + " !important",
            },
          }),
        }),
        filled: {
          ...(mode === "dark" && {
            backgroundColor: "#1a2152 !important",
          }),
        },
      },
    },
    MuiToggleButton: {
      styleOverrides: {
        root: ({ theme }) => ({
          ...(mode === "dark" && {
            backgroundColor: theme.palette.custom.lightBlue,
            "&:hover": {
              backgroundColor: theme.palette.action.hover,
            },
            "&.Mui-selected": {
              backgroundColor: theme.palette.action.selected + " !important",
              "&:hover": {
                backgroundColor: theme.palette.action.hover + " !important",
              },
            },
          }),
        }),
      },
    },

    MuiTypography: {
      styleOverrides: {
        root: ({ theme, ownerState }) => ({
          ...(mode === "light" && {
            color:
              ownerState.variant === "subtitle2" ||
              (ownerState.variant === "body1" &&
                ownerState.component === "div" &&
                ownerState.gutterBottom)
                ? theme.palette.custom.brandBlue
                : "inherit",
          }),
          ...(mode === "dark" && {
            color:
              ownerState.variant === "subtitle2" ||
              (ownerState.variant === "body1" &&
                ownerState.component === "div" &&
                ownerState.gutterBottom)
                ? "#ffffff"
                : "inherit",
          }),
        }),
      },
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
});

// Create a theme instance
const createAppTheme = (mode) => {
  return createTheme(getDesignTokens(mode));
};

export default createAppTheme;

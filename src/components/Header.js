import { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  InputBase,
  Box,
  Badge,
  styled,
  Divider,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Search as SearchIcon,
  Notifications as NotificationsIcon,
} from "@mui/icons-material";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: 15,
  backgroundColor: theme.palette.background.paper,
  border: `1px solid ${theme.palette.divider}`,
  display: "flex",
  alignItems: "center",
  // marginRight: theme.spacing(2),
  // marginLeft: theme.spacing(3),
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "80%",
  },
  [theme.breakpoints.down("sm")]: {
    backgroundColor:
      theme.palette.mode === "dark"
        ? theme.palette.background.paper
        : "#f8f8f8",
    border: `1px solid ${
      theme.palette.mode === "dark"
        ? theme.palette.divider
        : theme.palette.grey[200]
    }`,
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: theme.palette.text.primary,
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(1)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    fontSize: "0.875rem",
    [theme.breakpoints.down("sm")]: {
      fontSize: "0.875rem",
    },
  },
}));

const PostfixIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  right: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  "& .MuiDivider-root": {
    marginRight: theme.spacing(2),
  },
  "& .MuiSvgIcon-root": {
    fontSize: "1.2rem",
    color: theme.palette.text.secondary,
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.2rem",
    },
  },
}));

const Header = ({ toggleSidebar }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  if (isMobile) {
    return (
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: "background.paper",
          color: "text.primary",
          boxShadow: "none",
          borderBottom: "1px solid",
          borderColor: "divider",
        }}
        elevation={0}
      >
        <Toolbar
          sx={{
            flexDirection: "column",
            py: 1,
            gap: 1,
          }}
        >
          {/* Top row with logo and icons */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
              px: 1,
            }}
          >
            {/* Logo */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                fontWeight: "bold",
                fontSize: "1.5rem",
                color: "primary.main",
              }}
            >
              MONEY
              <span style={{ fontSize: "1rem", fontWeight: "400" }}>TV</span>
            </Box>

            {/* Right side icons */}
            <Box sx={{ display: "flex" }}>
              <IconButton
                size="large"
                aria-label="show notifications"
                color="inherit"
                sx={{
                  "& .MuiSvgIcon-root": {
                    fontSize: "1.8rem",
                  },
                }}
              >
                <Badge badgeContent={3} color="error">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
              <IconButton
                size="large"
                edge="end"
                color="inherit"
                aria-label="toggle sidebar"
                onClick={toggleSidebar}
                sx={{
                  ml: 1,
                  "& .MuiSvgIcon-root": {
                    fontSize: "1.8rem",
                  },
                }}
              >
                <MenuIcon />
              </IconButton>
            </Box>
          </Box>

          {/* Bottom row with search bar */}
          <Box sx={{ width: "100%", px: 1 }}>
            <Search>
              <StyledInputBase
                placeholder="Search for Videos"
                inputProps={{ "aria-label": "search" }}
              />
              <PostfixIconWrapper>
                {/* <Divider orientation="vertical" flexItem /> */}
                {/* <PostAddIcon color="action" /> */}
                <SearchIcon />
              </PostfixIconWrapper>
            </Search>
          </Box>
        </Toolbar>
      </AppBar>
    );
  }

  // Desktop view - keeping the original layout
  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: "background.paper",
        color: "text.primary",
        paddingLeft: 3,
        boxShadow: "none",
        borderBottom: "1px solid",
        borderColor: "divider",
      }}
      elevation={0}
    >
      <Toolbar>
        <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
          {/* Logo */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              fontWeight: "bold",
              fontSize: "1.5rem",
              color: "primary.main",
            }}
          >
            MONEY
            <span style={{ fontSize: "1rem", fontWeight: "400" }}>TV</span>
          </Box>

          {/* Search Bar */}
          <Search>
            <StyledInputBase
              placeholder="Search for Videos"
              inputProps={{ "aria-label": "search" }}
            />
            <PostfixIconWrapper>
              <Divider orientation="vertical" flexItem />
              {/* <PostAddIcon color="action" /> */}
              <SearchIcon />
            </PostfixIconWrapper>
          </Search>
        </Box>

        {/* Right side icons */}
        <Box sx={{ display: "flex" }}>
          <IconButton
            size="large"
            aria-label="show notifications"
            color="inherit"
            sx={{
              "& .MuiSvgIcon-root": {
                fontSize: "1.8rem",
              },
            }}
          >
            <Badge badgeContent={3} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <IconButton
            size="large"
            edge="end"
            color="inherit"
            aria-label="toggle sidebar"
            onClick={toggleSidebar}
            sx={{
              ml: 1,
              "& .MuiSvgIcon-root": {
                fontSize: "1.8rem",
              },
            }}
          >
            <MenuIcon />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;

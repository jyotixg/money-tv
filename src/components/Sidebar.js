import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  Box,
  IconButton,
  Typography,
  Button,
  Divider,
} from "@mui/material";
import {
  Home as HomeIcon,
  Subscriptions as SubscriptionsIcon,
  Whatshot as WhatshotIcon,
  VideoLibrary as VideoLibraryIcon,
  History as HistoryIcon,
  Close as CloseIcon,
  DarkMode as DarkModeIcon,
  LightMode as LightModeIcon,
  Settings as SettingsIcon,
} from "@mui/icons-material";
import { useState } from "react";

const DRAWER_WIDTH = 300;
const MINI_DRAWER_WIDTH = 70;

const mainSidebarItems = [
  { text: "Home", icon: <HomeIcon /> },
  { text: "Trending", icon: <WhatshotIcon /> },
  { text: "Subscriptions", icon: <SubscriptionsIcon /> },
  { text: "Library", icon: <VideoLibraryIcon /> },
  { text: "History", icon: <HistoryIcon /> },
];

const bottomSidebarItems = [{ text: "Settings", icon: <SettingsIcon /> }];

const Sidebar = ({ open, onClose, isDarkMode, onToggleTheme }) => {
  return (
    <>
      {/* Mini permanent drawer */}
      <Drawer
        variant="permanent"
        anchor="right"
        sx={{
          width: MINI_DRAWER_WIDTH,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: MINI_DRAWER_WIDTH,
            boxSizing: "border-box",
            top: "64px",
            height: `calc(100% - 64px)`,
            backgroundColor: "background.default",
            borderLeft: "1px solid",
            borderColor: "divider",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          },
        }}
      >
        {/* Top icons */}
        <List>
          {mainSidebarItems.map((item) => (
            <ListItem key={item.text} disablePadding>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    justifyContent: "center",
                  }}
                >
                  {item.icon}
                </ListItemIcon>
              </ListItemButton>
            </ListItem>
          ))}
        </List>

        {/* Bottom icons */}
        <Box>
          <List>
            <ListItem disablePadding>
              <ListItemButton
                onClick={onToggleTheme}
                sx={{
                  minHeight: 48,
                  justifyContent: "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    justifyContent: "center",
                  }}
                >
                  {isDarkMode ? <LightModeIcon /> : <DarkModeIcon />}
                </ListItemIcon>
              </ListItemButton>
            </ListItem>
            {bottomSidebarItems.map((item) => (
              <ListItem key={item.text} disablePadding>
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: "center",
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      justifyContent: "center",
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>

      {/* Full-width temporary drawer */}
      <Drawer
        sx={{
          width: DRAWER_WIDTH,
          flexShrink: 0,
          position: "fixed",
          "& .MuiDrawer-paper": {
            width: DRAWER_WIDTH,
            boxSizing: "border-box",
            top: 0,
            height: "100%",
            zIndex: (theme) => theme.zIndex.appBar - 1,
            borderLeft: "1px solid",
            borderColor: "divider",
          },
        }}
        variant="temporary"
        anchor="right"
        open={open}
        onClose={onClose}
        ModalProps={{
          keepMounted: true,
        }}
      >
        {/* Header */}
        <Box
          sx={{
            p: 2,
            // mt: "64px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h6" component="div">
            Welcome, User!
          </Typography>
          <IconButton onClick={onClose} edge="end">
            <CloseIcon />
          </IconButton>
        </Box>
        <Divider />

        {/* Main content */}
        <Box
          sx={{
            overflow: "auto",
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          {/* Top menu items */}
          <List>
            {mainSidebarItems.map((item) => (
              <ListItem key={item.text} disablePadding>
                <ListItemButton>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>

          {/* Bottom section */}
          <Box sx={{ p: 2 }}>
            <List>
              <ListItem disablePadding>
                <ListItemButton onClick={onToggleTheme}>
                  <ListItemIcon>
                    {isDarkMode ? <LightModeIcon /> : <DarkModeIcon />}
                  </ListItemIcon>
                  <ListItemText
                    primary={isDarkMode ? "Light Mode" : "Dark Mode"}
                  />
                </ListItemButton>
              </ListItem>
              {bottomSidebarItems.map((item) => (
                <ListItem key={item.text} disablePadding>
                  <ListItemButton>
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.text} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>

            <Button
              variant="contained"
              color="primary"
              fullWidth
              startIcon={<SubscriptionsIcon />}
              sx={{ mb: 2 }}
            >
              Subscribe
            </Button>
          </Box>
        </Box>
      </Drawer>
    </>
  );
};

export default Sidebar;

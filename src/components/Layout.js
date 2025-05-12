import { useState, useMemo, useEffect } from "react";
import { Box, styled, createTheme, ThemeProvider } from "@mui/material";
import Header from "./Header";
import Sidebar from "./Sidebar";
import CategoryTabs from "./CategoryTabs";

const MINI_DRAWER_WIDTH = 70;

const Main = styled("main")(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  marginTop: "112px",
  marginRight: MINI_DRAWER_WIDTH,
  width: `calc(100% - ${MINI_DRAWER_WIDTH}px)`,
  minHeight: "100vh",
  backgroundColor: theme.palette.background.default,
}));

const TabsContainer = styled(Box)(({ theme }) => ({
  position: "fixed",
  top: "64px",
  left: 0,
  right: MINI_DRAWER_WIDTH,
  zIndex: theme.zIndex.appBar - 1,
  backgroundColor: theme.palette.background.default,
}));

const Layout = ({ children }) => {
  const [mounted, setMounted] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Only show the UI after first render on client
  useEffect(() => {
    setMounted(true);
  }, []);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: isDarkMode ? "dark" : "light",
        },
      }),
    [isDarkMode]
  );

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  if (!mounted) {
    return null;
  }

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          display: "flex",
          bgcolor: "background.default",
          color: "text.primary",
        }}
      >
        <Header toggleSidebar={toggleSidebar} />
        <TabsContainer>
          <CategoryTabs />
        </TabsContainer>
        <Main>{children}</Main>
        <Sidebar
          open={sidebarOpen}
          onClose={toggleSidebar}
          isDarkMode={isDarkMode}
          onToggleTheme={toggleTheme}
        />
      </Box>
    </ThemeProvider>
  );
};

export default Layout;

import { useState, useMemo, useEffect } from "react";
import {
  Box,
  styled,
  createTheme,
  ThemeProvider,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import Header from "./Header";
import Sidebar from "./Sidebar";
import CategoryTabs from "./CategoryTabs";
import Footer from "./Footer";
import NoVideosPage from "@/pages/no-videos";

const MINI_DRAWER_WIDTH = 70;

const Main = styled("main")(({ theme }) => ({
  flexGrow: 1,
  // padding: theme.spacing(3),
  // paddingRight: theme.spacing(0.1),
  marginTop: theme.spacing(16), // Increased top margin to accommodate header + tabs
  width: `calc(100% - ${MINI_DRAWER_WIDTH}px)`,
  minHeight: "100vh",
  backgroundColor: theme.palette.background.default,
  display: "flex",
  flexDirection: "column",
  [theme.breakpoints.down("sm")]: {
    width: "100%", // Full width on mobile
    marginTop: theme.spacing(20), // More space for stacked header + search + tabs
  },
}));

const TabsContainer = styled(Box)(({ theme }) => ({
  position: "fixed",
  top: "64px",
  left: 0,
  right: MINI_DRAWER_WIDTH,
  zIndex: theme.zIndex.appBar - 1,
  backgroundColor: theme.palette.background.default,
  [theme.breakpoints.down("sm")]: {
    top: "112px", // Adjusted for stacked header height
    right: 0, // Full width on mobile
  },
}));

const Layout = ({ children }) => {
  const [mounted, setMounted] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // Only show the UI after first render on client
  useEffect(() => {
    setMounted(true);
  }, []);

  const customTheme = useMemo(
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
    <ThemeProvider theme={customTheme}>
      <Box
        sx={{
          display: "flex",
          bgcolor: "background.default",
          color: "text.primary",
          minHeight: "100vh",
          flexDirection: "column",
        }}
      >
        <Header toggleSidebar={toggleSidebar} />
        <TabsContainer>
          <CategoryTabs />
        </TabsContainer>
        <Main>
          {children}
          <Footer />
          {/* <NoVideosPage /> */}
        </Main>
        <Sidebar
          open={sidebarOpen}
          onClose={toggleSidebar}
          isDarkMode={isDarkMode}
          onToggleTheme={toggleTheme}
          isMobile={isMobile}
        />
      </Box>
    </ThemeProvider>
  );
};

export default Layout;

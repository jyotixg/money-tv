import React from "react";
import { Box, Container } from "@mui/material";
import NoVideosFound from "../custom-components/NoVideosFound";
import Header from "../components/Header";

const NoVideosPage = () => {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Header toggleSidebar={toggleSidebar} />

      {/* Content area with top padding to account for fixed header */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          mt: { xs: 10, sm: 8 },
          pb: 4,
        }}
      >
        <Container maxWidth="lg">
          <NoVideosFound searchQuery="Football Highlights" />
        </Container>
      </Box>
    </Box>
  );
};

export default NoVideosPage;

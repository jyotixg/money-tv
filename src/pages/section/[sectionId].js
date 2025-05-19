import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import {
  Container,
  Box,
  Typography,
  Grid,
  Button,
  Breadcrumbs,
  Link,
} from "@mui/material";
import Layout from "../../components/Layout";
import { mainArr } from "../../data/homeData";
import VideoCard from "../../components/cards/VideoCard";
import ShortCard from "../../components/cards/ShortCard";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

const SectionPage = () => {
  const router = useRouter();
  const { sectionId } = router.query;
  const [sectionData, setSectionData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (sectionId) {
      const section = mainArr.find(
        (s, index) => index.toString() === sectionId
      );
      if (section) {
        setSectionData(section);
      }
      setLoading(false);
    }
  }, [sectionId]);

  // Handle back to home
  const handleHomeClick = (e) => {
    e.preventDefault();
    router.push("/");
  };

  // If the page is still loading or couldn't find the section
  if (loading) {
    return (
      <Layout>
        <Container maxWidth="xl">
          <Box sx={{ py: 4, textAlign: "center" }}>
            <Typography variant="h6">Loading...</Typography>
          </Box>
        </Container>
      </Layout>
    );
  }

  if (!sectionData) {
    return (
      <Layout>
        <Container maxWidth="xl">
          <Box sx={{ py: 4, textAlign: "center" }}>
            <Typography variant="h6">Section not found</Typography>
            <Button
              variant="contained"
              color="primary"
              sx={{ mt: 2 }}
              onClick={() => router.push("/")}
            >
              Back to Home
            </Button>
          </Box>
        </Container>
      </Layout>
    );
  }

  return (
    <Layout>
      <Container
        maxWidth="xl"
        sx={{
          px: { xs: 3, sm: 3, md: 6 },
          py: 2,
          width: "100%",
          maxWidth: "100% !important",
        }}
      >
        <Breadcrumbs
          separator={<NavigateNextIcon fontSize="small" />}
          aria-label="breadcrumb"
          sx={{ my: 2 }}
        >
          <Link
            color="inherit"
            href="/"
            onClick={handleHomeClick}
            sx={{ textDecoration: "none" }}
          >
            Home
          </Link>
          <Typography color="text.primary">
            {sectionData.sectionTitle}
          </Typography>
        </Breadcrumbs>

        <Typography
          variant="h4"
          component="h1"
          sx={{ mb: 3, fontWeight: "bold", color: "primary.main" }}
        >
          {sectionData.sectionTitle}
        </Typography>

        {sectionData.type === "videos" && (
          <Grid container spacing={2}>
            {sectionData.content.map((video) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={video.id}>
                <VideoCard video={video} sectionIndex={sectionId} />
              </Grid>
            ))}
          </Grid>
        )}

        {sectionData.type === "shorts" && (
          <Grid container spacing={2}>
            {sectionData.content.map((short) => (
              <Grid
                item
                xs={12}
                sm={6}
                md={3}
                key={short.id}
                sx={{ height: "400px" }}
              >
                <ShortCard short={short} sectionIndex={sectionId} />
              </Grid>
            ))}
          </Grid>
        )}

        {sectionData.type === "ads" && (
          <Box sx={{ textAlign: "center", py: 4 }}>
            <Typography variant="h6">
              Advertisement section has no detailed view
            </Typography>
            <Button
              variant="contained"
              color="primary"
              sx={{ mt: 2 }}
              onClick={() => router.push("/")}
            >
              Back to Home
            </Button>
          </Box>
        )}
      </Container>
    </Layout>
  );
};

export default SectionPage;

import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { Container, Box, Typography, Grid, Button } from "@mui/material";
import Layout from "../../components/Layout";
import { mainArr } from "../../data/homeData";
import VideoCard from "../../components/cards/VideoCard";
import ShortCard from "../../components/cards/ShortCard";
import NoVideosFound from "@/components/NoVideosFound";

const SectionPage = ({ sectionData }) => {
  const router = useRouter();
  const { slug } = router.query;
  const [loading, setLoading] = useState(!sectionData);
  const [section, setSection] = useState(sectionData);

  useEffect(() => {
    if (!sectionData && slug) {
      // Find section by slug if not provided via props
      const foundSection = mainArr.find((s) => s.slug === slug);
      if (foundSection) {
        setSection(foundSection);
      }
      setLoading(false);
    }
  }, [slug, sectionData]);

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

  if (!section) {
    return (
      <Layout>
        <Container maxWidth="xl">
          {/* <Box sx={{ py: 4, textAlign: "center" }}>
            <Typography variant="h6">Section not found</Typography>
            <Button
              variant="contained"
              color="primary"
              sx={{ mt: 2 }}
              onClick={() => router.push("/")}
            >
              Back to Home
            </Button>
          </Box> */}
          <NoVideosFound />
        </Container>
      </Layout>
    );
  }

  return (
    <Layout>
      <Container
        maxWidth="xl"
        sx={{
          px: { xs: 2, sm: 2, md: 4 },
          py: 2,
          width: "100%",
        }}
      >
        <Typography
          variant="h4"
          component="h1"
          fontWeight="bold"
          sx={{ mb: 4 }}
        >
          {section.sectionTitle}
        </Typography>

        <Grid container spacing={2}>
          {section.type === "videos" &&
            section.content.map((video) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={video.id}>
                <VideoCard
                  video={video}
                  sectionIndex={mainArr.findIndex(
                    (s) => s.slug === section.slug
                  )}
                />
              </Grid>
            ))}

          {section.type === "shorts" &&
            section.content.map((short) => (
              <Grid item xs={6} sm={4} md={3} lg={2} key={short.id}>
                <Box sx={{ height: { xs: 300, sm: 350, md: 400 } }}>
                  <ShortCard
                    short={short}
                    sectionIndex={mainArr.findIndex(
                      (s) => s.slug === section.slug
                    )}
                  />
                </Box>
              </Grid>
            ))}
        </Grid>
      </Container>
    </Layout>
  );
};

export default SectionPage;

// Generate static paths for all sections
export async function getStaticPaths() {
  const paths = mainArr
    .filter((section) => section.slug) // Only include sections with slugs
    .map((section) => ({
      params: { slug: section.slug },
    }));

  return {
    paths,
    fallback: "blocking",
  };
}

// Get static props for each section page
export async function getStaticProps({ params }) {
  const { slug } = params;

  // Find the section by slug
  const sectionData = mainArr.find((s) => s.slug === slug);

  if (!sectionData) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      sectionData,
    },
    // Revalidate the page every hour
    revalidate: 3600,
  };
}

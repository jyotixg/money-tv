import { useRouter } from "next/router";
import { Box, Container, Typography, Grid } from "@mui/material";
import VideoCard from "../custom-components/cards/VideoCard";
import ShortCard from "../custom-components/cards/ShortCard";
import { mainArr } from "../data/homeData";
import Layout from "@/components/Layout";

export default function SectionPage() {
  const router = useRouter();
  const { section } = router.query;

  // Find section data by slug
  const sectionData = mainArr.find((s) => s.slug === section);
  const sectionIndex = mainArr.findIndex((s) => s.slug === section);

  if (!sectionData) {
    return (
      <Layout>
        <Container>
          <Box sx={{ py: 4 }}>
            <Typography variant="h4">Section not found</Typography>
          </Box>
        </Container>
      </Layout>
    );
  }

  // Get the content array
  const items = sectionData.content;

  if (!items || items.length === 0) {
    return (
      <Layout>
        <Container>
          <Box sx={{ py: 4 }}>
            <Typography variant="h4">No items found in this section</Typography>
          </Box>
        </Container>
      </Layout>
    );
  }

  return (
    <Layout>
      <Container maxWidth="xl">
        <Box sx={{ px: 3, pb: 3 }}>
          <Typography
            variant="h6"
            component="h2"
            fontWeight="bold"
            color="primary.main"
            mb={2}
          >
            {sectionData.sectionTitle}
          </Typography>

          <Grid container spacing={2}>
            {sectionData.type === "shorts"
              ? // Render shorts grid
                items.map((short) => (
                  <Grid
                    item
                    key={short.id}
                    xs={12}
                    sm={6}
                    md={4}
                    lg={2.4}
                    sx={{ height: "100%" }}
                  >
                    <ShortCard short={short} sectionIndex={sectionIndex} />
                  </Grid>
                ))
              : // Render videos grid
                items.map((video) => (
                  <Grid
                    item
                    key={video.id}
                    xs={12}
                    sm={6}
                    md={4}
                    lg={3}
                    sx={{ height: "100%" }}
                  >
                    <VideoCard video={video} sectionIndex={sectionIndex} />
                  </Grid>
                ))}
          </Grid>
        </Box>
      </Container>
    </Layout>
  );
}

// This ensures all paths are pre-rendered at build time
export async function getStaticPaths() {
  const paths = mainArr.map((section) => ({
    params: { section: section.slug },
  }));

  return {
    paths,
    fallback: false,
  };
}

// Get the static props for the page
export async function getStaticProps({ params }) {
  const sectionData = mainArr.find((s) => s.slug === params.section);

  if (!sectionData) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      sectionData,
    },
  };
}

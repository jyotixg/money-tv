import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import {
  Container,
  Box,
  Typography,
  Grid,
  Paper,
  Button,
  Stack,
  Divider,
  useTheme,
  Link,
} from "@mui/material";
import Layout from "../../components/Layout";
import { mainArr } from "../../data/homeData";
import { WhatsApp, ContentCopy, Reply } from "@mui/icons-material";
import VideoSection from "../../custom-components/sections/VideoSection";
import ShortsSection from "../../custom-components/sections/ShortsSection";
import ShareDialog from "../../custom-components/ShareDialog";
import CopyButton from "../../custom-components/CopyButton";

const ActionButton = ({ icon, label, onClick, isReversed = false }) => (
  <Box
    sx={{
      display: "flex",
      alignItems: "center",
      gap: 0,
      borderRadius: 1,
      cursor: "pointer",
      padding: "4px 8px",
      transition: "all 0.2s ease-in-out",
      "&:hover": {
        "& .MuiTypography-root, & .MuiSvgIcon-root": {
          color: "grey.700",
        },
      },
    }}
    onClick={onClick}
  >
    {isReversed ? (
      <>
        <Typography
          variant="caption"
          sx={{
            color: "grey.500",
            fontSize: "0.7rem",
            userSelect: "none",
            mr: 0.5,
            transition: "color 0.2s ease-in-out",
          }}
        >
          {label}
        </Typography>
        {React.cloneElement(icon, {
          sx: {
            ...icon.props.sx,
            color: "grey.500",
            transition: "color 0.2s ease-in-out",
          },
        })}
      </>
    ) : (
      <>
        {React.cloneElement(icon, {
          sx: {
            ...icon.props.sx,
            color: "grey.500",
            transition: "color 0.2s ease-in-out",
          },
        })}
        <Typography
          variant="caption"
          sx={{
            color: "grey.500",
            fontSize: "0.7rem",
            userSelect: "none",
            ml: 0.5,
            transition: "color 0.2s ease-in-out",
          }}
        >
          {label}
        </Typography>
      </>
    )}
  </Box>
);

const VideoDetailPage = () => {
  const router = useRouter();
  const { section, video } = router.query;
  const theme = useTheme();
  const [videoData, setVideoData] = useState(null);
  const [sectionData, setSectionData] = useState(null);
  const [relatedVideos, setRelatedVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [shortsData, setShortsData] = useState([]);
  const [recommendedVideos, setRecommendedVideos] = useState([]);
  const [adData, setAdData] = useState(null);
  const [shareDialogOpen, setShareDialogOpen] = useState(false);

  useEffect(() => {
    // Only proceed when we have the query parameters
    if (section && video) {
      // Find the section by slug
      const foundSection = mainArr.find((s) => s.slug === section);

      if (foundSection) {
        setSectionData(foundSection);

        // Find the video in the section's content by ID
        const foundVideo = foundSection.content.find(
          (v) => v.id.toString() === video.toString()
        );

        if (foundVideo) {
          setVideoData(foundVideo);

          // Get related videos (from the same section except the current one)
          const related = foundSection.content
            .filter((v) => v.id.toString() !== video.toString())
            .slice(0, 5); // Limit to 4 related videos
          setRelatedVideos(related);
        }

        // Get shorts data
        const shortsSection = mainArr.find((s) => s.type === "shorts");
        if (shortsSection) {
          setShortsData(shortsSection.content.slice(0, 10));
        }

        // Get recommended videos (from other video sections)
        const otherVideoSections = mainArr.filter(
          (s) => s.type === "videos" && s !== foundSection
        );
        if (otherVideoSections.length > 0) {
          setRecommendedVideos(otherVideoSections[0].content.slice(0, 5));
        }

        // Get ad data
        const adSection = mainArr.find((s) => s.type === "ads");
        if (adSection && adSection.content.length > 0) {
          // Randomly select one ad from available ads
          const randomAdIndex = Math.floor(
            Math.random() * adSection.content.length
          );
          setAdData(adSection.content[randomAdIndex]);
        }
      }

      setLoading(false);
    }
  }, [section, video]);

  // Handle actions
  const handleCopy = () => {
    if (videoData) {
      navigator.clipboard?.writeText(videoData.name || videoData.title);
    }
  };

  const handleShare = () => {
    if (videoData) {
      setShareDialogOpen(true);
    }
  };

  const handleWhatsApp = () => {
    if (videoData) {
      const text = encodeURIComponent(
        `${videoData.name || videoData.title}\n${window.location.href}`
      );
      window.open(`https://wa.me/?text=${text}`, "_blank");
    }
  };

  // If the page is still loading or couldn't find the video
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

  if (!videoData) {
    return (
      <Layout>
        <Container maxWidth="xl">
          <Box sx={{ py: 4, textAlign: "center" }}>
            <Typography variant="h6">Video not found</Typography>
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

  // Format view count with commas
  const formattedViews = videoData.views
    ? new Intl.NumberFormat("en-US").format(videoData.views)
    : "0";

  // Format date
  const formattedDate = videoData.uploadDate
    ? new Date(videoData.uploadDate).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "";

  return (
    <Layout>
      <Container
        maxWidth="xl"
        sx={{
          px: { xs: 2, sm: 2, md: 4 },
          // py: 2,
          width: "100%",
          maxWidth: "100% !important",
        }}
      >
        <Grid
          container
          spacing={3}
          sx={{
            p: { xs: 3, md: 0 },
            pl: { md: 3 },
          }}
        >
          {/* Left side - Video and details */}
          <Grid item xs={12} md={9}>
            {/* Video Player */}
            <Box
              sx={{
                width: "100%",
                position: "relative",
                paddingTop: "50.25%", // 16:9 aspect ratio
                bgcolor: "black",
                borderRadius: 2,
                overflow: "hidden",
                mb: 2,
              }}
            >
              <Box
                component="img"
                src={videoData.thumbnailUrl}
                alt={videoData.name || videoData.title}
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                }}
              />
            </Box>

            {/* Section Title */}
            <Typography
              variant="subtitle2"
              fontWeight="bold"
              color="text.secondary"
              sx={{ mb: 1 }}
            >
              {sectionData?.sectionTitle}
            </Typography>

            {/* Video Title */}
            <Typography
              variant="h5"
              component="h1"
              fontWeight="bold"
              gutterBottom
            >
              {videoData.name || videoData.title}
            </Typography>

            {/* Action Buttons */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
                gap: 2,
                mb: 1,
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <ActionButton
                  icon={<WhatsApp sx={{ fontSize: "1.3rem" }} />}
                  label="Send"
                  onClick={handleWhatsApp}
                />
                <CopyButton text={videoData?.name || videoData?.title} />
              </Box>
              <ActionButton
                icon={
                  <Reply
                    sx={{
                      fontSize: "1.3rem",
                      transform: "rotate(180deg) scaleY(-1)",
                    }}
                  />
                }
                label="Share"
                onClick={handleShare}
                isReversed={true}
              />
            </Box>

            {/* Video Description */}
            <Box sx={{ mb: 2 }}>
              <Typography
                variant="body1"
                sx={{
                  whiteSpace: "pre-wrap",
                  fontSize: "0.875rem",
                  color: "text.secondary",
                }}
              >
                {videoData.description}
              </Typography>
            </Box>

            {/* Advertisement Section */}
            {adData && (
              <Box sx={{ mb: 2 }}>
                <Typography
                  variant="subtitle2"
                  color="text.secondary"
                  sx={{ mb: 1 }}
                >
                  Sponsored
                </Typography>
                <Link
                  href={adData.redirectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    textDecoration: "none",
                    display: "block",
                    "&:hover": {
                      opacity: 0.9,
                    },
                  }}
                >
                  <Paper
                    elevation={0}
                    sx={{
                      borderRadius: 2,
                      overflow: "hidden",
                      position: "relative",
                    }}
                  >
                    <Box
                      component="img"
                      src={adData.adImageUrl}
                      alt={adData.title}
                      sx={{
                        width: "100%",
                        height: "auto",
                        display: "block",
                      }}
                    />
                    <Box
                      sx={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        right: 0,
                        p: 2,
                        background:
                          "linear-gradient(transparent, rgba(0,0,0,0.7))",
                        color: "white",
                      }}
                    >
                      <Typography variant="subtitle1" fontWeight="bold">
                        {adData.title}
                      </Typography>
                      <Typography variant="body2">
                        {adData.description}
                      </Typography>
                    </Box>
                  </Paper>
                </Link>
              </Box>
            )}
          </Grid>

          {/* Right side - Sidebar with 4 sections */}
          <Grid item xs={12} md={3}>
            <Box
              className="sidebar-container"
              sx={{
                backgroundColor: "background.paper",
                borderRadius: 2,
                height: "100%",
                px: 2,
                pb: 2,
                "& .MuiPaper-root": {
                  backgroundColor: "background.paper",
                },
              }}
            >
              {/* Section 1: Related Videos */}
              <Box sx={{ mb: 2 }}>
                <Typography
                  variant="subtitle1"
                  fontWeight="bold"
                  sx={{ mb: 2 }}
                >
                  Related Videos
                </Typography>
                <Stack spacing={2}>
                  {relatedVideos.map((video) => (
                    <Paper
                      key={video.id}
                      elevation={0}
                      className="video-card"
                      sx={{
                        display: "flex",
                        gap: 1,
                        borderRadius: 0,
                        overflow: "hidden",
                        cursor: "pointer",
                        backgroundColor: "background.paper",
                        transition: "background-color 0.2s",
                        "&:hover": {
                          backgroundColor: (theme) =>
                            theme.palette.mode === "light"
                              ? "rgba(0, 0, 0, 0.04)"
                              : "rgba(255, 255, 255, 0.08)",
                        },
                      }}
                      onClick={() => {
                        router.push(`/${section}/${video.id}`);
                      }}
                    >
                      <Box
                        sx={{
                          width: 100,
                          minWidth: 100,
                          height: 50,
                          position: "relative",
                          borderRadius: 1,
                          overflow: "hidden",
                        }}
                      >
                        <Box
                          component="img"
                          src={video.thumbnailUrl}
                          alt={video.name}
                          sx={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                          }}
                        />
                      </Box>
                      <Box sx={{ flex: 1, py: 0.5 }}>
                        <Typography
                          variant="body2"
                          sx={{
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            display: "-webkit-box",
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical",
                            lineHeight: 1.2,
                            mb: 0.5,
                            fontSize: "0.75rem",
                            fontWeight: 500,
                            color: (theme) =>
                              theme.palette.mode === "light"
                                ? "black"
                                : "inherit",
                          }}
                        >
                          {video.name}
                        </Typography>
                      </Box>
                    </Paper>
                  ))}
                </Stack>
              </Box>

              <Divider sx={{ my: 1 }} />

              {/* Section 2: Recommended Videos */}
              <Box sx={{ mb: 2 }}>
                <Typography
                  variant="subtitle1"
                  fontWeight="bold"
                  sx={{ mb: 2 }}
                >
                  Recommended Videos
                </Typography>
                <Stack spacing={2}>
                  {recommendedVideos.slice(0, 5).map((video) => (
                    <Paper
                      key={video.id}
                      elevation={0}
                      className="video-card"
                      sx={{
                        display: "flex",
                        gap: 1,
                        borderRadius: 0,
                        overflow: "hidden",
                        cursor: "pointer",
                        backgroundColor: "background.paper",
                        transition: "background-color 0.2s",
                        "&:hover": {
                          backgroundColor: (theme) =>
                            theme.palette.mode === "light"
                              ? "rgba(0, 0, 0, 0.04)"
                              : "rgba(255, 255, 255, 0.08)",
                        },
                      }}
                      onClick={() => {
                        // Find the section for this video
                        const videoSection = mainArr.find((section) =>
                          section.content.some((v) => v.id === video.id)
                        );
                        if (videoSection) {
                          router.push(`/${videoSection.slug}/${video.id}`);
                        }
                      }}
                    >
                      <Box
                        sx={{
                          width: 100,
                          minWidth: 100,
                          height: 50,
                          position: "relative",
                          borderRadius: 1,
                          overflow: "hidden",
                        }}
                      >
                        <Box
                          component="img"
                          src={video.thumbnailUrl}
                          alt={video.name}
                          sx={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                          }}
                        />
                      </Box>
                      <Box sx={{ flex: 1, py: 0.5 }}>
                        <Typography
                          variant="body2"
                          sx={{
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            display: "-webkit-box",
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical",
                            lineHeight: 1.2,
                            mb: 0.5,
                            fontSize: "0.75rem",
                            fontWeight: 500,
                            color: (theme) =>
                              theme.palette.mode === "light"
                                ? "black"
                                : "inherit",
                          }}
                        >
                          {video.name}
                        </Typography>
                      </Box>
                    </Paper>
                  ))}
                </Stack>
              </Box>

              <Divider sx={{ my: 1 }} />

              {/* Section 3: Trending Shorts */}
              <Box sx={{ mb: 2 }}>
                <Typography
                  variant="subtitle1"
                  fontWeight="bold"
                  sx={{ mb: 2 }}
                >
                  Trending Shorts
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    gap: 2,
                    overflowX: "auto",
                    pb: 1,
                    scrollbarWidth: "none",
                    msOverflowStyle: "none",
                    "&::-webkit-scrollbar": {
                      display: "none",
                    },
                    "-webkit-overflow-scrolling": "touch",
                  }}
                >
                  {shortsData.map((short) => (
                    <Paper
                      key={short.id}
                      elevation={0}
                      className="short-card"
                      sx={{
                        minWidth: "120px",
                        height: "200px",
                        borderRadius: 2,
                        overflow: "hidden",
                        position: "relative",
                        cursor: "pointer",
                        backgroundColor: "background.paper",
                      }}
                      onClick={() => {
                        const shortsSection = mainArr.find(
                          (s) => s.type === "shorts"
                        );
                        if (shortsSection) {
                          router.push(`/${shortsSection.slug}/${short.id}`);
                        }
                      }}
                    >
                      <Box
                        component="img"
                        src={short.thumbnailUrl}
                        alt={short.title}
                        sx={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                      <Box
                        sx={{
                          position: "absolute",
                          bottom: 0,
                          left: 0,
                          right: 0,
                          p: 1,
                          background:
                            "linear-gradient(transparent, rgba(0,0,0,0.7))",
                        }}
                      >
                        <Typography
                          variant="caption"
                          sx={{
                            color: "white",
                            display: "-webkit-box",
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                          }}
                        >
                          {short.title}
                        </Typography>
                      </Box>
                    </Paper>
                  ))}
                </Box>
              </Box>

              <Divider sx={{ my: 1 }} />

              {/* Section 4: More Videos */}
              <Box>
                <Typography
                  variant="subtitle1"
                  fontWeight="bold"
                  sx={{ mb: 2 }}
                >
                  More Videos
                </Typography>
                <Stack spacing={2}>
                  {recommendedVideos.slice(0, 5).map((video) => (
                    <Paper
                      key={video.id}
                      elevation={0}
                      className="video-card"
                      sx={{
                        display: "flex",
                        gap: 1,
                        borderRadius: 0,
                        overflow: "hidden",
                        cursor: "pointer",
                        backgroundColor: "background.paper",
                        transition: "background-color 0.2s",
                        "&:hover": {
                          backgroundColor: (theme) =>
                            theme.palette.mode === "light"
                              ? "rgba(0, 0, 0, 0.04)"
                              : "rgba(255, 255, 255, 0.08)",
                        },
                      }}
                      onClick={() => {
                        // Find the section for this video
                        const videoSection = mainArr.find((section) =>
                          section.content.some((v) => v.id === video.id)
                        );
                        if (videoSection) {
                          router.push(`/${videoSection.slug}/${video.id}`);
                        }
                      }}
                    >
                      <Box
                        sx={{
                          width: 100,
                          minWidth: 100,
                          height: 50,
                          position: "relative",
                          borderRadius: 1,
                          overflow: "hidden",
                        }}
                      >
                        <Box
                          component="img"
                          src={video.thumbnailUrl}
                          alt={video.name}
                          sx={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                          }}
                        />
                      </Box>
                      <Box sx={{ flex: 1, py: 0.5 }}>
                        <Typography
                          variant="body2"
                          sx={{
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            display: "-webkit-box",
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical",
                            lineHeight: 1.2,
                            mb: 0.5,
                            fontSize: "0.75rem",
                            fontWeight: 500,
                            color: (theme) =>
                              theme.palette.mode === "light"
                                ? "black"
                                : "inherit",
                          }}
                        >
                          {video.name}
                        </Typography>
                      </Box>
                    </Paper>
                  ))}
                </Stack>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>

      <ShareDialog
        open={shareDialogOpen}
        onClose={() => setShareDialogOpen(false)}
        url={window.location.href}
        title={videoData?.name || videoData?.title}
      />
    </Layout>
  );
};

export default VideoDetailPage;

// Generate static paths for all videos
export async function getStaticPaths() {
  const paths = [];

  // Generate paths for all videos in all sections
  mainArr.forEach((section) => {
    if (section.content && Array.isArray(section.content)) {
      section.content.forEach((video) => {
        paths.push({
          params: {
            section: section.slug,
            video: video.id.toString(),
          },
        });
      });
    }
  });

  return {
    paths,
    fallback: "blocking", // Show 404 for non-existent slugs
  };
}

// Get static props for each video page
export async function getStaticProps({ params }) {
  const { section, video } = params;

  // Find the section by slug
  const foundSection = mainArr.find((s) => s.slug === section);

  if (!foundSection) {
    return {
      notFound: true,
    };
  }

  // Find the video in the section by ID
  const foundVideo = foundSection.content.find(
    (v) => v.id.toString() === video.toString()
  );

  if (!foundVideo) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      sectionData: foundSection,
      videoData: foundVideo,
    },
    // Revalidate the page every hour
    revalidate: 3600,
  };
}

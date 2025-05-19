import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import {
  Container,
  Box,
  Typography,
  Grid,
  Paper,
  Avatar,
  Stack,
  Button,
  IconButton,
  Divider,
} from "@mui/material";
import Layout from "../../components/Layout";
import { mainArr } from "../../data/homeData";
import { WhatsApp, ContentCopy, Share } from "@mui/icons-material";
import VideoSection from "../../components/sections/VideoSection";
import ShortsSection from "../../components/sections/ShortsSection";

const VideoDetailPage = () => {
  const router = useRouter();
  const { sectionId, videoId } = router.query;
  const [videoData, setVideoData] = useState(null);
  const [sectionData, setSectionData] = useState(null);
  const [relatedVideos, setRelatedVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [shortsData, setShortsData] = useState([]);
  const [recommendedVideos, setRecommendedVideos] = useState([]);

  useEffect(() => {
    // Only proceed when we have the query parameters
    if (sectionId && videoId) {
      // Find the section by ID (index in this case)
      const section = mainArr.find(
        (s, index) => index.toString() === sectionId
      );

      if (section) {
        setSectionData(section);

        // Find the video in the section's content
        const video = section.content.find((v) => v.id.toString() === videoId);

        if (video) {
          setVideoData(video);

          // Get related videos (from the same section except the current one)
          const related = section.content
            .filter((v) => v.id.toString() !== videoId)
            .slice(0, 5); // Limit to 5 related videos
          setRelatedVideos(related);
        }

        // Get shorts data
        const shortsSection = mainArr.find((s) => s.type === "shorts");
        if (shortsSection) {
          setShortsData(shortsSection.content.slice(0, 10));
        }

        // Get recommended videos (from other video sections)
        const otherVideoSections = mainArr.filter(
          (s) => s.type === "videos" && s !== section
        );
        if (otherVideoSections.length > 0) {
          setRecommendedVideos(otherVideoSections[0].content.slice(0, 5));
        }
      }

      setLoading(false);
    }
  }, [sectionId, videoId]);

  // Handle actions
  const handleCopy = () => {
    if (videoData) {
      navigator.clipboard?.writeText(videoData.name || videoData.title);
    }
  };

  const handleShare = () => {
    if (videoData && navigator.share) {
      navigator.share({
        title: videoData.name || videoData.title,
        text: videoData.description || "",
        url: window.location.href,
      });
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
          py: 2,
          width: "100%",
          maxWidth: "100% !important",
        }}
      >
        <Grid container spacing={2}>
          {/* Left side - Video and details - 70% width */}
          <Grid item xs={12} md={8} lg={9}>
            {/* Video Player */}
            <Box
              sx={{
                width: "100%",
                position: "relative",
                paddingTop: "56.25%", // 16:9 aspect ratio
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
                mb: 3,
              }}
            >
              <Button
                startIcon={<WhatsApp />}
                variant="contained"
                size="small"
                onClick={handleWhatsApp}
                sx={{
                  borderRadius: 2,
                  textTransform: "none",
                  bgcolor: "#25D366",
                  "&:hover": { bgcolor: "#128C7E" },
                }}
              >
                Send
              </Button>
              <Button
                startIcon={<ContentCopy />}
                variant="outlined"
                size="small"
                onClick={handleCopy}
                sx={{
                  borderRadius: 2,
                  textTransform: "none",
                }}
              >
                Copy
              </Button>
              <Button
                startIcon={<Share />}
                variant="outlined"
                size="small"
                onClick={handleShare}
                sx={{
                  borderRadius: 2,
                  textTransform: "none",
                }}
              >
                Share
              </Button>
            </Box>

            {/* Video Description */}
            <Paper
              elevation={0}
              variant="outlined"
              sx={{
                p: 3,
                borderRadius: 2,
                mb: 4,
                bgcolor: "background.paper",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <Avatar
                  sx={{ width: 48, height: 48, mr: 2 }}
                  alt={videoData.channelName}
                  src="/channel-avatar.jpg"
                />
                <Box>
                  <Typography variant="subtitle1" fontWeight="bold">
                    {videoData.channelName}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {formattedViews} views • {formattedDate}
                  </Typography>
                </Box>
              </Box>

              <Divider sx={{ my: 2 }} />

              <Typography variant="body1" sx={{ lineHeight: 1.7 }}>
                {videoData.description ||
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget aliquam nisl nisl eget nisl. Nullam auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget aliquam nisl nisl eget nisl. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget aliquam nisl nisl eget nisl. Nullam auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget aliquam nisl nisl eget nisl."}
              </Typography>
            </Paper>

            {/* Ad Section */}
            {mainArr.some((section) => section.type === "ads") && (
              <Box sx={{ mb: 4 }}>
                <Typography
                  variant="subtitle1"
                  fontWeight="bold"
                  sx={{ mb: 2 }}
                >
                  Sponsored
                </Typography>
                <Paper
                  elevation={0}
                  sx={{
                    borderRadius: 2,
                    overflow: "hidden",
                    bgcolor: "background.paper",
                  }}
                >
                  <Box
                    component="img"
                    src={
                      mainArr.find((section) => section.type === "ads")
                        ?.content[0].adImageUrl
                    }
                    alt="Advertisement"
                    sx={{ width: "100%", height: "auto" }}
                  />
                </Paper>
              </Box>
            )}
          </Grid>

          {/* Right side - 4 sections in column - 30% width */}
          <Grid item xs={12} md={4} lg={3}>
            <Box
              sx={{
                bgcolor: "#f5f5f5",
                borderRadius: 2,
                p: 2,
                height: "100%",
              }}
            >
              {/* Section 1: Current Section Videos */}
              <Box sx={{ mb: 4 }}>
                <Typography
                  variant="subtitle1"
                  fontWeight="bold"
                  sx={{ mb: 2 }}
                >
                  {sectionData?.sectionTitle}
                </Typography>
                <Stack spacing={2}>
                  {relatedVideos.slice(0, 5).map((video) => (
                    <Paper
                      key={video.id}
                      elevation={0}
                      sx={{
                        display: "flex",
                        borderRadius: 2,
                        overflow: "hidden",
                        cursor: "pointer",
                        "&:hover": {
                          bgcolor: "action.hover",
                        },
                      }}
                      onClick={() => router.push(`/${sectionId}/${video.id}`)}
                    >
                      <Box
                        sx={{
                          width: "40%",
                          position: "relative",
                          paddingTop: "22.5%", // Maintain aspect ratio
                        }}
                      >
                        <Box
                          component="img"
                          src={video.thumbnailUrl}
                          alt={video.name || video.title}
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
                      <Box sx={{ p: 1, width: "60%" }}>
                        <Typography
                          variant="subtitle2"
                          sx={{
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            display: "-webkit-box",
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical",
                            lineHeight: 1.2,
                            mb: 0.5,
                          }}
                        >
                          {video.name || video.title}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {video.channelName}
                        </Typography>
                      </Box>
                    </Paper>
                  ))}
                </Stack>
              </Box>

              {/* Section 2: Related Videos */}
              <Box sx={{ mb: 4 }}>
                <Typography
                  variant="subtitle1"
                  fontWeight="bold"
                  sx={{ mb: 2 }}
                >
                  Related Videos
                </Typography>
                <Stack spacing={2}>
                  {recommendedVideos.slice(0, 5).map((video) => (
                    <Paper
                      key={video.id}
                      elevation={0}
                      sx={{
                        display: "flex",
                        borderRadius: 2,
                        overflow: "hidden",
                        cursor: "pointer",
                        "&:hover": {
                          bgcolor: "action.hover",
                        },
                      }}
                      onClick={() => {
                        // Find the section index for this video
                        const sectionIndex = mainArr.findIndex((section) =>
                          section.content.some((v) => v.id === video.id)
                        );
                        router.push(`/${sectionIndex}/${video.id}`);
                      }}
                    >
                      <Box
                        sx={{
                          width: "40%",
                          position: "relative",
                          paddingTop: "22.5%", // Maintain aspect ratio
                        }}
                      >
                        <Box
                          component="img"
                          src={video.thumbnailUrl}
                          alt={video.name || video.title}
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
                      <Box sx={{ p: 1, width: "60%" }}>
                        <Typography
                          variant="subtitle2"
                          sx={{
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            display: "-webkit-box",
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical",
                            lineHeight: 1.2,
                            mb: 0.5,
                          }}
                        >
                          {video.name || video.title}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {video.channelName}
                        </Typography>
                      </Box>
                    </Paper>
                  ))}
                </Stack>
              </Box>

              {/* Section 3: Shorts Section */}
              <Box sx={{ mb: 4 }}>
                <Typography
                  variant="subtitle1"
                  fontWeight="bold"
                  sx={{ mb: 2 }}
                >
                  Shorts
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    gap: 1,
                    overflowX: "auto",
                    pb: 1,
                    scrollbarWidth: "none",
                    "&::-webkit-scrollbar": {
                      display: "none",
                    },
                  }}
                >
                  {shortsData.map((short) => (
                    <Paper
                      key={short.id}
                      elevation={0}
                      sx={{
                        flex: "0 0 120px",
                        minWidth: "120px",
                        height: "200px",
                        borderRadius: 2,
                        overflow: "hidden",
                        position: "relative",
                        cursor: "pointer",
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
                  {recommendedVideos.slice(5, 10).map((video) => (
                    <Paper
                      key={video.id}
                      elevation={0}
                      sx={{
                        display: "flex",
                        borderRadius: 2,
                        overflow: "hidden",
                        cursor: "pointer",
                        "&:hover": {
                          bgcolor: "action.hover",
                        },
                      }}
                      onClick={() => {
                        // Find the section index for this video
                        const sectionIndex = mainArr.findIndex((section) =>
                          section.content.some((v) => v.id === video.id)
                        );
                        router.push(`/${sectionIndex}/${video.id}`);
                      }}
                    >
                      <Box
                        sx={{
                          width: "40%",
                          position: "relative",
                          paddingTop: "22.5%", // Maintain aspect ratio
                        }}
                      >
                        <Box
                          component="img"
                          src={video.thumbnailUrl}
                          alt={video.name || video.title}
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
                      <Box sx={{ p: 1, width: "60%" }}>
                        <Typography
                          variant="subtitle2"
                          sx={{
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            display: "-webkit-box",
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical",
                            lineHeight: 1.2,
                            mb: 0.5,
                          }}
                        >
                          {video.name || video.title}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {video.channelName}
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
    </Layout>
  );
};

export default VideoDetailPage;

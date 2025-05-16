import { useState, useRef } from "react";
import {
  Box,
  Typography,
  Button,
  IconButton,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import VideoCard from "../cards/VideoCard";
import {
  ChevronRight as ChevronRightIcon,
  ChevronLeft as ChevronLeftIcon,
} from "@mui/icons-material";

const VideoSection = ({ title, videos }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));
  const scrollContainerRef = useRef(null);
  const [showLeftScroll, setShowLeftScroll] = useState(false);
  const [showRightScroll, setShowRightScroll] = useState(true);

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } =
        scrollContainerRef.current;
      setShowLeftScroll(scrollLeft > 0);
      setShowRightScroll(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const containerWidth = scrollContainerRef.current.clientWidth;
      const scrollAmount =
        direction === "left" ? -containerWidth : containerWidth;

      scrollContainerRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <Box sx={{ mb: 4 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Typography
          variant="h6"
          component="h2"
          fontWeight="bold"
          color="primary.main"
        >
          {title}
        </Typography>
        <Button endIcon={<ChevronRightIcon />} sx={{ textTransform: "none" }}>
          View More
        </Button>
      </Box>

      <Box sx={{ position: "relative" }}>
        {showLeftScroll && (
          <IconButton
            sx={{
              position: "absolute",
              left: -20,
              top: "30%",
              transform: "translateY(-50%)",
              zIndex: 2,
              bgcolor: "background.paper",
              boxShadow: 2,
              "&:hover": { bgcolor: "background.paper" },
            }}
            onClick={() => scroll("left")}
          >
            <ChevronLeftIcon />
          </IconButton>
        )}

        <Box
          ref={scrollContainerRef}
          onScroll={handleScroll}
          sx={{
            display: "flex",
            gap: 2,
            overflowX: "auto",
            scrollbarWidth: "none",
            "&::-webkit-scrollbar": {
              display: "none",
            },
            px: 1,
          }}
        >
          {videos.map((video) => (
            <Box
              key={video.id}
              sx={{
                flex: {
                  xs: "0 0 calc(100% - 16px)", // 1 video per row on mobile
                  sm: "0 0 calc(50% - 16px)", // 2 videos per row on tablet
                  md: "0 0 calc(33.333% - 16px)", // 3 videos per row on small desktop
                  lg: "0 0 calc(25% - 16px)", // 4 videos per row on larger screens
                },
                minWidth: {
                  xs: "calc(100% - 16px)",
                  sm: "calc(50% - 16px)",
                  md: "calc(33.333% - 16px)",
                  lg: "calc(25% - 16px)",
                },
                maxWidth: {
                  xs: "calc(100% - 16px)",
                  sm: "calc(50% - 16px)",
                  md: "calc(33.333% - 16px)",
                  lg: "calc(25% - 16px)",
                },
              }}
            >
              <VideoCard video={video} />
            </Box>
          ))}
        </Box>

        {showRightScroll && !isMobile && (
          <IconButton
            sx={{
              position: "absolute",
              right: -20,
              top: "30%",
              transform: "translateY(-50%)",
              zIndex: 2,
              bgcolor: "background.paper",
              boxShadow: 2,
              "&:hover": { bgcolor: "background.paper" },
            }}
            onClick={() => scroll("right")}
          >
            <ChevronRightIcon />
          </IconButton>
        )}
      </Box>
    </Box>
  );
};

export default VideoSection;

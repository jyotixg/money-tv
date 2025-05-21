import { useState, useRef } from "react";
import {
  Box,
  Typography,
  IconButton,
  Button,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import ShortCard from "../cards/ShortCard";
import {
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
} from "@mui/icons-material";
import { useRouter } from "next/router";
import { mainArr } from "../../data/homeData";

const ShortsSection = ({ title, shorts, sectionIndex }) => {
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
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

  const handleViewMore = () => {
    // Find the section by index
    const section = mainArr.find((s, index) => index === sectionIndex);
    if (section && section.slug) {
      router.push(`/section/${section.slug}`);
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
        <Button
          endIcon={<ChevronRightIcon />}
          sx={{ textTransform: "none" }}
          onClick={handleViewMore}
        >
          View More
        </Button>
      </Box>

      <Box sx={{ position: "relative" }}>
        {showLeftScroll && !isMobile && (
          <IconButton
            sx={{
              position: "absolute",
              left: -20,
              top: "50%",
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
            maxWidth: "100%", // Ensure container doesn't exceed viewport
          }}
        >
          {shorts.slice(0, 10).map((short) => (
            <Box
              key={short.id}
              sx={{
                flex: {
                  xs: "0 0 250px", // Increased width for shorts cards
                  sm: "0 0 250px",
                },
                minWidth: "250px", // Ensure minimum width
                maxWidth: "250px", // Ensure maximum width
                height: "400px", // Increased height
              }}
            >
              <ShortCard short={short} sectionIndex={sectionIndex} />
            </Box>
          ))}
        </Box>

        {showRightScroll && !isMobile && (
          <IconButton
            sx={{
              position: "absolute",
              right: -20,
              top: "50%",
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

export default ShortsSection;

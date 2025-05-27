import { useState, useRef } from "react";
import {
  Box,
  Typography,
  IconButton,
  Button,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import SliderCard from "../cards/SliderCard";
import {
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
} from "@mui/icons-material";
import { useRouter } from "next/router";
import { mainArr } from "../../data/homeData";

const SliderLayout = ({
  title,
  shorts,
  sectionIndex,
  sectionData,
  section,
}) => {
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const scrollContainerRef = useRef(null);
  const [showLeftScroll, setShowLeftScroll] = useState(false);
  const [showRightScroll, setShowRightScroll] = useState(true);
  const size = section?.layout_config?.size;
  const height = section?.layout_config?.height;
  const width = section?.layout_config?.width;

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
    // Find the section by index to get its slug
    let currentSection = sectionData.find((item) => item.id == section.id);
    if (currentSection && currentSection.slug) {
      router.push(`/${currentSection.slug}`);
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
          {section.name}
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
            flexShrink: 0,
            gap: 2,
            overflowX: "auto",
            scrollbarWidth: "none",
            "&::-webkit-scrollbar": {
              display: "none",
            },
            // px: 1,
            maxWidth: "100%", // Ensure container doesn't exceed viewport
            // height: height && {
            //   lg: height.lg,
            //   md: height.md,
            //   xl: height.xl,
            //   xs: height.xs,
            // },
          }}
        >
          {section?.contents?.map((short) => (
            <Box
              key={short.id}
              sx={
                {
                  // aspectRatio: 9 / 16,
                  // height: "400px",
                  // width: "250px",
                  // flex: {
                  //   xs: "0 0 250px", // Increased width for shorts cards
                  //   sm: "0 0 250px",
                  // },
                  // minWidth: "250px", // Ensure minimum width
                  // maxWidth: "250px", // Ensure maximum width
                  // height: "400px", // Increased height
                }
              }
            >
              <SliderCard
                key={short.id}
                short={short}
                sectionIndex={sectionIndex}
                sectionData={sectionData}
                section={section}
                styles={{ height, width }}
              />
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

export default SliderLayout;

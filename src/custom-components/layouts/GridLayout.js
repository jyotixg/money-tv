import { useState, useRef } from "react";
import {
  Box,
  Typography,
  Button,
  IconButton,
  useTheme,
  useMediaQuery,
  Grid,
} from "@mui/material";
import GridCard from "../cards/GridCard";
import {
  ChevronRight as ChevronRightIcon,
  ChevronLeft as ChevronLeftIcon,
} from "@mui/icons-material";
import { useRouter } from "next/router";
import { mainArr } from "@/data/homeData";

const GridLayout = ({ name, contents, id, sectionData, section }) => {
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const scrollContainerRef = useRef(null);
  const [showLeftScroll, setShowLeftScroll] = useState(false);
  const [showRightScroll, setShowRightScroll] = useState(true);
  const size = section.layout_config.size;
  const height = section?.layout_config?.height;
  // console.log({ section });
  // console.log({ sectionData });

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
    <Box sx={{ pb: 2 }}>
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

      {/* <Box sx={{ position: "relative" }}> */}
      {/* {showLeftScroll && (
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
        )} */}

      {/* <Box
          ref={scrollContainerRef}
          onScroll={handleScroll}
          sx={{
            overflowX: "auto",
            scrollbarWidth: "none",
            "&::-webkit-scrollbar": {
              display: "none",
            },
          }}
        > */}
      <Grid
        container
        spacing={2}
        sx={
          {
            // flexWrap: "nowrap",
            // width: "max-content",
          }
        }
      >
        {section.contents.map((video) => (
          <Grid
            item
            key={video.id}
            // sx={{
            //   width: {
            //     // xs: "calc(100vw - 32px)",
            //     // sm: "350px",
            //     // md: "300px",
            //     // lg: "325px",
            //   },
            // }}
            // height={250}
            lg={12 / size.lg}
            md={12 / size.md}
            xl={12 / size.xl}
            xs={12 / size.xs}
            // sx={{
            //   height: height && {
            //     lg: height.lg,
            //     md: height.md,
            //     xl: height.xl,
            //     xs: height.xs,
            //   },
            // }}
          >
            <GridCard
              video={video}
              id={section.id}
              sectionData={sectionData}
              section={section}
            />
          </Grid>
        ))}
      </Grid>
      {/* </Box> */}

      {/* {showRightScroll && !isMobile && (
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
        )} */}
      {/* </Box> */}
    </Box>
  );
};

export default GridLayout;

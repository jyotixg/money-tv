import { useState, useEffect, useRef } from "react";
import { Box, Tabs, Tab, IconButton, useTheme, styled } from "@mui/material";
import {
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
} from "@mui/icons-material";

const categories = [
  "All",
  "Recent",
  "Seeing is Believing",
  "Know Your Promoters",
  "Celebrity and Money",
  "Market Pillars Uncovered",
  "Result Analysis for You",
  "Upcoming IPOs",
  "Recommended",
  "CEO Podcasts",
  "Journey Of Legends",
  "Travel",
  "Comedy",
  "Fitness",
  "Beauty",
];

const ScrollContainer = styled(Box)(({ theme }) => ({
  position: "relative",
  display: "flex",
  alignItems: "center",
  backgroundColor: theme.palette.background.default,
  padding: theme.spacing(1, 1),
}));

const ScrollButton = styled(IconButton)(({ theme }) => ({
  position: "absolute",
  zIndex: 2,
  height: "60%",
  padding: theme.spacing(1),
  backgroundColor: theme.palette.background.default,
  transition: "opacity 0.3s ease",
  "&.left": {
    left: 0,
    borderRight: `1px solid ${theme.palette.divider}`,
  },
  "&.right": {
    right: 0,
    borderLeft: `1px solid ${theme.palette.divider}`,
  },
}));

const StyledTabs = styled(Tabs)(({ theme }) => ({
  minHeight: 30,
  flex: 1,
  "& .MuiTabs-scroller": {
    margin: "0 40px", // Space for scroll buttons
  },
  "& .MuiTabs-indicator": {
    display: "none", // Hide the default indicator
  },
}));

const StyledTab = styled(Tab)(({ theme }) => ({
  minHeight: 26,
  minWidth: "auto",
  margin: theme.spacing(0, 0.5),
  padding: theme.spacing(0.75, 1),
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.grey[100],
  color: theme.palette.text.secondary,
  textTransform: "none",
  fontSize: "0.8rem",
  fontWeight: 500,
  "&:hover": {
    backgroundColor: theme.palette.grey[200],
    color: theme.palette.text.primary,
  },
  "&.Mui-selected": {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    "&:hover": {
      backgroundColor: theme.palette.primary.dark,
    },
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "0.85rem",
    padding: theme.spacing(0.5, 1.5),
  },
}));

const CategoryTabs = () => {
  const [mounted, setMounted] = useState(false);
  const [value, setValue] = useState(0);
  const [showLeftButton, setShowLeftButton] = useState(false);
  const [showRightButton, setShowRightButton] = useState(false);
  const tabsRef = useRef(null);
  const theme = useTheme();

  useEffect(() => {
    setMounted(true);
    checkScrollButtons();
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const checkScrollButtons = () => {
    if (!mounted) return;

    const tabsNode = tabsRef.current?.querySelector(".MuiTabs-scroller");
    if (tabsNode) {
      const { scrollLeft, scrollWidth, clientWidth } = tabsNode;
      setShowLeftButton(scrollLeft > 0);
      setShowRightButton(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    if (!mounted) return;

    const tabsNode = tabsRef.current?.querySelector(".MuiTabs-scroller");
    if (tabsNode) {
      tabsNode.addEventListener("scroll", checkScrollButtons);

      // Check again after content might have changed
      const timer = setTimeout(checkScrollButtons, 100);

      return () => {
        tabsNode.removeEventListener("scroll", checkScrollButtons);
        clearTimeout(timer);
      };
    }
  }, [mounted]);

  const handleScroll = (direction) => {
    const tabsNode = tabsRef.current?.querySelector(".MuiTabs-scroller");
    if (tabsNode) {
      const scrollAmount = direction === "left" ? -200 : 200;
      tabsNode.scrollLeft += scrollAmount;
    }
  };

  if (!mounted) {
    return (
      <ScrollContainer>
        <StyledTabs
          value={0}
          variant="scrollable"
          scrollButtons={false}
          aria-label="video categories"
        >
          {categories.map((category) => (
            <StyledTab key={category} label={category} disableRipple />
          ))}
        </StyledTabs>
      </ScrollContainer>
    );
  }

  return (
    <ScrollContainer>
      {showLeftButton && (
        <ScrollButton
          className="left"
          onClick={() => handleScroll("left")}
          size="small"
          sx={{
            opacity: showLeftButton ? 1 : 0,
            pointerEvents: showLeftButton ? "auto" : "none",
          }}
        >
          <ChevronLeftIcon />
        </ScrollButton>
      )}

      <StyledTabs
        ref={tabsRef}
        value={value}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons={false}
        aria-label="video categories"
      >
        {categories.map((category) => (
          <StyledTab key={category} label={category} disableRipple />
        ))}
      </StyledTabs>

      {showRightButton && (
        <ScrollButton
          className="right"
          onClick={() => handleScroll("right")}
          size="small"
          sx={{
            opacity: showRightButton ? 1 : 0,
            pointerEvents: showRightButton ? "auto" : "none",
          }}
        >
          <ChevronRightIcon />
        </ScrollButton>
      )}
    </ScrollContainer>
  );
};

export default CategoryTabs;

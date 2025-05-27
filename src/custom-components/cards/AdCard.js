import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Button,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { ChevronRight as ChevronRightIcon } from "@mui/icons-material";

const AdCard = ({ ad, section, sectionData }) => {
  return (
    <Card
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        position: "relative",
        borderRadius: 2,
        overflow: "hidden",
        boxShadow: 3,
      }}
    >
      {/* Image Section - Takes full width on mobile, half width on desktop */}
      <Box
        sx={{
          width: { xs: "100%", md: "50%" },
          position: "relative",
          minHeight: { xs: "100px", md: "100px" },
        }}
      >
        <CardMedia
          component="img"
          image={ad?.content_details[0]?.thumbnail_url}
          alt={ad.name}
          sx={{
            height: "100%",
            width: "100%",
            objectFit: "cover",
            position: "absolute",
            top: 0,
            left: 0,
          }}
        />
        <Box
          sx={{
            position: "absolute",
            top: 16,
            left: 16,
            bgcolor: "primary.main",
            color: "white",
            padding: "4px 12px",
            borderRadius: 1,
            fontSize: "0.875rem",
            fontWeight: "medium",
          }}
        >
          Ad
        </Box>
      </Box>

      {/* Content Section - Takes full width on mobile, half width on desktop */}
      <Box
        sx={{
          width: { xs: "100%", md: "50%" },
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          p: { xs: 1, md: 2 },
          bgcolor: "background.paper",
        }}
      >
        <Typography
          variant="h5"
          component="h4"
          gutterBottom
          sx={{
            fontWeight: "bold",
            mb: 1,
          }}
        >
          {ad.name}
        </Typography>

        <Typography
          variant="body1"
          color="text.secondary"
          sx={{
            mb: 1,
            lineHeight: 1.3,
          }}
        >
          {ad.description}
        </Typography>

        <Button
          variant="outlined"
          color="primary"
          size="small"
          endIcon={<ChevronRightIcon />}
          onClick={() => window.open(ad.redirectUrl, "_blank")}
          sx={{
            width: "fit-content",
            textTransform: "none",
            px: 2,
            // py: 0.5,
            borderRadius: 2,
            fontSize: "1rem",
          }}
        >
          Learn More
        </Button>
      </Box>
    </Card>
  );
};

export default AdCard;

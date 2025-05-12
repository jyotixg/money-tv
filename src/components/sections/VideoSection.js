import { Box, Typography, Button } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import VideoCard from "../cards/VideoCard";
import { ChevronRight as ChevronRightIcon } from "@mui/icons-material";

const VideoSection = ({ title, videos }) => {
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
        <Typography variant="h5" component="h2" fontWeight="bold">
          {title}
        </Typography>
        <Button endIcon={<ChevronRightIcon />} sx={{ textTransform: "none" }}>
          See all
        </Button>
      </Box>

      <Grid container spacing={2}>
        {videos.slice(0, 4).map((video) => (
          <Grid xs={12} sm={6} md={3} key={video.id}>
            <VideoCard video={video} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default VideoSection;

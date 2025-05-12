import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Stack,
} from "@mui/material";
import { formatDistanceToNow } from "date-fns";
import { useState, useEffect } from "react";

const VideoCard = ({ video }) => {
  const [formattedDate, setFormattedDate] = useState("recently");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const date = formatDistanceToNow(new Date(video.uploadDate), {
        addSuffix: true,
      });
      setFormattedDate(date);
    } catch (error) {
      setFormattedDate("recently");
    }
  }, [video.uploadDate]);

  return (
    <Card
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        "&:hover": {
          cursor: "pointer",
          "& .MuiCardMedia-root": {
            transform: "scale(1.05)",
            transition: "transform 0.3s ease-in-out",
          },
        },
      }}
    >
      <Box
        sx={{ position: "relative", paddingTop: "56.25%", overflow: "hidden" }}
      >
        <CardMedia
          component="img"
          image={video.thumbnailUrl}
          alt={video.name}
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            transition: "transform 0.3s ease-in-out",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            bottom: 8,
            right: 8,
            bgcolor: "rgba(0, 0, 0, 0.8)",
            color: "white",
            padding: "2px 4px",
            borderRadius: 1,
            fontSize: "0.8rem",
          }}
        >
          {video.duration}
        </Box>
      </Box>
      <CardContent sx={{ flexGrow: 1, p: 1.5 }}>
        <Typography
          gutterBottom
          variant="subtitle1"
          component="div"
          sx={{
            fontWeight: 500,
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            lineHeight: 1.2,
            mb: 1,
          }}
        >
          {video.name}
        </Typography>
        <Stack spacing={0.5}>
          <Typography variant="body2" color="text.secondary">
            {video.channelName}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {`${new Intl.NumberFormat("en-US", { notation: "compact" }).format(
              video.views
            )} views • ${formattedDate}`}
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default VideoCard;

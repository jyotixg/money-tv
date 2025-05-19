import React from "react";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Stack,
  IconButton,
} from "@mui/material";
import { ContentCopy, Share, WhatsApp } from "@mui/icons-material";
import { useRouter } from "next/router";

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
        // backgroundColor: "rgba(0, 0, 0, 0.04)",
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

const VideoCard = ({ video, sectionIndex }) => {
  const router = useRouter();

  const handleCopy = (e) => {
    e.stopPropagation(); // Prevent card click event
    navigator.clipboard?.writeText(video.name);
  };

  const handleShare = (e) => {
    e.stopPropagation(); // Prevent card click event
    if (navigator.share) {
      navigator.share({
        title: video.name,
        text: video.description,
        url: window.location.href,
      });
    }
  };

  const handleWhatsApp = (e) => {
    e.stopPropagation(); // Prevent card click event
    const text = encodeURIComponent(`${video.name}\n${window.location.href}`);
    window.open(`https://wa.me/?text=${text}`, "_blank");
  };

  const handleCardClick = () => {
    router.push(`/${sectionIndex}/${video.id}`);
  };

  return (
    <Card
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        "&:hover": {
          cursor: "pointer",
        },
        border: "none",
        boxShadow: "none",
      }}
      onClick={handleCardClick}
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
            borderRadius: 2,
          }}
        />
      </Box>
      <CardContent
        sx={{
          flexGrow: 1,
          p: 1.5,
          display: "flex",
          flexDirection: "column",
          height: "120px",
          "&:last-child": {
            paddingBottom: 1.5,
          },
        }}
      >
        <Typography
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
            // mb: "auto",
            minHeight: "2.4em",
            maxHeight: "2.4em",
          }}
        >
          {video.name}
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            // mt: 1,
            pt: 1,
            // borderTop: 1,
            // borderColor: "grey.100",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <ActionButton
              icon={<WhatsApp sx={{ fontSize: "1.1rem" }} />}
              label="Send"
              onClick={handleWhatsApp}
            />
            <ActionButton
              icon={<ContentCopy sx={{ fontSize: "1.1rem" }} />}
              label="Copy"
              onClick={handleCopy}
            />
          </Box>
          <ActionButton
            icon={<Share sx={{ fontSize: "1.1rem" }} />}
            label="Share"
            onClick={handleShare}
            isReversed={true}
          />
        </Box>
      </CardContent>
    </Card>
  );
};

export default VideoCard;

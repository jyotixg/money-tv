import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Stack,
  IconButton,
} from "@mui/material";
import { Reply, WhatsApp } from "@mui/icons-material";
import { useRouter } from "next/router";
import { mainArr } from "../../data/homeData";
import ShareDialog from "../ShareDialog";
import CopyButton from "../CopyButton";

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
  const [shareUrl, setShareUrl] = useState("");

  useEffect(() => {
    // Set share URL only after component mounts on client side
    setShareUrl(window.location.href);
  }, []);

  const [shareDialogOpen, setShareDialogOpen] = useState(false);

  const handleShare = (e) => {
    e.stopPropagation(); // Prevent card click event
    setShareDialogOpen(true);
  };

  const handleWhatsApp = (e) => {
    e.stopPropagation(); // Prevent card click event
    const text = encodeURIComponent(`${video.name}\n${window.location.href}`);
    window.open(`https://wa.me/?text=${text}`, "_blank");
  };

  const handleCardClick = () => {
    // Find the section this video belongs to
    const section = mainArr.find((s, index) => {
      if (typeof sectionIndex === "number") {
        return index === sectionIndex;
      }
      return s.content.some((v) => v.id === video.id);
    });

    if (section) {
      router.push(`/${section.slug}/${video.id}`);
    }
  };

  return (
    <>
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
          sx={{
            position: "relative",
            paddingTop: "56.25%",
            overflow: "hidden",
          }}
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
            p: 1,
            display: "flex",
            flexDirection: "column",
            height: "90px",
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
              minHeight: "2.5em",
              maxHeight: "2.5em",
            }}
          >
            {video.name}
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 2,
              mb: 1,
            }}
          >
            <Box
              sx={{ display: "flex", alignItems: "center", gap: 1, mt: 0.5 }}
            >
              <ActionButton
                icon={<WhatsApp sx={{ fontSize: "1.3rem" }} />}
                label="Send"
                onClick={handleWhatsApp}
              />
              <CopyButton text={video.name} />
            </Box>
            <ActionButton
              icon={
                <Reply
                  sx={{
                    fontSize: "1.3rem",
                    transform: "rotate(180deg) scaleY(-1)",
                  }}
                />
              }
              label="Share"
              onClick={handleShare}
              isReversed={true}
            />
          </Box>
        </CardContent>
      </Card>

      <ShareDialog
        open={shareDialogOpen}
        onClose={() => setShareDialogOpen(false)}
        url={shareUrl}
        title={video.name}
      />
    </>
  );
};

export default VideoCard;

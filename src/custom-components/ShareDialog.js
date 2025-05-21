import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Typography,
  Box,
  Button,
  TextField,
  Snackbar,
  Grid,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  Close as CloseIcon,
  WhatsApp,
  Facebook,
  Twitter,
  LinkedIn,
  Reddit,
  Email,
  Telegram,
  ContentCopy,
  Check,
} from "@mui/icons-material";

const socialPlatforms = [
  // {
  //   name: "WhatsApp",
  //   icon: WhatsApp,
  //   color: "#25D366",
  //   shareUrl: (url, title) =>
  //     `https://wa.me/?text=${encodeURIComponent(`${title}\n${url}`)}`,
  // },
  {
    name: "Facebook",
    icon: Facebook,
    color: "#1877F2",
    shareUrl: (url) =>
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
  },
  {
    name: "Twitter",
    icon: Twitter,
    color: "#1DA1F2",
    shareUrl: (url, title) =>
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(
        title
      )}&url=${encodeURIComponent(url)}`,
  },
  {
    name: "LinkedIn",
    icon: LinkedIn,
    color: "#0A66C2",
    shareUrl: (url, title) =>
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
        url
      )}`,
  },
  {
    name: "Reddit",
    icon: Reddit,
    color: "#FF4500",
    shareUrl: (url, title) =>
      `https://reddit.com/submit?url=${encodeURIComponent(
        url
      )}&title=${encodeURIComponent(title)}`,
  },
  {
    name: "Email",
    icon: Email,
    color: "#EA4335",
    shareUrl: (url, title) =>
      `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(
        url
      )}`,
  },
  {
    name: "Telegram",
    icon: Telegram,
    color: "#0088cc",
    shareUrl: (url, title) =>
      `https://t.me/share/url?url=${encodeURIComponent(
        url
      )}&text=${encodeURIComponent(title)}`,
  },
];

const ShareDialog = ({ open, onClose, url, title }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [copied, setCopied] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleShare = (platform) => {
    window.open(platform.shareUrl(url, title), "_blank");
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setSnackbarOpen(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 2,
            width: isMobile ? "100%" : "500px",
          },
        }}
      >
        <DialogTitle
          sx={{
            m: 0,
            p: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h6">Share</Typography>
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ pt: 1 }}>
          <Grid container spacing={2} sx={{ mb: 3 }}>
            {socialPlatforms.map((platform) => (
              <Grid item xs={4} sm={3} key={platform.name}>
                <Button
                  fullWidth
                  onClick={() => handleShare(platform)}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    p: 1,
                    "&:hover": {
                      backgroundColor: "rgba(0, 0, 0, 0.04)",
                    },
                  }}
                >
                  <platform.icon
                    sx={{ color: platform.color, fontSize: "2rem", mb: 1 }}
                  />
                  <Typography
                    variant="caption"
                    sx={{ color: "text.secondary" }}
                  >
                    {platform.name}
                  </Typography>
                </Button>
              </Grid>
            ))}
          </Grid>

          {/* <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
            <TextField
              fullWidth
              value={url}
              variant="outlined"
              size="small"
              InputProps={{
                readOnly: true,
                sx: {
                  bgcolor: "action.hover",
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "transparent",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "transparent",
                  },
                },
              }}
            />
            <Button
              variant="contained"
              onClick={handleCopyLink}
              startIcon={copied ? <Check /> : <ContentCopy />}
              sx={{
                minWidth: "120px",
                bgcolor: copied ? "success.main" : "primary.main",
                "&:hover": {
                  bgcolor: copied ? "success.dark" : "primary.dark",
                },
              }}
            >
              {copied ? "Copied" : "Copy"}
            </Button>
          </Box> */}
        </DialogContent>
      </Dialog>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        message="Link copied to clipboard"
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      />
    </>
  );
};

export default ShareDialog;

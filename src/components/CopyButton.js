import React, { useState } from "react";
import { Box, Typography, Snackbar } from "@mui/material";
import { ContentCopy } from "@mui/icons-material";

const CopyButton = ({ text, label = "Copy" }) => {
  const [copied, setCopied] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleCopy = (e) => {
    e.stopPropagation(); // Prevent event bubbling
    navigator.clipboard?.writeText(text);
    setCopied(true);
    setSnackbarOpen(true);
    setTimeout(() => setCopied(false), 1000);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <>
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
            "& .MuiTypography-root, & .MuiSvgIcon-root": {
              color: "grey.700",
            },
          },
        }}
        onClick={handleCopy}
      >
        <ContentCopy
          sx={{
            fontSize: "1.3rem",
            color: copied ? "success.main" : "grey.500",
            transition: "color 0.2s ease-in-out",
          }}
        />
        <Typography
          variant="caption"
          sx={{
            color: copied ? "success.main" : "grey.500",
            fontSize: "0.7rem",
            userSelect: "none",
            ml: 0.5,
            transition: "color 0.2s ease-in-out",
          }}
        >
          {copied ? "Copied!" : label}
        </Typography>
      </Box>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={1000}
        onClose={handleSnackbarClose}
        message="Link copied to clipboard"
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      />
    </>
  );
};

export default CopyButton;

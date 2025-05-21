import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Divider,
  Grid,
  useTheme,
  useMediaQuery,
  Paper,
} from "@mui/material";
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";

const NoVideosFound = ({ searchQuery = "Lorem Ipsum" }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email.trim()) {
      setEmailError("Email is required");
      return;
    }

    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email");
      return;
    }

    // Here you would typically handle the submission
    console.log("Notification request submitted with email:", email);
    setEmail("");
    setEmailError("");
    // Show success message or feedback
  };

  const SadEmoji = () => (
    <SentimentDissatisfiedIcon
      sx={{
        fontSize: isMobile ? 70 : 100,
        color: theme.palette.mode === "dark" ? "yellow" : "primary.main",
        animation: "pulse 2s infinite ease-in-out",
        "@keyframes pulse": {
          "0%": { opacity: 0.7, transform: "scale(1)" },
          "50%": { opacity: 1, transform: "scale(1.05)" },
          "100%": { opacity: 0.7, transform: "scale(1)" },
        },
      }}
    />
  );

  return (
    <Paper
      elevation={0}
      sx={{
        p: { xs: isMobile ? 1 : 2, sm: 4 },
        m: { xs: 1, sm: 4 },
        backgroundColor: "background.paper",
        borderRadius: 2,
      }}
    >
      <Grid container spacing={2}>
        {/* Left side */}
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            borderRight: {
              xs: "none",
              md: `1px solid ${theme.palette.divider}`,
            },
            pr: { xs: 0, md: 3 },
          }}
        >
          <Box
            sx={{
              mb: isMobile ? 1 : 3,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <SadEmoji />
          </Box>
          <Typography variant={isMobile ? "h6" : "h5"} align="center">
            No Videos found for
          </Typography>
          <Typography
            variant={isMobile ? "h6" : "h5"}
            gutterBottom
            align="center"
            color="primary"
            sx={{ fontWeight: 500 }}
          >
            "{searchQuery}"
          </Typography>
        </Grid>

        {/* Right side */}
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            pl: { xs: 0, md: 3 },
            display: "flex",
            flexDirection: "column",
            alignItems: { xs: "stretch", md: "center" },
            px: isMobile ? 0 : 2,
            width: "100%",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              height: "100%",
              justifyContent: "center",
              alignItems: "center",
              textAlign: { xs: "center", md: "center" },
              width: "100%",
            }}
          >
            <Typography
              variant={isMobile ? "body1" : "h6"}
              sx={{ fontWeight: 400, mb: 0.5 }}
            >
              We're working hard to fulfil
            </Typography>
            <Typography
              variant={isMobile ? "body1" : "h6"}
              sx={{ fontWeight: 400, mb: 0.5, mt: -0.5 }}
            >
              your video request.
            </Typography>
            <Typography
              variant={isMobile ? "body1" : "h6"}
              sx={{ fontWeight: 600, mt: -0.5 }}
            >
              You'll have the video soon!
            </Typography>

            {/* Mobile only divider - moved below the text */}
            {isMobile && <Divider sx={{ width: "100%", my: 2 }} />}

            <Typography
              variant="body2"
              color="primary"
              sx={{ mt: isMobile ? 1 : 4, fontWeight: 600 }}
            >
              Notify me when it's there.
            </Typography>

            <Box
              component="form"
              onSubmit={handleSubmit}
              sx={{
                width: "100%",
                minWidth: isMobile ? 220 : "auto",
                maxWidth: isMobile ? "100%" : 300,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                px: isMobile ? 1 : 0,
              }}
            >
              <TextField
                fullWidth
                size="small"
                variant="outlined"
                placeholder="Enter Your Email ID"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (emailError) setEmailError("");
                }}
                error={Boolean(emailError)}
                helperText={emailError}
                sx={{
                  // mb: isMobile ? 1.5 : 2,
                  width: "100%",
                  "& .MuiOutlinedInput-root": {
                    backgroundColor:
                      theme.palette.mode === "dark"
                        ? theme.palette.background.default
                        : theme.palette.grey[100],
                    "& fieldset": {
                      border: "none",
                    },
                    borderRadius: 0,
                    fontSize: "0.9rem",
                  },
                  "& .MuiInputBase-input": {
                    fontSize: "0.9rem",
                  },
                  "& .MuiFormHelperText-root": {
                    fontSize: "0.7rem",
                  },
                }}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                sx={{
                  textTransform: "none",
                  width: "100%",
                  borderRadius: 0,
                }}
              >
                Submit
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default NoVideosFound;

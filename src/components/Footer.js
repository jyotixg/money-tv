import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Divider,
  Stack,
  Link,
  IconButton,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  Facebook,
  Twitter,
  Instagram,
  LinkedIn,
  Feedback,
  YouTube,
} from "@mui/icons-material";

// Mobile Footer Component
const MobileFooter = (props) => {
  const {
    formData,
    errors,
    handleChange,
    handleSubmit,
    validateEmail,
    validateForm,
  } = props;
  const theme = useTheme();

  return (
    <Box
      sx={{
        py: 4,
        px: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Logo first */}
      <Box sx={{ mb: 4 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            fontWeight: "bold",
            fontSize: "2.5rem",
            color: "primary.main",
          }}
        >
          MONEY
          <span style={{ fontSize: "1rem", fontWeight: "400" }}>TV</span>
        </Box>
      </Box>

      {/* Form second */}
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h6"
          sx={{
            mb: 2,
            display: "flex",
            alignItems: "center",
            gap: 1,
            fontSize: "1rem",
          }}
        >
          <Feedback sx={{ fontSize: "1.2rem" }} /> Send Feedback
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate>
          <TextField
            size="small"
            label="Name"
            variant="standard"
            fullWidth
            name="name"
            value={formData.name}
            onChange={handleChange}
            error={Boolean(errors.name)}
            helperText={errors.name}
            sx={{
              "& .MuiInput-underline:before": {
                borderBottom:
                  theme.palette.mode === "dark"
                    ? "1px solid rgba(255, 255, 255, 0.42)"
                    : "1px solid rgba(0, 0, 0, 0.42)",
              },
              "& .MuiInputLabel-root": {
                fontSize: "0.85rem",
              },
              "& .MuiInputBase-input": {
                fontSize: "0.85rem",
              },
              "& .MuiFormHelperText-root": {
                fontSize: "0.7rem",
                marginTop: "3px",
              },
            }}
          />
          <TextField
            size="small"
            label="Email"
            type="email"
            variant="standard"
            fullWidth
            name="email"
            value={formData.email}
            onChange={handleChange}
            error={Boolean(errors.email)}
            helperText={errors.email}
            sx={{
              "& .MuiInput-underline:before": {
                borderBottom:
                  theme.palette.mode === "dark"
                    ? "1px solid rgba(255, 255, 255, 0.42)"
                    : "1px solid rgba(0, 0, 0, 0.42)",
              },
              "& .MuiInputLabel-root": {
                fontSize: "0.85rem",
              },
              "& .MuiInputBase-input": {
                fontSize: "0.85rem",
              },
              "& .MuiFormHelperText-root": {
                fontSize: "0.7rem",
                marginTop: "3px",
              },
            }}
          />
          <TextField
            size="small"
            label="Message"
            multiline
            rows={3}
            variant="standard"
            fullWidth
            name="message"
            value={formData.message}
            onChange={handleChange}
            error={Boolean(errors.message)}
            helperText={errors.message}
            sx={{
              mb: 2,
              "& .MuiInput-underline:before": {
                borderBottom:
                  theme.palette.mode === "dark"
                    ? "1px solid rgba(255, 255, 255, 0.42)"
                    : "1px solid rgba(0, 0, 0, 0.42)",
              },
              "& .MuiInputLabel-root": {
                fontSize: "0.85rem",
              },
              "& .MuiInputBase-input": {
                fontSize: "0.85rem",
              },
              "& .MuiFormHelperText-root": {
                fontSize: "0.7rem",
                marginTop: "3px",
              },
            }}
          />
          <Button
            type="submit"
            sx={{
              minWidth: 150,
              color: "text.primary",
              backgroundColor: "transparent",
              "&:hover": {
                backgroundColor: "transparent",
                color: "primary.main",
              },
              textTransform: "none",
              p: 0,
              width: "100%",
              marginRight: "auto",
              marginLeft: "auto",
              fontSize: "0.85rem",
            }}
          >
            Send Message
          </Button>
        </Box>
      </Box>

      <Divider orientation="horizontal" flexItem sx={{ mb: 2 }} />

      {/* Links third */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* 1. Let's find true value here text */}
        <Typography
          variant="h6"
          color="primary.main"
          sx={{ fontSize: "0.95rem", mb: 1 }}
        >
          Let's 'find true value here.'
        </Typography>

        {/* 2. grow@moneytv.live link */}
        <Link href="#" sx={{ display: "block", mb: 2, fontSize: "0.85rem" }}>
          grow@moneytv.live
        </Link>

        {/* 3. Social media icons */}
        <Stack direction="row" spacing={1} sx={{ mb: 3 }}>
          <IconButton
            size="small"
            sx={{
              "& .MuiSvgIcon-root": {
                fontSize: "1.2rem",
                color: "primary.main",
              },
            }}
          >
            <YouTube />
          </IconButton>
          <IconButton
            size="small"
            sx={{
              "& .MuiSvgIcon-root": {
                fontSize: "1.2rem",
                color: "primary.main",
              },
            }}
          >
            <Instagram />
          </IconButton>
          <IconButton
            size="small"
            sx={{
              "& .MuiSvgIcon-root": {
                fontSize: "1.2rem",
                color: "primary.main",
              },
            }}
          >
            <Twitter />
          </IconButton>
          <IconButton
            size="small"
            sx={{
              "& .MuiSvgIcon-root": {
                fontSize: "1.2rem",
                color: "primary.main",
              },
            }}
          >
            <LinkedIn />
          </IconButton>
          <IconButton
            size="small"
            sx={{
              "& .MuiSvgIcon-root": {
                fontSize: "1.2rem",
                color: "primary.main",
              },
            }}
          >
            <Facebook />
          </IconButton>
        </Stack>

        {/* 4. Privacy, Terms, Help links in a row */}
        <Stack direction="row" spacing={2}>
          <Link href="#" sx={{ fontSize: "0.85rem" }}>
            Privacy Policy
          </Link>
          <Link href="#" sx={{ fontSize: "0.85rem" }}>
            Terms of Use
          </Link>
          <Link href="#" sx={{ fontSize: "0.85rem" }}>
            Help
          </Link>
        </Stack>
      </Box>
    </Box>
  );
};

// Main Footer Component
const Footer = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    message: "",
  });

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validateForm = () => {
    let tempErrors = {
      name: "",
      email: "",
      message: "",
    };
    let isValid = true;

    // Name validation
    if (!formData.name.trim()) {
      tempErrors.name = "Name is required";
      isValid = false;
    } else if (formData.name.length < 2) {
      tempErrors.name = "Name must be at least 2 characters";
      isValid = false;
    }

    // Email validation
    if (!formData.email) {
      tempErrors.email = "Email is required";
      isValid = false;
    } else if (!validateEmail(formData.email)) {
      tempErrors.email = "Please enter a valid email";
      isValid = false;
    }

    // Message validation
    if (!formData.message.trim()) {
      tempErrors.message = "Message is required";
      isValid = false;
    } else if (formData.message.length < 10) {
      tempErrors.message = "Message must be at least 10 characters";
      isValid = false;
    }

    setErrors(tempErrors);
    return isValid;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Handle successful form submission here
      console.log("Form submitted:", formData);
      // Reset form after successful submission
      setFormData({
        name: "",
        email: "",
        message: "",
      });
    }
  };

  // Desktop Footer (original unchanged)
  const renderDesktopFooter = () => (
    <Box
      sx={{
        display: "flex",
        gap: 4,
      }}
    >
      {/* Left Side */}
      <Box sx={{ flex: 1, paddingY: 4 }}>
        <Box sx={{ mb: 3 }}>
          {/* Replace with your actual logo */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              fontWeight: "bold",
              fontSize: "2.5rem",
              color: "primary.main",
            }}
          >
            MONEY
            <span style={{ fontSize: "1rem", fontWeight: "400" }}>TV</span>
          </Box>
        </Box>

        {/* <Divider sx={{ mb: 3 }} /> */}

        <Box
          sx={{
            display: "flex",
            alignItems: "start",
            justifyContent: "start",
            gap: 4,
            mt: 6,
          }}
        >
          {/* Left section after divider */}
          <Box>
            <Typography
              variant="h6"
              color="primary.main"
              sx={{ fontSize: "0.95rem" }}
            >
              Let's 'find true value here.'
            </Typography>
            <Link
              href="#"
              sx={{ display: "block", mb: 2, fontSize: "0.85rem" }}
            >
              grow@moneytv.live
            </Link>
            <Stack direction="row" spacing={1}>
              <IconButton
                size="small"
                sx={{
                  "& .MuiSvgIcon-root": {
                    fontSize: "1.2rem",
                    color: "primary.main",
                  },
                }}
              >
                <YouTube />
              </IconButton>
              <IconButton
                size="small"
                sx={{
                  "& .MuiSvgIcon-root": {
                    fontSize: "1.2rem",
                    color: "primary.main",
                  },
                }}
              >
                <Instagram />
              </IconButton>
              <IconButton
                size="small"
                sx={{
                  "& .MuiSvgIcon-root": {
                    fontSize: "1.2rem",
                    color: "primary.main",
                  },
                }}
              >
                <Twitter />
              </IconButton>
              <IconButton
                size="small"
                sx={{
                  "& .MuiSvgIcon-root": {
                    fontSize: "1.2rem",
                    color: "primary.main",
                  },
                }}
              >
                <LinkedIn />
              </IconButton>
              <IconButton
                size="small"
                sx={{
                  "& .MuiSvgIcon-root": {
                    fontSize: "1.2rem",
                    color: "primary.main",
                  },
                }}
              >
                <Facebook />
              </IconButton>
            </Stack>
          </Box>

          {/* Vertical Divider */}
          <Divider orientation="vertical" flexItem sx={{ mx: 2 }} />

          {/* Right section */}
          <Box>
            <Stack spacing={1}>
              <Link href="#" sx={{ fontSize: "0.85rem" }}>
                Privacy Policy
              </Link>
              <Link href="#" sx={{ fontSize: "0.85rem" }}>
                Terms of Use
              </Link>
              <Link href="#" sx={{ fontSize: "0.85rem" }}>
                Help
              </Link>
            </Stack>
          </Box>
        </Box>
      </Box>

      {/* Right Side - Feedback Form */}
      <Box sx={{ flex: 1, padding: 4 }}>
        <Typography
          variant="h6"
          sx={{
            mb: 2,
            display: "flex",
            alignItems: "center",
            gap: 1,
            fontSize: "1rem",
          }}
        >
          <Feedback sx={{ fontSize: "1.2rem" }} /> Send Feedback
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate>
          <Box sx={{ display: "flex", gap: 1, mb: 1 }}>
            <TextField
              size="small"
              label="Name"
              variant="standard"
              fullWidth
              name="name"
              value={formData.name}
              onChange={handleChange}
              error={Boolean(errors.name)}
              helperText={errors.name}
              sx={{
                "& .MuiInput-underline:before": {
                  borderBottom:
                    theme.palette.mode === "dark"
                      ? "1px solid rgba(255, 255, 255, 0.42)"
                      : "1px solid rgba(0, 0, 0, 0.42)",
                },
                "& .MuiInputLabel-root": {
                  fontSize: "0.85rem",
                },
                "& .MuiInputBase-input": {
                  fontSize: "0.85rem",
                },
                "& .MuiFormHelperText-root": {
                  fontSize: "0.7rem",
                  marginTop: "3px",
                },
              }}
            />
            <TextField
              size="small"
              label="Email"
              type="email"
              variant="standard"
              fullWidth
              name="email"
              value={formData.email}
              onChange={handleChange}
              error={Boolean(errors.email)}
              helperText={errors.email}
              sx={{
                "& .MuiInput-underline:before": {
                  borderBottom:
                    theme.palette.mode === "dark"
                      ? "1px solid rgba(255, 255, 255, 0.42)"
                      : "1px solid rgba(0, 0, 0, 0.42)",
                },
                "& .MuiInputLabel-root": {
                  fontSize: "0.85rem",
                },
                "& .MuiInputBase-input": {
                  fontSize: "0.85rem",
                },
                "& .MuiFormHelperText-root": {
                  fontSize: "0.7rem",
                  marginTop: "3px",
                },
              }}
            />
          </Box>
          <TextField
            size="small"
            label="Message"
            multiline
            rows={3}
            variant="standard"
            fullWidth
            name="message"
            value={formData.message}
            onChange={handleChange}
            error={Boolean(errors.message)}
            helperText={errors.message}
            sx={{
              mb: 2,
              "& .MuiInput-underline:before": {
                borderBottom:
                  theme.palette.mode === "dark"
                    ? "1px solid rgba(255, 255, 255, 0.42)"
                    : "1px solid rgba(0, 0, 0, 0.42)",
              },
              "& .MuiInputLabel-root": {
                fontSize: "0.85rem",
              },
              "& .MuiInputBase-input": {
                fontSize: "0.85rem",
              },
              "& .MuiFormHelperText-root": {
                fontSize: "0.7rem",
                marginTop: "3px",
              },
            }}
          />
          <Button
            type="submit"
            sx={{
              minWidth: 150,
              color: "text.primary",
              backgroundColor: "transparent",
              "&:hover": {
                backgroundColor: "transparent",
                color: "primary.main",
              },
              textTransform: "none",
              p: 0,
              width: "100%",
              marginRight: "auto",
              marginLeft: "auto",
              fontSize: "0.85rem",
            }}
          >
            Send Message
          </Button>
        </Box>
      </Box>
    </Box>
  );

  return (
    <Box
      component="footer"
      sx={{
        py: 1,
        bgcolor: theme.palette.mode === "dark" ? "background.paper" : "#f5f5f5",
        borderTop: 1,
        borderColor: "divider",
      }}
    >
      <Container maxWidth="lg">
        {isMobile ? (
          <MobileFooter
            formData={formData}
            errors={errors}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            validateEmail={validateEmail}
            validateForm={validateForm}
          />
        ) : (
          renderDesktopFooter()
        )}
      </Container>
    </Box>
  );
};

export default Footer;

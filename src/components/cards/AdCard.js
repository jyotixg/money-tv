import { Card, CardContent, CardMedia, Typography, Box } from "@mui/material";

const AdCard = ({ ad }) => {
  return (
    <Card
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        "&:hover": {
          cursor: "pointer",
          "& .MuiCardMedia-root": {
            transform: "scale(1.02)",
            transition: "transform 0.3s ease-in-out",
          },
        },
      }}
      onClick={() => window.open(ad.redirectUrl, "_blank")}
    >
      <Box sx={{ position: "relative", paddingTop: "25%", overflow: "hidden" }}>
        <CardMedia
          component="img"
          image={ad.adImageUrl}
          alt={ad.title}
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
            top: 8,
            left: 8,
            bgcolor: "rgba(0, 0, 0, 0.6)",
            color: "white",
            padding: "2px 8px",
            borderRadius: 1,
            fontSize: "0.75rem",
          }}
        >
          Ad
        </Box>
      </Box>
      <CardContent sx={{ flexGrow: 1, bgcolor: "grey.100" }}>
        <Typography variant="h6" gutterBottom>
          {ad.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {ad.description}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default AdCard;

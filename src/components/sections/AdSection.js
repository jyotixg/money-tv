import { Box, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import AdCard from "../cards/AdCard";

const AdSection = ({ title, ads }) => {
  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h5" component="h2" fontWeight="bold" sx={{ mb: 2 }}>
        {title}
      </Typography>

      <Grid container spacing={0}>
        {ads.map((ad) => (
          <Grid xs={12} md={6} key={ad.id}>
            <AdCard ad={ad} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default AdSection;

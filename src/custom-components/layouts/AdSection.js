import { Box, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import AdCard from "../cards/AdCard";

const AdSection = ({ title, ads, id, sectionData, section }) => {
  // console.log(section);
  // Only take the first ad
  // const ad = ads[0];
  // const ad =section.content
  const size = section.layout_config.size;

  return (
    <Box sx={{ mb: 4 }}>
      <Typography
        variant="h6"
        component="h2"
        fontWeight="bold"
        color="primary.main"
        sx={{ mb: 2 }}
      >
        {section.name}
      </Typography>

      <Grid container spacing={0}>
        {section.contents.map((ad) => (
          <Grid xs={12} md={6} key={ad.id}>
            <AdCard ad={ad} section={section} sectionData={sectionData} />
          </Grid>
        ))}
      </Grid>

      {/* <Box> */}
      {/* <AdCard
        ad={ad}
        id={section.id}
        sectionData={sectionData}
        section={section}
      /> */}
      {/* </Box> */}
    </Box>
  );
};

export default AdSection;

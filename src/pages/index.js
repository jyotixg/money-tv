import { Container } from "@mui/material";
import Layout from "../components/Layout";
import VideoSection from "../components/sections/VideoSection";
import ShortsSection from "../components/sections/ShortsSection";
import AdSection from "../components/sections/AdSection";
import { mainArr } from "../data/homeData";

export default function Home() {
  return (
    <Layout>
      <Container
        maxWidth="xl"
        sx={{
          px: { xs: 3, sm: 3, md: 6 },
          width: "100%",
          maxWidth: "100% !important",
        }}
      >
        {mainArr.map((section, index) => {
          switch (section.type) {
            case "videos":
              return (
                <VideoSection
                  key={`${section.type}-${index}`}
                  title={section.sectionTitle}
                  videos={section.content}
                />
              );
            case "shorts":
              return (
                <ShortsSection
                  key={`${section.type}-${index}`}
                  title={section.sectionTitle}
                  shorts={section.content}
                />
              );
            case "ads":
              return (
                <AdSection
                  key={`${section.type}-${index}`}
                  title={section.sectionTitle}
                  ads={section.content}
                />
              );
            default:
              return null;
          }
        })}
      </Container>
    </Layout>
  );
}

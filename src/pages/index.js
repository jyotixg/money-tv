import { useEffect, useState } from "react";
import { Container } from "@mui/material";
import Layout from "../components/Layout";
import GridLayout from "../custom-components/layouts/GridLayout";
import SliderLayout from "../custom-components/layouts/SliderLayout";
import AdSection from "../custom-components/layouts/AdSection";
import { mainArr } from "../data/homeData";
import { useMain } from "@/context/MainContext";

export default function Home() {
  const [sectionData, setSectionData] = useState(null);
  const { loading, error, fetchHomePageData } = useMain();

  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await fetchHomePageData();
        const sections = res?.data?.response?.sections;
        setSectionData(sections);
      } catch (err) {
        console.error("Error fetching home data:", err);
      }
    };

    loadData();
  }, [fetchHomePageData]);

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
        {sectionData?.map((section, index) => {
          switch (section.layout_config?.type) {
            case "grid":
              return (
                <GridLayout
                  section={section}
                  // key={`${section.type}-${section.id}`}
                  // name={section.name}
                  // contents={section.contents}
                  // id={section.id}
                  sectionData={sectionData}
                  // sections={section}
                />
              );
            case "slider":
              return (
                <SliderLayout
                  // key={`${section.type}-${section.id}`}
                  name={section.name}
                  // shorts={section.contents}
                  // id={section.id}
                  section={section}
                  sectionData={sectionData}
                />
              );
            case "ad":
              return (
                <AdSection
                  key={`${section.type}-${index}`}
                  name={section.name}
                  ads={section.contents}
                  section={section}
                  sectionData={sectionData}
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

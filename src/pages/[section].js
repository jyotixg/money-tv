import { useRouter } from "next/router";
import { Box, Container, Typography, Grid } from "@mui/material";
import GridCard from "../custom-components/cards/GridCard";
import SliderCard from "../custom-components/cards/SliderCard";
import { mainArr } from "../data/homeData";
import Layout from "@/components/Layout";
import { useEffect, useState } from "react";
import { useMain } from "@/context/MainContext";
import AdSection from "@/custom-components/layouts/AdSection";
import GridLayout from "@/custom-components/layouts/GridLayout";

export default function SectionPage() {
  const router = useRouter();
  const { section } = router.query;
  const [sectionData, setSectionData] = useState(null);
  const { loading, error, fetchSectionPageData } = useMain();

  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await fetchSectionPageData(section);
        const sections = res?.data?.response?.sections;
        setSectionData(sections);
      } catch (err) {
        console.error("Error fetching section list data:", err);
      }
    };

    loadData();
  }, [fetchSectionPageData]);

  return (
    <Layout>
      <Container maxWidth="xl">
        <Box sx={{ px: 3 }}>
          {sectionData?.map((section, index) => {
            switch (section.layout_config?.type) {
              case "grid":
                return (
                  <GridLayout
                    key={`${section.type}-${index}`}
                    video={section.contents}
                    section={section}
                    sectionData={section.contents}
                  />
                );
              case "slider":
                return (
                  <SliderLayout
                    key={`${section.type}-${section.id}`}
                    name={section.name}
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
        </Box>
      </Container>
    </Layout>
  );
}

// // This ensures all paths are pre-rendered at build time
// export async function getStaticPaths() {
//   const paths = sectionList?.map((section) => ({
//     params: { section: section.slug },
//   }));

//   return {
//     paths,
//     fallback: false,
//   };
// }

// // Get the static props for the page
// export async function getStaticProps({ params }) {
//   const sectionData = sectionList?.find((s) => s.slug === params.section);

//   if (!sectionData) {
//     return {
//       notFound: true,
//     };
//   }

//   return {
//     props: {
//       sectionData,
//     },
//   };
// }

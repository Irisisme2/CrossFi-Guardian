import React from "react";
import { Box, SimpleGrid } from "@chakra-ui/react";
import TotalPortfolioValue from "views/admin/Portfolio/components/TotalPortfolioValue";
import AssetAllocationOverview from "views/admin/Portfolio/components/AssetAllocationOverview";
import TopPerformingAssets from "views/admin/Portfolio/components/TopPerformingAssets";
import LiquidityAndRiskOverview from "views/admin/Portfolio/components/LiquidityAndRiskOverview";
import DetailedView from "views/admin/Portfolio/components/DetailedView";

export default function Settings() {
  return (
    <Box pt={{ base: "130px", md: "80px", xl: "20px" }}>
      {/* Side-by-side layout for TotalPortfolioValue and AssetAllocationOverview */}
      <SimpleGrid
        columns={{ base: 1, md: 2 }}  // Adjust columns based on screen size
        spacing="20px"  // Space between columns
      >
        <TotalPortfolioValue />
        <AssetAllocationOverview />
      </SimpleGrid>

      {/* Full-width section for remaining components */}
      <Box mt="20px">
        <LiquidityAndRiskOverview />
        <DetailedView />
        <TopPerformingAssets />
      </Box>
    </Box>
  );
}

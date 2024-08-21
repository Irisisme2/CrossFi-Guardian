import { Box, SimpleGrid } from "@chakra-ui/react";

// Custom components
import PerformanceReport from "views/admin/Analytics/components/PerformanceReport";
import Performance from "views/admin/Analytics/components/Performance";
import RiskAssessment from "views/admin/Analytics/components/RiskAssessment";
import AssetAllocation from "views/admin/Analytics/components/AssetAllocation";

import React from "react";

export default function Overview() {
  return (
    <Box mt="40px"> {/* Dodaj odstęp od góry tutaj */}
      <SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap="20px" mb="20px">
        <Box>
          <PerformanceReport />
          <RiskAssessment /> {/* RiskAssessment w tej samej kolumnie co PerformanceReport */}
        </Box>
        <Performance />
      </SimpleGrid>
      <Box mt="20px"> {/* Dodaj odstęp od góry dla AssetAllocation */}
        <AssetAllocation />
      </Box>
    </Box>
  );
}

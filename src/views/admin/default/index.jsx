import React, { useState } from "react";
import {
  Avatar,
  Box,
  Flex,
  FormLabel,
  Icon,
  Select,
  SimpleGrid,
  useColorModeValue,
} from "@chakra-ui/react";
import {
  MdAccountBalanceWallet,
  MdTrendingUp,
  MdPieChart,
  MdWarning,
} from "react-icons/md";

import MiniStatistics from "components/card/MiniStatistics";
import IconBox from "components/icons/IconBox";
import PortfolioHealthIndicators from "views/admin/default/components/PortfolioHealthIndicators";
import RecentTransactions from "views/admin/default/components/RecentTransactions";
import Visualization from "views/admin/default/components/Visualization";
import InvestmentOpportunities from "views/admin/default/components/InvestmentOpportunities";
import PortfolioPerformance from "views/admin/default/components/PortfolioPerformance";

export default function UserReports() {
  // State to manage the selected currency
  const [currency, setCurrency] = useState("USD");
  
  // State to manage the selected asset category
  const [assetCategory, setAssetCategory] = useState("Lending");

  // Function to handle currency change
  const handleCurrencyChange = (event) => {
    setCurrency(event.target.value);
  };

  // Function to handle asset category change
  const handleAssetCategoryChange = (event) => {
    setAssetCategory(event.target.value);
  };

  // Currency value display based on selected option
  const portfolioValue =
    currency === "USD" ? "$150,000" : "10,000 MPX";

  // Asset allocation values based on selected category
  const assetAllocation = {
    Lending: "40%",
    Staking: "35%",
    AMM: "25%",
  };

  const brandColor = useColorModeValue("brand.500", "white");
  const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");

  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <SimpleGrid
        columns={{ base: 1, md: 2, lg: 3, "2xl": 6 }}
        gap="20px"
        mb="20px"
      >
        <MiniStatistics
          startContent={
            <IconBox
              w="56px"
              h="56px"
              bg={boxBg}
              icon={
                <Icon
                  w="32px"
                  h="32px"
                  as={MdAccountBalanceWallet}
                  color={brandColor}
                />
              }
            />
          }
          name="Total Portfolio Value"
          value={
            <>
              {portfolioValue}
              <Select
                value={currency}
                onChange={handleCurrencyChange}
                size="sm"
                width="100px"
                marginLeft="10px"
                bg={boxBg}
                color={brandColor}
              >
                <option value="USD">USD</option>
                <option value="MPX">MPX</option>
              </Select>
            </>
          }
        />
        <MiniStatistics
          startContent={
            <IconBox
              w="56px"
              h="56px"
              bg={boxBg}
              icon={
                <Icon
                  w="32px"
                  h="32px"
                  as={MdTrendingUp}
                  color={brandColor}
                />
              }
            />
          }
          name="Daily/Weekly Performance"
          value="+5% / +12%"
        />
        <MiniStatistics
          startContent={
            <IconBox
              w="56px"
              h="56px"
              bg={boxBg}
              icon={
                <Icon
                  w="32px"
                  h="32px"
                  as={MdPieChart}
                  color={brandColor}
                />
              }
            />
          }
          name="Asset Allocation"
          value={
            <>
              {assetAllocation[assetCategory]}
              <Select
                value={assetCategory}
                onChange={handleAssetCategoryChange}
                size="sm"
                width="120px"
                marginLeft="10px"
                bg={boxBg}
                color={brandColor}
              >
                <option value="Lending">Lending</option>
                <option value="Staking">Staking</option>
                <option value="AMM">AMM</option>
              </Select>
            </>
          }
        />
        <MiniStatistics
          startContent={
            <IconBox
              w="56px"
              h="56px"
              bg={boxBg}
              icon={
                <Icon
                  w="32px"
                  h="32px"
                  as={MdWarning}
                  color={brandColor}
                />
              }
            />
          }
          name="Risk Level Indicator"
          value="Moderate"
        />
      </SimpleGrid>
      <SimpleGrid columns={{ base: 1, md: 1, xl: 1 }} gap="10px" >
        <PortfolioHealthIndicators />
        <PortfolioPerformance />
      </SimpleGrid>
      <SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap="20px" mb="20px">
        <RecentTransactions/>
        <InvestmentOpportunities />
        <SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap="20px">
        </SimpleGrid>
      </SimpleGrid>
      <SimpleGrid>
        <Visualization/>
        <SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap="20px">
        </SimpleGrid>
      </SimpleGrid>
    </Box>
  );
}

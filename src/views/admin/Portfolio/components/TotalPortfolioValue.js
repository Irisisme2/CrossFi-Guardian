import React from "react";
import {
  Box,
  Text,
  VStack,
  HStack,
  useColorModeValue,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  Divider,
  SimpleGrid,
  Tooltip,
  Icon,
  Badge,
  Progress,
  Button,
} from "@chakra-ui/react";
import { InfoIcon, ArrowUpIcon, ArrowDownIcon } from "@chakra-ui/icons";
import Card from "components/card/Card"; // Adjust the import path as needed

// Przykładowe dane
const portfolioData = {
  currentValueUSD: 123456.78,
  currentValueMPX: 98765.43,
  changes: {
    "24h": 1.23, // procentowa zmiana
    "7d": 5.67,
    "30d": -2.34,
  },
};

const TotalPortfolioValue = () => {
  const cardBg = useColorModeValue("white", "gray.700");
  const borderColor = useColorModeValue("gray.300", "gray.600");
  const changeColor = (value) => (value >= 0 ? "green.500" : "red.500");

  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }} px={{ base: "4", md: "6", lg: "8" }}>
      <Card bg={cardBg} p="6" boxShadow="md" borderColor={borderColor} w="full">
        <Text fontSize="2xl" fontWeight="bold" mb="4" textAlign="center">
          Total Portfolio Value 📊
        </Text>
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing="6">
          {/* Portfolio Value in USD */}
          <Stat textAlign="center">
            <StatLabel fontSize="lg" fontWeight="bold" mb="2">
              Current Value (USD)
            </StatLabel>
            <StatNumber fontSize="3xl" color="green.500">
              ${portfolioData.currentValueUSD.toLocaleString()}
            </StatNumber>
            <StatHelpText>
              <HStack spacing="2" justify="center">
                <StatArrow type={portfolioData.changes["24h"] >= 0 ? "increase" : "decrease"} />
                <Text color={changeColor(portfolioData.changes["24h"])} fontWeight="medium">
                  {portfolioData.changes["24h"].toFixed(2)}%
                </Text>
                <Tooltip label="Change in the last 24 hours" aria-label="24h change tooltip">
                  <Icon as={InfoIcon} boxSize={4} color="gray.500" />
                </Tooltip>
              </HStack>
            </StatHelpText>
          </Stat>

          {/* Portfolio Value in MPX */}
          <Stat textAlign="center">
            <StatLabel fontSize="lg" fontWeight="bold" mb="2">
              Current Value (MPX)
            </StatLabel>
            <StatNumber fontSize="3xl" color="blue.500">
              {portfolioData.currentValueMPX.toLocaleString()} MPX
            </StatNumber>
            <StatHelpText>
              <HStack spacing="2" justify="center">
                <StatArrow type={portfolioData.changes["7d"] >= 0 ? "increase" : "decrease"} />
                <Text color={changeColor(portfolioData.changes["7d"])} fontWeight="medium">
                  {portfolioData.changes["7d"].toFixed(2)}%
                </Text>
                <Tooltip label="Change in the last 7 days" aria-label="7d change tooltip">
                  <Icon as={InfoIcon} boxSize={4} color="gray.500" />
                </Tooltip>
              </HStack>
            </StatHelpText>
          </Stat>
        </SimpleGrid>

        <Divider my="6" />

        <VStack spacing="4" align="stretch">
          <Text fontSize="lg" fontWeight="bold" mb="2" textAlign="center">
            Recent Performance
          </Text>
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing="4">
            {Object.entries(portfolioData.changes).map(([period, change]) => (
              <Box key={period} p="4" borderWidth="1px" borderRadius="md" bg={cardBg}>
                <HStack spacing="2" justify="space-between">
                  <Text fontSize="lg" fontWeight="medium">
                    {period}
                  </Text>
                  <Text color={change >= 0 ? "green.500" : "red.500"} fontWeight="bold">
                    {change.toFixed(2)}%
                  </Text>
                </HStack>
                <Progress
                  mt="2"
                  value={Math.abs(change)}
                  colorScheme={change >= 0 ? "green" : "red"}
                  size="sm"
                />
              </Box>
            ))}
          </SimpleGrid>
        </VStack>

        <Button mt="6" colorScheme="teal" size="lg" width="full">
          View Detailed Report
        </Button>
      </Card>
    </Box>
  );
};

export default TotalPortfolioValue;

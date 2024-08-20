import React from "react";
import {
  Box,
  Flex,
  Text,
  Progress,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  useColorModeValue,
  Divider,
  VStack,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  Tooltip,
} from "@chakra-ui/react";
import Card from "components/card/Card"; // Adjust the import path as needed
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend,
  LineChart,
  Line,
} from "recharts";

// Sample data for indicators
const liquidityData = {
  liquidAssets: 8000,
  lockedAssets: 2000,
  targetLiquidity: 8500,
  categories: [
    { name: "Cash", value: 3000 },
    { name: "Stocks", value: 2500 },
    { name: "Bonds", value: 2000 },
    { name: "Real Estate", value: 500 },
  ],
  historicalTrends: [
    { date: "2024-01", value: 7500 },
    { date: "2024-02", value: 8000 },
    { date: "2024-03", value: 8200 },
    { date: "2024-04", value: 7800 },
    { date: "2024-05", value: 8100 },
  ],
};

const diversificationData = [
  { name: "Technology Stocks 💻📈", value: 35 },
  { name: "Healthcare Stocks 🏥📊", value: 25 },
  { name: "Real Estate 🏠🔑", value: 20 },
  { name: "Government Bonds 📜💰", value: 15 },
  { name: "Cash 💵💰", value: 5 },
];

const riskExposureData = [
  { name: "High Risk Assets", value: 25 },
  { name: "Low Risk Assets", value: 75 },
];

const collateralData = [
  { type: "Real Estate", value: 5000 },
  { type: "Stocks", value: 3000 },
  { type: "Bonds", value: 2000 },
];

const PortfolioHealthIndicators = () => {
  const cardBg = useColorModeValue("white", "gray.700");
  const borderColor = useColorModeValue("gray.300", "gray.600");

  // Function to render customized tooltips for liquidity chart
  const renderLiquidityTooltip = ({ payload, label }) => {
    if (payload.length) {
      const { value } = payload[0];
      return (
        <Box p="2" bg="white" borderRadius="md" boxShadow="md">
          <Text fontSize="sm" fontWeight="bold">{label}</Text>
          <Text fontSize="sm">Liquidity: ${value}</Text>
        </Box>
      );
    }
    return null;
  };

  // Function to render customized tooltips for risk exposure chart
  const renderRiskTooltip = ({ payload, label }) => {
    if (payload.length) {
      const { value } = payload[0];
      return (
        <Box p="2" bg="white" borderRadius="md" boxShadow="md">
          <Text fontSize="sm" fontWeight="bold">{label}</Text>
          <Text fontSize="sm">Exposure: {value}%</Text>
        </Box>
      );
    }
    return null;
  };

  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }} px={{ base: "4", md: "6", lg: "8" }}>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing="4">
        {/* Liquidity Card */}
        <Card bg={cardBg} p="6" boxShadow="md" borderColor={borderColor}>
          <Text fontSize="xl" fontWeight="bold" mb="4">Liquidity 🏦</Text>
          <Flex direction="column" align="center">
            <Text fontSize="lg" mb="2">
              Liquid Assets: ${liquidityData.liquidAssets}
            </Text>
            <Text fontSize="lg" mb="2">
              Locked Assets: ${liquidityData.lockedAssets}
            </Text>
            <Progress
              value={(liquidityData.liquidAssets / (liquidityData.liquidAssets + liquidityData.lockedAssets)) * 100}
              size="md"
              colorScheme="teal"
              width="full"
              mb="4"
            />
            <Text fontSize="sm" color="gray.600" mb="4">
              Percentage of Liquid Assets
            </Text>
            <PieChart width={300} height={300}>
              <Pie
                data={[
                  { name: "Liquid", value: liquidityData.liquidAssets },
                  { name: "Locked", value: liquidityData.lockedAssets },
                ]}
                dataKey="value"
                outerRadius={120}
                fill="#82ca9d"
                label
              >
                <Cell key="cell-0" fill="#00C49F" />
                <Cell key="cell-1" fill="#FF8042" />
              </Pie>
              <RechartsTooltip content={renderLiquidityTooltip} />
            </PieChart>

            {/* Detailed Breakdown */}
            <Table variant="simple" mt="6">
              <TableCaption>Detailed Breakdown of Liquidity Assets</TableCaption>
              <Thead>
                <Tr>
                  <Th>Category</Th>
                  <Th isNumeric>Value</Th>
                </Tr>
              </Thead>
              <Tbody>
                {liquidityData.categories.map((cat, index) => (
                  <Tr key={index}>
                    <Td>{cat.name}</Td>
                    <Td isNumeric>${cat.value}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>

            {/* Trends Chart */}
            <Divider my="4" />
            <Text fontSize="lg" fontWeight="bold" mb="2">Historical Liquidity Trends</Text>
            <LineChart width={500} height={300} data={liquidityData.historicalTrends}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <RechartsTooltip content={renderLiquidityTooltip} />
              <Line type="monotone" dataKey="value" stroke="#8884d8" />
              <Line type="dashed" dataKey="targetLiquidity" stroke="#ff7300" dot={false} />
            </LineChart>
            <Text fontSize="sm" color="gray.600" mt="2">
              Target Liquidity Level (Dashed Line)
            </Text>
          </Flex>
        </Card>

        {/* Diversification Card */}
        <Card bg={cardBg} p="6" boxShadow="md" borderColor={borderColor}>
          <Text fontSize="xl" fontWeight="bold" mb="4">Diversification 📊</Text>
          <Flex direction="column" align="center">
            <PieChart width={300} height={300}>
              <Pie
                data={diversificationData}
                dataKey="value"
                nameKey="name"
                outerRadius={120}
                fill="#8884d8"
                label
              >
                {diversificationData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={index % 2 === 0 ? "#FF8042" : "#00C49F"} />
                ))}
              </Pie>
              <RechartsTooltip />
            </PieChart>
            <Divider my="4" />
            <BarChart width={500} height={300} data={diversificationData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <RechartsTooltip />
              <Legend />
              <Bar dataKey="value" fill="#8884d8" />
            </BarChart>
            <Divider my="4" />
            <VStack align="start">
              {diversificationData.map((item, index) => (
                <Flex key={index} justify="space-between" width="full" mb="2">
                  <Text fontSize="lg">{item.name}</Text>
                  <Text fontSize="lg">{item.value}%</Text>
                </Flex>
              ))}
            </VStack>
          </Flex>
        </Card>

        {/* Risk Exposure Card */}
        <Card bg={cardBg} p="6" boxShadow="md" borderColor={borderColor}>
          <Text fontSize="xl" fontWeight="bold" mb="4">Risk Exposure ⚠️</Text>
          <Flex direction="column" align="center">
            <PieChart width={300} height={300}>
              <Pie
                data={riskExposureData}
                dataKey="value"
                nameKey="name"
                outerRadius={120}
                fill="#8884d8"
                label
              >
                {riskExposureData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={index % 2 === 0 ? "#FF8042" : "#00C49F"} />
                ))}
              </Pie>
              <RechartsTooltip content={renderRiskTooltip} />
            </PieChart>
            <Divider my="4" />
            <Stat mt="4" textAlign="center">
              <StatLabel>Risk Score</StatLabel>
              <StatNumber>3.2</StatNumber>
              <StatHelpText>
                Based on the current risk exposure and asset volatility.
              </StatHelpText>
            </Stat>

            {/* Risk Exposure Detailed Breakdown */}
            <Table variant="simple" mt="6">
              <TableCaption>Detailed Breakdown of Risk Exposure</TableCaption>
              <Thead>
                <Tr>
                  <Th>Asset</Th>
                  <Th>Risk Level</Th>
                  <Th isNumeric>Value</Th>
                </Tr>
              </Thead>
              <Tbody>
                {riskExposureData.map((item, index) => (
                  <Tr key={index}>
                    <Td>{item.name}</Td>
                    <Td>{item.value > 50 ? "High" : "Low"}</Td>
                    <Td isNumeric>{item.value}%</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
            <Divider my="4" />
            <Text fontSize="lg" fontWeight="bold" mb="2">Collateral Breakdown</Text>
            <BarChart width={500} height={300} data={collateralData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="type" />
              <YAxis />
              <RechartsTooltip />
              <Bar dataKey="value" fill="#82ca9d" />
            </BarChart>
            <Divider my="4" />
            <VStack align="start">
              {collateralData.map((item, index) => (
                <Flex key={index} justify="space-between" width="full" mb="2">
                  <Text fontSize="lg">{item.type}</Text>
                  <Text fontSize="lg">${item.value}</Text>
                </Flex>
              ))}
            </VStack>
          </Flex>
        </Card>
      </SimpleGrid>
    </Box>
  );
};

export default PortfolioHealthIndicators;

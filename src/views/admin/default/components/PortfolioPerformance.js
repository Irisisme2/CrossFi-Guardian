import React, { useState } from "react";
import {
  Box,
  Flex,
  Text,
  SimpleGrid,
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
  Button,
  Select,
  HStack,
  Switch,
  Image, // Dodano import Image
} from "@chakra-ui/react";
import Card from "components/card/Card"; // Adjust the import path as needed
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";

// Import ikon
import btcIcon from "assets/img/icons/Btc.jpg";
import ethIcon from "assets/img/icons/Eth.png";
import linkIcon from "assets/img/icons/chainlink.png";
import uniIcon from "assets/img/icons/uniswap.png";
import aaveIcon from "assets/img/icons/aave.png";

// Sample data for historical performance
const performanceData = {
  "7days": [
    { date: "2024-08-01", portfolio: 5, market: 3 },
    { date: "2024-08-02", portfolio: 10, market: 7 },
    { date: "2024-08-03", portfolio: 15, market: 12 },
    { date: "2024-08-04", portfolio: 20, market: 15 },
    { date: "2024-08-05", portfolio: 18, market: 14 },
    { date: "2024-08-06", portfolio: 22, market: 18 },
    { date: "2024-08-07", portfolio: 25, market: 21 },
  ],
  "30days": [
    { date: "2024-07-10", portfolio: 10, market: 8 },
    { date: "2024-07-15", portfolio: 15, market: 12 },
    { date: "2024-07-20", portfolio: 18, market: 14 },
    { date: "2024-07-25", portfolio: 22, market: 19 },
    { date: "2024-07-30", portfolio: 25, market: 21 },
    { date: "2024-08-04", portfolio: 27, market: 23 },
    { date: "2024-08-09", portfolio: 30, market: 25 },
  ],
  "90days": [
    { date: "2024-05-10", portfolio: 5, market: 3 },
    { date: "2024-05-20", portfolio: 10, market: 7 },
    { date: "2024-05-30", portfolio: 15, market: 11 },
    { date: "2024-06-10", portfolio: 20, market: 15 },
    { date: "2024-06-20", portfolio: 25, market: 19 },
    { date: "2024-06-30", portfolio: 30, market: 23 },
    { date: "2024-07-10", portfolio: 35, market: 27 },
  ],
};

// Sample data for top performers
const topPerformersData = [
  { name: "Ethereum (ETH)", value: 1200, change: "+8%", icon: ethIcon },
  { name: "Bitcoin (BTC)", value: 1100, change: "+5%", icon: btcIcon },
  { name: "Chainlink (LINK)", value: 800, change: "+12%", icon: linkIcon },
  { name: "Uniswap (UNI)", value: 600, change: "+7%", icon: uniIcon },
  { name: "Aave (AAVE)", value: 400, change: "+3%", icon: aaveIcon },
];

// Colors for PieChart
const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff7300", "#ff4d4d"];

const PortfolioPerformance = () => {
  const cardBg = useColorModeValue("white", "gray.700");
  const borderColor = useColorModeValue("gray.300", "gray.600");

  const [selectedTimeFrame, setSelectedTimeFrame] = useState("7days");
  const [viewMode, setViewMode] = useState("line"); // "line" or "bar"

  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }} px={{ base: "4", md: "6", lg: "8" }}>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing="4">
        {/* Historical Performance Card */}
        <Card bg={cardBg} p="6" boxShadow="md" borderColor={borderColor} w="full">
          <Flex justify="space-between" align="center" mb="4">
            <Text fontSize="xl" fontWeight="bold">Historical Performance 📈</Text>
            <HStack spacing="4">
              <Select
                maxW="150px"
                value={selectedTimeFrame}
                onChange={(e) => setSelectedTimeFrame(e.target.value)}
              >
                <option value="7days">Last 7 Days</option>
                <option value="30days">Last 30 Days</option>
                <option value="90days">Last 90 Days</option>
              </Select>
              <Switch
                isChecked={viewMode === "bar"}
                onChange={() => setViewMode(viewMode === "line" ? "bar" : "line")}
                colorScheme="teal"
              >
                Toggle View
              </Switch>
            </HStack>
          </Flex>

          {viewMode === "line" ? (
            <LineChart width={600} height={250} data={performanceData[selectedTimeFrame]}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <RechartsTooltip />
              <Legend />
              <Line type="monotone" dataKey="portfolio" stroke="#8884d8" name="Portfolio" />
              <Line type="monotone" dataKey="market" stroke="#82ca9d" name="Market" />
            </LineChart>
          ) : (
            <BarChart width={600} height={250} data={performanceData[selectedTimeFrame]}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <RechartsTooltip />
              <Legend />
              <Bar dataKey="portfolio" fill="#8884d8" name="Portfolio" />
              <Bar dataKey="market" fill="#82ca9d" name="Market" />
            </BarChart>
          )}

          <Divider my="4" />

          <Text fontSize="lg" fontWeight="bold" mb="2">Performance Details</Text>
          <Table variant="simple">
            <TableCaption>Performance comparison of Portfolio vs Market</TableCaption>
            <Thead>
              <Tr>
                <Th>Date</Th>
                <Th isNumeric>Portfolio (%)</Th>
                <Th isNumeric>Market (%)</Th>
              </Tr>
            </Thead>
            <Tbody>
              {performanceData[selectedTimeFrame].map((entry, index) => (
                <Tr key={index}>
                  <Td>{entry.date}</Td>
                  <Td isNumeric>{entry.portfolio}</Td>
                  <Td isNumeric>{entry.market}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Card>

        {/* Top Performers Card */}
        <Card bg={cardBg} p="6" boxShadow="md" borderColor={borderColor} w="full">
          <Text fontSize="xl" fontWeight="bold" mb="4">Top Performers 🌟</Text>
          <VStack align="start" spacing="4" width="full">
            <PieChart width={600} height={250}>
              <Pie
                data={topPerformersData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {topPerformersData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <RechartsTooltip />
            </PieChart>

            <Divider my="4" />

            <Table variant="simple">
              <TableCaption>Top Performing Assets</TableCaption>
              <Thead>
                <Tr>
                  <Th>Asset</Th>
                  <Th isNumeric>Value ($)</Th>
                  <Th>Change</Th>
                </Tr>
              </Thead>
              <Tbody>
                {topPerformersData.map((asset, index) => (
                  <Tr key={index}>
                    <Td>
                      <HStack>
                        <Image boxSize="24px" src={asset.icon} alt={asset.name} />
                        <Text>{asset.name}</Text>
                      </HStack>
                    </Td>
                    <Td isNumeric>${asset.value}</Td>
                    <Td>{asset.change}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </VStack>
        </Card>
      </SimpleGrid>
    </Box>
  );
};

export default PortfolioPerformance;

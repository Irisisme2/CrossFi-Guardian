import React, { useState } from "react";
import { Box, SimpleGrid, Select, Text, useColorModeValue, VStack, HStack, Divider } from "@chakra-ui/react";
import { Pie, Line, Bar } from "react-chartjs-2";
import Card from "components/card/Card";
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale, LineElement, BarElement, PointElement } from 'chart.js';

// Registering ChartJS components
ChartJS.register(
  Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale, LineElement, BarElement, PointElement
);

// Sample data for charts
const getChartData = (range) => {
  switch (range) {
    case "Monthly":
      return {
        timeSeries: {
          labels: ["January", "February", "March", "April", "May", "June", "July"],
          datasets: [
            {
              label: "Portfolio Value Over Time",
              fill: false,
              lineTension: 0.1,
              backgroundColor: "#36A2EB",
              borderColor: "#36A2EB",
              borderWidth: 2,
              data: [100000, 120000, 110000, 130000, 150000, 140000, 160000],
            },
          ],
        },
      };
    case "Quarterly":
      return {
        timeSeries: {
          labels: ["Q1", "Q2", "Q3", "Q4"],
          datasets: [
            {
              label: "Portfolio Value Over Time",
              fill: false,
              lineTension: 0.1,
              backgroundColor: "#36A2EB",
              borderColor: "#36A2EB",
              borderWidth: 2,
              data: [400000, 450000, 470000, 500000],
            },
          ],
        },
      };
    case "Yearly":
      return {
        timeSeries: {
          labels: ["2022", "2023"],
          datasets: [
            {
              label: "Portfolio Value Over Time",
              fill: false,
              lineTension: 0.1,
              backgroundColor: "#36A2EB",
              borderColor: "#36A2EB",
              borderWidth: 2,
              data: [500000, 600000],
            },
          ],
        },
      };
    default:
      return {
        timeSeries: {
          labels: ["January", "February", "March", "April", "May", "June", "July"],
          datasets: [
            {
              label: "Portfolio Value Over Time",
              fill: false,
              lineTension: 0.1,
              backgroundColor: "#36A2EB",
              borderColor: "#36A2EB",
              borderWidth: 2,
              data: [100000, 120000, 110000, 130000, 150000, 140000, 160000],
            },
          ],
        },
      };
  }
};

const pieData = {
  labels: ["Lending", "Staking", "AMM"],
  datasets: [
    {
      label: "Asset Allocation",
      data: [40, 35, 25],
      backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
      hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
    },
  ],
};

const barData = {
  labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
  datasets: [
    {
      label: "Daily Performance",
      backgroundColor: "#FF6384",
      borderColor: "#FF6384",
      borderWidth: 1,
      data: [5, 10, -3, 8, 6],
    },
    {
      label: "Weekly Performance",
      backgroundColor: "#36A2EB",
      borderColor: "#36A2EB",
      borderWidth: 1,
      data: [15, 12, 14, 18, 16],
    },
  ],
};

export default function Visualization() {
  const [dateRange, setDateRange] = useState("Monthly");
  const { timeSeries } = getChartData(dateRange);

  const handleDateRangeChange = (event) => {
    setDateRange(event.target.value);
  };

  const cardBg = useColorModeValue("white", "gray.700");
  const chartBg = useColorModeValue("gray.100", "gray.600");

  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }} px={{ base: "4", md: "6", lg: "8" }}>
      <VStack spacing="20px" align="start">
        <Text fontSize="2xl" fontWeight="bold">Portfolio Analytics</Text>
        <SimpleGrid columns={{ base: 1, md: 2, xl: 3 }} gap="20px" w="full">
          <Card bg={cardBg} p="4" boxShadow="md">
            <Text fontSize="lg" mb="4" fontWeight="bold">Asset Allocation</Text>
            <Pie data={pieData} options={{ responsive: true, plugins: { legend: { position: 'bottom' } } }} />
          </Card>
          <Card bg={cardBg} p="4" boxShadow="md">
            <Text fontSize="lg" mb="4" fontWeight="bold">Portfolio Value Over Time</Text>
            <Select
              value={dateRange}
              onChange={handleDateRangeChange}
              size="sm"
              width="full"
              mb="4"
              bg={cardBg}
              borderColor="gray.300"
            >
              <option value="Monthly">Monthly</option>
              <option value="Quarterly">Quarterly</option>
              <option value="Yearly">Yearly</option>
            </Select>
            <Line data={timeSeries} options={{ responsive: true, plugins: { legend: { display: false } } }} />
          </Card>
          <Card bg={cardBg} p="4" boxShadow="md">
            <Text fontSize="lg" mb="4" fontWeight="bold">Daily/Weekly Performance</Text>
            <Bar data={barData} options={{ responsive: true, plugins: { legend: { position: 'top' } } }} />
          </Card>
        </SimpleGrid>
        <HStack spacing="20px" align="start" w="full">
          <Card bg={cardBg} p="4" boxShadow="md" flex="1">
            <Text fontSize="lg" mb="4" fontWeight="bold">Key Insights</Text>
            <Text fontSize="md">
              <strong>Asset Allocation:</strong> Visualizes the distribution of your investments across different asset classes.
            </Text>
            <Divider my="4" />
            <Text fontSize="md">
              <strong>Portfolio Value Over Time:</strong> Track the changes in the value of your portfolio over the selected time range.
            </Text>
            <Divider my="4" />
            <Text fontSize="md">
              <strong>Daily/Weekly Performance:</strong> Compare daily and weekly performance to assess the volatility and trends in your portfolio.
            </Text>
          </Card>
        </HStack>
      </VStack>
    </Box>
  );
}

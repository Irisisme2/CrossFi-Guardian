import React from "react";
import {
  Box,
  Text,
  VStack,
  SimpleGrid,
  useColorModeValue,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  Divider,
  Flex,
  Icon,
  HStack,
  Tooltip,
  useBreakpointValue
} from "@chakra-ui/react";
import Card from "components/card/Card"; // Adjust the import path as needed
import { PieChart, Pie, Cell, Tooltip as RechartsTooltip } from "recharts";
import { InfoIcon } from "@chakra-ui/icons";
import { BsCashStack, BsArrowUpRightCircle, BsGraphUp, BsShield, BsPeople } from "react-icons/bs";

// Sample data
const assetAllocationData = [
  { category: "Lending", value: 5000 },
  { category: "Staking", value: 3000 },
  { category: "AMM", value: 2000 },
  { category: "Savings", value: 1000 },
];

const totalValue = assetAllocationData.reduce((sum, asset) => sum + asset.value, 0);

// Custom tooltip rendering for Pie chart
const renderTooltip = ({ payload, label }) => {
  if (payload.length) {
    const { value } = payload[0];
    return (
      <Box p="3" bg="white" borderRadius="md" boxShadow="md" border="1px solid" borderColor="gray.200">
        <Text fontSize="sm" fontWeight="bold">{label}</Text>
        <Text fontSize="sm">Value: ${value.toLocaleString()}</Text>
        <Text fontSize="sm">Percentage: {((value / totalValue) * 100).toFixed(2)}%</Text>
      </Box>
    );
  }
  return null;
};

const AssetAllocationOverview = () => {
  const cardBg = useColorModeValue("white", "gray.700");
  const borderColor = useColorModeValue("gray.300", "gray.600");
  const chartColors = ["#FF8042", "#00C49F", "#0088FE", "#FFBB28"];

  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }} px={{ base: "4", md: "6", lg: "8" }}>
      <Card bg={cardBg} p="6" boxShadow="md" borderColor={borderColor}>
        <Text fontSize="2xl" fontWeight="bold" mb="4" textAlign="center">
          Asset Allocation Overview 📊
        </Text>
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing="6">
          {/* Pie Chart */}
          <Box mb={{ base: "6", md: "0" }}>
            <Text fontSize="lg" fontWeight="bold" mb="2" textAlign="center">Allocation Distribution</Text>
            <PieChart width={400} height={400}>
              <Pie
                data={assetAllocationData}
                dataKey="value"
                nameKey="category"
                outerRadius={160}
                fill="#8884d8"
                label
                labelLine={false}
                animationDuration={1000}
              >
                {assetAllocationData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={chartColors[index % chartColors.length]} />
                ))}
              </Pie>
              <RechartsTooltip content={renderTooltip} />
            </PieChart>
          </Box>

          {/* Table */}
          <Box>
            <Text fontSize="lg" fontWeight="bold" mb="2" textAlign="center">Detailed Breakdown</Text>
            <Table variant="simple" size="sm">
              <TableCaption>Asset Allocation Breakdown</TableCaption>
              <Thead>
                <Tr>
                  <Th>Category</Th>
                  <Th isNumeric>Value</Th>
                  <Th isNumeric>Percentage</Th>
                </Tr>
              </Thead>
              <Tbody>
                {assetAllocationData.map((asset, index) => (
                  <Tr key={index}>
                    <Td>{asset.category}</Td>
                    <Td isNumeric>${asset.value.toLocaleString()}</Td>
                    <Td isNumeric>{((asset.value / totalValue) * 100).toFixed(2)}%</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Box>
        </SimpleGrid>

        {/* Summary */}
        <Box mt="6" p="4" borderWidth="1px" borderRadius="md" borderColor={borderColor} textAlign="center">
          <Text fontSize="lg" fontWeight="bold" mb="2">Total Portfolio Value</Text>
          <Flex justify="center" align="center" direction="column">
            <Text fontSize="2xl" fontWeight="bold" color="teal.500">${totalValue.toLocaleString()}</Text>
            <Text fontSize="lg" color="gray.600">({(totalValue / totalValue * 100).toFixed(2)}%)</Text>
          </Flex>
          <Divider my="4" />
          <Flex direction="column" align="center">
            <Text fontSize="md" color="gray.500" mb="2">Category Breakdown</Text>
            <HStack spacing="4" wrap="wrap" justify="center">
              {assetAllocationData.map((entry, index) => (
                <Tooltip
                  key={index}
                  label={`Category: ${entry.category}\nValue: $${entry.value.toLocaleString()}\nPercentage: ${((entry.value / totalValue) * 100).toFixed(2)}%`}
                  hasArrow
                >
                  <Flex direction="column" align="center" p="2">
                    <Box
                      bg={chartColors[index % chartColors.length]}
                      h="12px"
                      w="12px"
                      borderRadius="full"
                      mb="2"
                    />
                    <Text fontSize="sm">{entry.category}</Text>
                  </Flex>
                </Tooltip>
              ))}
            </HStack>
          </Flex>
        </Box>
      </Card>
    </Box>
  );
};

export default AssetAllocationOverview;


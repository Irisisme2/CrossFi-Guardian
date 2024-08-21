import React, { useState } from "react";
import {
  Box,
  Text,
  VStack,
  SimpleGrid,
  useColorModeValue,
  Divider,
  Flex,
  Icon,
  Image,
  Badge,
  HStack,
  Tooltip,
  Button,
  Collapse,
  Spinner,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
} from "@chakra-ui/react";
import Card from "components/card/Card"; // Adjust the import path as needed
import { ArrowUpIcon, ArrowDownIcon, InfoIcon, SearchIcon } from "@chakra-ui/icons";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip } from "recharts";

// Importing icons for assets
import btcIcon from "assets/img/icons/Btc.jpg";
import ethIcon from "assets/img/icons/Eth.png";
import linkIcon from "assets/img/icons/chainlink.png";
import uniIcon from "assets/img/icons/uniswap.png";
import aaveIcon from "assets/img/icons/aave.png";

// Sample data for top performing assets
const topAssets = [
  {
    name: "Bitcoin",
    protocol: "BTC Protocol",
    return: 45.6,
    profit: 12000,
    icon: btcIcon,
    description: "Bitcoin is a decentralized digital currency without a central bank or single administrator.",
    performance: [
      { date: "2024-01-01", value: 50000 },
      { date: "2024-02-01", value: 52000 },
      { date: "2024-03-01", value: 53000 },
      { date: "2024-04-01", value: 55000 },
      { date: "2024-05-01", value: 57000 },
    ],
  },
  {
    name: "Ethereum",
    protocol: "ETH Protocol",
    return: 30.2,
    profit: 8500,
    icon: ethIcon,
    description: "Ethereum is a decentralized platform that runs smart contracts: applications that run exactly as programmed without any possibility of downtime.",
    performance: [
      { date: "2024-01-01", value: 3000 },
      { date: "2024-02-01", value: 3200 },
      { date: "2024-03-01", value: 3400 },
      { date: "2024-04-01", value: 3600 },
      { date: "2024-05-01", value: 3800 },
    ],
  },
  {
    name: "Chainlink",
    protocol: "LINK Protocol",
    return: 25.8,
    profit: 6000,
    icon: linkIcon,
    description: "Chainlink is a decentralized oracle network that enables smart contracts to securely connect to external data sources.",
    performance: [
      { date: "2024-01-01", value: 15 },
      { date: "2024-02-01", value: 16 },
      { date: "2024-03-01", value: 17 },
      { date: "2024-04-01", value: 18 },
      { date: "2024-05-01", value: 20 },
    ],
  },
  {
    name: "Uniswap",
    protocol: "UNI Protocol",
    return: 20.1,
    profit: 5000,
    icon: uniIcon,
    description: "Uniswap is a decentralized trading protocol and automated market maker (AMM) on Ethereum.",
    performance: [
      { date: "2024-01-01", value: 25 },
      { date: "2024-02-01", value: 27 },
      { date: "2024-03-01", value: 29 },
      { date: "2024-04-01", value: 30 },
      { date: "2024-05-01", value: 32 },
    ],
  },
  {
    name: "Aave",
    protocol: "AAVE Protocol",
    return: 15.3,
    profit: 4000,
    icon: aaveIcon,
    description: "Aave is a decentralized lending protocol that allows users to lend and borrow a range of cryptocurrencies.",
    performance: [
      { date: "2024-01-01", value: 75 },
      { date: "2024-02-01", value: 77 },
      { date: "2024-03-01", value: 80 },
      { date: "2024-04-01", value: 82 },
      { date: "2024-05-01", value: 85 },
    ],
  },
];

const TopPerformingAssets = () => {
  const cardBg = useColorModeValue("white", "gray.700");
  const borderColor = useColorModeValue("gray.300", "gray.600");
  const expandedBgColor = useColorModeValue("gray.50", "gray.800"); // Move the useColorModeValue here
  const [expanded, setExpanded] = useState(false);
  const [sortOrder, setSortOrder] = useState("desc");
  const [search, setSearch] = useState("");

  const toggleExpand = () => setExpanded(!expanded);

  const filteredAssets = topAssets.filter(asset =>
    asset.name.toLowerCase().includes(search.toLowerCase())
  ).sort((a, b) => (sortOrder === "desc" ? b.return - a.return : a.return - b.return));

  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }} px={{ base: "4", md: "6", lg: "8" }}>
      <Card bg={cardBg} p="6" boxShadow="md" borderColor={borderColor}>
        <Text fontSize="2xl" fontWeight="bold" mb="4" textAlign="center">
          Top 5 Performing Assets 🚀
        </Text>
        
        {/* Search and Sort Controls */}
        <Flex mb="6" direction="column" align="center">
          <InputGroup mb="4" width="full" maxW="400px">
            <InputLeftElement>
              <SearchIcon color="gray.500" />
            </InputLeftElement>
            <Input
              type="text"
              placeholder="Search assets..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </InputGroup>
          <Select
            placeholder="Sort by"
            width="full"
            maxW="200px"
            onChange={(e) => setSortOrder(e.target.value)}
            mb="4"
          >
            <option value="desc">Highest Return First</option>
            <option value="asc">Lowest Return First</option>
          </Select>
        </Flex>

        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing="6">
          {filteredAssets.length > 0 ? (
            filteredAssets.map((asset, index) => (
              <Box
                key={index}
                p="4"
                borderWidth="1px"
                borderRadius="md"
                borderColor={borderColor}
                bg={expandedBgColor} // Use the value here
                shadow="md"
                position="relative"
                overflow="hidden"
              >
                <Flex align="center" mb="4">
                  <Image
                    boxSize="50px"
                    borderRadius="full"
                    src={asset.icon}
                    alt={`${asset.name} icon`}
                    mr="4"
                  />
                  <Flex direction="column">
                    <Text fontSize="lg" fontWeight="bold">{asset.name}</Text>
                    <Text fontSize="sm" color="gray.600">Protocol: {asset.protocol}</Text>
                  </Flex>
                  <Icon
                    as={InfoIcon}
                    ml="2"
                    color="gray.500"
                    onClick={toggleExpand}
                    cursor="pointer"
                  />
                </Flex>
                <Collapse in={expanded}>
                  <Text fontSize="sm" color="gray.500" mb="4">{asset.description}</Text>
                </Collapse>
                <HStack justify="space-between" mb="3">
                  <Text fontSize="md" fontWeight="bold" color="gray.700">
                    {asset.return.toFixed(2)}% Return
                  </Text>
                  <Tooltip label={`Return: ${asset.return.toFixed(2)}%`} aria-label="Return Tooltip">
                    <Badge
                      colorScheme={asset.return > 0 ? "green" : "red"}
                      variant="solid"
                      fontSize="md"
                      px="2"
                      py="1"
                    >
                      {asset.return > 0 ? (
                        <Flex align="center">
                          <ArrowUpIcon mr="1" />
                          {asset.return.toFixed(2)}%
                        </Flex>
                      ) : (
                        <Flex align="center">
                          <ArrowDownIcon mr="1" />
                          {Math.abs(asset.return).toFixed(2)}%
                        </Flex>
                      )}
                    </Badge>
                  </Tooltip>
                </HStack>
                <Text fontSize="lg" fontWeight="bold" color={asset.profit > 0 ? "green.500" : "red.500"}>
                  {asset.profit > 0 ? "+" : "-"}${Math.abs(asset.profit).toLocaleString()}
                </Text>
                <Divider my="3" />
                
                {/* Performance Chart */}
                <Box mt="4" height="200px">
                  <LineChart width={400} height={200} data={asset.performance}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <RechartsTooltip />
                    <Line type="monotone" dataKey="value" stroke="#8884d8" />
                  </LineChart>
                </Box>
                
                <Button
                  mt="4"
                  colorScheme="blue"
                  onClick={toggleExpand}
                  variant="outline"
                  width="full"
                >
                  {expanded ? "Show Less" : "Show More"}
                </Button>
              </Box>
            ))
          ) : (
            <Flex justify="center" align="center" height="200px">
              <Spinner size="xl" />
              <Text ml="4">No assets found</Text>
            </Flex>
          )}
        </SimpleGrid>
      </Card>
    </Box>
  );
};

export default TopPerformingAssets;

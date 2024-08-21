import React, { useState } from 'react';
import {
  Box,
  Text,
  Flex,
  VStack,
  HStack,
  Divider,
  Progress,
  Badge,
  Tooltip,
  Button,
  useDisclosure,
  IconButton,
  Select,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  Input,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Stack,
  InputGroup,
  InputLeftElement
} from '@chakra-ui/react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, Title, Tooltip as ChartTooltip, Legend } from 'chart.js';
import { FaChartLine, FaRegTimesCircle, FaInfoCircle, FaPlus, FaFilter, FaSortUp, FaSortDown } from 'react-icons/fa';
import Card from "components/card/Card.js";

// Register Chart.js components
ChartJS.register(LineElement, CategoryScale, LinearScale, Title, ChartTooltip, Legend);

// Przykładowe dane
const riskData = {
  marketRisk: 0.4,
  liquidityRisk: 0.2,
  creditRisk: 0.3
};

const collateralData = [
  { asset: 'BTC', ratio: 1.5, safeThreshold: 2.0 },
  { asset: 'ETH', ratio: 1.2, safeThreshold: 1.5 },
  { asset: 'LINK', ratio: 0.9, safeThreshold: 1.0 },
  { asset: 'UNI', ratio: 1.8, safeThreshold: 2.0 },
  { asset: 'AAVE', ratio: 1.1, safeThreshold: 1.5 }
];

const scenarioData = {
  priceDrop: {
    percentageDrop: 20,
    potentialLoss: 5000,
    historicalData: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
      datasets: [
        {
          label: 'Potential Loss',
          data: [1000, 1500, 2000, 2500, 3000, 3500, 4000, 4500],
          borderColor: 'rgba(255, 99, 132, 1)',
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          fill: true
        }
      ]
    }
  },
  interestRateChange: {
    percentageChange: 1,
    potentialImpact: 2000,
    historicalData: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
      datasets: [
        {
          label: 'Potential Impact',
          data: [500, 1000, 1500, 2000, 2500, 3000, 3500, 4000],
          borderColor: 'rgba(54, 162, 235, 1)',
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          fill: true
        }
      ]
    }
  }
};

const RiskAssessment = () => {
  const [selectedScenario, setSelectedScenario] = useState('priceDrop');
  const [showScenarioResults, setShowScenarioResults] = useState(false);
  const [customRisk, setCustomRisk] = useState('');
  const [customCollateral, setCustomCollateral] = useState('');
  const [showTable, setShowTable] = useState(true);
  const [filterRisk, setFilterRisk] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isModalOpen, onOpen: onModalOpen, onClose: onModalClose } = useDisclosure();

  const handleScenarioChange = (event) => {
    setSelectedScenario(event.target.value);
  };

  const handleCustomRiskChange = (event) => {
    setCustomRisk(event.target.value);
  };

  const handleCustomCollateralChange = (event) => {
    setCustomCollateral(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilterRisk(event.target.value);
  };

  const handleSortOrderChange = (order) => {
    setSortOrder(order);
  };

  const getScenarioData = () => {
    return scenarioData[selectedScenario].historicalData;
  };

  const sortedCollateralData = [...collateralData].sort((a, b) => {
    if (sortOrder === 'asc') {
      return a.ratio - b.ratio;
    } else {
      return b.ratio - a.ratio;
    }
  }).filter(entry => entry.asset.includes(filterRisk));

  return (
    <Box p={{ base: '4', md: '6', lg: '8' }}>
      <Card p="6" boxShadow="lg" borderRadius="md">
        <Text fontSize="2xl" fontWeight="bold" mb="4">
          Risk Assessment
        </Text>

        {/* Risk Dashboard */}
        <VStack spacing="6" align="stretch" mb="6">
          <Text fontSize="xl" fontWeight="bold">Risk Dashboard</Text>
          <HStack spacing="4">
            <Box width="100%" maxW="400px">
              <Text fontSize="lg" mb="2">Market Risk</Text>
              <Progress value={riskData.marketRisk * 100} colorScheme="red" />
              <Text textAlign="right">{(riskData.marketRisk * 100).toFixed(2)}%</Text>
            </Box>
            <Box width="100%" maxW="400px">
              <Text fontSize="lg" mb="2">Liquidity Risk</Text>
              <Progress value={riskData.liquidityRisk * 100} colorScheme="yellow" />
              <Text textAlign="right">{(riskData.liquidityRisk * 100).toFixed(2)}%</Text>
            </Box>
            <Box width="100%" maxW="400px">
              <Text fontSize="lg" mb="2">Credit Risk</Text>
              <Progress value={riskData.creditRisk * 100} colorScheme="blue" />
              <Text textAlign="right">{(riskData.creditRisk * 100).toFixed(2)}%</Text>
            </Box>
          </HStack>
        </VStack>

        <Divider my="6" />

        {/* Collateralization Ratios */}
        <Text fontSize="xl" fontWeight="bold" mb="4">
          Collateralization Ratios
        </Text>
        <HStack mb="4" spacing="4">
          <Button onClick={() => handleSortOrderChange('asc')} colorScheme="teal" leftIcon={<FaSortUp />}>
            Sort Ascending
          </Button>
          <Button onClick={() => handleSortOrderChange('desc')} colorScheme="teal" leftIcon={<FaSortDown />}>
            Sort Descending
          </Button>
          <InputGroup width="200px">
            <InputLeftElement>
              <FaFilter color="gray.500" />
            </InputLeftElement>
            <Input placeholder="Filter by Asset" value={filterRisk} onChange={handleFilterChange} />
          </InputGroup>
        </HStack>
        <Table variant="simple" mb="6">
          <Thead>
            <Tr>
              <Th>Asset</Th>
              <Th>Collateralization Ratio</Th>
              <Th>Status</Th>
            </Tr>
          </Thead>
          <Tbody>
            {sortedCollateralData.map((entry) => (
              <Tr key={entry.asset}>
                <Td>{entry.asset}</Td>
                <Td>{entry.ratio.toFixed(2)}</Td>
                <Td>
                  {entry.ratio < entry.safeThreshold ? (
                    <Badge colorScheme="red">At Risk</Badge>
                  ) : (
                    <Badge colorScheme="green">Safe</Badge>
                  )}
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>

        <Divider my="6" />

        {/* Scenario Analysis */}
        <Text fontSize="xl" fontWeight="bold" mb="4">
          Scenario Analysis
        </Text>
        <Flex mb="4" justify="space-between" align="center">
          <Select value={selectedScenario} onChange={handleScenarioChange} width="200px">
            <option value="priceDrop">Price Drop</option>
            <option value="interestRateChange">Interest Rate Change</option>
          </Select>
          <Tooltip label="View detailed results of selected scenario analysis" aria-label="Scenario Analysis">
            <IconButton icon={<FaChartLine />} onClick={() => setShowScenarioResults(true)} />
          </Tooltip>
        </Flex>

        {showScenarioResults && (
          <VStack spacing="4" align="stretch" mb="6">
            <Box width="100%" height="300px">
              <Line data={getScenarioData()} options={{ responsive: true, plugins: { legend: { display: true }, tooltip: { callbacks: { label: (tooltipItem) => `Value: ${tooltipItem.raw}` } } } }} />
            </Box>
            <Button onClick={() => setShowScenarioResults(false)} colorScheme="teal">
              Close
            </Button>
          </VStack>
        )}

        <Divider my="6" />

        {/* Custom Risk and Collateral Input */}
        <Flex mb="4" justify="space-between" align="center">
          <Text fontSize="xl" fontWeight="bold">Custom Risk and Collateral Data</Text>
          <Button onClick={onModalOpen} colorScheme="blue" leftIcon={<FaPlus />}>
            Add Data
          </Button>
        </Flex>

        <Modal isOpen={isModalOpen} onClose={onModalClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Add Custom Risk and Collateral Data</ModalHeader>
            <ModalBody>
              <FormControl mb="4">
                <FormLabel>Custom Risk Value</FormLabel>
                <Input type="text" value={customRisk} onChange={handleCustomRiskChange} placeholder="Enter custom risk value" />
              </FormControl>
              <FormControl>
                <FormLabel>Custom Collateral Value</FormLabel>
                <Input type="text" value={customCollateral} onChange={handleCustomCollateralChange} placeholder="Enter custom collateral value" />
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={() => {
                // Handle custom data submission
                onModalClose();
              }}>
                Submit
              </Button>
              <Button variant="outline" onClick={onModalClose}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Card>
    </Box>
  );
};

export default RiskAssessment;


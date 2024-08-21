import React, { useState } from 'react';
import {
  Box,
  Text,
  SimpleGrid,
  VStack,
  Button,
  Divider,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Input,
  InputGroup,
  InputLeftElement,
  HStack,
  Stack
} from '@chakra-ui/react';
import { Pie, Line } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Title, Tooltip as ChartTooltip, Legend, LineElement, CategoryScale, LinearScale } from 'chart.js';
import { FaCog, FaRegClock } from 'react-icons/fa';
import Card from 'components/card/Card';

// Register Chart.js components
ChartJS.register(ArcElement, Title, ChartTooltip, Legend, LineElement, CategoryScale, LinearScale);

// Sample data for current allocation
const currentAllocationData = {
  labels: ['Stocks', 'Bonds', 'Real Estate', 'Cryptocurrencies'],
  datasets: [{
    data: [40, 30, 20, 10],
    backgroundColor: ['#4BC0C0', '#FF6384', '#FFCE56', '#36A2EB']
  }]
};

// Sample data for heatmap (for allocation analysis)
const heatmapData = {
  labels: ['Stocks', 'Bonds', 'Real Estate', 'Cryptocurrencies'],
  datasets: [{
    label: 'Allocation Heatmap',
    data: [50, 20, 15, 10],
    backgroundColor: '#FFCE56'
  }]
};

// Sample data for historical allocation trends
const historicalAllocationData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  datasets: [
    {
      label: 'Stocks',
      data: [35, 37, 40, 42, 44, 43, 45, 46, 47, 48, 49, 50],
      borderColor: '#4BC0C0',
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      fill: true
    },
    {
      label: 'Bonds',
      data: [30, 31, 32, 34, 35, 34, 33, 32, 31, 30, 29, 28],
      borderColor: '#FF6384',
      backgroundColor: 'rgba(255, 99, 132, 0.2)',
      fill: true
    }
  ]
};

// Sample recommendations
const allocationRecommendations = [
  { category: 'Stocks', recommendation: 'Increase by 5%' },
  { category: 'Bonds', recommendation: 'Decrease by 3%' },
  { category: 'Real Estate', recommendation: 'Maintain current allocation' },
  { category: 'Cryptocurrencies', recommendation: 'Increase by 2%' }
];

// Rebalancing options
const rebalancingOptions = [
  { type: 'Automated', description: 'Rebalance automatically based on predefined intervals or thresholds' },
  { type: 'Manual', description: 'Manually adjust allocations as needed' }
];

// Sample risk metrics
const riskMetrics = {
  volatility: 0.20,
  sharpeRatio: 1.7
};

const AssetAllocation = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [rebalancingFrequency, setRebalancingFrequency] = useState('Monthly');
  const [customRebalancing, setCustomRebalancing] = useState('');

  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleRebalancingOption = (option) => {
    setSelectedOption(option);
    setShowModal(true);
  };

  return (
    <Box p={{ base: '4', md: '6', lg: '8' }}>
      <Card p="6" boxShadow="lg" borderRadius="md">
        <Text fontSize="2xl" fontWeight="bold" mb="4">
          Asset Allocation
        </Text>

        {/* Current Allocation Analysis */}
        <VStack spacing="4" align="start" mb="6">
          <Text fontSize="xl" fontWeight="bold">Current Allocation Analysis</Text>
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing="20px">
            <Box p="4" borderWidth="1px" borderRadius="md" shadow="md">
              <Text fontSize="lg" fontWeight="bold">Asset Allocation Pie Chart</Text>
              <Pie data={currentAllocationData} options={{ responsive: true, plugins: { legend: { position: 'bottom' } } }} />
            </Box>
            <Box p="4" borderWidth="1px" borderRadius="md" shadow="md">
              <Text fontSize="lg" fontWeight="bold">Allocation Heatmap</Text>
              {/* Placeholder for heatmap */}
              <Pie data={heatmapData} options={{ responsive: true, plugins: { legend: { position: 'bottom' } } }} />
            </Box>
          </SimpleGrid>
        </VStack>

        <Divider my="6" />

        {/* Historical Allocation Trends */}
        <VStack spacing="4" align="start" mb="6">
          <Text fontSize="xl" fontWeight="bold">Historical Allocation Trends</Text>
          <Box p="4" borderWidth="1px" borderRadius="md" shadow="md">
            <Text fontSize="lg" fontWeight="bold">Monthly Allocation Trends</Text>
            <Line data={historicalAllocationData} options={{
              responsive: true,
              plugins: { legend: { position: 'top' }, tooltip: { callbacks: { label: (tooltipItem) => `Value: ${tooltipItem.formattedValue}` } } }
            }} />
          </Box>
        </VStack>

        <Divider my="6" />

        {/* Allocation Recommendations */}
        <VStack spacing="4" align="start" mb="6">
          <Text fontSize="xl" fontWeight="bold">Allocation Recommendations</Text>
          {allocationRecommendations.map((rec, index) => (
            <Box key={index} p="4" borderWidth="1px" borderRadius="md" shadow="md">
              <Text fontSize="lg" fontWeight="bold">{rec.category}</Text>
              <Text>{rec.recommendation}</Text>
            </Box>
          ))}
          <Button mt="4" colorScheme="teal" onClick={() => handleRebalancingOption('Recommendation')}>
            Simulate Rebalancing
          </Button>
        </VStack>

        <Divider my="6" />

        {/* Rebalancing Tools */}
        <VStack spacing="4" align="start" mb="6">
          <Text fontSize="xl" fontWeight="bold">Rebalancing Tools</Text>
          {rebalancingOptions.map((option, index) => (
            <Box key={index} p="4" borderWidth="1px" borderRadius="md" shadow="md">
              <Text fontSize="lg" fontWeight="bold">{option.type}</Text>
              <Text>{option.description}</Text>
              <Button mt="4" colorScheme="teal" onClick={() => handleRebalancingOption(option.type)}>
                {option.type === 'Automated' ? 'Configure' : 'Manual Rebalance'}
              </Button>
            </Box>
          ))}
        </VStack>

        <Divider my="6" />

        {/* Risk Metrics */}
        <VStack spacing="4" align="start" mb="6">
          <Text fontSize="xl" fontWeight="bold">Risk Metrics</Text>
          <Box p="4" borderWidth="1px" borderRadius="md" shadow="md">
            <Text fontSize="lg" fontWeight="bold">Volatility:</Text>
            <Text>{riskMetrics.volatility.toFixed(2)}</Text>
            <Text fontSize="lg" fontWeight="bold">Sharpe Ratio:</Text>
            <Text>{riskMetrics.sharpeRatio.toFixed(2)}</Text>
          </Box>
        </VStack>

        {/* Rebalancing Modal */}
        <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Rebalancing Options</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Text fontSize="lg" mb="4">
                Selected Option: {selectedOption}
              </Text>
              <InputGroup mb="4">
                <InputLeftElement>
                  <FaRegClock color="gray.500" />
                </InputLeftElement>
                <Input
                  placeholder="Enter rebalancing frequency (e.g., Monthly)"
                  value={rebalancingFrequency}
                  onChange={(e) => setRebalancingFrequency(e.target.value)}
                />
              </InputGroup>
              {selectedOption === 'Manual' && (
                <InputGroup mb="4">
                  <InputLeftElement>
                    <FaCog color="gray.500" />
                  </InputLeftElement>
                  <Input
                    placeholder="Enter custom rebalancing details"
                    value={customRebalancing}
                    onChange={(e) => setCustomRebalancing(e.target.value)}
                  />
                </InputGroup>
              )}
              <Button colorScheme="teal" onClick={() => setShowModal(false)}>
                Apply
              </Button>
            </ModalBody>
          </ModalContent>
        </Modal>
      </Card>
    </Box>
  );
};

export default AssetAllocation;

import React, { useState, useEffect } from 'react';
import {
  Box,
  Text,
  Flex,
  VStack,
  HStack,
  Image,
  Button,
  Select,
  Input,
  useBreakpointValue,
  Divider,
  Tooltip,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useToast,
  IconButton,
  Spinner,
} from '@chakra-ui/react';
import { Line, Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, Title, Tooltip as ChartTooltip, Legend, BarElement, ArcElement } from 'chart.js';
import { DownloadIcon, CalendarIcon } from '@chakra-ui/icons';
import btcIcon from 'assets/img/icons/Btc.jpg';
import ethIcon from 'assets/img/icons/Eth.png';
import linkIcon from 'assets/img/icons/chainlink.png';
import uniIcon from 'assets/img/icons/uniswap.png';
import aaveIcon from 'assets/img/icons/aave.png';
import Card from "components/card/Card.js";

// Register the necessary components of Chart.js
ChartJS.register(LineElement, CategoryScale, LinearScale, Title, ChartTooltip, Legend, BarElement, ArcElement);

const generateSampleData = (duration) => {
  const labels = [];
  const data = [];
  const now = new Date();

  for (let i = 0; i < 30; i++) {
    labels.push(new Date(now.setDate(now.getDate() - 1)).toLocaleDateString());
    data.push(Math.random() * 1000 + 500); // Random data
  }

  return {
    labels: labels.reverse(),
    datasets: [
      {
        label: 'Portfolio Value',
        data: data.reverse(),
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  };
};

const generateComparisonData = () => {
  return {
    labels: ['BTC', 'ETH', 'LINK', 'UNI', 'AAVE'],
    datasets: [
      {
        label: 'Portfolio',
        data: [30000, 2000, 25, 5, 70],
        backgroundColor: [
          'rgba(75, 192, 192, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 205, 86, 0.2)',
        ],
        borderColor: [
          'rgb(75, 192, 192)',
          'rgb(255, 99, 132)',
          'rgb(153, 102, 255)',
          'rgb(255, 159, 64)',
          'rgb(255, 205, 86)',
        ],
        borderWidth: 1,
      },
    ],
  };
};

const PerformanceReport = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('1m');
  const [customDateRange, setCustomDateRange] = useState([null, null]);
  const [chartData, setChartData] = useState(generateSampleData('1m'));
  const [comparisonData, setComparisonData] = useState(generateComparisonData());
  const [showCustomDateRange, setShowCustomDateRange] = useState(false);
  const [loading, setLoading] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  useEffect(() => {
    setLoading(true);
    // Simulate async data fetching
    setTimeout(() => {
      setLoading(false);
      setChartData(generateSampleData(selectedPeriod));
      setComparisonData(generateComparisonData());
    }, 1000);
  }, [selectedPeriod]);

  const handlePeriodChange = (e) => {
    const period = e.target.value;
    setSelectedPeriod(period);
  };

  const handleCustomDateRangeChange = (e) => {
    const { name, value } = e.target;
    setCustomDateRange((prevRange) => ({
      ...prevRange,
      [name]: value ? new Date(value) : null,
    }));
  };

  const handleApplyCustomDateRange = () => {
    if (customDateRange[0] && customDateRange[1]) {
      // Simulate data fetch
      setChartData(generateSampleData('custom')); // Example, replace with real data fetch
      setShowCustomDateRange(false);
    } else {
      toast({
        title: 'Invalid Date Range',
        description: 'Please select both start and end dates.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleExport = () => {
    // Convert data to CSV format
    const csvContent = [
      ['Date', 'Value'],
      ...chartData.labels.map((label, index) => [label, chartData.datasets[0].data[index]]),
    ]
      .map(e => e.join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'portfolio_performance.csv';
    link.click();
  };

  return (
    <Box p={{ base: '4', md: '6', lg: '8' }}>
      <Card p="6">
        <Text fontSize="2xl" fontWeight="bold" mb="4">
          Portfolio Performance
        </Text>

        {loading ? (
          <Flex justify="center" align="center" height="22px">
            <Spinner size="xl" />
          </Flex>
        ) : (
          <>
            <Flex mb="6" direction={{ base: 'column', md: 'row' }} align="center" justify="space-between">
              <HStack spacing="4">
                <Button colorScheme="blue" onClick={() => handlePeriodChange({ target: { value: '1w' } })}>
                  1 Week
                </Button>
                <Button colorScheme="blue" onClick={() => handlePeriodChange({ target: { value: '1m' } })}>
                  1 Month
                </Button>
                <Button colorScheme="blue" onClick={() => handlePeriodChange({ target: { value: '3m' } })}>
                  3 Months
                </Button>
                <Button colorScheme="blue" onClick={() => handlePeriodChange({ target: { value: '1y' } })}>
                  1 Year
                </Button>
                <Button colorScheme="blue" onClick={() => setShowCustomDateRange(true)}>
                  Custom Range
                </Button>
              </HStack>

              <Select value={selectedPeriod} onChange={handlePeriodChange} width={{ base: 'full', md: 'auto' }}>
                <option value="1w">1 Week</option>
                <option value="1m">1 Month</option>
                <option value="3m">3 Months</option>
                <option value="1y">1 Year</option>
              </Select>

              <Button leftIcon={<DownloadIcon />} colorScheme="green" onClick={handleExport}>
                Export CSV
              </Button>
            </Flex>

            <Box mb="6" p="4" borderWidth="1px" borderRadius="md">
              <Text fontSize="lg" fontWeight="bold" mb="4">Portfolio Value Over Time</Text>
              <Line data={chartData} options={{ responsive: true, plugins: { legend: { position: 'top' }, tooltip: { callbacks: { label: (context) => `$${context.parsed.y}` } } } }} />
            </Box>

            <Box p="4" mb="6">
      <Text fontSize="lg" fontWeight="bold" mb="4">Portfolio Allocation</Text>
      <Box width="600px" height="600px">
        <Pie
          data={comparisonData}
          options={{
            responsive: true,
            plugins: {
              legend: {
                position: 'top'
              },
              tooltip: {
                callbacks: {
                  label: (context) => `${context.label}: $${context.raw}`
                }
              }
            },
            // Adjust chart size
            layout: {
              padding: 0
            }
          }}
        />
      </Box>
    </Box>

            <Box mb="6" p="4" borderWidth="1px" borderRadius="md">
              <Text fontSize="lg" fontWeight="bold" mb="4">Comparison with Key Indices</Text>
              <Bar data={comparisonData} options={{ responsive: true, plugins: { legend: { position: 'top' }, tooltip: { callbacks: { label: (context) => `$${context.raw}` } } } }} />
            </Box>

            <VStack spacing="6" mb="6">
              <HStack spacing="4" align="center">
                <Image src={btcIcon} boxSize="40px" />
                <Text fontSize="lg" fontWeight="bold">BTC: $30,000</Text>
              </HStack>
              <HStack spacing="4" align="center">
                <Image src={ethIcon} boxSize="40px" />
                <Text fontSize="lg" fontWeight="bold">ETH: $2,000</Text>
              </HStack>
              <HStack spacing="4" align="center">
                <Image src={linkIcon} boxSize="40px" />
                <Text fontSize="lg" fontWeight="bold">LINK: $25</Text>
              </HStack>
              <HStack spacing="4" align="center">
                <Image src={uniIcon} boxSize="40px" />
                <Text fontSize="lg" fontWeight="bold">UNI: $5</Text>
              </HStack>
              <HStack spacing="4" align="center">
                <Image src={aaveIcon} boxSize="40px" />
                <Text fontSize="lg" fontWeight="bold">AAVE: $70</Text>
              </HStack>
            </VStack>

            <Box mt="6" p="4" borderWidth="1px" borderRadius="md">
              <Text fontSize="xl" fontWeight="bold">Overall Portfolio Performance</Text>
              <Text mt="2">Value: $15,000</Text>
              <Text mt="2">Total Returns: $2,000</Text>
              <Text mt="2">Percentage Change: 15.38%</Text>
              <Text mt="2">Average Return: 2.5% per month</Text>
              <Text mt="2">Highest Value: $1,200</Text>
              <Text mt="2">Lowest Value: $500</Text>
            </Box>
          </>
        )}

        {/* Custom Date Range Modal */}
        <Modal isOpen={showCustomDateRange} onClose={() => setShowCustomDateRange(false)}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Custom Date Range</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Flex direction={{ base: 'column', md: 'row' }} gap="4">
                <Input
                  type="date"
                  name="start"
                  placeholder="Start Date"
                  value={customDateRange[0] ? customDateRange[0].toISOString().split('T')[0] : ''}
                  onChange={handleCustomDateRangeChange}
                />
                <Input
                  type="date"
                  name="end"
                  placeholder="End Date"
                  value={customDateRange[1] ? customDateRange[1].toISOString().split('T')[0] : ''}
                  onChange={handleCustomDateRangeChange}
                />
              </Flex>
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="blue" onClick={handleApplyCustomDateRange}>
                Apply
              </Button>
              <Button variant="ghost" onClick={() => setShowCustomDateRange(false)}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Card>
    </Box>
  );
};

export default PerformanceReport;

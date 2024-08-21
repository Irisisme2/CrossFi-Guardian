import React, { useState } from 'react';
import {
  Box,
  Text,
  Flex,
  VStack,
  HStack,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Divider,
  Icon,
  Button,
  Select,
  Input,
  InputGroup,
  InputLeftElement,
  useDisclosure,
  Image // Import komponentu Image z Chakra UI
} from '@chakra-ui/react';
import { Line, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, Title, Tooltip as ChartTooltip, Legend, ArcElement } from 'chart.js';
import { CalendarIcon } from '@chakra-ui/icons';
import Card from 'components/card/Card';
import btcIcon from 'assets/img/icons/Btc.jpg';   // Zaimportuj ikonki
import ethIcon from 'assets/img/icons/Eth.png';
import linkIcon from 'assets/img/icons/chainlink.png';
import uniIcon from 'assets/img/icons/uniswap.png';
import aaveIcon from 'assets/img/icons/aave.png';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

// Rejestracja komponentów Chart.js
ChartJS.register(LineElement, CategoryScale, LinearScale, Title, ChartTooltip, Legend, ArcElement);

// Funkcja generująca przykładowe dane dla wykresu wyników
const generatePerformanceData = (range) => {
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Returns',
        data: [5, 10, 15, 10, 20, 25, 20, 15, 10, 15, 20, 25].map(v => v + (Math.random() * 10 - 5)), // Dodaj pewną zmienność
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true
      }
    ]
  };
  return data;
};

// Funkcja generująca przykładowe dane dla wydajności aktywów
const generateAssetPerformanceData = () => [
  {
    asset: 'BTC',
    returns: [10, 15, 20, 25, 30, 20, 15, 10],
    volatility: 0.3,
    sharpeRatio: 1.2,
  },
  {
    asset: 'ETH',
    returns: [5, 10, 15, 20, 25, 30, 25, 20],
    volatility: 0.5,
    sharpeRatio: 1.0,
  },
  {
    asset: 'LINK',
    returns: [8, 12, 18, 22, 20, 15, 10, 8],
    volatility: 0.4,
    sharpeRatio: 1.1,
  },
  {
    asset: 'UNI',
    returns: [4, 8, 12, 16, 18, 20, 15, 12],
    volatility: 0.3,
    sharpeRatio: 1.3,
  },
  {
    asset: 'AAVE',
    returns: [6, 10, 14, 18, 22, 24, 20, 18],
    volatility: 0.35,
    sharpeRatio: 1.2,
  }
];

// Funkcja generująca przykładowe dane dla P&L
const generatePAndLData = () => [
  {
    asset: 'BTC',
    realizedGain: 1500,
    unrealizedGain: 1000,
    stakingRewards: 100,
    interestIncome: 50,
    ammFees: 20
  },
  {
    asset: 'ETH',
    realizedGain: 800,
    unrealizedGain: 600,
    stakingRewards: 50,
    interestIncome: 30,
    ammFees: 10
  },
  {
    asset: 'LINK',
    realizedGain: 500,
    unrealizedGain: 400,
    stakingRewards: 20,
    interestIncome: 10,
    ammFees: 5
  },
  {
    asset: 'UNI',
    realizedGain: 300,
    unrealizedGain: 200,
    stakingRewards: 10,
    interestIncome: 5,
    ammFees: 3
  },
  {
    asset: 'AAVE',
    realizedGain: 200,
    unrealizedGain: 100,
    stakingRewards: 5,
    interestIncome: 2,
    ammFees: 2
  }
];

const PerformanceReport = () => {
  const [timeRange, setTimeRange] = useState('1M');
  const [performanceData, setPerformanceData] = useState(generatePerformanceData('1M'));
  const [assetPerformanceData, setAssetPerformanceData] = useState(generateAssetPerformanceData());
  const [pAndLData, setPAndLData] = useState(generatePAndLData());
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleTimeRangeChange = (event) => {
    const newTimeRange = event.target.value;
    setTimeRange(newTimeRange);
    setPerformanceData(generatePerformanceData(newTimeRange));
  };

  const totalPAndL = pAndLData.reduce((acc, curr) => {
    acc.realizedGain += curr.realizedGain;
    acc.unrealizedGain += curr.unrealizedGain;
    acc.stakingRewards += curr.stakingRewards;
    acc.interestIncome += curr.interestIncome;
    acc.ammFees += curr.ammFees;
    return acc;
  }, {
    realizedGain: 0,
    unrealizedGain: 0,
    stakingRewards: 0,
    interestIncome: 0,
    ammFees: 0
  });

  return (
    <Box p={{ base: '4', md: '6', lg: '8' }}>
      <Card p="6" boxShadow="lg" borderRadius="md">
        <Text fontSize="2xl" fontWeight="bold" mb="4">
          Performance Report
        </Text>

        {/* Selector dla przedziału czasowego */}
        <HStack mb="6" spacing="4">
          <Text fontSize="lg">Time Range:</Text>
          <Select value={timeRange} onChange={handleTimeRangeChange} width="200px">
            <option value="1W">1 Week</option>
            <option value="1M">1 Month</option>
            <option value="3M">3 Months</option>
            <option value="1Y">1 Year</option>
            <option value="Custom">Custom</option>
          </Select>
          {timeRange === 'Custom' && (
            <HStack spacing="4">
              <InputGroup>
                <InputLeftElement>
                  <CalendarIcon color="gray.500" />
                </InputLeftElement>
                <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  placeholderText="Start Date"
                />
              </InputGroup>
              <InputGroup>
                <InputLeftElement>
                  <CalendarIcon color="gray.500" />
                </InputLeftElement>
                <DatePicker
                  selected={endDate}
                  onChange={(date) => setEndDate(date)}
                  placeholderText="End Date"
                />
              </InputGroup>
            </HStack>
          )}
        </HStack>

        {/* Wykres wydajności */}
        <Box mb="6">
          <Text fontSize="xl" fontWeight="bold" mb="2">
            Historical Returns
          </Text>
          <Line
            data={performanceData}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  display: true
                },
                tooltip: {
                  callbacks: {
                    label: (tooltipItem) => `Return: ${tooltipItem.formattedValue}%`
                  }
                }
              }
            }}
          />
        </Box>

        <Divider my="6" />

        {/* Wydajność aktywów */}
        <Text fontSize="xl" fontWeight="bold" mb="4">
          Asset-Level Performance
        </Text>
        <Table variant="simple" mb="6">
          <Thead>
            <Tr>
              <Th>Asset</Th>
              <Th>Returns</Th>
              <Th>Volatility</Th>
              <Th>Sharpe Ratio</Th>
            </Tr>
          </Thead>
          <Tbody>
            {assetPerformanceData.map((entry) => (
              <Tr key={entry.asset}>
                <Td>
                  <HStack spacing="3">
                    <Image
                      src={getAssetIcon(entry.asset)}
                      alt={entry.asset}
                      boxSize="6"
                      borderRadius="md"
                    />
                    <Text>{entry.asset}</Text>
                  </HStack>
                </Td>
                <Td>
                  <Box>
                    {entry.returns.map((value, index) => (
                      <Text key={index} fontSize="sm">{value}%</Text>
                    ))}
                  </Box>
                </Td>
                <Td>{entry.volatility.toFixed(2)}</Td>
                <Td>{entry.sharpeRatio.toFixed(2)}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>

        <Divider my="6" />

        {/* Szczegółowe zestawienie P&L */}
        <Text fontSize="xl" fontWeight="bold" mb="4">
          Detailed P&L Statement
        </Text>
        <Table variant="simple" mb="6">
          <Thead>
            <Tr>
              <Th>Asset</Th>
              <Th>Realized Gain</Th>
              <Th>Unrealized Gain</Th>
              <Th>Staking Rewards</Th>
              <Th>Interest Income</Th>
              <Th>AMM Fees</Th>
            </Tr>
          </Thead>
          <Tbody>
            {pAndLData.map((entry) => (
              <Tr key={entry.asset}>
                <Td>
                  <HStack spacing="3">
                    <Image
                      src={getAssetIcon(entry.asset)}
                      alt={entry.asset}
                      boxSize="6"
                      borderRadius="md"
                    />
                    <Text>{entry.asset}</Text>
                  </HStack>
                </Td>
                <Td>${entry.realizedGain.toFixed(2)}</Td>
                <Td>${entry.unrealizedGain.toFixed(2)}</Td>
                <Td>${entry.stakingRewards.toFixed(2)}</Td>
                <Td>${entry.interestIncome.toFixed(2)}</Td>
                <Td>${entry.ammFees.toFixed(2)}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>

        <Divider my="6" />

        {/* Podsumowanie P&L */}
        <VStack spacing="4" align="start">
          <Text fontSize="xl" fontWeight="bold">Total P&L Summary</Text>
          <Box>
            <Text><b>Total Realized Gain:</b> ${totalPAndL.realizedGain.toFixed(2)}</Text>
            <Text><b>Total Unrealized Gain:</b> ${totalPAndL.unrealizedGain.toFixed(2)}</Text>
            <Text><b>Total Staking Rewards:</b> ${totalPAndL.stakingRewards.toFixed(2)}</Text>
            <Text><b>Total Interest Income:</b> ${totalPAndL.interestIncome.toFixed(2)}</Text>
            <Text><b>Total AMM Fees:</b> ${totalPAndL.ammFees.toFixed(2)}</Text>
          </Box>
        </VStack>

        <Divider my="6" />

        {/* Porównanie wydajności protokołów */}
        <Text fontSize="xl" fontWeight="bold" mb="4">
          Protocol Performance Comparison
        </Text>
        <Box mb="6" p="4" width="100%" display="flex" justifyContent="center" alignItems="center">
          <Box width="300px" height="300px">
            <Pie
              data={{
                labels: pAndLData.map(entry => entry.asset),
                datasets: [{
                  data: pAndLData.map(entry => entry.realizedGain + entry.unrealizedGain),
                  backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#FF9F40', '#4BC0C0']
                }]
              }}
              options={{ responsive: true, plugins: { legend: { position: 'bottom' } } }}
            />
          </Box>
        </Box>
      </Card>
    </Box>
  );
};

// Funkcja zwracająca odpowiednią ikonę na podstawie typu aktywa
const getAssetIcon = (asset) => {
  switch (asset) {
    case 'BTC':
      return btcIcon;
    case 'ETH':
      return ethIcon;
    case 'LINK':
      return linkIcon;
    case 'UNI':
      return uniIcon;
    case 'AAVE':
      return aaveIcon;
    default:
      return null;
  }
};

export default PerformanceReport;

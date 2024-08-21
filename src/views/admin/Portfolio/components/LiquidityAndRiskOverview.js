import React, { useState } from 'react';
import {
  Box,
  Text,
  Flex,
  Progress,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  useColorModeValue,
  VStack,
  Divider,
  Tooltip,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  HStack,
  Spacer,
  SlideFade,
  Collapse,
  ButtonGroup, // Import ButtonGroup
} from '@chakra-ui/react';
import { ChevronDownIcon, InfoIcon } from '@chakra-ui/icons';
import Card from 'components/card/Card';
import {
  PieChart as RechartsPieChart,
  Pie as RechartsPie,
  Cell as RechartsCell,
  Tooltip as RechartsTooltip,
  BarChart as RechartsBarChart,
  Bar as RechartsBar,
  CartesianGrid,
  XAxis,
  YAxis,
  Legend,
  LineChart,
  Line,
} from 'recharts';
import { saveAs } from 'file-saver'; // Import file-saver
import jsPDF from 'jspdf'; // Import jsPDF

// Sample data for liquidity and risk
const initialLiquidityData = {
  liquidAssets: 12000,
  lockedAssets: 3000,
  categories: [
    { name: 'Cash', value: 5000 },
    { name: 'Stocks', value: 4000 },
    { name: 'Bonds', value: 3000 },
    { name: 'Real Estate', value: 2000 },
  ],
};

const initialRiskAssessment = {
  riskLevel: 'Medium', // Could be 'Low', 'Medium', 'High'
  riskDetails: [
    { category: 'High Risk', value: 25 },
    { category: 'Medium Risk', value: 50 },
    { category: 'Low Risk', value: 25 },
  ],
  beta: 1.2,
  valueAtRisk: 2000, // Example value
  riskScore: 65, // Example of custom risk score
};

// Function to get color based on risk level
const getRiskColor = (riskLevel) => {
  switch (riskLevel) {
    case 'Low':
      return 'green.400';
    case 'Medium':
      return 'yellow.400';
    case 'High':
      return 'red.400';
    default:
      return 'gray.400';
  }
};

// Function to render customized tooltips for risk chart
const renderRiskTooltip = ({ payload }) => {
  if (payload.length) {
    const { value, name } = payload[0];
    return (
      <Box p="2" bg="white" borderRadius="md" boxShadow="md">
        <Text fontSize="sm" fontWeight="bold">{name}</Text>
        <Text fontSize="sm">Percentage: {value}%</Text>
      </Box>
    );
  }
  return null;
};

const LiquidityAndRiskOverview = () => {
  const cardBg = useColorModeValue('white', 'gray.700');
  const borderColor = useColorModeValue('gray.300', 'gray.600');
  
  const [liquidityData, setLiquidityData] = useState(initialLiquidityData);
  const [riskAssessment, setRiskAssessment] = useState(initialRiskAssessment);
  const [timeframe, setTimeframe] = useState('30 days');
  const [showAdvancedStats, setShowAdvancedStats] = useState(false);

  // Mock function to handle timeframe change
  const handleTimeframeChange = (newTimeframe) => {
    setTimeframe(newTimeframe);
    // In a real scenario, here would be a logic to fetch and update data based on the selected timeframe
  };

  // Function to handle export to PDF
  const handleExportToPDF = () => {
    const doc = new jsPDF();
    doc.text('Liquidity and Risk Overview', 20, 10);
    doc.text(`Risk Level: ${riskAssessment.riskLevel}`, 20, 20);
    doc.text(`Beta: ${riskAssessment.beta}`, 20, 30);
    doc.text(`Value at Risk: $${riskAssessment.valueAtRisk}`, 20, 40);
    doc.text(`Risk Score: ${riskAssessment.riskScore}`, 20, 50);
    doc.save('liquidity_and_risk_overview.pdf');
  };

  // Function to handle export to CSV
  const handleExportToCSV = () => {
    const csvContent = [
      ['Risk Level', 'Beta', 'Value at Risk', 'Risk Score'],
      [
        riskAssessment.riskLevel,
        riskAssessment.beta,
        `$${riskAssessment.valueAtRisk}`,
        riskAssessment.riskScore,
      ],
    ]
      .map((e) => e.join(','))
      .join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, 'liquidity_and_risk_overview.csv');
  };

  return (
    <Card bg={cardBg} p="6" boxShadow="md" borderColor={borderColor}>
      <HStack mb="4">
        <Text fontSize="xl" fontWeight="bold">Liquidity and Risk Overview 💧⚠️</Text>
        <Spacer />
        <Menu>
          <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
            Timeframe: {timeframe}
          </MenuButton>
          <MenuList>
            <MenuItem onClick={() => handleTimeframeChange('7 days')}>7 days</MenuItem>
            <MenuItem onClick={() => handleTimeframeChange('30 days')}>30 days</MenuItem>
            <MenuItem onClick={() => handleTimeframeChange('90 days')}>90 days</MenuItem>
            <MenuItem onClick={() => handleTimeframeChange('1 year')}>1 year</MenuItem>
          </MenuList>
        </Menu>
        <ButtonGroup size="sm" isAttached variant="outline">
          <Button onClick={handleExportToPDF}>Export to PDF</Button>
          <Button onClick={handleExportToCSV}>Export to CSV</Button>
        </ButtonGroup>
      </HStack>

      {/* Liquidity Overview */}
      <VStack align="start" spacing="4" mb="6">
        <Text fontSize="lg" fontWeight="medium">Liquidity Overview</Text>
        <Flex direction="column" width="full">
          <Text fontSize="md">Liquid Assets: ${liquidityData.liquidAssets.toLocaleString()}</Text>
          <Text fontSize="md">Locked Assets: ${liquidityData.lockedAssets.toLocaleString()}</Text>
          <Progress
            value={(liquidityData.liquidAssets / (liquidityData.liquidAssets + liquidityData.lockedAssets)) * 100}
            size="md"
            colorScheme="teal"
            width="full"
            mt="2"
            hasStripe
            isAnimated
          />
          <Text fontSize="sm" color="gray.600" mt="1">
            Percentage of Liquid Assets
          </Text>
        </Flex>

        {/* Liquidity Pie Chart */}
        <Text fontSize="lg" fontWeight="medium" mt="4">Asset Distribution</Text>
        <RechartsPieChart width={300} height={300}>
          <RechartsPie
            data={liquidityData.categories}
            dataKey="value"
            nameKey="name"
            outerRadius={120}
            fill="#8884d8"
            label
            animationBegin={0}
            animationDuration={1500}
          >
            {liquidityData.categories.map((entry, index) => (
              <RechartsCell key={`cell-${index}`} fill={index % 2 === 0 ? "#FF8042" : "#00C49F"} />
            ))}
          </RechartsPie>
          <RechartsTooltip content={renderRiskTooltip} />
        </RechartsPieChart>
      </VStack>

      {/* Risk Assessment */}
      <Divider my="6" />

      <VStack align="start" spacing="4">
        <HStack>
          <Text fontSize="lg" fontWeight="medium">Risk Assessment</Text>
          <Tooltip label="Click to view advanced statistics">
            <IconButton
              size="sm"
              icon={<InfoIcon />}
              variant="ghost"
              onClick={() => setShowAdvancedStats(!showAdvancedStats)}
            />
          </Tooltip>
        </HStack>
        <Stat>
          <StatLabel>Overall Risk Level</StatLabel>
          <StatNumber color={getRiskColor(riskAssessment.riskLevel)}>{riskAssessment.riskLevel}</StatNumber>
          <StatHelpText>Based on asset volatility and beta</StatHelpText>
        </Stat>

        {/* Risk Level Chart */}
        <RechartsBarChart width={500} height={300} data={riskAssessment.riskDetails}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="category" />
          <YAxis />
          <RechartsTooltip />
          <Legend />
          <RechartsBar dataKey="value" fill={getRiskColor(riskAssessment.riskLevel)} />
        </RechartsBarChart>

        {/* Advanced Statistics */}
        <Collapse in={showAdvancedStats} animateOpacity>
          <Box
            p="4"
            mt="4"
            border="1px"
            borderColor={borderColor}
            borderRadius="md"
            bg={useColorModeValue('gray.50', 'gray.800')}
          >
            <Text fontSize="md" fontWeight="medium">Advanced Statistics</Text>
            <Text fontSize="sm">Beta: {riskAssessment.beta}</Text>
            <Text fontSize="sm">Value at Risk (VaR): ${riskAssessment.valueAtRisk.toLocaleString()}</Text>
            <Text fontSize="sm">Risk Score: {riskAssessment.riskScore}</Text>
          </Box>
        </Collapse>
      </VStack>
    </Card>
  );
};

export default LiquidityAndRiskOverview;


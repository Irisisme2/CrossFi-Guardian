import React from "react";
import {
  Box,
  SimpleGrid,
  Text,
  VStack,
  HStack,
  Button,
  List,
  ListItem,
  ListIcon,
  useColorModeValue,
  Divider,
  Badge,
  Tag,
  Tooltip,
  Icon,
  Collapse,
  useDisclosure,
  Fade,
  ScaleFade,
  Slide,
  SlideFade,
  Progress,
  Avatar,
  AvatarGroup,
} from "@chakra-ui/react";
import { CheckCircleIcon, InfoIcon, ExternalLinkIcon, RepeatIcon, ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import Card from "components/card/Card"; // Adjust the import path as needed

// Przykładowe dane dla strategii inwestycyjnych
const suggestedStrategiesData = [
  {
    strategy: "Stake more ETH in Aave",
    details: "Current interest rate on ETH staking is 4.5%. Consider increasing your ETH stake to maximize returns.",
    risk: "Medium",
    expectedReturn: "4.5% APY",
    actionLink: "#",
    timeHorizon: "6 months",
    fees: "0.3%",
  },
  {
    strategy: "Rebalance BTC allocation",
    details: "Your BTC allocation is higher than recommended. Consider rebalancing to diversify risk.",
    risk: "Low",
    expectedReturn: "2% - 3% APY",
    actionLink: "#",
    timeHorizon: "12 months",
    fees: "0.1%",
  },
  {
    strategy: "Explore Compound's new lending protocol",
    details: "Compound has introduced a new lending protocol with attractive interest rates. It's worth exploring.",
    risk: "High",
    expectedReturn: "6% - 8% APY",
    actionLink: "#",
    timeHorizon: "3 months",
    fees: "0.5%",
  },
];

// Przykładowe dane dla nowych protokołów
const newProtocolsData = [
  {
    name: "CrossFi Yield",
    description: "A new DeFi protocol focused on cross-chain yield farming. Offers higher yields on stablecoins.",
    network: "Ethereum",
    launchDate: "Q3 2024",
    interestRate: "7.2% APY",
    actionLink: "#",
    socialProof: ["btc.jpg", "eth.jpg", "ada.jpg"],
  },
  {
    name: "PolyStake",
    description: "A staking platform on Polygon network with competitive staking rewards and low fees.",
    network: "Polygon",
    launchDate: "Q2 2024",
    interestRate: "5.8% APY",
    actionLink: "#",
    socialProof: ["sol.jpg", "dot.jpg"],
  },
  {
    name: "MetaSwap",
    description: "A decentralized exchange aggregator that optimizes trade execution across multiple chains.",
    network: "Multi-chain",
    launchDate: "Q4 2024",
    interestRate: "Variable",
    actionLink: "#",
    socialProof: ["link.jpg", "uni.jpg", "bnb.jpg"],
  },
];

const InvestmentOpportunities = () => {
  const cardBg = useColorModeValue("white", "gray.700");
  const borderColor = useColorModeValue("gray.300", "gray.600");
  const badgeColorScheme = useColorModeValue("purple", "orange");
  const { isOpen: isStrategiesOpen, onToggle: onStrategiesToggle } = useDisclosure();
  const { isOpen: isProtocolsOpen, onToggle: onProtocolsToggle } = useDisclosure();

  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }} px={{ base: "4", md: "6", lg: "8" }}>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing="6">
        
        {/* Suggested Strategies Card */}
        <Card bg={cardBg} p="6" boxShadow="md" borderColor={borderColor} w="full">
          <HStack justify="space-between">
            <Text fontSize="xl" fontWeight="bold" mb="4">
              Suggested Strategies 📈
            </Text>
            <Button onClick={onStrategiesToggle} size="sm" colorScheme="teal" rightIcon={isStrategiesOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}>
              {isStrategiesOpen ? "Hide Details" : "Show Details"}
            </Button>
          </HStack>
          <Collapse in={isStrategiesOpen} animateOpacity>
            <VStack align="start" spacing="6">
              <List spacing={6} width="full">
                {suggestedStrategiesData.map((strategy, index) => (
                  <ListItem key={index}>
                    <HStack justify="space-between" align="flex-start">
                      <Box>
                        <HStack>
                          <ListIcon as={CheckCircleIcon} color="green.500" />
                          <Text fontWeight="bold" fontSize="lg">
                            {strategy.strategy}
                          </Text>
                        </HStack>
                        <Text>{strategy.details}</Text>
                        <HStack mt="2">
                          <Tag colorScheme={badgeColorScheme} variant="solid">
                            Risk: {strategy.risk}
                          </Tag>
                          <Tag colorScheme="teal" variant="solid">
                            Expected Return: {strategy.expectedReturn}
                          </Tag>
                          <Tag colorScheme="red" variant="solid">
                            Time Horizon: {strategy.timeHorizon}
                          </Tag>
                          <Tag colorScheme="yellow" variant="solid">
                            Fees: {strategy.fees}
                          </Tag>
                        </HStack>
                      </Box>
                      <Tooltip label="Take action" aria-label="Take action tooltip">
                        <Icon as={ExternalLinkIcon} w={6} h={6} color="blue.500" cursor="pointer" onClick={() => window.open(strategy.actionLink)} />
                      </Tooltip>
                    </HStack>
                    <Progress colorScheme="green" size="sm" value={(index + 1) * 30} mt="4" />
                    <Divider mt="4" />
                  </ListItem>
                ))}
              </List>
            </VStack>
          </Collapse>
        </Card>

        {/* New Protocols Card */}
        <Card bg={cardBg} p="6" boxShadow="md" borderColor={borderColor} w="full">
          <HStack justify="space-between">
            <Text fontSize="xl" fontWeight="bold" mb="4">
              New Protocols 🌟
            </Text>
            <Button onClick={onProtocolsToggle} size="sm" colorScheme="purple" rightIcon={isProtocolsOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}>
              {isProtocolsOpen ? "Hide Details" : "Show Details"}
            </Button>
          </HStack>
          <Collapse in={isProtocolsOpen} animateOpacity>
            <VStack align="start" spacing="6">
              <List spacing={6} width="full">
                {newProtocolsData.map((protocol, index) => (
                  <ListItem key={index}>
                    <HStack justify="space-between" align="flex-start">
                      <Box>
                        <HStack>
                          <ListIcon as={InfoIcon} color="blue.500" />
                          <Text fontWeight="bold" fontSize="lg">
                            {protocol.name}
                          </Text>
                        </HStack>
                        <Text>{protocol.description}</Text>
                        <HStack mt="2">
                          <Tag colorScheme="cyan" variant="solid">
                            Network: {protocol.network}
                          </Tag>
                          <Tag colorScheme="purple" variant="solid">
                            Launch Date: {protocol.launchDate}
                          </Tag>
                          <Tag colorScheme="green" variant="solid">
                            Interest Rate: {protocol.interestRate}
                          </Tag>
                        </HStack>
                        <AvatarGroup size="sm" max={3} mt="4">
                          {protocol.socialProof.map((icon, idx) => (
                            <Avatar key={idx} src={`/assets/icons/${icon}`} name={icon.split('.')[0]} />
                          ))}
                        </AvatarGroup>
                      </Box>
                      <Tooltip label="Explore protocol" aria-label="Explore protocol tooltip">
                        <Icon as={ExternalLinkIcon} w={6} h={6} color="blue.500" cursor="pointer" onClick={() => window.open(protocol.actionLink)} />
                      </Tooltip>
                    </HStack>
                    <ScaleFade in={true} initialScale={0.9}>
                      <Progress colorScheme="purple" size="sm" value={(index + 1) * 20} mt="4" />
                    </ScaleFade>
                    <Divider mt="4" />
                  </ListItem>
                ))}
              </List>
            </VStack>
          </Collapse>
        </Card>
      </SimpleGrid>
    </Box>
  );
};

export default InvestmentOpportunities;

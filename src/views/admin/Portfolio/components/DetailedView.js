import React, { useState } from 'react';
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
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Checkbox,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  SliderMark,
  Tabs,
  TabList,
  Tab,
  TabPanel,
  TabPanels,
} from '@chakra-ui/react';
import { ArrowUpIcon, ArrowDownIcon, SearchIcon } from '@chakra-ui/icons';
import Card from 'components/card/Card';

// Importowanie ikon
import lendingIcon from 'assets/img/icons/lending.png';
import stakingIcon from 'assets/img/icons/staking.png';
import ammIcon from 'assets/img/icons/amm.png';
import otherAssetsIcon from 'assets/img/icons/other-assets.png';
import btcIcon from 'assets/img/icons/Btc.jpg';
import ethIcon from 'assets/img/icons/Eth.png';
import daiIcon from 'assets/img/icons/Dai.png';
import dotIcon from 'assets/img/icons/Dot.png';
import usdcIcon from 'assets/img/icons/Usdc.png';
import uniswapIcon from 'assets/img/icons/uniswap.png';

// Sample data for Lending
const lendingAssets = [
    {
      asset: 'Bitcoin',
      protocol: 'Aave',
      amountLent: 1.5,
      interestRate: 3.5,
      duration: '30 days',
      expectedReturn: 0.0005,
      icon: btcIcon
    },
    {
      asset: 'Ethereum',
      protocol: 'Compound',
      amountLent: 5.0,
      interestRate: 2.8,
      duration: '60 days',
      expectedReturn: 0.0012,
      icon: ethIcon
    },
    {
      asset: 'Dai',
      protocol: 'Aave',
      amountLent: 1000,
      interestRate: 4.2,
      duration: '90 days',
      expectedReturn: 42.00,
      icon: daiIcon
    }
  ];
  
  // Sample data for Staking
  const stakingAssets = [
    {
      asset: 'Polkadot',
      protocol: 'Polkadot Network',
      stakingPeriod: '90 days',
      currentRewards: 15.5,
      APY: 10.0,
      icon: dotIcon
    },
    {
      asset: 'Uniswap',
      protocol: 'Uniswap V3',
      stakingPeriod: '60 days',
      currentRewards: 3.2,
      APY: 8.0,
      icon: uniswapIcon
    },
    {
      asset: 'USD Coin',
      protocol: 'Curve Finance',
      stakingPeriod: '30 days',
      currentRewards: 10.1,
      APY: 7.5,
      icon: usdcIcon
    }
  ];
  
  // Sample data for AMM Pools
  const ammPools = [
    {
      poolName: 'ETH/USDT',
      protocol: 'Uniswap V3',
      tvl: 5000000,
      userShare: 0.02,
      earnedFees: 3000,
      icon: uniswapIcon
    },
    {
      poolName: 'DAI/USDC',
      protocol: 'Curve Finance',
      tvl: 10000000,
      userShare: 0.01,
      earnedFees: 2500,
      icon: daiIcon
    },
    {
      poolName: 'BTC/ETH',
      protocol: 'Balancer',
      tvl: 2000000,
      userShare: 0.03,
      earnedFees: 1500,
      icon: btcIcon
    }
  ];
  
  // Sample data for Other Assets
  const otherAssets = [
    {
      assetType: 'NFT',
      name: 'CryptoPunk #1234',
      estimatedValue: 100000,
      description: 'Rare CryptoPunk NFT with unique traits.',
      icon: 'https://example.com/crypto-punk-icon.png'
    },
    {
      assetType: 'Yield Farming',
      name: 'SushiSwap LP Tokens',
      estimatedValue: 5000,
      description: 'LP tokens from providing liquidity on SushiSwap.',
      apy: 12.0,
      icon: 'https://example.com/sushi-farm-icon.png'
    },
    {
      assetType: 'Stablecoin',
      name: 'Tether (USDT)',
      estimatedValue: 20000,
      description: 'Stablecoin pegged to the USD.',
      icon: 'https://example.com/tether-icon.png'
    }
  ];
  

  const DetailedView = () => {
    const [filterProtocol, setFilterProtocol] = useState('');
    const [filterAsset, setFilterAsset] = useState('');
    const [sortOrder, setSortOrder] = useState('asc');
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedLendingAsset, setSelectedLendingAsset] = useState(null);
    const [selectedStakingAsset, setSelectedStakingAsset] = useState(null);
    const [selectedPool, setSelectedPool] = useState(null);
    const [sliderValue, setSliderValue] = useState(0);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { isOpen: isLendingDetailsOpen, onOpen: onLendingDetailsOpen, onClose: onLendingDetailsClose } = useDisclosure();
    const { isOpen: isStakingDetailsOpen, onOpen: onStakingDetailsOpen, onClose: onStakingDetailsClose } = useDisclosure();
    const { isOpen: isPoolDetailsOpen, onOpen: onPoolDetailsOpen, onClose: onPoolDetailsClose } = useDisclosure();
  
    const filteredLendingAssets = lendingAssets.filter((asset) => 
      (!filterProtocol || asset.protocol === filterProtocol) &&
      (!filterAsset || asset.asset === filterAsset) &&
      (searchTerm ? asset.asset.toLowerCase().includes(searchTerm.toLowerCase()) : true)
    ).sort((a, b) => (sortOrder === 'desc' ? b.expectedReturn - a.expectedReturn : a.expectedReturn - b.expectedReturn));
  
    const filteredStakingAssets = stakingAssets.filter((asset) =>
      (!filterProtocol || asset.protocol === filterProtocol) &&
      (searchTerm ? asset.asset.toLowerCase().includes(searchTerm.toLowerCase()) : true)
    ).sort((a, b) => (sortOrder === 'desc' ? b.currentRewards - a.currentRewards : a.currentRewards - b.currentRewards));
  
    const filteredAmmPools = ammPools.filter((pool) =>
      (searchTerm ? pool.poolName.toLowerCase().includes(searchTerm.toLowerCase()) : true)
    ).sort((a, b) => (sortOrder === 'desc' ? b.earnedFees - a.earnedFees : a.earnedFees - b.earnedFees));
  
    const handleAddLiquidity = (pool) => {
      // Placeholder for actual add liquidity functionality
      console.log('Add liquidity to:', pool.poolName);
      setSelectedPool(pool);
      onPoolDetailsOpen();
    };
  
    const handleRemoveLiquidity = (pool) => {
      // Placeholder for actual remove liquidity functionality
      console.log('Remove liquidity from:', pool.poolName);
      setSelectedPool(pool);
      onPoolDetailsOpen();
    };
  
    const handleWithdraw = (asset) => {
      // Placeholder for actual withdraw functionality
      console.log('Withdraw from:', asset.asset);
    };
  
    const handleClaimRewards = (asset) => {
      // Placeholder for actual claim rewards functionality
      console.log('Claim rewards for:', asset.asset);
    };
  
    return (
      <Box pt={{ base: '130px', md: '80px', xl: '80px' }} px={{ base: '4', md: '6', lg: '8' }}>
        <Tabs variant="enclosed" mb="6">
          <TabList>
            <Tab>Lending</Tab>
            <Tab>Staking</Tab>
            <Tab>AMM Pools</Tab>
            <Tab>Other Assets</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Card p="6">
                <Flex align="center" mb="4">
                  <Image boxSize="50px" src={lendingIcon} alt="Lending Icon" mr="4" />
                  <Text fontSize="2xl" fontWeight="bold">
                    Lending
                  </Text>
                </Flex>
                <InputGroup mb="4" width="full" maxW="400px">
                  <InputLeftElement>
                    <SearchIcon color="gray.500" />
                  </InputLeftElement>
                  <Input
                    type="text"
                    placeholder="Search by asset..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </InputGroup>
                <Select
                  placeholder="Filter by protocol"
                  onChange={(e) => setFilterProtocol(e.target.value)}
                  mb="4"
                >
                  <option value="Aave">Aave</option>
                  <option value="Compound">Compound</option>
                </Select>
                <Select
                  placeholder="Sort by return"
                  onChange={(e) => setSortOrder(e.target.value)}
                  mb="4"
                >
                  <option value="desc">Highest Return First</option>
                  <option value="asc">Lowest Return First</option>
                </Select>
                <Table variant="simple">
                  <Thead>
                    <Tr>
                      <Th>Asset</Th>
                      <Th>Protocol</Th>
                      <Th>Amount Lent</Th>
                      <Th>Interest Rate</Th>
                      <Th>Duration</Th>
                      <Th>Expected Return</Th>
                      <Th>Actions</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {filteredLendingAssets.map((asset, index) => (
                      <Tr key={index}>
                        <Td>
                          <HStack spacing="3">
                            <Image boxSize="30px" src={asset.icon} alt={`${asset.asset} Icon`} />
                            {asset.asset}
                          </HStack>
                        </Td>
                        <Td>{asset.protocol}</Td>
                        <Td>${asset.amountLent.toLocaleString()}</Td>
                        <Td>{asset.interestRate}%</Td>
                        <Td>{asset.duration}</Td>
                        <Td>${asset.expectedReturn.toLocaleString()}</Td>
                        <Td>
                          <Button colorScheme="blue" size="sm" mr="2" onClick={() => {
                            setSelectedLendingAsset(asset);
                            onLendingDetailsOpen();
                          }}>
                            Details
                          </Button>
                          <Button colorScheme="green" size="sm" onClick={() => handleWithdraw(asset)}>
                            Withdraw
                          </Button>
                        </Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </Card>
            </TabPanel>
  
            <TabPanel>
              <Card p="6">
                <Flex align="center" mb="4">
                  <Image boxSize="50px" src={stakingIcon} alt="Staking Icon" mr="4" />
                  <Text fontSize="2xl" fontWeight="bold">
                    Staking
                  </Text>
                </Flex>
                <InputGroup mb="4" width="full" maxW="400px">
                  <InputLeftElement>
                    <SearchIcon color="gray.500" />
                  </InputLeftElement>
                  <Input
                    type="text"
                    placeholder="Search by asset..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </InputGroup>
                <Select
                  placeholder="Sort by rewards"
                  onChange={(e) => setSortOrder(e.target.value)}
                  mb="4"
                >
                  <option value="desc">Highest Rewards First</option>
                  <option value="asc">Lowest Rewards First</option>
                </Select>
                <Table variant="simple">
                  <Thead>
                    <Tr>
                      <Th>Asset</Th>
                      <Th>Protocol</Th>
                      <Th>Staking Period</Th>
                      <Th>Current Rewards</Th>
                      <Th>APY</Th>
                      <Th>Actions</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {filteredStakingAssets.map((asset, index) => (
                      <Tr key={index}>
                        <Td>
                          <HStack spacing="3">
                            <Image boxSize="30px" src={asset.icon} alt={`${asset.asset} Icon`} />
                            {asset.asset}
                          </HStack>
                        </Td>
                        <Td>{asset.protocol}</Td>
                        <Td>{asset.stakingPeriod}</Td>
                        <Td>{asset.currentRewards} ETH</Td>
                        <Td>{asset.APY}%</Td>
                        <Td>
                          <Button colorScheme="teal" size="sm" mr="2" onClick={() => {
                            setSelectedStakingAsset(asset);
                            onStakingDetailsOpen();
                          }}>
                            Claim Rewards
                          </Button>
                          <Button colorScheme="red" size="sm" onClick={() => handleWithdraw(asset)}>
                            Withdraw
                          </Button>
                        </Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </Card>
            </TabPanel>
  
            <TabPanel>
              <Card p="6">
                <Flex align="center" mb="4">
                  <Image boxSize="50px" src={ammIcon} alt="AMM Icon" mr="4" />
                  <Text fontSize="2xl" fontWeight="bold">
                    AMM (Automated Market Makers)
                  </Text>
                </Flex>
                <InputGroup mb="4" width="full" maxW="400px">
                  <InputLeftElement>
                    <SearchIcon color="gray.500" />
                  </InputLeftElement>
                  <Input
                    type="text"
                    placeholder="Search by pool name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </InputGroup>
                <Select
                  placeholder="Sort by fees"
                  onChange={(e) => setSortOrder(e.target.value)}
                  mb="4"
                >
                  <option value="desc">Highest Fees First</option>
                  <option value="asc">Lowest Fees First</option>
                </Select>
                <Table variant="simple">
                  <Thead>
                    <Tr>
                      <Th>Pool Name</Th>
                      <Th>Protocol</Th>
                      <Th>TVL</Th>
                      <Th>User Share</Th>
                      <Th>Earned Fees</Th>
                      <Th>Actions</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {filteredAmmPools.map((pool, index) => (
                      <Tr key={index}>
                        <Td>
                          <HStack spacing="3">
                            <Image boxSize="30px" src={pool.icon} alt={`${pool.poolName} Icon`} />
                            {pool.poolName}
                          </HStack>
                        </Td>
                        <Td>{pool.protocol}</Td>
                        <Td>${pool.tvl.toLocaleString()}</Td>
                        <Td>{(pool.userShare * 100).toFixed(2)}%</Td>
                        <Td>${pool.earnedFees.toLocaleString()}</Td>
                        <Td>
                          <Button colorScheme="green" size="sm" mr="2" onClick={() => handleAddLiquidity(pool)}>
                            Add Liquidity
                          </Button>
                          <Button colorScheme="orange" size="sm" onClick={() => handleRemoveLiquidity(pool)}>
                            Remove Liquidity
                          </Button>
                        </Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </Card>
            </TabPanel>
  
            <TabPanel>
              <Card p="6">
                <Flex align="center" mb="4">
                  <Image boxSize="50px" src={otherAssetsIcon} alt="Other Assets Icon" mr="4" />
                  <Text fontSize="2xl" fontWeight="bold">
                    Other Assets
                  </Text>
                </Flex>
                <SimpleGrid columns={{ base: 1, md: 2, lg: 2 }} spacing="6">
                  {otherAssets.map((asset, index) => (
                    <Box key={index} p="4" borderWidth="1px" borderRadius="md" borderColor="gray.300" bg="gray.50">
                      <Flex align="center" mb="2">
                        <Image boxSize="30px" src={asset.icon} alt={`${asset.assetType} Icon`} mr="4" />
                        <Text fontSize="lg" fontWeight="bold">
                          {asset.assetType}
                        </Text>
                      </Flex>
                      <Text fontSize="lg" mb="2">
                        {asset.name}
                      </Text>
                      <Text>
                        Estimated Value: ${asset.estimatedValue?.toLocaleString() || 'N/A'}
                      </Text>
                      <Text>Description: {asset.description || 'N/A'}</Text>
                      {asset.apy && <Text>APY: {asset.apy}%</Text>}
                      {asset.amount && (
                        <Text>Amount: ${asset.amount.toLocaleString()}</Text>
                      )}
                    </Box>
                  ))}
                </SimpleGrid>
              </Card>
            </TabPanel>
          </TabPanels>
        </Tabs>
  
        {/* Modal for Lending Details */}
        <Modal isOpen={isLendingDetailsOpen} onClose={onLendingDetailsClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Lending Details</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              {selectedLendingAsset && (
                <>
                  <Text><strong>Asset:</strong> {selectedLendingAsset.asset}</Text>
                  <Text><strong>Protocol:</strong> {selectedLendingAsset.protocol}</Text>
                  <Text><strong>Amount Lent:</strong> ${selectedLendingAsset.amountLent.toLocaleString()}</Text>
                  <Text><strong>Interest Rate:</strong> {selectedLendingAsset.interestRate}%</Text>
                  <Text><strong>Duration:</strong> {selectedLendingAsset.duration}</Text>
                  <Text><strong>Expected Return:</strong> ${selectedLendingAsset.expectedReturn.toLocaleString()}</Text>
                </>
              )}
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={onLendingDetailsClose}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
  
        {/* Modal for Staking Details */}
        <Modal isOpen={isStakingDetailsOpen} onClose={onStakingDetailsClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Staking Details</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              {selectedStakingAsset && (
                <>
                  <Text><strong>Asset:</strong> {selectedStakingAsset.asset}</Text>
                  <Text><strong>Protocol:</strong> {selectedStakingAsset.protocol}</Text>
                  <Text><strong>Staking Period:</strong> {selectedStakingAsset.stakingPeriod}</Text>
                  <Text><strong>Current Rewards:</strong> {selectedStakingAsset.currentRewards} ETH</Text>
                  <Text><strong>APY:</strong> {selectedStakingAsset.APY}%</Text>
                </>
              )}
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={onStakingDetailsClose}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
  
        {/* Modal for AMM Pool Details */}
        <Modal isOpen={isPoolDetailsOpen} onClose={onPoolDetailsClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>AMM Pool Details</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              {selectedPool && (
                <>
                  <Text><strong>Pool Name:</strong> {selectedPool.poolName}</Text>
                  <Text><strong>Protocol:</strong> {selectedPool.protocol}</Text>
                  <Text><strong>TVL:</strong> ${selectedPool.tvl.toLocaleString()}</Text>
                  <Text><strong>User Share:</strong> {(selectedPool.userShare * 100).toFixed(2)}%</Text>
                  <Text><strong>Earned Fees:</strong> ${selectedPool.earnedFees.toLocaleString()}</Text>
                </>
              )}
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={onPoolDetailsClose}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
    );
  };
  
  export default DetailedView;
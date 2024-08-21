import React, { useState, useEffect } from 'react';
import {
  Box,
  Text,
  VStack,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Badge,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  IconButton,
  HStack,
  Divider,
  useToast,
  Spinner,
  useBreakpointValue,
  Image,
} from '@chakra-ui/react';
import { SearchIcon, ChevronDownIcon, ChevronUpIcon, DownloadIcon } from '@chakra-ui/icons';
import Card from 'components/card/Card';
import { format, parseISO } from 'date-fns';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

// Sample images
import coinbase from 'assets/img/icons/coinbase.png';
import binance from 'assets/img/icons/binance.jpg';
import kraken from 'assets/img/icons/kraken.png'; // Add more icons as needed

// Simulate an async data fetching function
const fetchTransactions = async () => {
  // Replace with actual API call
  return new Promise((resolve) =>
    setTimeout(() => resolve([
      {
        id: 'txn001',
        date: '2024-08-20',
        type: 'Deposit',
        asset: 'Bitcoin',
        protocol: 'Binance',
        amount: 1.0,
        status: 'Completed',
        transactionHash: '0x1234567890abcdef',
        blockNumber: 12345678,
        fees: 0.0001,
        notes: 'Initial deposit',
      },
      {
        id: 'txn002',
        date: '2024-08-21',
        type: 'Withdrawal',
        asset: 'Ethereum',
        protocol: 'Coinbase',
        amount: 0.5,
        status: 'Pending',
        transactionHash: '0xabcdef1234567890',
        blockNumber: 12345679,
        fees: 0.001,
        notes: 'Withdraw to wallet',
      },
      {
        id: 'txn003',
        date: '2024-08-22',
        type: 'Staking',
        asset: 'Polkadot',
        protocol: 'Kraken',
        amount: 50.0,
        status: 'Completed',
        transactionHash: '0x7890abcdef123456',
        blockNumber: 12345680,
        fees: 0.01,
        notes: 'Staked DOT tokens',
      },
      {
        id: 'txn004',
        date: '2024-08-23',
        type: 'Swap',
        asset: 'Litecoin',
        protocol: 'Binance',
        amount: 5.0,
        status: 'Failed',
        transactionHash: '0xabcdef1234567890',
        blockNumber: 12345681,
        fees: 0.005,
        notes: 'Swap LTC for BTC',
      },
      {
        id: 'txn005',
        date: '2024-08-24',
        type: 'Deposit',
        asset: 'Cardano',
        protocol: 'Coinbase',
        amount: 100.0,
        status: 'Completed',
        transactionHash: '0x1234567890abcdef',
        blockNumber: 12345682,
        fees: 0.002,
        notes: 'ADA deposit',
      },
      // Add more sample transactions as needed
    ]), 1000)
  );
};

const getProtocolIcon = (protocol) => {
  switch (protocol) {
    case 'Coinbase':
      return coinbase;
    case 'Binance':
      return binance;
    case 'Kraken':
      return kraken;
    default:
      return null;
  }
};

const TransactionHistory = () => {
  const [transactions, setTransactions] = useState([]);
  const [filterDateRange, setFilterDateRange] = useState([null, null]);
  const [filterType, setFilterType] = useState([]);
  const [filterProtocol, setFilterProtocol] = useState([]);
  const [filterStatus, setFilterStatus] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: 'date', direction: 'descending' });
  const [currentPage, setCurrentPage] = useState(1);
  const [transactionsPerPage] = useState(10);
  const [loading, setLoading] = useState(true);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  // Fetch transactions on component mount
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await fetchTransactions();
        setTransactions(data);
      } catch (error) {
        toast({
          title: 'Error fetching transactions.',
          description: 'There was an error fetching the transaction data.',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [toast]);

  const handleSort = (key) => {
    setSortConfig((prevSortConfig) => ({
      key,
      direction: prevSortConfig.key === key ? (prevSortConfig.direction === 'ascending' ? 'descending' : 'ascending') : 'ascending',
    }));
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const filteredTransactions = transactions
    .filter((txn) => {
      const date = parseISO(txn.date);
      return (
        (!filterDateRange[0] || date >= filterDateRange[0]) &&
        (!filterDateRange[1] || date <= filterDateRange[1]) &&
        (filterType.length === 0 || filterType.includes(txn.type)) &&
        (filterProtocol.length === 0 || filterProtocol.includes(txn.protocol)) &&
        (filterStatus.length === 0 || filterStatus.includes(txn.status)) &&
        (searchTerm ? txn.id.toLowerCase().includes(searchTerm.toLowerCase()) : true)
      );
    })
    .sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'ascending' ? -1 : 1;
      if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'ascending' ? 1 : -1;
      return 0;
    });

  const paginatedTransactions = filteredTransactions.slice(
    (currentPage - 1) * transactionsPerPage,
    currentPage * transactionsPerPage
  );

  const handleViewDetails = (transaction) => {
    setSelectedTransaction(transaction);
    onOpen();
  };

  const handleFilterClear = () => {
    setFilterDateRange([null, null]);
    setFilterType([]);
    setFilterProtocol([]);
    setFilterStatus([]);
    setSearchTerm('');
  };

  const handleExport = () => {
    // Convert transactions to CSV format
    const csvContent = [
      ['ID', 'Date', 'Type', 'Asset', 'Protocol', 'Amount', 'Status', 'Transaction Hash', 'Block Number', 'Fees Paid', 'Notes'],
      ...filteredTransactions.map(txn => [
        txn.id,
        txn.date,
        txn.type,
        txn.asset,
        txn.protocol,
        txn.amount,
        txn.status,
        txn.transactionHash,
        txn.blockNumber,
        txn.fees,
        txn.notes,
      ]),
    ]
      .map(e => e.join(','))
      .join('\n');

    // Create a Blob and trigger download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'transactions.csv';
    link.click();
  };

  return (
    <Box pt={{ base: '130px', md: '80px', xl: '20px' }} px={{ base: '4', md: '6', lg: '8' }}>
      <Card p="6">
        <Text fontSize="2xl" fontWeight="bold" mb="4">
          All Transactions
        </Text>

        {loading ? (
          <Flex justify="center" align="center" height="200px">
            <Spinner size="xl" />
          </Flex>
        ) : (
          <>
            <Flex direction={{ base: 'column', md: 'row' }} mb="6" gap="4">
              <InputGroup width={{ base: 'full', md: '250px' }}>
                <InputLeftElement>
                  <SearchIcon color="gray.500" />
                </InputLeftElement>
                <Input
                  type="text"
                  placeholder="Search by ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </InputGroup>


              <Select
                placeholder="Filter by type"
                value={filterType}
                onChange={(e) => setFilterType(Array.from(e.target.selectedOptions, option => option.value))}
                multiple
                width={{ base: 'full', md: '250px' }}
              >
                <option value="Deposit">Deposit</option>
                <option value="Withdrawal">Withdrawal</option>
                <option value="Staking">Staking</option>
                <option value="Swap">Swap</option>
                {/* Add more types */}
              </Select>

              <Select
                placeholder="Filter by protocol"
                value={filterProtocol}
                onChange={(e) => setFilterProtocol(Array.from(e.target.selectedOptions, option => option.value))}
                multiple
                width={{ base: 'full', md: '250px' }}
              >
                <option value="Binance">Binance</option>
                <option value="Coinbase">Coinbase</option>
                <option value="Kraken">Kraken</option>
                {/* Add more protocols */}
              </Select>

              <Select
                placeholder="Filter by status"
                value={filterStatus}
                onChange={(e) => setFilterStatus(Array.from(e.target.selectedOptions, option => option.value))}
                multiple
                width={{ base: 'full', md: '250px' }}
              >
                <option value="Completed">Completed</option>
                <option value="Pending">Pending</option>
                <option value="Failed">Failed</option>
                {/* Add more statuses */}
              </Select>

              <Button colorScheme="blue" onClick={handleFilterClear}>
                Clear Filters
              </Button>

              <Button leftIcon={<DownloadIcon />} colorScheme="green" onClick={handleExport}>
                Export CSV
              </Button>
            </Flex>

            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>
                    ID
                    <IconButton
                      aria-label="Sort"
                      icon={sortConfig.key === 'id' && sortConfig.direction === 'ascending' ? <ChevronUpIcon /> : <ChevronDownIcon />}
                      onClick={() => handleSort('id')}
                    />
                  </Th>
                  <Th>
                    Date
                    <IconButton
                      aria-label="Sort"
                      icon={sortConfig.key === 'date' && sortConfig.direction === 'ascending' ? <ChevronUpIcon /> : <ChevronDownIcon />}
                      onClick={() => handleSort('date')}
                    />
                  </Th>
                  <Th>
                    Type
                    <IconButton
                      aria-label="Sort"
                      icon={sortConfig.key === 'type' && sortConfig.direction === 'ascending' ? <ChevronUpIcon /> : <ChevronDownIcon />}
                      onClick={() => handleSort('type')}
                    />
                  </Th>
                  <Th>
                    Asset
                    <IconButton
                      aria-label="Sort"
                      icon={sortConfig.key === 'asset' && sortConfig.direction === 'ascending' ? <ChevronUpIcon /> : <ChevronDownIcon />}
                      onClick={() => handleSort('asset')}
                    />
                  </Th>
                  <Th>
                    Protocol
                    <IconButton
                      aria-label="Sort"
                      icon={sortConfig.key === 'protocol' && sortConfig.direction === 'ascending' ? <ChevronUpIcon /> : <ChevronDownIcon />}
                      onClick={() => handleSort('protocol')}
                    />
                  </Th>
                  <Th>
                    Amount
                    <IconButton
                      aria-label="Sort"
                      icon={sortConfig.key === 'amount' && sortConfig.direction === 'ascending' ? <ChevronUpIcon /> : <ChevronDownIcon />}
                      onClick={() => handleSort('amount')}
                    />
                  </Th>
                  <Th>
                    Status
                    <IconButton
                      aria-label="Sort"
                      icon={sortConfig.key === 'status' && sortConfig.direction === 'ascending' ? <ChevronUpIcon /> : <ChevronDownIcon />}
                      onClick={() => handleSort('status')}
                    />
                  </Th>
                  <Th>Actions</Th>
                </Tr>
              </Thead>
              <Tbody>
                {paginatedTransactions.length > 0 ? (
                  paginatedTransactions.map((txn) => (
                    <Tr key={txn.id}>
                      <Td>{txn.id}</Td>
                      <Td>{format(parseISO(txn.date), 'MM/dd/yyyy')}</Td>
                      <Td>{txn.type}</Td>
                      <Td>{txn.asset}</Td>
                      <Td>
                        <Flex align="center">
                          <Image src={getProtocolIcon(txn.protocol)} alt={txn.protocol} boxSize="24px" mr="2" />
                          {txn.protocol}
                        </Flex>
                      </Td>
                      <Td>${txn.amount}</Td>
                      <Td>
                        <Badge colorScheme={txn.status === 'Completed' ? 'green' : txn.status === 'Pending' ? 'yellow' : 'red'}>
                          {txn.status}
                        </Badge>
                      </Td>
                      <Td>
                        <Button size="sm" colorScheme="blue" onClick={() => handleViewDetails(txn)}>
                          View Details
                        </Button>
                      </Td>
                    </Tr>
                  ))
                ) : (
                  <Tr>
                    <Td colSpan={8} textAlign="center">
                      No transactions found
                    </Td>
                  </Tr>
                )}
              </Tbody>
            </Table>

            <HStack mt="4" spacing="4" justify="space-between">
              <Button
                onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
                disabled={currentPage === 1}
              >
                Previous
              </Button>
              <Text>
                Page {currentPage} of {Math.ceil(filteredTransactions.length / transactionsPerPage)}
              </Text>
              <Button
                onClick={() => handlePageChange(Math.min(currentPage + 1, Math.ceil(filteredTransactions.length / transactionsPerPage)))}
                disabled={currentPage === Math.ceil(filteredTransactions.length / transactionsPerPage)}
              >
                Next
              </Button>
            </HStack>
          </>
        )}
      </Card>

      {/* Modal for Transaction Details */}
      {selectedTransaction && (
        <Modal isOpen={isOpen} onClose={onClose} size="lg">
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Transaction Details</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <VStack spacing="4" align="start">
                <Text><b>ID:</b> {selectedTransaction.id}</Text>
                <Text><b>Date:</b> {selectedTransaction.date}</Text>
                <Text><b>Type:</b> {selectedTransaction.type}</Text>
                <Text><b>Asset:</b> {selectedTransaction.asset}</Text>
                <Text><b>Protocol:</b> {selectedTransaction.protocol}</Text>
                <Text><b>Amount:</b> ${selectedTransaction.amount}</Text>
                <Text><b>Status:</b> {selectedTransaction.status}</Text>
                <Text><b>Transaction Hash:</b> {selectedTransaction.transactionHash}</Text>
                <Text><b>Block Number:</b> {selectedTransaction.blockNumber}</Text>
                <Text><b>Fees Paid:</b> ${selectedTransaction.fees}</Text>
                <Text><b>Notes:</b> {selectedTransaction.notes}</Text>
              </VStack>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={onClose}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </Box>
  );
};

export default TransactionHistory;

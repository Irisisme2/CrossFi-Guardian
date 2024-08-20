import React, { useState, useEffect } from "react";
import {
  Box,
  Flex,
  IconButton,
  Input,
  Select,
  SimpleGrid,
  Text,
  VStack,
  useColorModeValue,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  useToast,
  Spinner,
  Divider,
} from "@chakra-ui/react";
import { MdSearch, MdSort, MdEdit, MdDelete } from "react-icons/md";

// Sample data for transactions (to be replaced with API data in real application)
const transactionsData = [
  { id: 1, date: "2024-08-01", type: "Deposit", amount: "$500", protocol: "CrossFi" },
  { id: 2, date: "2024-08-03", type: "Withdrawal", amount: "$200", protocol: "CrossFi" },
  { id: 3, date: "2024-08-05", type: "Staking", amount: "$300", protocol: "DeFi Protocol" },
  { id: 4, date: "2024-08-07", type: "Yield Claim", amount: "$50", protocol: "YieldFarm" },
  { id: 5, date: "2024-08-10", type: "Deposit", amount: "$1000", protocol: "CrossFi" },
  // Add more sample data as needed
];

const RecentTransactions = () => {
  const [filterType, setFilterType] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("desc");
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [transactionsPerPage] = useState(5); // Adjust as needed
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  // Simulate fetching data from an API
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Replace with real API call
        setTransactions(transactionsData);
        setLoading(false);
      } catch (error) {
        toast({
          title: "Error fetching transactions",
          description: "There was a problem fetching the transactions.",
          status: "error",
        });
        setLoading(false);
      }
    };
    fetchData();
  }, [toast]);

  const handleFilterChange = (event) => setFilterType(event.target.value);
  const handleSearchChange = (event) => setSearchQuery(event.target.value);
  const handleSortChange = (criteria) => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    const sortedTransactions = [...transactions].sort((a, b) => {
      if (criteria === "date") {
        return sortOrder === "asc"
          ? new Date(a.date) - new Date(b.date)
          : new Date(b.date) - new Date(a.date);
      } else if (criteria === "amount") {
        return sortOrder === "asc"
          ? parseFloat(a.amount.replace(/[$,]/g, "")) - parseFloat(b.amount.replace(/[$,]/g, ""))
          : parseFloat(b.amount.replace(/[$,]/g, "")) - parseFloat(a.amount.replace(/[$,]/g, ""));
      }
      return 0;
    });
    setTransactions(sortedTransactions);
  };

  const filteredTransactions = transactions
    .filter(transaction => filterType === "All" || transaction.type === filterType)
    .filter(transaction =>
      transaction.date.includes(searchQuery) ||
      transaction.type.includes(searchQuery) ||
      transaction.amount.includes(searchQuery) ||
      transaction.protocol.includes(searchQuery)
    );

  const indexOfLastTransaction = currentPage * transactionsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;
  const currentTransactions = filteredTransactions.slice(indexOfFirstTransaction, indexOfLastTransaction);

  const handleTransactionClick = (transaction) => {
    setSelectedTransaction(transaction);
    onOpen();
  };

  const handleModalClose = () => {
    setSelectedTransaction(null);
    onClose();
  };

  const handlePageChange = (newPage) => setCurrentPage(newPage);

  const cardBg = useColorModeValue("white", "gray.700");
  const borderColor = useColorModeValue("gray.300", "gray.600");

  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }} px={{ base: "4", md: "6", lg: "8" }}>
      <Box bg={cardBg} p="6" boxShadow="lg" borderColor={borderColor} borderWidth="1px" borderRadius="md">
        <Flex direction="column" mb="6">
          <Flex justify="space-between" align="center" mb="4">
            <Text fontSize="2xl" fontWeight="bold">Recent Transactions 📝</Text>
            <Flex>
              <IconButton
                aria-label="Search Transactions"
                icon={<MdSearch />}
                mr="2"
                onClick={() => toast({ title: "Search functionality is not yet implemented", status: "info" })}
              />
              <IconButton
                aria-label="Sort by Date"
                icon={<MdSort />}
                onClick={() => handleSortChange("date")}
                mr="2"
              />
              <IconButton
                aria-label="Sort by Amount"
                icon={<MdSort />}
                onClick={() => handleSortChange("amount")}
              />
            </Flex>
          </Flex>
          <Select
            value={filterType}
            onChange={handleFilterChange}
            size="sm"
            width="full"
            mb="4"
            bg={cardBg}
            borderColor={borderColor}
            borderRadius="md"
          >
            <option value="All">All</option>
            <option value="Deposit">Deposits</option>
            <option value="Withdrawal">Withdrawals</option>
            <option value="Staking">Staking</option>
            <option value="Yield Claim">Yield Claims</option>
          </Select>
          <Input
            placeholder="Search transactions..."
            mb="4"
            value={searchQuery}
            onChange={handleSearchChange}
            bg={cardBg}
            borderColor={borderColor}
            borderRadius="md"
          />
        </Flex>
        <Box>
          {loading ? (
            <Flex justify="center" align="center" h="200px">
              <Spinner size="xl" />
            </Flex>
          ) : (
            <VStack spacing="4" align="start">
              {currentTransactions.length === 0 ? (
                <Text>No transactions found</Text>
              ) : (
                <SimpleGrid columns={{ base: 1, md: 2 }} spacing="4">
                  {currentTransactions.map((transaction) => (
                    <Box
                      key={transaction.id}
                      p="6"
                      borderRadius="md"
                      borderWidth="1px"
                      borderColor={borderColor}
                      width="310px"
                      bg={cardBg}
                      _hover={{ bg: "gray.50", boxShadow: "md", cursor: "pointer" }}
                      transition="all 0.3s ease"
                      onClick={() => handleTransactionClick(transaction)}
                    >
                      <Flex direction="column">
                        <Flex justify="space-between" mb="2">
                          <Text fontSize="lg" fontWeight="bold">{transaction.date}</Text>
                          <Flex>
                            <IconButton
                              aria-label="Edit Transaction"
                              icon={<MdEdit />}
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation();
                                toast({ title: "Edit functionality is not yet implemented", status: "info" });
                              }}
                              mr="2"
                            />
                            <IconButton
                              aria-label="Delete Transaction"
                              icon={<MdDelete />}
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation();
                                toast({ title: "Delete functionality is not yet implemented", status: "info" });
                              }}
                            />
                          </Flex>
                        </Flex>
                        <Text fontSize="md" fontWeight="medium" color="gray.700" mb="1">Type: {transaction.type}</Text>
                        <Text fontSize="md" fontWeight="medium" color="gray.700" mb="1">Amount: {transaction.amount}</Text>
                        <Text fontSize="md" fontWeight="medium" color="gray.700">Protocol: {transaction.protocol}</Text>
                        <Divider my="4" />
                      </Flex>
                    </Box>
                  ))}
                </SimpleGrid>
              )}
            </VStack>
          )}
        </Box>
        <Flex justify="center" mt="6">
          <Button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            mr="2"
          >
            Previous
          </Button>
          <Text mx="2">{currentPage}</Text>
          <Button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === Math.ceil(filteredTransactions.length / transactionsPerPage)}
            ml="2"
          >
            Next
          </Button>
        </Flex>
      </Box>

      {/* Transaction Details Modal */}
      {selectedTransaction && (
        <Modal isOpen={isOpen} onClose={handleModalClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Transaction Details</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Text fontSize="lg" fontWeight="bold">Date:</Text>
              <Text>{selectedTransaction.date}</Text>
              <Text fontSize="lg" fontWeight="bold">Type:</Text>
              <Text>{selectedTransaction.type}</Text>
              <Text fontSize="lg" fontWeight="bold">Amount:</Text>
              <Text>{selectedTransaction.amount}</Text>
              <Text fontSize="lg" fontWeight="bold">Protocol:</Text>
              <Text>{selectedTransaction.protocol}</Text>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={handleModalClose}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </Box>
  );
};

export default RecentTransactions;

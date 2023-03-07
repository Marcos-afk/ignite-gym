import { Heading, HStack, Text, VStack } from 'native-base';

export const HistoryCard = () => {
  return (
    <HStack w="full" px={5} py={4} mb={3} bg="gray.600" rounded="md" alignItems="center" justifyContent="space-between">
      <VStack mr={5} flex={1}>
        <Heading color="white" fontSize="md" fontFamily="heading" textTransform="capitalize" numberOfLines={1}>
          Costas
        </Heading>
        <Text color="gray.100" fontSize="lg" numberOfLines={1}>
          Puxada lateral
        </Text>
      </VStack>

      <Text color="gray.300" fontSize="md">
        19:10
      </Text>
    </HStack>
  );
};

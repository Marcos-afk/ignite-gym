import { useState } from 'react';
import { HistoryCard } from '@components/HistoryCard';
import { ScreenHeader } from '@components/ScreenHeader';
import { Heading, VStack, SectionList, Text } from 'native-base';

export const History = () => {
  const [exercises, setExercises] = useState([
    {
      title: '02.03.2023',
      data: ['Puxada lateral', 'Puxada frontal', 'Remada unilateral'],
    },
    {
      title: '03.03.2023',
      data: ['Puxada frontal'],
    },
  ]);

  return (
    <VStack flex={1}>
      <ScreenHeader title="Histórico de Exercícios" />
      <SectionList
        sections={exercises}
        keyExtractor={(item) => item}
        renderItem={({ item }) => <HistoryCard />}
        renderSectionHeader={({ section: { title } }) => (
          <Heading color="gray.200" fontSize="md" fontFamily="heading" mt={10} mb={3}>
            {title}
          </Heading>
        )}
        contentContainerStyle={exercises.length === 0 && { flex: 1, justifyContent: 'center' }}
        ListEmptyComponent={() => (
          <Text color="gray.100" textAlign="center">
            Ainda não há exercícios registrados. {'\n'} Vamos treinar hj ?
          </Text>
        )}
        px={8}
        showsVerticalScrollIndicator={false}
      />
    </VStack>
  );
};

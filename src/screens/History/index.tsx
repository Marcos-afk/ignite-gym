import { useCallback, useState } from 'react';
import { HistoryCard } from '@components/HistoryCard';
import { ScreenHeader } from '@components/ScreenHeader';
import { Heading, VStack, SectionList, Text, useToast } from 'native-base';
import { AppError } from '@utils/errors';
import { api } from '@services/api';
import { Loading } from '@components/Loading';
import { useFocusEffect } from '@react-navigation/native';
import { HistoryByDayDTO } from '@dtos/history';

export const History = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [exercises, setExercises] = useState<HistoryByDayDTO[]>([]);

  const toast = useToast();

  const fetchHistory = async () => {
    try {
      setIsLoading(true);
      const { data } = await api.get('/history');
      setExercises(data);
    } catch (error) {
      const isAppError = error instanceof AppError;
      const message = isAppError
        ? error.message
        : 'Erro ao buscar histórico de exercícios. Tente novamente mais tarde.';
      toast.show({
        title: 'Erro ao buscar histórico de exercícios',
        description: message,
        placement: 'top',
        bgColor: 'red.500',
      });
    } finally {
      setIsLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchHistory();
    }, []),
  );

  return (
    <VStack flex={1}>
      <ScreenHeader title="Histórico de Exercícios" />
      {isLoading ? (
        <Loading />
      ) : (
        <SectionList
          sections={exercises}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <HistoryCard history={item} />}
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
      )}
    </VStack>
  );
};

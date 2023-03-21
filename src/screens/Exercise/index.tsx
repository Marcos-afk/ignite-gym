import { Feather } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Heading, HStack, Icon, Text, VStack, Image, Box, ScrollView, useToast } from 'native-base';
import { TouchableOpacity } from 'react-native';
import BodySvg from '@assets/body.svg';
import SeriesSvg from '@assets/series.svg';
import RepetitionsSvg from '@assets/repetitions.svg';
import { Button } from '@components/Button';
import { RouteParamsProps } from './ExerciseProps';
import { AppError } from '@utils/errors';
import { api } from '@services/api';
import { useEffect, useState } from 'react';
import { ExerciseDTO } from '@dtos/exercises';
import { Loading } from '@components/Loading';
import { AppNavigatorRoutesProps } from '@routes/app/AppRoutesProps';

export const Exercise = () => {
  const [sendingRegister, setSendingRegister] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [exercise, setExercise] = useState<ExerciseDTO>({} as ExerciseDTO);
  const { goBack } = useNavigation();
  const { params } = useRoute();
  const toast = useToast();

  const { id } = params as RouteParamsProps;

  const { navigate } = useNavigation<AppNavigatorRoutesProps>();

  const handleGoBack = () => {
    goBack();
  };

  const fetchExerciseDetails = async () => {
    try {
      setIsLoading(true);
      const { data } = await api.get(`/exercises/${id}`);
      setExercise(data);
    } catch (error) {
      const isAppError = error instanceof AppError;
      const message = isAppError ? error.message : 'Erro ao buscar detalhes do exercício. Tente novamente mais tarde.';
      toast.show({
        title: 'Erro ao buscar detalhes do exercício',
        description: message,
        placement: 'top',
        bgColor: 'red.500',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleExerciseHistoryRegister = async () => {
    try {
      setSendingRegister(true);
      await api.post('/history', { exercise_id: id });

      toast.show({
        title: 'Parabéns! 👏',
        description: 'Exercício registrado com sucesso!',
        placement: 'top',
        bgColor: 'green.500',
      });

      navigate('history');
    } catch (error) {
      const isAppError = error instanceof AppError;
      const message = isAppError ? error.message : 'Erro ao registrar exercício. Tente novamente mais tarde.';
      toast.show({
        title: 'Erro ao registrar exercício',
        description: message,
        placement: 'top',
        bgColor: 'red.500',
      });
    } finally {
      setSendingRegister(false);
    }
  };

  useEffect(() => {
    fetchExerciseDetails();
  }, [id]);

  return (
    <VStack flex={1}>
      <VStack px={8} bg="gray.600" pt={12}>
        <TouchableOpacity onPress={handleGoBack}>
          <Icon as={Feather} name="arrow-left" color="green.500" size={6} />
        </TouchableOpacity>
        <HStack justifyContent="space-between" mt={4} mb={8} alignItems="center">
          <Heading color="gray.100" fontSize="lg" flexShrink={1} fontFamily="heading">
            {exercise.name}
          </Heading>

          <HStack alignItems="center">
            <BodySvg />
            <Text color="gray.200" ml={1} textTransform="capitalize">
              {exercise.group}
            </Text>
          </HStack>
        </HStack>
      </VStack>
      <ScrollView>
        {isLoading ? (
          <Loading />
        ) : (
          <VStack p={8}>
            <Box rounded="lg" mb={3} overflow="hidden">
              <Image
                source={{
                  uri: `${api.defaults.baseURL}/exercise/demo/${exercise.demo}`,
                }}
                alt="exercise"
                w="full"
                h={80}
                resizeMode="cover"
                rounded="lg"
              />
            </Box>

            <Box bg="gray.600" rounded="md" pb={4} px={4}>
              <HStack justifyContent="space-around" mb={6} mt={5}>
                <HStack>
                  <SeriesSvg />
                  <Text color="gray.200" ml={2}>
                    {exercise.series} séries
                  </Text>
                </HStack>
                <HStack>
                  <RepetitionsSvg />
                  <Text color="gray.200" ml={2}>
                    {exercise.repetitions} repetições
                  </Text>
                </HStack>
              </HStack>
              <Button
                title="Marcar como realizado"
                isLoading={sendingRegister}
                onPress={handleExerciseHistoryRegister}
              />
            </Box>
          </VStack>
        )}
      </ScrollView>
    </VStack>
  );
};

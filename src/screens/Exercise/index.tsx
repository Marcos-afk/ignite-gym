import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Heading, HStack, Icon, Text, VStack, Image, Box, ScrollView } from 'native-base';
import { TouchableOpacity } from 'react-native';
import BodySvg from '@assets/body.svg';
import SeriesSvg from '@assets/series.svg';
import RepetitionsSvg from '@assets/repetitions.svg';
import ExerciseImg from '@assets/exercise.png';
import { Button } from '@components/Button';

export const Exercise = () => {
  const { goBack } = useNavigation();

  const handleGoBack = () => {
    goBack();
  };

  return (
    <ScrollView>
      <VStack flex={1}>
        <VStack px={8} bg="gray.600" pt={12}>
          <TouchableOpacity onPress={handleGoBack}>
            <Icon as={Feather} name="arrow-left" color="green.500" size={6} />
          </TouchableOpacity>
          <HStack justifyContent="space-between" mt={4} mb={8} alignItems="center">
            <Heading color="gray.100" fontSize="lg" flexShrink={1}>
              Puxada frontal
            </Heading>

            <HStack alignItems="center">
              <BodySvg />
              <Text color="gray.200" ml={1} textTransform="capitalize">
                Costas
              </Text>
            </HStack>
          </HStack>
        </VStack>

        <VStack p={8}>
          <Image
            source={ExerciseImg}
            defaultSource={ExerciseImg}
            alt="exercise"
            w="full"
            h={80}
            mb={3}
            resizeMode="cover"
            rounded="lg"
          />

          <Box bg="gray.600" rounded="md" pb={4} px={4}>
            <HStack justifyContent="space-around" mb={6} mt={5}>
              <HStack>
                <SeriesSvg />
                <Text color="gray.200" ml={2}>
                  3 séries
                </Text>
              </HStack>
              <HStack>
                <RepetitionsSvg />
                <Text color="gray.200" ml={2}>
                  12 repetições
                </Text>
              </HStack>
            </HStack>
            <Button title="Marcar como realizado" />
          </Box>
        </VStack>
      </VStack>
    </ScrollView>
  );
};

import { Heading, HStack, Image, Text, VStack, Icon } from 'native-base';
import { TouchableOpacity } from 'react-native';
import { ExerciseCardProps } from './ExerciseCardProps';
import { Entypo } from '@expo/vector-icons';
import { api } from '@services/api';

export const ExerciseCard = ({ exercise, ...rest }: ExerciseCardProps) => {
  return (
    <TouchableOpacity {...rest}>
      <HStack bg="gray.500" alignItems="center" p={2} pr={4} rounded="md" mb={3}>
        <Image
          source={{
            uri: `${api.defaults.baseURL}/exercise/thumb/${exercise.thumb}`,
          }}
          alt="exercise-card"
          w={16}
          h={16}
          rounded="md"
          mr={4}
          resizeMode="cover"
        />

        <VStack flex={1}>
          <Heading fontSize="lg" color="white" fontFamily="heading">
            {exercise.name}
          </Heading>
          <Text fontSize="sm" color="gray.200" mt={1} numberOfLines={2}>
            {exercise.series} séries x {exercise.repetitions} repetições
          </Text>
        </VStack>

        <Icon as={Entypo} name="chevron-thin-right" color="gray.300" />
      </HStack>
    </TouchableOpacity>
  );
};

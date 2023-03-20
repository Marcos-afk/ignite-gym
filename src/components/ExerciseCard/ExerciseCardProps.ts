import { ExerciseDTO } from '@dtos/exercises';
import { TouchableOpacityProps } from 'react-native';

export interface ExerciseCardProps extends TouchableOpacityProps {
  exercise: ExerciseDTO;
}

import { Image } from 'native-base';
import { UserPhotoProps } from './UserPhotoProps';

export const UserPhoto = ({ size, ...rest }: UserPhotoProps) => {
  return <Image w={size} h={size} rounded="full" borderWidth={2} borderColor="gray.400" {...rest} />;
};

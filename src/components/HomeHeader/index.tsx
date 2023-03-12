import { UserPhoto } from '@components/UserPhoto';
import { Heading, HStack, Icon, Text, VStack } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import { useAuth } from '@hooks/useAuth';
import UserPhotoDefaultImg from '@assets/userPhotoDefault.png';

export const HomeHeader = () => {
  const { user, signOut } = useAuth();

  return (
    <HStack bg="gray.600" pt={16} pb={5} px={8} alignItems="center">
      <UserPhoto
        source={
          user.avatar
            ? {
                uri: user.avatar,
              }
            : UserPhotoDefaultImg
        }
        alt="avatar"
        size={16}
        mr={4}
      />

      <VStack flex={1}>
        <Text color="gray.100" fontSize="md">
          Olá
        </Text>
        <Heading color="gray.100" fontSize="md" fontFamily="heading">
          {user.name}
        </Heading>
      </VStack>

      <TouchableOpacity onPress={signOut}>
        <Icon as={MaterialIcons} color="gray.200" name="logout" size={7} />
      </TouchableOpacity>
    </HStack>
  );
};

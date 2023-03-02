import { UserPhoto } from '@components/UserPhoto';
import { Heading, HStack, Icon, Text, VStack } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';

export const HomeHeader = () => {
  return (
    <HStack bg="gray.600" pt={16} pb={5} px={8} alignItems="center">
      <UserPhoto
        source={{
          uri: 'https://avatars.githubusercontent.com/u/72817154?v=4',
        }}
        alt="avatar"
        size={16}
        mr={4}
      />

      <VStack flex={1}>
        <Text color="gray.100" fontSize="md">
          Olá
        </Text>
        <Heading color="gray.100" fontSize="md">
          Marcos André
        </Heading>
      </VStack>

      <TouchableOpacity>
        <Icon as={MaterialIcons} color="gray.200" name="logout" size={7} />
      </TouchableOpacity>
    </HStack>
  );
};

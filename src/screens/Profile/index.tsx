import { useState } from 'react';
import { ScreenHeader } from '@components/ScreenHeader';
import { UserPhoto } from '@components/UserPhoto';
import { Center, ScrollView, VStack, Skeleton, Text, Heading, useToast } from 'native-base';
import { PHOTO_SIZE } from './constants';
import { TouchableOpacity } from 'react-native';
import { Input } from '@components/Input';
import { Button } from '@components/Button';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';

export const Profile = () => {
  const [photoIsLoading, setPhotoIsLoading] = useState(false);
  const [userPhoto, setUserPhoto] = useState('https://avatars.githubusercontent.com/u/72817154?v=4');
  const toast = useToast();

  const handleUserPhotoSelect = async () => {
    setPhotoIsLoading(true);
    try {
      const photoSelected = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
        aspect: [4, 4],
        allowsEditing: true,
        allowsMultipleSelection: false,
      });

      if (photoSelected.canceled) {
        return;
      }

      const [image] = photoSelected.assets;
      if (image.uri) {
        const photoInfo = await FileSystem.getInfoAsync(image.uri);
        if (photoInfo.size && photoInfo.size / 1024 / 1024 > 5) {
          toast.show({
            title: 'Erro ao selecionar foto de perfil',
            description: 'A foto selecionada deve ter no máximo 5MB',
            placement: 'top',
            bgColor: 'red.500',
          });
          return;
        }

        setUserPhoto(image.uri);
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.show({
          title: 'Erro ao selecionar foto de perfil',
          description: error.message,
          placement: 'top',
          bgColor: 'red.500',
        });
        return;
      }

      toast.show({
        title: 'Erro ao selecionar foto de perfil',
        description: 'Ocorreu um erro ao selecionar a foto de perfil',
        placement: 'top',
        bgColor: 'red.500',
      });
    } finally {
      setPhotoIsLoading(false);
    }
  };

  return (
    <VStack flex={1}>
      <ScreenHeader title="Perfil" />
      <ScrollView contentContainerStyle={{ paddingBottom: 36 }}>
        <Center mt={6} px={10}>
          {photoIsLoading ? (
            <Skeleton w={PHOTO_SIZE} h={PHOTO_SIZE} rounded="full" startColor="gray.500" endColor="gray.400" />
          ) : (
            <UserPhoto
              source={{
                uri: userPhoto,
              }}
              alt="avatar"
              size={PHOTO_SIZE}
            />
          )}

          <TouchableOpacity onPress={handleUserPhotoSelect}>
            <Text color="green.500" fontWeight="bold" fontSize="md" mt={2} mb={8}>
              Alterar foto
            </Text>
          </TouchableOpacity>

          <Input placeholder="Nome" bg="gray.600" />
          <Input placeholder="Email" bg="gray.600" isDisabled />

          <Heading color="gray.200" fontSize="md" fontFamily="heading" mb={2} alignSelf="flex-start" mt={12}>
            Alterar senha
          </Heading>

          <Input placeholder="Senha antiga" bg="gray.600" secureTextEntry />
          <Input placeholder="Nova senha" bg="gray.600" secureTextEntry />
          <Input placeholder="Confirmar senha" bg="gray.600" secureTextEntry />
          <Button title="Atualizar" mt={4} />
        </Center>
      </ScrollView>
    </VStack>
  );
};

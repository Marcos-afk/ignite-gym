import { VStack, Image, Text, Center, Heading, ScrollView, useToast } from 'native-base';
import BackgroundImg from '@assets/background.png';
import LogoSvg from '@assets/logo.svg';
import { Input } from '@components/Input';
import { Button } from '@components/Button';
import { useNavigation } from '@react-navigation/native';
import { AuthNavigatorRoutesProps } from '@routes/auth/AuthRoutesProps';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Controller } from 'react-hook-form';
import { SignInFormProps } from './SignInProps';
import { SignInSchema } from './Schemas';
import { defaultValues } from './DefaultValues';
import { AppError } from '@utils/errors';
import { useAuth } from '@hooks/useAuth';
import { useState } from 'react';

export const SignIn = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { signIn } = useAuth();
  const { navigate } = useNavigation<AuthNavigatorRoutesProps>();
  const toast = useToast();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormProps>({
    defaultValues: defaultValues,
    resolver: yupResolver(SignInSchema),
  });

  const handleNavigateToSignUp = () => {
    navigate('signUp');
  };

  const handleSignIn = async ({ email, password }: SignInFormProps) => {
    try {
      setIsLoading(true);
      await signIn(email, password);
    } catch (error) {
      const isAppError = error instanceof AppError;
      const message = isAppError ? error.message : 'Erro ao fazer login. Tente novamente mais tarde.';
      setIsLoading(false);
      toast.show({
        title: 'Erro ao fazer login',
        description: message,
        placement: 'top',
        bgColor: 'red.500',
      });
    }
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
      <VStack flex={1} px={10}>
        <Image
          source={BackgroundImg}
          defaultSource={BackgroundImg}
          alt="Pessoas treinando"
          resizeMode="contain"
          position="absolute"
        />

        <Center my={24}>
          <LogoSvg />
          <Text color="gray.100" fontSize="sm">
            Treine sua mente e o seu corpo
          </Text>
        </Center>

        <Center>
          <Heading color="gray.100" fontSize="xl" mb={6} fontFamily="heading">
            Acesse sua conta
          </Heading>

          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="E-mail"
                keyboardType="email-address"
                autoCapitalize="none"
                value={value}
                onChangeText={onChange}
                errorMessage={errors.email?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Senha"
                secureTextEntry
                value={value}
                onChangeText={onChange}
                errorMessage={errors.password?.message}
              />
            )}
          />

          <Button title="Acessar" onPress={handleSubmit(handleSignIn)} isLoading={isLoading} />
        </Center>

        <Center mt={24}>
          <Text color="gray.100" fontStyle="sm" mb={3} fontFamily="body">
            Ainda não tem acesso?
          </Text>

          <Button title="Criar conta" variant="outline" onPress={handleNavigateToSignUp} />
        </Center>
      </VStack>
    </ScrollView>
  );
};

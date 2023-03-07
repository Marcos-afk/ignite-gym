import { VStack, Image, Text, Center, Heading, ScrollView } from 'native-base';
import BackgroundImg from '@assets/background.png';
import LogoSvg from '@assets/logo.svg';
import { Input } from '@components/Input';
import { Button } from '@components/Button';
import { useNavigation } from '@react-navigation/native';
import { AuthNavigatorRoutesProps } from '@routes/auth/AuthRoutesProps';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { SignUpFormProps } from './SignUpProps';
import { SignUpSchema } from './Schemas';
import { defaultValues } from './DefaultValues';

export const SignUp = () => {
  const { navigate } = useNavigation<AuthNavigatorRoutesProps>();
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SignUpFormProps>({
    defaultValues: defaultValues,
    resolver: yupResolver(SignUpSchema),
  });

  const handleNavigateToSignIn = () => {
    navigate('signIn');
  };

  const handleSignUp = ({ name, email, password, password_confirm }: SignUpFormProps) => {
    console.log({ name, email, password, password_confirm });
    reset(defaultValues);
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
            Crie sua conta
          </Heading>

          <Controller
            control={control}
            name="name"
            render={({ field: { onChange, value } }) => (
              <Input placeholder="Nome" errorMessage={errors.name?.message} value={value} onChangeText={onChange} />
            )}
          />

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

          <Controller
            control={control}
            name="password_confirm"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Confirmar senha"
                secureTextEntry
                value={value}
                onChangeText={onChange}
                onSubmitEditing={handleSubmit(handleSignUp)}
                returnKeyType="send"
                errorMessage={errors.password_confirm?.message}
              />
            )}
          />

          <Button title="Criar e acessar" onPress={handleSubmit(handleSignUp)} />
        </Center>

        <Button title="Voltar para o login" variant="outline" mt={20} mb={4} onPress={handleNavigateToSignIn} />
      </VStack>
    </ScrollView>
  );
};

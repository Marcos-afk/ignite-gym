import { Input as NativeBaseInput, IInputProps } from 'native-base';

export const Input = ({ ...rest }: IInputProps) => {
  return (
    <NativeBaseInput
      bg="gray.700"
      borderWidth={0}
      h={14}
      p={4}
      fontSize="md"
      color="white"
      fontFamily="body"
      mb={4}
      placeholderTextColor="gray.300"
      _focus={{
        bg: 'gray.700',
        borderWidth: 1,
        borderColor: 'green.500',
      }}
      {...rest}
    />
  );
};

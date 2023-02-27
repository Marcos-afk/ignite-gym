import { Spinner, Center } from 'native-base';

export const Loading = () => {
  return (
    <Center flex={1}>
      <Spinner />
    </Center>
  );
};

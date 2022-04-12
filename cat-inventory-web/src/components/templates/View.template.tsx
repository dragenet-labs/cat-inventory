import { Box } from '@chakra-ui/react';

interface Props {
  children: JSX.Element | JSX.Element[] | string;
}

export const View = ({ children }: Props) => {
  return (
    <Box w="100vw" minH="100vh" h={0} position="relative">
      {children}
    </Box>
  );
};

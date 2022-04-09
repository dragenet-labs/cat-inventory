import { Flex, FlexProps } from '@chakra-ui/react';

interface Props extends FlexProps {
  children: string | JSX.Element | JSX.Element[];
}

export const CenteredViewTemplate = ({ children, ...props }: Props) => (
  <Flex w="100vw" h="100vh" alignItems="center" justifyContent="center" {...props}>
    {children}
  </Flex>
);

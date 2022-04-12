import { Flex, FlexProps } from '@chakra-ui/react';

interface Props extends FlexProps {
  children: string | JSX.Element | JSX.Element[];
}

export const CenteredViewTemplate = ({ children, ...props }: Props) => (
  <Flex w="100%" minH="100%" alignItems="center" justifyContent="center" py={[0, 6]} {...props}>
    {children}
  </Flex>
);

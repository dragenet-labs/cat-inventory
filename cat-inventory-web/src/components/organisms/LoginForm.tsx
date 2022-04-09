import {
  Button,
  Flex,
  FlexProps,
  FormControl,
  FormErrorMessage,
  Input,
  InputProps
} from '@chakra-ui/react';

export const LoginForm = (props: FlexProps) => {
  return (
    <Flex flexDir="column" w="100%" alignItems="center" {...props}>
      <LoginFormInput id="email" type="email" mb={6}>
        Email
      </LoginFormInput>
      <LoginFormInput id="password" type="password" mb={6}>
        Password
      </LoginFormInput>
      <Button
        // onClick={}
        size="lg"
        w="97px"
        colorScheme="teal"
        color="white"
        bgColor="teal.300"
        _active={{ bg: 'teal.300' }}
      >
        Login
      </Button>
    </Flex>
  );
};

interface LoginFormInputProps extends InputProps {
  children: string;
  error?: unknown;
}
const LoginFormInput = ({ children, error, ...props }: LoginFormInputProps) => (
  <FormControl isInvalid={!!error}>
    <Input placeholder={children} {...props} />
    {error && <FormErrorMessage>Email is required</FormErrorMessage>}
  </FormControl>
);

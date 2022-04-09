import { AppLogo } from 'src/components/atoms/AppLogo';
import { LoginRegisterCardTemplate } from 'src/components/templates/LoginRegisterCard.template';
import {
  Button,
  FormControl,
  FormErrorMessage,
  Heading,
  Input,
  InputProps,
  Spinner
} from '@chakra-ui/react';
import { useState } from 'react';

export const LoginPage = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 3000);
  };
  return (
    <LoginRegisterCardTemplate px={['54px', '64px']}>
      <AppLogo w="120px" mt={['94px', '43px']} mb={6} />
      <Heading fontWeight="medium" mb={['95px', '88px']}>
        Cat Inventory
      </Heading>
      <LoginFormInput id="email" type="email" mb={6}>
        Email
      </LoginFormInput>
      <LoginFormInput id="password" type="password" mb={6}>
        Password
      </LoginFormInput>
      <Button onClick={handleClick} bgColor="teal.300" color="white" w="97px" mb="164px">
        {isLoading ? <Spinner color="black" /> : 'Login'}
      </Button>
    </LoginRegisterCardTemplate>
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

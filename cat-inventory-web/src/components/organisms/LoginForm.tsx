import {
  Button,
  Flex,
  FlexProps,
  FormControl,
  FormErrorMessage,
  Input,
  InputProps
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ZodLoginRequestDTO, zodLoginRequestDTO } from 'my-inventory-common/dto';
import { forwardRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from 'src/store/user.store';
import { RootState } from 'src/store/index.store';

export const LoginForm = (props: FlexProps) => {
  const dispatch = useDispatch();

  const isLoading = useSelector((store: RootState) => store.user.isLoading);
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<ZodLoginRequestDTO>({
    resolver: zodResolver(zodLoginRequestDTO)
  });

  const onSubmit = (values: ZodLoginRequestDTO) => {
    console.log('form output: ', values);
    dispatch(login(values));
  };
  return (
    <Flex
      as="form"
      onSubmit={handleSubmit(onSubmit)}
      flexDir="column"
      w="100%"
      alignItems="center"
      {...props}
    >
      <LoginFormInput
        id="email"
        type="email"
        mb={6}
        {...register('email')}
        error={errors.email?.message}
      >
        Email
      </LoginFormInput>
      <LoginFormInput
        id="password"
        type="password"
        mb={6}
        {...register('password')}
        error={errors.password?.message}
      >
        Password
      </LoginFormInput>
      <Button
        type="submit"
        size="lg"
        w="97px"
        colorScheme="teal"
        color="white"
        bgColor="teal.300"
        _active={{ bg: 'teal.300' }}
        isLoading={isLoading}
      >
        Login
      </Button>
    </Flex>
  );
};

interface LoginFormInputProps extends InputProps {
  children: string;
  error?: string;
}

const LoginFormInput = forwardRef<HTMLInputElement, LoginFormInputProps>(
  ({ children, error, mt, mb, ml, mr, ...props }, ref) => (
    <FormControl isInvalid={!!error} mt={mt} mb={mb} ml={ml} mr={mr}>
      <Input ref={ref} placeholder={children} {...props} />
      {error && <FormErrorMessage>{error}</FormErrorMessage>}
    </FormControl>
  )
);

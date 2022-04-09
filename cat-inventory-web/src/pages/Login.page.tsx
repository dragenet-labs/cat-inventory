import { AppLogo } from 'src/components/atoms/AppLogo';
import { LoginRegisterCardTemplate } from 'src/components/templates/LoginRegisterCard.template';
import { Heading } from '@chakra-ui/react';
import { LoginForm } from 'src/components/organisms/LoginForm';

export const LoginPage = () => {
  return (
    <LoginRegisterCardTemplate px={['54px', '64px']}>
      <AppLogo w="120px" mt={['94px', '43px']} mb={6} />
      <Heading fontWeight="medium" mb={['95px', '88px']}>
        Cat Inventory
      </Heading>
      <LoginForm mb={[0, '164px']} />
    </LoginRegisterCardTemplate>
  );
};

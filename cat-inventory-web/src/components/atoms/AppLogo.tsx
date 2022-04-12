import React from 'react';
import { Box, BoxProps } from '@chakra-ui/react';
import { ReactComponent as Logo } from 'src/assets/logo.svg';

export const AppLogo = (props: BoxProps) => {
  return (
    <Box {...props}>
      <Logo />
    </Box>
  );
};

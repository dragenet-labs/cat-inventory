import { Box, ChakraProvider, CSSReset, Flex } from '@chakra-ui/react';
import { BrowserRouter } from 'react-router-dom';
import { View } from 'src/components/templates/View.template';
import { AppRoutes } from './AppRoutes';
import { theme } from './Theme';

export const App = () => (
  <ChakraProvider theme={theme}>
    <CSSReset />
    <View>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </View>
  </ChakraProvider>
);

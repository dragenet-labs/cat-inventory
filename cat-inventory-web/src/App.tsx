import { Box, ChakraProvider, CSSReset, Flex } from '@chakra-ui/react';
import { BrowserRouter } from 'react-router-dom';
import { View } from 'src/components/templates/View.template';
import { Provider, ReactReduxContext } from 'react-redux';
import { store } from 'src/store/index.store';
import { AppRoutes } from './AppRoutes';
import { theme } from './Theme';

export const App = () => (
  <ChakraProvider theme={theme}>
    <Provider store={store}>
      <CSSReset />
      <View>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </View>
    </Provider>
  </ChakraProvider>
);

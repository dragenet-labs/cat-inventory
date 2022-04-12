import React from 'react';
import { Flex, FlexProps } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { devices } from 'src/utils/media';
import { CenteredViewTemplate } from './CenteredView.template';

interface Props extends FlexProps {
  children: JSX.Element | JSX.Element[] | string;
}
export const LoginRegisterCardTemplate = ({ children, ...props }: Props) => {
  return (
    <CenteredViewTemplate bgColor="gray.50">
      <StyledFlex
        w={['100vw', '450px']}
        h={['100vh', 'min-content']}
        bgColor="gray.100"
        flexDir="column"
        alignItems="center"
        {...props}
      >
        {children}
      </StyledFlex>
    </CenteredViewTemplate>
  );
};

const StyledFlex = styled(Flex)`
  border-radius: 40px;
  @media ${devices.sm} {
    box-shadow: 0px 0px 39px var(--chakra-colors-teal-400);
  }
`;

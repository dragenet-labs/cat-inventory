import React, { Suspense } from 'react';
import { CenteredViewTemplate } from 'src/components/templates/CenteredView.template';
import { Spinner } from '@chakra-ui/react';

const Fallback = () => (
  <CenteredViewTemplate>
    <Spinner size="xl" thickness="4px" color="teal.300" />
  </CenteredViewTemplate>
);

export const lazyWithSuspense = <T,>(
  factory: () => Promise<{ default: React.ComponentType<T> }>,
  fallback = <Fallback />
) => {
  const Component = React.lazy(factory);
  return (props: React.ComponentProps<any>) => (
    <Suspense fallback={fallback}>
      <Component {...props} />
    </Suspense>
  );
};

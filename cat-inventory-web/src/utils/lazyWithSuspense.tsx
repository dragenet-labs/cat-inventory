import React, { Suspense } from 'react';

export const lazyWithSuspense = <T,>(
  factory: () => Promise<{ default: React.ComponentType<T> }>,
  fallback = null
) => {
  const Component = React.lazy(factory);
  return (props: React.ComponentProps<any>) => (
    <Suspense fallback={fallback}>
      <Component {...props} />
    </Suspense>
  );
};

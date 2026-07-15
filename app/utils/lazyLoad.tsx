import { Suspense, ComponentType, lazy } from 'react';
import { LoadingPlaceholder } from './dynamicImport';

interface LazyLoadOptions {
  fallback?: React.ReactNode;
  ssr?: boolean;
}

/**
 * Utility function to lazy load components with suspense boundary
 * @param importFn Function that imports the component
 * @param options Lazy loading options
 * @returns Lazy loaded component wrapped in suspense
 */
export function lazyLoad<T extends ComponentType<any>>(
  importFn: () => Promise<{ default: T }>,
  options: LazyLoadOptions = {}
) {
  const LazyComponent = lazy(importFn);
  const { fallback = <LoadingPlaceholder />, ssr = false } = options;

  if (!ssr) {
    return function LazyLoadedComponent(props: React.ComponentProps<T>) {
      return (
        <Suspense fallback={fallback}>
          <LazyComponent {...props} />
        </Suspense>
      );
    };
  }

  // For SSR-enabled components, return the component without suspense
  return LazyComponent;
}

/**
 * HOC to add loading state to any component
 * @param Component Component to wrap with loading state
 * @param LoadingComponent Optional custom loading component
 * @returns Wrapped component with loading state
 */
export function withLoading<P extends object>(
  Component: ComponentType<P>,
  LoadingComponent: ComponentType = LoadingPlaceholder
) {
  return function WithLoadingComponent({
    isLoading,
    ...props
  }: P & { isLoading?: boolean }) {
    if (isLoading) {
      return <LoadingComponent />;
    }

    return <Component {...(props as P)} />;
  };
} 
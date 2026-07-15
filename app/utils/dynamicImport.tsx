import dynamic from 'next/dynamic';
import { ComponentType, ReactNode } from 'react';

interface DynamicImportOptions {
  ssr?: boolean;
  loading?: ComponentType;
}

/**
 * Utility function for dynamically importing components with loading state
 * @param importFn Function that imports the component
 * @param options Dynamic import options
 * @returns Dynamically loaded component
 */
export function dynamicImport<P>(
  importFn: () => Promise<{ default: ComponentType<P> }>,
  options: DynamicImportOptions = {}
) {
  const { ssr = false, loading = LoadingPlaceholder } = options;
  
  return dynamic(importFn, {
    ssr,
    loading: loading as any,
  });
}

/**
 * Simple loading component to show while dynamic components are loading
 */
export function LoadingPlaceholder() {
  return (
    <div className="flex items-center justify-center w-full h-32">
      <div className="w-8 h-8 border-4 border-gray-300 rounded-full animate-spin border-t-primary"></div>
    </div>
  );
} 
import { ImageProps } from 'next/image';

/**
 * Helper function to generate optimized image props for Next.js Image component
 * @param src The image source path
 * @param width The desired width of the image
 * @param height The desired height of the image
 * @param alt Alt text for the image
 * @returns Optimized ImageProps object
 */
export function optimizedImageProps(
  src: string,
  width: number,
  height: number,
  alt: string
): Partial<ImageProps> {
  return {
    src,
    width,
    height,
    alt,
    loading: 'lazy',
    sizes: '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
    priority: false,
    placeholder: 'blur',
    blurDataURL: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIGZpbGw9IiNjY2NjY2MiLz48L3N2Zz4=',
  };
}

/**
 * Helper function to mark above-the-fold images as priority
 * @param src The image source path
 * @param width The desired width of the image
 * @param height The desired height of the image
 * @param alt Alt text for the image
 * @returns Optimized ImageProps object with priority loading
 */
export function priorityImageProps(
  src: string,
  width: number,
  height: number,
  alt: string
): Partial<ImageProps> {
  return {
    src,
    width,
    height,
    alt,
    priority: true,
    placeholder: 'blur',
    blurDataURL: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIGZpbGw9IiNjY2NjY2MiLz48L3N2Zz4=',
  };
} 
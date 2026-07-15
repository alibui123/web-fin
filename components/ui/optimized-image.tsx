import Image, { ImageProps } from 'next/image';
import { cn } from '@/lib/utils';
import imageLoader from '@/app/utils/imageLoader';

interface OptimizedImageProps extends Omit<ImageProps, 'src'> {
  src: string;
  alt: string;
  width: number;
  height: number;
  isPriority?: boolean;
  className?: string;
}

/**
 * An optimized image component that uses Next.js Image with proper loading strategies
 */
export function OptimizedImage({
  src,
  alt,
  width,
  height,
  isPriority = false,
  className,
  ...props
}: OptimizedImageProps) {
  return (
    <div className={cn('overflow-hidden', className)}>
      <Image
        src={src}
        width={width}
        height={height}
        alt={alt}
        loader={imageLoader}
        loading={isPriority ? undefined : 'lazy'}
        placeholder="blur"
        blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIGZpbGw9IiNjY2NjY2MiLz48L3N2Zz4="
        priority={isPriority}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        {...props}
        className={cn('object-cover w-full h-full transition-transform hover:scale-105')}
      />
    </div>
  );
} 
export default function imageLoader({
  src,
  width,
  quality,
}: {
  src: string;
  width: number;
  quality?: number;
}) {
  // For local images (starting with /)
  if (src.startsWith('/')) {
    return src;
  }

  // For external images, you can use an image optimization service
  // Example using ImageKit.io (you would need to sign up and replace with your endpoint)
  // const params = [`w-${width}`];
  // if (quality) {
  //   params.push(`q-${quality}`);
  // }
  // return `https://ik.imagekit.io/your_imagekit_id/${src}?tr=${params.join(',')}`;
  
  // For now, return the original image
  return src;
} 
import Image from "next/image";

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  className?: string;
  priority?: boolean;
}

export default function OptimizedImage({
  src,
  alt,
  width,
  height,
  fill = false,
  className = "",
  priority = false,
}: OptimizedImageProps) {
  // Check if image exists (starts with / for local or http for external)
  const isValidSrc = src && (src.startsWith("/") || src.startsWith("http"));

  if (!isValidSrc) {
    // Return placeholder if no valid image
    return (
      <div 
        className={`bg-gradient-to-br from-primary-500/20 via-accent-500/10 to-primary-500/20 border border-forge-border flex items-center justify-center ${className}`}
      >
        <div className="text-center p-4">
          <span className="text-4xl block mb-2">📷</span>
          <p className="text-forge-muted text-sm">Image coming soon</p>
        </div>
      </div>
    );
  }

  if (fill) {
    return (
      <Image
        src={src}
        alt={alt}
        fill
        className={`object-cover ${className}`}
        priority={priority}
      />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={width || 800}
      height={height || 600}
      className={className}
      priority={priority}
    />
  );
}
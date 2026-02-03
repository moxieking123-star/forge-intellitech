interface PlaceholderImageProps {
  width: number;
  height: number;
  text?: string;
  className?: string;
  icon?: string;
}

export default function PlaceholderImage({ 
  width, 
  height, 
  text = "Image", 
  className = "",
  icon = "📷"
}: PlaceholderImageProps) {
  return (
    <div 
      className={`bg-gradient-to-br from-primary-500/20 via-accent-500/10 to-primary-500/20 border border-forge-border flex items-center justify-center ${className}`}
      style={{ width: '100%', aspectRatio: `${width}/${height}` }}
    >
      <div className="text-center p-4">
        <span className="text-4xl block mb-2">{icon}</span>
        <p className="text-forge-muted text-sm">{text}</p>
      </div>
    </div>
  );
}
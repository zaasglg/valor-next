interface AspectRatioBoxProps {
  aspectRatio: number // width/height ratio
  children: React.ReactNode
  className?: string
}

export function AspectRatioBox({ aspectRatio, children, className = "" }: AspectRatioBoxProps) {
  return (
    <div 
      className={`relative w-full ${className}`}
      style={{ paddingBottom: `${(1 / aspectRatio) * 100}%` }}
    >
      <div className="absolute inset-0">
        {children}
      </div>
    </div>
  )
}
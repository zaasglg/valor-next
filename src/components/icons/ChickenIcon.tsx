import React from 'react';

interface ChickenIconProps {
  className?: string;
}

const ChickenIcon: React.FC<ChickenIconProps> = ({ className }) => {
  return (
    <svg
      width="45"
      height="28"
      viewBox="0 0 85 68"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      className={className}
    >
      <rect y="0.5" width="85" height="67" fill="url(#pattern0_1533_11662)" />
      <defs>
        <pattern
          id="pattern0_1533_11662"
          patternContentUnits="objectBoundingBox"
          width="1"
          height="1"
        >
          <use
            xlinkHref="#image0_1533_11662"
            transform="scale(0.0117647 0.0149254)"
          />
        </pattern>
        <image
          id="image0_1533_11662"
          width="85"
          height="67"
          preserveAspectRatio="none"
          xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFUAAABDCAYAAADtekncAAAACXBIWXMAAAWJAAAFiQFtaJ36AABHCWlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxMzIgNzkuMTU5Mjg0LCAyMDE2LzA0LzE5LTEzOjEzOjQwICAgICAgICAiPgogICA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPgogICAgICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgICAgICAgICB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIKICAgICAgICAgICAgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIKICA...(truncated for brevity)"
        />
      </defs>
    </svg>
  );
};

export default ChickenIcon;

import React from 'react';

interface HomeIconProps {
  className?: string;
}

const HomeIcon: React.FC<HomeIconProps> = ({ className }) => {
  return (
    <svg 
      width="22" 
      height="20" 
      viewBox="0 0 22 20" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path d="M4.78021 8L9.5929 20L0 8H4.78021ZM12.4072 20L22 8H17.2198L12.4072 20ZM11 8H6.21985L11 20L15.7802 8H11ZM7.53589 0H4.97864L0 7H4.78015L7.53589 0ZM11 7H15.7802L13.1313 0H8.86871L6.21985 7H11ZM22 7L17.0214 0H14.4641L17.2198 7H22Z" fill="#0F9658"></path>
    </svg>
  );
};

export default HomeIcon;

import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

const Card: React.FC<CardProps> = ({ children, className = '', ...props }) => (
  <div className={`bg-gray-900/50 border border-gray-800 rounded-xl backdrop-blur-sm ${className}`} {...props}>
    {children}
  </div>
);

export default Card;
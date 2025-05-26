import React, { type JSX } from "react";

interface ButtonProps {
  className?: string;
  children: React.ReactNode;
  icon?: JSX.Element;
}

const Button: React.FC<ButtonProps> = ({ className, children, icon }) => {
  return (
    <button className={className}>
      {children}
      {icon}
    </button>
  );
};

export default Button;

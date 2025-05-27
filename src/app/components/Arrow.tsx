"use client"

import * as React from "react";

type Props = {
  width?: number;
  height?: number;
  strokeWidth?: number;
  color?: string;
  className?: string;
  onClick?: () => void;
};

const Arrow: React.FC<Props> = ({
  width = 100,
  height = 75,
  strokeWidth = 20,
  color = "#000",
  className = "",
  onClick,
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="-8 -8 500 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`cursor-pointer transition-transform hover:scale-110 ${className}`}
      onMouseDown={onClick}
      role="button"
    >
      <path
        d="M418.128 140.5L236.13 45.42a9.998 9.998 0 00-9.26 0L44.871 140.5"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
    </svg>
  );
};

export default Arrow;
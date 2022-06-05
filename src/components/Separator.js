import React from "react";

export default function Separator({ x = 1, height, width }) {
  const heightRem = 2;
  const widthRem = 2;

  return (
    <div
      style={{
        height: height ? `${heightRem * x}rem` : 0,
        width: width ? `${widthRem * x}rem` : 0,
      }}
    />
  );
}

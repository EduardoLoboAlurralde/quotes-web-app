import React from "react";

type Props = {
  height?: number;
  width?: number;
};

export default function Separator({ height = 0, width = 0 }: Props) {
  return (
    <div
      style={{
        height: `${height}rem`,
        width: `${width}rem`,
      }}
    />
  );
}

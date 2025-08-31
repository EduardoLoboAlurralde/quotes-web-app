import React from "react";
import Icon from "./Icon";

type Props = {
  lib: Parameters<typeof Icon>[0]["lib"];
  name: Parameters<typeof Icon>[0]["name"];
  onClick?: () => void;
  size?: number;
  color?: string;
  title?: string;
  disabled?: boolean;
  variant?: "default" | "ghost" | "danger";
};

export default function IconButton({
  lib,
  name,
  onClick,
  size = 20,
  color = "currentColor",
  title,
  disabled = false,
  variant = "default",
}: Props) {
  const baseStyles =
    "inline-flex items-center justify-center rounded-full p-2 transition-colors";
  const variants: Record<string, string> = {
    default: "bg-gray-100 hover:bg-gray-200 text-gray-700",
    // colores
    primary: "bg-blue-100 hover:bg-blue-200 text-blue-600",
    success: "bg-green-100 hover:bg-green-200 text-green-600",
    warning: "bg-yellow-100 hover:bg-yellow-200 text-yellow-600",
    danger: "bg-red-100 hover:bg-red-200 text-red-600",
    // neutral
    info: "bg-sky-100 hover:bg-sky-200 text-sky-600",
    // transparente
    ghost: "bg-transparent hover:bg-gray-100 text-gray-600",
  };

  return (
    <button
      onClick={onClick}
      title={title}
      aria-label={title}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      }`}
    >
      <Icon lib={lib} name={name} size={size} color={color} />
    </button>
  );
}

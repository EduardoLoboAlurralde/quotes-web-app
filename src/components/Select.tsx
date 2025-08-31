"use client";
import React from "react";

type SelectProps<T> = {
  items: T[];
  valueKey: keyof T;
  labelKey: keyof T;
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
};

export default function Select<T>({
  items,
  valueKey,
  labelKey,
  value,
  onChange,
  placeholder = "Seleccionar...",
  disabled = false,
}: SelectProps<T>) {
  return (
    <select
      className="border rounded px-2 py-1"
      value={value}
      onChange={(e) => onChange?.(e.target.value)}
      disabled={disabled}
    >
      <option value="">{placeholder}</option>
      {items.map((item, idx) => (
        <option key={idx} value={String(item[valueKey])}>
          {String(item[labelKey])}
        </option>
      ))}
    </select>
  );
}

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
  placeholder = "Select...",
  selectAll = "All",
  disabled = false,
}: SelectProps<T>) {
  return (
    <select
      className="border rounded px-2 py-1"
      value={value}
      onChange={(e) => onChange?.(e.target.value)}
      disabled={disabled}
    >
      {/* Placeholder on empty */}
      <option value="" disabled>
        {placeholder}
      </option>

      {/* "All" */}
      <option value="">{selectAll}</option>

      {items.map((item, idx) => (
        <option key={idx} value={String(item[valueKey])}>
          {String(item[labelKey])}
        </option>
      ))}
    </select>
  );
}

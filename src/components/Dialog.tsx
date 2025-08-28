"use client";
import React from "react";

type Position =
  | "bottom-center"
  | "top-center"
  | "left-top"
  | "left-bottom"
  | "right-top"
  | "right-bottom";

type Props = {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  /** Controls where the dialog appears relative to the trigger */
  position?: Position;
};

export default function InlineDialog({
  open,
  onClose,
  children,
  position = "bottom-center",
}: Props) {
  if (!open) return null;

  // Tailwind classes for positioning
  const positionClasses: Record<Position, string> = {
    "bottom-center": "top-full left-1/2 -translate-x-1/2 mt-2",
    "top-center": "bottom-full left-1/2 -translate-x-1/2 mb-2",
    "left-top": "right-full top-0 mr-2",
    "left-bottom": "right-full bottom-0 mr-2",
    "right-top": "left-full top-0 ml-2",
    "right-bottom": "left-full bottom-0 ml-2",
  };

  return (
    <>
      {/* Overlay behind the popover */}
      <div
        className="fixed inset-0 z-[9998] "
        role="button"
        tabIndex={-1}
        aria-label="Close dialog overlay"
        onClick={onClose}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onClose();
          }
        }}
      />

      {/* Popover itself */}
      <div className="relative z-[9999] inline-block">
        {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events */}
        <div
          role="dialog"
          aria-modal="true"
          className={`absolute rounded-xl border shadow p-4 bg-white ${positionClasses[position]}`}
          onClick={(e) => e.stopPropagation()}
        >
          {children}
        </div>
      </div>
    </>
  );
}

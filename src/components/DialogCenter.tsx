"use client";
import React, { useEffect, useRef } from "react";

type Props = {
  /** Controls whether the dialog is open or closed */
  open: boolean;

  /** Callback fired when the dialog is closed */
  onClose?: () => void;

  /** Content to render inside the dialog */
  children: React.ReactNode;

  /** If true → show dark backdrop */
  backdrop?: boolean;
};

/**
 * DialogCenter
 *
 * A modal dialog that uses the native <dialog>.showModal().
 * - Always centered on screen.
 * - Closes on Esc or backdrop click.
 * - Backdrop can be toggled via the `backdrop` prop.
 */
export default function DialogCenter({
  open,
  onClose,
  children,
  backdrop = false,
}: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  // Sync the external `open` state with native <dialog>
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open && !dialog.open) {
      dialog.showModal();
    } else if (!open && dialog.open) {
      dialog.close();
    }
  }, [open]);

  // Close when clicking outside (backdrop) or pressing Esc
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const handleClick = (event: MouseEvent) => {
      const rect = dialog.getBoundingClientRect();
      const isInDialog =
        rect.top <= event.clientY &&
        event.clientY <= rect.bottom &&
        rect.left <= event.clientX &&
        event.clientX <= rect.right;

      if (!isInDialog) {
        onClose?.();
      }
    };

    const handleCancel = (event: Event) => {
      event.preventDefault(); // prevent default behavior
      onClose?.();
    };

    dialog.addEventListener("click", handleClick);
    dialog.addEventListener("cancel", handleCancel);

    return () => {
      dialog.removeEventListener("click", handleClick);
      dialog.removeEventListener("cancel", handleCancel);
    };
  }, [onClose]);

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      className={`rounded-xl p-6 max-w-md w-full 
        fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
        ${backdrop ? "backdrop:bg-black/50" : "backdrop:bg-transparent"}`}
    >
      {children}
    </dialog>
  );
}

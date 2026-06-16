import { useEffect, useRef, useCallback } from 'react';

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * Shared dismissible panel behavior: escape, click-outside, focus trap,
 * focus restore, and optional close-on-desktop-resize.
 */
export function useDismissiblePanel({
  isOpen,
  onClose,
  panelRef,
  triggerRef,
  closeOnDesktop = false,
  isDesktop = false,
}) {
  const wasOpenRef = useRef(false);

  const getFocusableElements = useCallback(() => {
    if (!panelRef.current) return [];
    return Array.from(panelRef.current.querySelectorAll(FOCUSABLE_SELECTOR));
  }, [panelRef]);

  // Escape key
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Focus trap + initial focus
  useEffect(() => {
    if (!isOpen) return;

    const focusable = getFocusableElements();
    const firstFocusable = focusable[0];
    if (firstFocusable) {
      requestAnimationFrame(() => firstFocusable.focus());
    }

    const handleTabKey = (e) => {
      if (e.key !== 'Tab' || !panelRef.current) return;

      const elements = getFocusableElements();
      if (elements.length === 0) return;

      const first = elements[0];
      const last = elements[elements.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', handleTabKey);
    return () => document.removeEventListener('keydown', handleTabKey);
  }, [isOpen, getFocusableElements, panelRef]);

  // Restore focus to trigger on close
  useEffect(() => {
    if (isOpen) {
      wasOpenRef.current = true;
    } else if (wasOpenRef.current) {
      wasOpenRef.current = false;
      requestAnimationFrame(() => {
        triggerRef?.current?.focus();
      });
    }
  }, [isOpen, triggerRef]);

  // Close when viewport crosses to desktop
  useEffect(() => {
    if (closeOnDesktop && isDesktop && isOpen) {
      onClose();
    }
  }, [closeOnDesktop, isDesktop, isOpen, onClose]);

  const handleBackdropClick = useCallback(
    (e) => {
      if (e.target === e.currentTarget) {
        onClose();
      }
    },
    [onClose]
  );

  return { handleBackdropClick };
}

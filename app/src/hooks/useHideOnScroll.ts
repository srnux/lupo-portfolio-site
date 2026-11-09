import { useEffect, useRef, useState, type RefObject } from "react";

/**
 * Hides the header while scrolling down and reveals it when scrolling up
 * or near the top — same thresholds as the original design.
 */
export function useHideOnScroll(scroller: RefObject<HTMLElement | null>, onHide?: () => void) {
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);
  const hiddenRef = useRef(false);
  const onHideRef = useRef(onHide);
  onHideRef.current = onHide;

  useEffect(() => {
    const el = scroller.current;
    if (!el) return;
    const onScroll = () => {
      const y = el.scrollTop;
      const hide = y > 120 && y > lastY.current + 4;
      const show = y < 60 || y < lastY.current - 4;
      if (hide && !hiddenRef.current) {
        hiddenRef.current = true;
        setHidden(true);
        onHideRef.current?.();
      } else if (show && hiddenRef.current) {
        hiddenRef.current = false;
        setHidden(false);
      }
      lastY.current = y;
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, [scroller]);

  return hidden;
}

import { useEffect, RefObject } from "react";

/**
 * https://usehooks.com/useOnClickOutside/
 *
 * @param ref: React DOM reference
 * @param handler: Callback function
 * @returns void
 */
export default function useOnClickOutside(
  ref: RefObject<HTMLElement> | undefined,
  handler: (e: Event) => void
) {
  useEffect(
    () => {
      const listener = (event: Event) => {
        if (ref == null) return;

        const current = ref.current;

        if (current == null) return;
        // Do nothing if clicking ref's element or descendent elements
        if (
          event.target != null &&
          current.contains(event.target as HTMLElement)
        ) {
          return;
        }

        handler(event);
      };

      document.addEventListener("mousedown", listener);
      document.addEventListener("touchstart", listener);

      return () => {
        document.removeEventListener("mousedown", listener);
        document.removeEventListener("touchstart", listener);
      };
    },
    // Add ref and handler to effect dependencies
    // It's worth noting that because passed in handler is a new ...
    // ... function on every render that will cause this effect ...
    // ... callback/cleanup to run every render. It's not a big deal ...
    // ... but to optimize you can wrap handler in useCallback before ...
    // ... passing it into this hook.
    [ref, handler]
  );
}

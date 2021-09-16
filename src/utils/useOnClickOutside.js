import { useEffect } from "react";

export default function useOnClickOutside(ref, handler) {
    useEffect(
        () => {
            const listener = (event) => {
                // Do nothing if clicking ref's element or descendent elements
                if (!ref.current || ref.current.contains(event.target)) {
                    return;
                }
                handler(event);
            };
            // document.addEventListener("mousedown", listener);
            // document.addEventListener("touchstart", listener);
            document.addEventListener("click", listener);
            return () => {
                // document.removeEventListener("mousedown", listener);
                // document.removeEventListener("touchstart", listener);
                document.removeEventListener("click", listener);
            };
        },

        [ref, handler]
    );
}
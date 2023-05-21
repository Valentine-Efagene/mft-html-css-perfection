import { ReactElement, RefObject, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import styles from "./Backdrop.module.css";

interface IBackdropProps {
  onClick: () => void;
  show: boolean;
  children: ReactElement;
}

function Backdrop({ onClick, show, children }: IBackdropProps) {
  const contentRef = useRef<HTMLDivElement>();
  const backdrop = document.getElementById("modal");
  const content = (
    <div
      ref={contentRef as RefObject<HTMLDivElement>}
      className={`${!show ? styles.hidden : ""} ${styles.container}`}
      onClick={(e) => {
        const target = e.target as Node;
        const current = contentRef.current;

        if (current?.contains(target) && current !== target) {
          return;
        }

        onClick();
      }}
    >
      {children}
    </div>
  );
  const el = useRef<HTMLDivElement>(document.createElement("div"));

  useEffect(() => {
    if (el.current == null) return;

    const current = el.current;

    backdrop?.appendChild(current);

    return () => {
      if (current == null) return;

      backdrop?.removeChild(current);
    };
  }, [backdrop]);

  return ReactDOM.createPortal(content, el.current);
}

export default Backdrop;

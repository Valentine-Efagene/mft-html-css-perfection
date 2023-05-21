import styles from "./FauxSelect.module.css";
import React, { useState, useRef, RefObject, ReactElement } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import useOnClickOutside from "../../../../hooks/useOnClickOutside";
import { IOPtion, IOptionValue } from "../../../../types/inputs";

interface IFauxSelectProps {
  name?: string;
  id?: string;
  className?: string;
  style?: object;
  value?: IOptionValue;
  defaultValue?: string | number;
  onChange: (option: IOptionValue) => void;
  options?: IOPtion[];
  children?: ReactElement[];
}

function FauxSelect({
  className,
  style,
  value,
  onChange,
  children,
}: IFauxSelectProps) {
  const [showOptions, setShowOptions] = useState(false);
  const ref = useRef<HTMLDivElement>();

  useOnClickOutside(ref as RefObject<HTMLDivElement>, () => {
    setShowOptions(false);
  });

  const handleChange = (value: IOptionValue) => {
    onChange(value);
    setActiveIndex(getIndex(value));
    setShowOptions(false);
  };

  const hideSelect = () => setShowOptions(false);

  const getOptions = () => {
    return children?.map((option) => {
      const { value, children: title } = option.props;
      return { value, title };
    });
  };

  const getIndex = (value: IOptionValue) => {
    return getOptions()?.findIndex((option) => option.value === value) ?? 0;
  };

  const [activeIndex, setActiveIndex] = useState(getIndex(value));

  const toggleShowOptions = () => setShowOptions((prevState) => !prevState);

  return (
    <div
      ref={ref as RefObject<HTMLDivElement>}
      className={`${styles.container} ${className}`}
      style={style}
      onKeyUp={(e) => {
        const options = getOptions();

        switch (e.key) {
          case "Escape":
            hideSelect();
            break;

          case "Enter":
            handleChange(options?.[activeIndex].value);
            break;

          case "ArrowDown":
            if (options?.length && activeIndex < options?.length - 1) {
              setActiveIndex(activeIndex + 1);
            }
            break;

          case "ArrowUp":
            if (options?.length && activeIndex > 0) {
              setActiveIndex(activeIndex - 1);
            }
            break;

          case "Tab":
            if (e.shiftKey) {
              if (options?.length && activeIndex > 0) {
                setActiveIndex(activeIndex - 1);
              }
            } else {
              if (options?.length && activeIndex < options?.length - 1) {
                setActiveIndex(activeIndex + 1);
              }
            }
            break;

          default:
            break;
        }
      }}
    >
      <button className={styles.master} onClick={toggleShowOptions}>
        <span className={styles.value}>
          {value && value.toString()?.length > 0
            ? children
                ?.map((option) => {
                  const { value, children: title } = option.props;
                  return { value, title: title ?? value };
                })
                .find((option) => option.value === value)?.title
            : children
                ?.map((option) => {
                  const { value, children: title } = option.props;
                  return { value, title };
                })
                .find((option) => option.value === "" || option.value == null)
                ?.title}
        </span>
        <span className={styles.customArrow}>
          {showOptions ? (
            <FaChevronUp className={styles.icon} />
          ) : (
            <FaChevronDown className={styles.icon} />
          )}
        </span>
      </button>
      <ul className={`${showOptions ? "" : styles.hidden} ${styles.list}`}>
        {children?.map((option, index) => {
          const { value, children: title } = option.props;
          return (
            <li
              key={value}
              aria-selected={activeIndex === index}
              className={`${activeIndex === index ? styles.active : ""}`}
              tabIndex={0}
              onClick={() => handleChange(value)}
            >
              {title ?? value}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default FauxSelect;

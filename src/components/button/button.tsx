import React from "react";
import classNames from "classnames";
import { noop } from "../../util";
import "./styles/button.scss";

export type ButtonColor = "default" | "primary" | "secondary";
export type ButtonType = "contained" | "outlined" | "text";
export type ButtonSize = "small" | "medium" | "large";

export interface ButtonProps {
  size?: ButtonSize;
  color?: ButtonColor;
  type?: ButtonType;
  disabled?: boolean;
  tabIndex?: number;
  onClick?: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  className?: string;
  children?: React.ReactNode;
  href?: string;
}

const Button = (props: ButtonProps) => {
  const {
    size = "medium",
    color = "default",
    type = "contained",
    tabIndex = 0,
    className,
    children,
    onClick,
    disabled,
    ...otherProps
  } = props;

  let btnClass = disabled
    ? classNames({
        "swish-btn": true,
        [`swish-btn--${size}`]: true,
        [`swish-btn--${type}--disabled`]: true,
      })
    : classNames(
        {
          "swish-btn": true,
          [`swish-btn--${type}--${color}`]: true,
          [`swish-btn--${size}`]: true,
        },
        className,
      );

  const handleClick = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    if (onClick) {
      e.preventDefault();
      onClick(e);
    }
  };

  return (
    <button
      aria-disabled={disabled}
      className={btnClass}
      onClick={(e: React.MouseEvent<HTMLElement, MouseEvent>) => handleClick}
      tabIndex={tabIndex}
      {...otherProps}
    >
      {children}
    </button>
  );
};

export default Button;

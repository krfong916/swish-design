import React from "react";
import classNames from "classnames";
import { noop } from "../../util";
import "./styles/button.scss";

export type ButtonColor = "default" | "primary" | "secondary";
export type ButtonType = "default" | "outlined" | "disabled";
export type ButtonSize = "small" | "medium" | "large";

export interface ButtonProps {
  size?: ButtonSize;
  color?: ButtonColor;
  type?: ButtonType;
  disabled?: boolean;
  tabIndex?: number;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
  className?: string;
  children?: React.ReactNode;
  href?: string;
}

const Button = (props: ButtonProps) => {
  const {
    size = "medium",
    color = "default",
    type = "default",
    tabIndex = 0,
    className,
    children,
    onClick,
    ...otherProps
  } = props;

  const disabled = type == "disabled" ? true : false;

  let btnClass = classNames(
    {
      "swish-btn": true,
      [`swish-btn--${color}`]: true,
      [`swish-btn--${size}`]: true,
      "swish-btn--disabled": disabled,
    },
    className,
  );

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    if (onClick) {
      e.preventDefault();
      onClick(e);
    }
  };

  return (
    <button
      aria-disabled={disabled}
      className={btnClass}
      onClick={(e: React.MouseEvent<HTMLElement>) => handleClick(e)}
      tabIndex={tabIndex}
      {...otherProps}
    >
      {children}
    </button>
  );
};

export default Button;

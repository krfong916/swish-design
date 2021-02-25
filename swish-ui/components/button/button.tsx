import React from "react";
import classNames from "classnames";
import { noop } from "../util";
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
  onClick?: (e: any) => void;
  onKeyDown?: (e: any) => void;
  className?: string;
  children?: React.ReactNode;
  href?: string;
}

const Button = (props: ButtonProps) => {
  let {
    size = "medium",
    color = "default",
    type = "contained",
    tabIndex = 0,
    className,
    children,
    onClick,
    onKeyDown,
    disabled = false,
    href,
    ...otherProps
  } = props;

  tabIndex = disabled ? -1 : tabIndex;

  let btnClass = classNames(
    {
      "s-btn": true,
      [`s-btn-${size}`]: true,
      [`s-btn-${type}-disabled`]: disabled,
      [`s-btn-${type}-${color}`]: disabled == false ? true : false,
    },
    className,
  );

  const handleClick = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    if (onClick && !disabled) {
      e.preventDefault();
      onClick(e);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
    if ((e.keyCode == 32 || e.keyCode == 13) && onKeyDown) {
      e.stopPropagation();
      onKeyDown(e);
    }
  };

  if (href) {
    if (disabled) href = "javascript:void(0)";
    return (
      <a
        tabIndex={tabIndex}
        href={href}
        className={btnClass}
        onClick={handleClick}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      aria-disabled={disabled}
      className={btnClass}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={tabIndex}
      {...otherProps}
    >
      {children}
    </button>
  );
};

export default Button;

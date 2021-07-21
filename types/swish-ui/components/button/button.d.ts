import React from "react";
import "./styles/button.scss";
export declare type ButtonColor = "default" | "primary" | "secondary";
export declare type ButtonType = "contained" | "outlined" | "text";
export declare type ButtonSize = "small" | "medium" | "large";
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
declare const Button: React.ForwardRefExoticComponent<ButtonProps & React.RefAttributes<HTMLButtonElement | HTMLAnchorElement>>;
export default Button;

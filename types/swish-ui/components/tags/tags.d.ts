import * as React from "react";
import "./styles/tags.scss";
export declare type TagColor = "gray" | "red" | "green" | "blue" | "deepblue" | "yellow" | "orange" | "purple" | "persimmon" | "gold" | "lime" | "cyan" | "magenta";
export declare type TagType = "solid" | "inverted";
export declare type TagSize = "small" | "medium" | "large";
export interface TagProps {
    type?: TagType;
    color?: TagColor;
    className?: string;
    size?: string;
    href?: string;
    closable?: boolean;
    closeIcon?: React.ReactNode;
    icon?: React.ReactNode;
    iconEvent?: (e: any) => void;
    children?: React.ReactNode;
}
declare const Tag: (props: TagProps) => JSX.Element;
export default Tag;

import * as React from "react";
import { Descendant } from "../utils/descendants/index";
export interface PinProps {
    /**
     * Allow the pin children to have a default value
     */
    defaultValue?: string;
    /**
     * Controllable value for using the pin input as a controlled component
     */
    value?: string;
    /**
     * The type of values that the Pin allows.
     */
    inputType?: PinType;
    /**
     * The children of the Pin component.
     */
    children?: React.ReactElement[];
    /**
     * Property for pin styling/visual appearance
     */
    variant?: PinVariant;
    /**
     * Size property for the pin
     */
    size?: PinSize;
    /**
     * If you need to assign your event listener for focus events
     *     on focus is your person
     */
    onFocus?: (ref: React.MutableRefObject<HTMLInputElement>) => (e: React.SyntheticEvent) => void;
    /**
     * The function that's called when the user has input valid values.
     *
     * @return string Returns the pin code.
     */
    onComplete?: (pinCode: string, clear: () => void) => void;
    /**
     *
     */
    onChange?: (pin: string) => void;
    /**
     * Specifies whether or not the user would like the first Pin Field focused on render
     */
    autoFocus?: boolean;
    /**
     * Grants control to the user over Pin focus behavior
     */
    manageFocus?: boolean;
    /**
     * Grants control to the user over the styling of the Top-Level Pin component
     */
    manageStyle?: boolean;
    /**
     * Combined with manageStyle, defining classes allows for custom control over
     *     pin appearance
     */
    classes?: string;
    /**
     * The placeholder for the pin input
     */
    placeholder?: string;
    /**
     * Specified input type as password
     */
    mask?: boolean;
}
export declare type PinType = "number" | "text";
export declare type PinSize = "small" | "medium" | "large";
export declare type PinColor = "blue" | "green" | "purple";
export declare type PinErrorColor = "red" | "orange" | "yellow";
export declare type PinVariant = "outline" | "unstyled" | "filled" | "flushed";
export declare const PinContext: React.Context<PinInternalContext>;
export interface PinInternalContext {
    /**
     * Prop-Getter for the Pin Field Component
     */
    getInternalPinProps: (t: {}) => {};
}
/** a pin descendant is an input field DOM node */
export declare type PinInputDescendant = Descendant<HTMLInputElement> & {
    /**
     * Sets the pin to the disabled state
     */
    disabled: boolean;
};
export declare const PinDescendantContext: React.Context<import("../utils/descendants").DescendantContext<PinInputDescendant>>;
export interface PinContextProviderProps {
    descendants: PinInputDescendant[];
    setDescendants: React.Dispatch<React.SetStateAction<PinInputDescendant[]>>;
    context: PinInternalContext;
}
export declare function PinContextProvider({ context: Context, children, }: {
    context: PinContextProviderProps;
    children: React.ReactElement | React.ReactElement[];
}): JSX.Element;
export declare namespace PinContextProvider {
    var displayName: string;
    var __docgenInfo: {
        description: string;
        displayName: string;
        props: {
            context: {
                defaultValue: any;
                description: string;
                name: string;
                required: boolean;
                type: {
                    name: string;
                };
            };
        };
    };
}
export declare function usePinInput(props: PinProps): {
    context: PinInternalContext;
    descendants: PinInputDescendant[];
    setDescendants: React.Dispatch<React.SetStateAction<PinInputDescendant[]>>;
};
export declare namespace usePinInput {
    var displayName: string;
    var __docgenInfo: {
        description: string;
        displayName: string;
        props: {
            defaultValue: {
                defaultValue: any;
                description: string;
                name: string;
                required: boolean;
                type: {
                    name: string;
                };
            };
            value: {
                defaultValue: any;
                description: string;
                name: string;
                required: boolean;
                type: {
                    name: string;
                };
            };
            inputType: {
                defaultValue: any;
                description: string;
                name: string;
                required: boolean;
                type: {
                    name: string;
                };
            };
            children: {
                defaultValue: any;
                description: string;
                name: string;
                required: boolean;
                type: {
                    name: string;
                };
            };
            variant: {
                defaultValue: any;
                description: string;
                name: string;
                required: boolean;
                type: {
                    name: string;
                };
            };
            size: {
                defaultValue: any;
                description: string;
                name: string;
                required: boolean;
                type: {
                    name: string;
                };
            };
            onFocus: {
                defaultValue: any;
                description: string;
                name: string;
                required: boolean;
                type: {
                    name: string;
                };
            };
            onComplete: {
                defaultValue: any;
                description: string;
                name: string;
                required: boolean;
                type: {
                    name: string;
                };
            };
            onChange: {
                defaultValue: any;
                description: string;
                name: string;
                required: boolean;
                type: {
                    name: string;
                };
            };
            autoFocus: {
                defaultValue: any;
                description: string;
                name: string;
                required: boolean;
                type: {
                    name: string;
                };
            };
            manageFocus: {
                defaultValue: any;
                description: string;
                name: string;
                required: boolean;
                type: {
                    name: string;
                };
            };
            manageStyle: {
                defaultValue: any;
                description: string;
                name: string;
                required: boolean;
                type: {
                    name: string;
                };
            };
            classes: {
                defaultValue: any;
                description: string;
                name: string;
                required: boolean;
                type: {
                    name: string;
                };
            };
            placeholder: {
                defaultValue: any;
                description: string;
                name: string;
                required: boolean;
                type: {
                    name: string;
                };
            };
            mask: {
                defaultValue: any;
                description: string;
                name: string;
                required: boolean;
                type: {
                    name: string;
                };
            };
        };
    };
}
export interface PinFieldProps {
    classes?: string;
    /**
     * Grants control to the user over the styling of the Top-Level Pin component
     */
    manageStyle?: boolean;
}
export interface UsePinFieldProps {
    pinClasses: string;
}
export declare function usePinField(props?: PinFieldProps, userRef?: React.ForwardedRef<React.MutableRefObject<HTMLInputElement>>): UsePinFieldProps;
export declare namespace usePinField {
    var displayName: string;
    var __docgenInfo: {
        description: string;
        displayName: string;
        props: {
            classes: {
                defaultValue: any;
                description: string;
                name: string;
                required: boolean;
                type: {
                    name: string;
                };
            };
            manageStyle: {
                defaultValue: any;
                description: string;
                name: string;
                required: boolean;
                type: {
                    name: string;
                };
            };
        };
    };
}

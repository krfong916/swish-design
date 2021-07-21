import * as React from "react";
import { PinProps, PinFieldProps } from "./usePinInput";
import "./styles/pinInput.scss";
/**
 * PinInput is the top-level component for the Pin Component
 *
 * @param  PinProps User-specified properties to control the behavior and appearance
 * @return Pin      Swish Component
 */
export declare const PinInput: {
    (props: PinProps): JSX.Element;
    displayName: string;
    __docgenInfo: {
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
};
/**
 * A child of the Pin component that accepts a single character
 * Collectively, the PinField is used to create a Pin code
 *
 * @return PinField Swish Component
 */
export declare const PinField: React.ForwardRefExoticComponent<PinFieldProps & React.RefAttributes<React.MutableRefObject<HTMLInputElement>>>;

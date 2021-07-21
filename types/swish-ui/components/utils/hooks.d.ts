import * as React from "react";
export interface useControllableStateProps<T> {
    defaultValue?: T | ((arg?: T) => void);
    value?: T;
    onChange?: (args: T) => void;
}
export declare function useControllableState<T>(props: useControllableStateProps<T>): [T, React.Dispatch<React.SetStateAction<T>>];
export declare namespace useControllableState {
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
            onChange: {
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

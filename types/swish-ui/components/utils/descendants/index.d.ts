import * as React from "react";
/**
SomeElement is a generic type

GenericType extends HTMLElement describes the relationship test

If the type GenericType is assignable to the type HTMLElement

select HTMLElement; otherwise select the type Element

In order to make the resulting type no longer generic,

Specify the type parameter to use it as a type of a value
*/
declare type SomeElement<GenericType> = GenericType extends Element ? GenericType : Element;
/**
The default type for ElementType is HTMLElement

A descendant is of some element type - we don't know exactly what

@type {Descendant} the base descendant type
*/
declare type Descendant<ElementType = HTMLElement> = {
    element: SomeElement<ElementType>;
};
/**
 * Defines the context values available for consumer components
 * @type {DescendantType} The type is explicitly defined in the calling component
 */
export interface DescendantContext<DescendantType extends Descendant> {
    subscribe: (d: DescendantType) => void;
    unsubscribe: (d: DescendantType) => void;
    descendants: DescendantType[];
}
export declare function createDescendantContext<DescendantType extends Descendant>(name: string): React.Context<DescendantContext<DescendantType>>;
export declare namespace createDescendantContext {
    var displayName: string;
    var __docgenInfo: {
        description: string;
        displayName: string;
        props: {
            toString: {
                defaultValue: any;
                description: string;
                name: string;
                required: boolean;
                type: {
                    name: string;
                };
            };
            charAt: {
                defaultValue: any;
                description: string;
                name: string;
                required: boolean;
                type: {
                    name: string;
                };
            };
            charCodeAt: {
                defaultValue: any;
                description: string;
                name: string;
                required: boolean;
                type: {
                    name: string;
                };
            };
            concat: {
                defaultValue: any;
                description: string;
                name: string;
                required: boolean;
                type: {
                    name: string;
                };
            };
            indexOf: {
                defaultValue: any;
                description: string;
                name: string;
                required: boolean;
                type: {
                    name: string;
                };
            };
            lastIndexOf: {
                defaultValue: any;
                description: string;
                name: string;
                required: boolean;
                type: {
                    name: string;
                };
            };
            localeCompare: {
                defaultValue: any;
                description: string;
                name: string;
                required: boolean;
                type: {
                    name: string;
                };
            };
            match: {
                defaultValue: any;
                description: string;
                name: string;
                required: boolean;
                type: {
                    name: string;
                };
            };
            replace: {
                defaultValue: any;
                description: string;
                name: string;
                required: boolean;
                type: {
                    name: string;
                };
            };
            search: {
                defaultValue: any;
                description: string;
                name: string;
                required: boolean;
                type: {
                    name: string;
                };
            };
            slice: {
                defaultValue: any;
                description: string;
                name: string;
                required: boolean;
                type: {
                    name: string;
                };
            };
            split: {
                defaultValue: any;
                description: string;
                name: string;
                required: boolean;
                type: {
                    name: string;
                };
            };
            substring: {
                defaultValue: any;
                description: string;
                name: string;
                required: boolean;
                type: {
                    name: string;
                };
            };
            toLowerCase: {
                defaultValue: any;
                description: string;
                name: string;
                required: boolean;
                type: {
                    name: string;
                };
            };
            toLocaleLowerCase: {
                defaultValue: any;
                description: string;
                name: string;
                required: boolean;
                type: {
                    name: string;
                };
            };
            toUpperCase: {
                defaultValue: any;
                description: string;
                name: string;
                required: boolean;
                type: {
                    name: string;
                };
            };
            toLocaleUpperCase: {
                defaultValue: any;
                description: string;
                name: string;
                required: boolean;
                type: {
                    name: string;
                };
            };
            trim: {
                defaultValue: any;
                description: string;
                name: string;
                required: boolean;
                type: {
                    name: string;
                };
            };
            length: {
                defaultValue: any;
                description: string;
                name: string;
                required: boolean;
                type: {
                    name: string;
                };
            };
            substr: {
                defaultValue: any;
                description: string;
                name: string;
                required: boolean;
                type: {
                    name: string;
                };
            };
            valueOf: {
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
/**
Creates the descendants list for the current context
*/
export declare function useDescendants<DescendantType>(): [DescendantType[], React.Dispatch<React.SetStateAction<DescendantType[]>>];
export declare namespace useDescendants {
    var displayName: string;
    var __docgenInfo: {
        description: string;
        displayName: string;
        props: {};
    };
}
/**
Creates a stateful pub/sub object for the top-level component to manage

This function implements the ideas of the Provider pattern at its core

Contains state of the descendants and functions to update that state
*/
export declare function DescendantProvider<DescendantType extends Descendant>({ setDescendants, context: Context, descendants, children, }: {
    setDescendants: React.Dispatch<React.SetStateAction<DescendantType[]>>;
    descendants: DescendantType[];
    context: React.Context<DescendantContext<DescendantType>>;
    children: React.ReactNode;
}): JSX.Element;
export declare namespace DescendantProvider {
    var displayName: string;
    var __docgenInfo: {
        description: string;
        displayName: string;
        props: {
            setDescendants: {
                defaultValue: any;
                description: string;
                name: string;
                required: boolean;
                type: {
                    name: string;
                };
            };
            descendants: {
                defaultValue: any;
                description: string;
                name: string;
                required: boolean;
                type: {
                    name: string;
                };
            };
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
/**
Registers the element as a descendant

@return {number} returns an index the descendant occurs in the list of descendants
*/
export declare function useDescendant<DescendantType extends Descendant>(descendant: DescendantType, context: React.Context<DescendantContext<DescendantType>>): number;
export declare namespace useDescendant {
    var displayName: string;
    var __docgenInfo: {
        description: string;
        displayName: string;
        props: {};
    };
}
export declare function getDescendants<DescendantType extends Descendant>(context: React.Context<DescendantContext<DescendantType>>): DescendantType[];
export declare namespace getDescendants {
    var displayName: string;
    var __docgenInfo: {
        description: string;
        displayName: string;
        props: {
            Provider: {
                defaultValue: any;
                description: string;
                name: string;
                required: boolean;
                type: {
                    name: string;
                };
            };
            Consumer: {
                defaultValue: any;
                description: string;
                name: string;
                required: boolean;
                type: {
                    name: string;
                };
            };
            displayName: {
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
export type { Descendant };

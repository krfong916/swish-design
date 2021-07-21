/// <reference types="react" />
declare type ReactRef<RefType> = React.MutableRefObject<RefType> | React.RefObject<RefType> | React.Ref<RefType>;
/**
 * This function is used when the user of our component wants
 * to forward refs onto our component.
 * We merge potentially many ref objects to an assigned value.
 *
 * @param refs refs to assign the node/value to.
 *     Some refs from our internal implemenatation and some from the user forwarding.
 */
export declare function mergeRefs<RefType>(...refs: ReactRef<RefType | null>[]): (node: RefType | null) => void;
export declare namespace mergeRefs {
    var displayName: string;
    var __docgenInfo: {
        description: string;
        displayName: string;
        props: {
            length: {
                defaultValue: any;
                description: string;
                name: string;
                required: boolean;
                type: {
                    name: string;
                };
            };
            toString: {
                defaultValue: any;
                description: string;
                name: string;
                required: boolean;
                type: {
                    name: string;
                };
            };
            toLocaleString: {
                defaultValue: any;
                description: string;
                name: string;
                required: boolean;
                type: {
                    name: string;
                };
            };
            pop: {
                defaultValue: any;
                description: string;
                name: string;
                required: boolean;
                type: {
                    name: string;
                };
            };
            push: {
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
            join: {
                defaultValue: any;
                description: string;
                name: string;
                required: boolean;
                type: {
                    name: string;
                };
            };
            reverse: {
                defaultValue: any;
                description: string;
                name: string;
                required: boolean;
                type: {
                    name: string;
                };
            };
            shift: {
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
            sort: {
                defaultValue: any;
                description: string;
                name: string;
                required: boolean;
                type: {
                    name: string;
                };
            };
            splice: {
                defaultValue: any;
                description: string;
                name: string;
                required: boolean;
                type: {
                    name: string;
                };
            };
            unshift: {
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
            every: {
                defaultValue: any;
                description: string;
                name: string;
                required: boolean;
                type: {
                    name: string;
                };
            };
            some: {
                defaultValue: any;
                description: string;
                name: string;
                required: boolean;
                type: {
                    name: string;
                };
            };
            forEach: {
                defaultValue: any;
                description: string;
                name: string;
                required: boolean;
                type: {
                    name: string;
                };
            };
            map: {
                defaultValue: any;
                description: string;
                name: string;
                required: boolean;
                type: {
                    name: string;
                };
            };
            filter: {
                defaultValue: any;
                description: string;
                name: string;
                required: boolean;
                type: {
                    name: string;
                };
            };
            reduce: {
                defaultValue: any;
                description: string;
                name: string;
                required: boolean;
                type: {
                    name: string;
                };
            };
            reduceRight: {
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
export {};

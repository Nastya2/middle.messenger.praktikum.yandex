export type Tprops = Record<string, any>;
export type Indexed<T = unknown> = {
    [key in string]: T;
};
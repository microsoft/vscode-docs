/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

export type Id = number;

export enum Kind {
    ExternalModule = 1,
    Module = 2,
    Class = 128,
    Interface = 256,
    Enum = 4,
    EnumMember = 16,
    TypeAlias = 4194304,
    TypeParam = 131072,
    TypeLiteral = 65536,
    Variable = 32,
    Function = 64,
    Constructor = 512,
    Method = 2048,
    Property = 1024
}

export interface Item {
    id: Id;
    name: string;
    defaultValue: string;
    kind: Kind;
    kindString: string;
    flags: Flags;
    type: Type;
    groups?: Group[];
    comment: Comment;
    children: Item[];
    signatures: Item[];
    parameters: Item[];
    typeParameter: Item[];
}


export interface Flags {
    isOptional: boolean;
    isRest: boolean;
    isExported: boolean;
    isStatic: boolean;
}

export interface Type {
    id: Id;
    type: string;
    name: string;
    types: Type[];
    typeArguments: Type[];
    declaration: Item;
    elements: Type[];
    elementType: Type;
}

export interface Group {
    title: string;
    kind: number;
    children: Id[];
}

export interface Comment {
    shortText: string;
    text: string;
    returns: string;
    tags: Tag[];
}

export interface Tag {
    tag: string;
    text: string;
}

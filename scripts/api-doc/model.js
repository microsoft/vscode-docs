/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
(function (Kind) {
    Kind[Kind["ExternalModule"] = 1] = "ExternalModule";
    Kind[Kind["Module"] = 2] = "Module";
    Kind[Kind["Class"] = 128] = "Class";
    Kind[Kind["Interface"] = 256] = "Interface";
    Kind[Kind["Enum"] = 4] = "Enum";
    Kind[Kind["EnumMember"] = 16] = "EnumMember";
    Kind[Kind["TypeAlias"] = 4194304] = "TypeAlias";
    Kind[Kind["TypeParam"] = 131072] = "TypeParam";
    Kind[Kind["TypeLiteral"] = 65536] = "TypeLiteral";
    Kind[Kind["Variable"] = 32] = "Variable";
    Kind[Kind["Function"] = 64] = "Function";
    Kind[Kind["Constructor"] = 512] = "Constructor";
    Kind[Kind["Method"] = 2048] = "Method";
    Kind[Kind["Property"] = 1024] = "Property";
})(exports.Kind || (exports.Kind = {}));
var Kind = exports.Kind;

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import * as marked from 'marked';
import { Item, Type, Kind, Comment } from './model';


function doc(value: string): string {
    let data = <Item>JSON.parse(value);
    let start = data.children[0].children[0]; //vscode-docs/issues/162
    let result = Builder.translate(start);
    return result;
}

export = doc;

class Builder {

    static translate(item: Item): string {
        let builder = new Builder();
        let result = builder._onRoot(item);
        return result;
    }

    private _builder: string[];
    private _idx: { [id: number]: Item };

    private _onRoot(rootItem: Item): string {

        // build an index of Item.id -> Item
        this._idx = Object.create(null);
        let items = [rootItem];
        while (items.length) {
            let item = items.shift();
            this._idx[item.id] = item;
            if (item.children) {
                items.push(...item.children);
            }
        }

        // visit items
        this._builder = [];
        let namespaces: Item[] = [];
        let types: Item[] = [];

        for (let child of rootItem.children) {
            switch (child.kind) {
                case Kind.Module:
                case Kind.ExternalModule:
                    namespaces.push(child);
                    break;
                case Kind.Class:
                case Kind.Interface:
                case Kind.Enum:
                case Kind.TypeAlias:
                    types.push(child);
                    break;
            }
        }

        // Namespaces
        for (let item of namespaces) {
            this._onContainerType(item, true);
        }

        // Types
        types.sort((a, b) => a.name.localeCompare(b.name));
        for (let item of types) {
            this._onContainerType(item);
        }

        return this._builder.join('');
    }

    private _onContainerType(container: Item, isNamespace: boolean = false): void {

        isNamespace ? this._h2(container.name) : this._h3(itemName2HtmlString(container, undefined));
        this._paragragh(comment2HtmlString(container.comment));

        if (container.groups) {
            let groups: { [title: string]: Item[] } = Object.create(null);
            groups['Events'] = [];
            groups['Static'] = [];

            for (let group of container.groups) {
                let checkForEvent = group.title === 'Variables';
                let array = groups[group.title];
                if (!array) {
                    array = [];
                    groups[group.title] = array;
                }
                for (let id of group.children) {
                    let child = this._idx[id];
                    if (/^on[Did|Will]/.test(child.name)) {
                        groups['Events'].push(child);
                    } else if (child.flags.isStatic) {
                        groups['Static'].push(child);
                    } else {
                        array.push(child);
                    }
                }
            }

            let titles = [
                'Variables', 'Events', 'Functions',
                'Static', 'Constructors', 'Properties', 'Methods',
                'Enumeration members'
            ];

            for (let title of titles) {
                let items = groups[title];
                if (!items || items.length === 0) {
                    continue;
                }

                this._h4(title);

                for (let child of items) {
                    switch (child.kind) {
                        case Kind.Variable:
                        case Kind.Property:
                            this._onVariable(child, container);
                            break;
                        case Kind.EnumMember:
                            this._onEnumMember(child, container);
                            break;
                        case Kind.Function:
                        case Kind.Method:
                        case Kind.Constructor:
                            this._onCallable(child, container);
                            break;
                    }
                }
            }
        } else if (container.kind === Kind.Interface) {
            this._onCallable(container, undefined, true);

        } else if (container.kind === Kind.TypeAlias) {
            this._onTypeAlias(container);
        }
    }

    private _onVariable(item: Item, parent: Item): void {
        this._renderMember(item, parent, collector => {
            collector.push(comment2HtmlString(item.comment));
        });
    }

    private _onEnumMember(item: Item, parent: Item): void {
        this._renderMember(item, parent, collector => {
            if (typeof item.defaultValue !== 'undefined') {
                collector.push('<em>' + item.defaultValue + '</em>');
            }
        });
    }

    private _onCallable(item: Item, parent: Item, skipName = false): void {

        item.signatures.forEach(signature => {
            this._renderMember(signature, parent, collector => {

                collector.push(comment2HtmlString(signature.comment));
                collector.push('<div class="signature">');
                collector.push('<table class="table table-bordered">');
                if (signature.parameters) {
                    collector.push('<tr><th>Parameter</th><th>Description</th></tr>');
                    for (let param of signature.parameters) {
                        let type = item2HtmlString(param, undefined);
                        let doc = comment2HtmlString(param.comment);
                        collector.push(`<tr><td>${type}</td><td>${doc}</td></tr>`);
                    }
                }
                collector.push('<tr><th>Returns</th><th>Description</th></tr>');
                collector.push('<tr><td><span class="ts">'
                    + type2HtmlString(signature.type)
                    + '</span></td><td>'
                    + comment2HtmlString(signature.comment, true)
                    + '</td></tr>');
                collector.push('</table>');
                collector.push('</div>');
            }, skipName);
        });
    }

    private _onTypeAlias(item: Item): void {
        this._paragragh(item2HtmlString(item, undefined));
    }

    private _renderMember(item: Item, parent: Item, details2Html: (bucket: string[]) => any, skipName = false): void {
        let parts: string[] = [];
        parts.push(item2HtmlString(item, parent, skipName));
        parts.push(`<div class="details collapse" id="details-${item.id}">`)
        details2Html(parts);
        parts.push('</div>');
        this._paragragh(parts.join('\n'));
    }


    // --- markdown builder --------

    private _h2(value) {
        this._builder.push('## ' + value + '\n\n');
    }

    private _h3(value) {
        this._builder.push('### ' + value + '\n\n');
    }

    private _h4(value) {
        this._builder.push('#### ' + value + '\n\n');
    }

    private _paragragh(value: string) {
        this._builder.push('\n\n' + value + '\n\n');
    }
}


// ---- helpers to get html from md-comments and type & item info

function md(value: string, bucket: string[]) {
    if (value) {
        value = value.trim();
        bucket.push(marked(value));
    }
}

function comment2HtmlString(comment: Comment, useReturn = false): string {

    if (!comment) {
        return '<div class="comment"></div>';
    };


    let parts: string[] = [];
    if (useReturn) {
        md(comment.returns, parts);

    } else {
        md(comment.shortText, parts);
        md(comment.text, parts);

        if (comment.tags) {
            // group by tag
            let tags: { [name: string]: string[] } = Object.create(null);
            for (let tag of comment.tags) {
                let array = tags[tag.tag];
                if (!array) {
                    array = tags[tag.tag] = [];
                }
                array.push(tag.text.trim());
            }
            // as list items
            for (let key in tags) {
                let values = tags[key];
                for (let value of values) {
                    if (value) {
                        md(`* *${key}* - ${value}`, parts);
                    } else {
                        md(`* *${key}*`, parts);
                    }
                }
            }
        }
    }

    return '<div class="comment">' + parts.join('') + '</div>';
}

// --- type to string

function itemName2HtmlString(item: Item, parent: Item): string {
    let { name, typeParameter } = item;
    let result: string;

    if (!typeParameter) {
        result = name;
    } else {
        let parts: string[] = [];
        for (let typeParam of typeParameter) {
            parts.push(typeParam.name);
        }
        result = name + '&lt;' + parts.join(', ') + '&gt;';
    }

    let anchor = !parent
        ? item.name
        : [parent.name, item.name].join('.');

    return `<a name="${anchor}"></a><span class="code-item" id=${item.id}>${result}</span>`;
}

function item2HtmlString(item: Item, parent: Item, skipName = false): string {
    let result = printType(item, skipName);
    let anchor = !parent
        ? item.name
        : [parent.name, item.name].join('.');

    return `<a name="${anchor}"></a><span class="ts" id=${item.id} data-target="#details-${item.id}" data-toggle="collapse">${result}</span>`;
}

function printType(item: Item, skipName = false): string {

    let parts: string[] = [];

    if (!skipName) {
        if (item.flags.isRest) {
            parts.push('<span>...</span>');
        }
        parts.push(ident(item.name));

        if (item.flags.isOptional) {
            parts.push('<span>?</span>');
        }
    }

    // special handling for signatures
    if (item.kindString === 'Call signature' || item.kindString === 'Constructor signature') {
        printSignature(item, parts);
    }

    if (item.type) {
        parts.push('<span>: </span>');
        parts.push(type2HtmlString(item.type));
    }
    return parts.join('');
}

function printSignature(item: Item, bucket: string[]): void {
    // console.assert(item.kindString === 'Call signature');

    if (item.typeParameter) {
        bucket.push('<span>&lt;</span>');
        for (let typeParam of item.typeParameter) {
            bucket.push(typeParam.name);
            if (typeParam.type) {
                bucket.push(' extends ');
                bucket.push(type2HtmlString(typeParam.type));
            }
            bucket.push('<span>, <span>');
        }
        bucket.pop();
        bucket.push('<span>&gt;</span>');
    }
    bucket.push('<span>(</span>');
    if (item.parameters) {
        for (let param of item.parameters) {
            bucket.push(printType(param));
            bucket.push(', ');
        }
        bucket.pop(); // remove last ,
    }
    bucket.push('<span>)</span>');
}

function ident(value: string): string {
    return '<span class="ident">' + value + '</span>';
}

function type2HtmlString(type: Type): string {

    let label: string;
    switch (type.type) {
        case 'intrinsic':
        case 'typeParameter':
            label = `<a class="type-intrinsic">${type.name}</a>`;
            break;
        case 'reference':
            label = `<a class="type-ref" href="#${type.name}">${type.name}</a>`;
            if (type.typeArguments) {
                label += `&lt;${type.typeArguments.map(type2HtmlString).join(', ')}&gt;`;
            }
            break;
        case 'union':
            label = type.types.map(type2HtmlString).join(' &#124; ');
            break;
        case 'reflection':
            label = reflectionTypeLabel(type);
            break;
        case 'tuple':
            label = '[' + type.elements.map(type2HtmlString).join(', ') + ']';
            break;
        case 'array':
            label = type2HtmlString(type.elementType) + '[]'
            break;
        case 'unknown':
            label = `<a class="type-unknown">${type.name}</a>`; //https://github.com/TypeStrong/typedoc/pull/365
            break;
        default:
            label = '!!!MISSING TYPE ' + type.type;
            break;
    }

    return label;
}

function reflectionTypeLabel(type: Type): string {
    console.assert(type.type === 'reflection');

    // signature type
    if (type.declaration.signatures) {
        let signature = type.declaration.signatures[0];
        let parts: string[] = [];
        parts.push('(');
        if (signature.parameters) {
            for (let param of signature.parameters) {
                parts.push(param.name);
                parts.push(': ');
                parts.push(type2HtmlString(param.type));
                parts.push(', ');
            }
            parts.pop();
        }
        parts.push(') =&gt; ');
        parts.push(type2HtmlString(signature.type));
        return parts.join('');
    }

    // object type
    if (type.declaration.children) {

        let parts: string[] = [];
        parts.push('{')
        if (type.declaration.children) {
            for (let child of type.declaration.children) {
                parts.push(child.name);
                if (child.type) {
                    parts.push(': ');
                    parts.push(type2HtmlString(child.type));
                }
                parts.push(', ');
            }
            parts.pop();
        }
        parts.push('}');
        return parts.join('');
    }
}

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
var marked = require('marked');
var model_1 = require('./model');
function doc(value) {
    var data = JSON.parse(value);
    var start = data.children[0].children[0]; //vscode-docs/issues/162
    var result = Builder.translate(start);
    return result;
}
var Builder = (function () {
    function Builder() {
    }
    Builder.translate = function (item) {
        var builder = new Builder();
        var result = builder._onRoot(item);
        return result;
    };
    Builder.prototype._onRoot = function (rootItem) {
        // build an index of Item.id -> Item
        this._idx = Object.create(null);
        var items = [rootItem];
        while (items.length) {
            var item = items.shift();
            this._idx[item.id] = item;
            if (item.children) {
                items.push.apply(items, item.children);
            }
        }
        // visit items
        this._builder = [];
        var namespaces = [];
        var types = [];
        for (var _i = 0, _a = rootItem.children; _i < _a.length; _i++) {
            var child = _a[_i];
            switch (child.kind) {
                case model_1.Kind.Module:
                case model_1.Kind.ExternalModule:
                    namespaces.push(child);
                    break;
                case model_1.Kind.Class:
                case model_1.Kind.Interface:
                case model_1.Kind.Enum:
                case model_1.Kind.TypeAlias:
                    types.push(child);
                    break;
            }
        }
        // Namespaces
        for (var _b = 0; _b < namespaces.length; _b++) {
            var item = namespaces[_b];
            this._onContainerType(item, true);
        }
        // Types
        types.sort(function (a, b) { return a.name.localeCompare(b.name); });
        for (var _c = 0; _c < types.length; _c++) {
            var item = types[_c];
            this._onContainerType(item);
        }
        return this._builder.join('');
    };
    Builder.prototype._onContainerType = function (container, isNamespace) {
        if (isNamespace === void 0) { isNamespace = false; }
        isNamespace ? this._h2(container.name) : this._h3(itemName2HtmlString(container, undefined));
        this._paragragh(comment2HtmlString(container.comment));
        if (container.groups) {
            var groups = Object.create(null);
            groups['Events'] = [];
            groups['Static'] = [];
            for (var _i = 0, _a = container.groups; _i < _a.length; _i++) {
                var group = _a[_i];
                var checkForEvent = group.title === 'Variables';
                var array = groups[group.title];
                if (!array) {
                    array = [];
                    groups[group.title] = array;
                }
                for (var _b = 0, _c = group.children; _b < _c.length; _b++) {
                    var id = _c[_b];
                    var child = this._idx[id];
                    if (/^on[Did|Will]/.test(child.name)) {
                        groups['Events'].push(child);
                    }
                    else if (child.flags.isStatic) {
                        groups['Static'].push(child);
                    }
                    else {
                        array.push(child);
                    }
                }
            }
            var titles = [
                'Variables', 'Events', 'Functions',
                'Static', 'Constructors', 'Properties', 'Methods',
                'Enumeration members'
            ];
            for (var _d = 0; _d < titles.length; _d++) {
                var title = titles[_d];
                var items = groups[title];
                if (!items || items.length === 0) {
                    continue;
                }
                this._h4(title);
                for (var _e = 0; _e < items.length; _e++) {
                    var child = items[_e];
                    switch (child.kind) {
                        case model_1.Kind.Variable:
                        case model_1.Kind.Property:
                            this._onVariable(child, container);
                            break;
                        case model_1.Kind.EnumMember:
                            this._onEnumMember(child, container);
                            break;
                        case model_1.Kind.Function:
                        case model_1.Kind.Method:
                        case model_1.Kind.Constructor:
                            this._onCallable(child, container);
                            break;
                    }
                }
            }
        }
        else if (container.kind === model_1.Kind.Interface) {
            this._onCallable(container, undefined, true);
        }
        else if (container.kind === model_1.Kind.TypeAlias) {
            this._onTypeAlias(container);
        }
    };
    Builder.prototype._onVariable = function (item, parent) {
        this._renderMember(item, parent, function (collector) {
            collector.push(comment2HtmlString(item.comment));
        });
    };
    Builder.prototype._onEnumMember = function (item, parent) {
        this._renderMember(item, parent, function (collector) {
            if (typeof item.defaultValue !== 'undefined') {
                collector.push('<em>' + item.defaultValue + '</em>');
            }
        });
    };
    Builder.prototype._onCallable = function (item, parent, skipName) {
        var _this = this;
        if (skipName === void 0) { skipName = false; }
        item.signatures.forEach(function (signature) {
            _this._renderMember(signature, parent, function (collector) {
                collector.push(comment2HtmlString(signature.comment));
                collector.push('<div class="signature">');
                collector.push('<table class="table table-bordered">');
                if (signature.parameters) {
                    collector.push('<tr><th>Parameter</th><th>Description</th></tr>');
                    for (var _i = 0, _a = signature.parameters; _i < _a.length; _i++) {
                        var param = _a[_i];
                        var type = item2HtmlString(param, undefined);
                        var doc_1 = comment2HtmlString(param.comment);
                        collector.push("<tr><td>" + type + "</td><td>" + doc_1 + "</td></tr>");
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
    };
    Builder.prototype._onTypeAlias = function (item) {
        this._paragragh(item2HtmlString(item, undefined));
    };
    Builder.prototype._renderMember = function (item, parent, details2Html, skipName) {
        if (skipName === void 0) { skipName = false; }
        var parts = [];
        parts.push(item2HtmlString(item, parent, skipName));
        parts.push("<div class=\"details collapse\" id=\"details-" + item.id + "\">");
        details2Html(parts);
        parts.push('</div>');
        this._paragragh(parts.join('\n'));
    };
    // --- markdown builder --------
    Builder.prototype._h2 = function (value) {
        this._builder.push('## ' + value + '\n\n');
    };
    Builder.prototype._h3 = function (value) {
        this._builder.push('### ' + value + '\n\n');
    };
    Builder.prototype._h4 = function (value) {
        this._builder.push('#### ' + value + '\n\n');
    };
    Builder.prototype._paragragh = function (value) {
        this._builder.push('\n\n' + value + '\n\n');
    };
    return Builder;
})();
// ---- helpers to get html from md-comments and type & item info
function md(value, bucket) {
    if (value) {
        value = value.trim();
        bucket.push(marked(value));
    }
}
function comment2HtmlString(comment, useReturn) {
    if (useReturn === void 0) { useReturn = false; }
    if (!comment) {
        return '<div class="comment"></div>';
    }
    ;
    var parts = [];
    if (useReturn) {
        md(comment.returns, parts);
    }
    else {
        md(comment.shortText, parts);
        md(comment.text, parts);
        if (comment.tags) {
            // group by tag
            var tags = Object.create(null);
            for (var _i = 0, _a = comment.tags; _i < _a.length; _i++) {
                var tag = _a[_i];
                var array = tags[tag.tag];
                if (!array) {
                    array = tags[tag.tag] = [];
                }
                array.push(tag.text.trim());
            }
            // as list items
            for (var key in tags) {
                var values = tags[key];
                for (var _b = 0; _b < values.length; _b++) {
                    var value = values[_b];
                    if (value) {
                        md("* *" + key + "* - " + value, parts);
                    }
                    else {
                        md("* *" + key + "*", parts);
                    }
                }
            }
        }
    }
    return '<div class="comment">' + parts.join('') + '</div>';
}
// --- type to string
function itemName2HtmlString(item, parent) {
    var name = item.name, typeParameter = item.typeParameter;
    var result;
    if (!typeParameter) {
        result = name;
    }
    else {
        var parts = [];
        for (var _i = 0; _i < typeParameter.length; _i++) {
            var typeParam = typeParameter[_i];
            parts.push(typeParam.name);
        }
        result = name + '&lt;' + parts.join(', ') + '&gt;';
    }
    var anchor = !parent
        ? item.name
        : [parent.name, item.name].join('.');
    return "<a name=\"" + anchor + "\"></a><span class=\"code-item\" id=" + item.id + ">" + result + "</span>";
}
function item2HtmlString(item, parent, skipName) {
    if (skipName === void 0) { skipName = false; }
    var result = printType(item, skipName);
    var anchor = !parent
        ? item.name
        : [parent.name, item.name].join('.');
    return "<a name=\"" + anchor + "\"></a><span class=\"ts\" id=" + item.id + " data-target=\"#details-" + item.id + "\" data-toggle=\"collapse\">" + result + "</span>";
}
function printType(item, skipName) {
    if (skipName === void 0) { skipName = false; }
    var parts = [];
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
function printSignature(item, bucket) {
    // console.assert(item.kindString === 'Call signature');
    if (item.typeParameter) {
        bucket.push('<span>&lt;</span>');
        for (var _i = 0, _a = item.typeParameter; _i < _a.length; _i++) {
            var typeParam = _a[_i];
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
        for (var _b = 0, _c = item.parameters; _b < _c.length; _b++) {
            var param = _c[_b];
            bucket.push(printType(param));
            bucket.push(', ');
        }
        bucket.pop(); // remove last ,
    }
    bucket.push('<span>)</span>');
}
function ident(value) {
    return '<span class="ident">' + value + '</span>';
}
function type2HtmlString(type) {
    var label;
    switch (type.type) {
        case 'intrinsic':
        case 'typeParameter':
            label = "<a class=\"type-intrinsic\">" + type.name + "</a>";
            break;
        case 'reference':
            label = "<a class=\"type-ref\" href=\"#" + type.name + "\">" + type.name + "</a>";
            if (type.typeArguments) {
                label += "&lt;" + type.typeArguments.map(type2HtmlString).join(', ') + "&gt;";
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
            label = type2HtmlString(type.elementType) + '[]';
            break;
        case 'unknown':
            label = "<a class=\"type-unknown\">" + type.name + "</a>"; //https://github.com/TypeStrong/typedoc/pull/365
            break;
        default:
            label = '!!!MISSING TYPE ' + type.type;
            break;
    }
    return label;
}
function reflectionTypeLabel(type) {
    console.assert(type.type === 'reflection');
    // signature type
    if (type.declaration.signatures) {
        var signature = type.declaration.signatures[0];
        var parts = [];
        parts.push('(');
        if (signature.parameters) {
            for (var _i = 0, _a = signature.parameters; _i < _a.length; _i++) {
                var param = _a[_i];
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
        var parts = [];
        parts.push('{');
        if (type.declaration.children) {
            for (var _b = 0, _c = type.declaration.children; _b < _c.length; _b++) {
                var child = _c[_b];
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
module.exports = doc;

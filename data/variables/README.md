# Data variables

Data variables are short strings of reusable text that are substituted when the
website builds Markdown content.

Store variables in `.yml` or `.yaml` files in this directory. Every file lives
under the `variables` namespace (matching this directory's name), and the
relative path, filename without its extension, and YAML keys form the rest of
the dot-separated variable path.

Each file is a flat list of `key: value` entries. To give a variable a
multi-segment path, put dots directly in the key — for example,
`data/variables/foo/bar.yml`:

```yaml
meaning_of_life: 42

nested.values.too: Yes!
```

These values can be used in Markdown bodies or string-valued YAML frontmatter:

```liquid
{% data variables.foo.bar.meaning_of_life %}

{% data variables.foo.bar.nested.values.too %}
```

A file at `data/variables/product.yml` is referenced as `variables.product.<key>`.

Directives can be embedded in a longer string. Values used by a directive must
resolve to a string. Missing paths, malformed YAML, namespace collisions, and
values that resolve to an object or an empty value fail the website build with
the source file and variable path in the error.

## Supported YAML subset

Variable files are parsed by a small, dependency-free parser rather than a
full YAML implementation, so only the following is supported:

- Comments (`#`) and blank lines
- Flat `key: value` entries, one per line — **no indentation-based nested
  mappings and no block sequences** (`- item`); every line must start at
  column 0, and any indented line fails the build with a clear error
- Scalars: every value is substituted as literal text exactly as written
  (there is no `true`/`false`/number/`null` type coercion, since values are
  always inserted into Markdown as text either way). Wrap a value in single
  or double quotes only if it needs leading/trailing whitespace preserved, or
  contains a `#` or `:` that would otherwise be misread as a comment or as
  the key/value separator. A double-quoted value supports `\"`, `\\`, `\n`,
  and `\t` escapes; a single-quoted value supports `''` as an escaped `'`.

YAML anchors (`&name`), aliases (`*name`), and flow-style collections
(`{...}`/`[...]`) are **not** supported and fail the build with a clear error.
To reuse a value in more than one place, reference the same variable path
multiple times, or duplicate the literal value across variables.


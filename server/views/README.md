# Server Views Directory

This directory contains view templates for the VS Code server interface.

## Formatting Standards

All files in this directory follow consistent formatting rules:

- **Indentation**: Use tabs (not spaces)
- **Line endings**: CRLF (Windows-style)
- **File types**: HTML, EJS templates
- **Encoding**: UTF-8

## Files

- `index.html` - Main landing page
- `dashboard.html` - Dashboard view
- `layout.ejs` - Base template layout
- `error.html` - Error page template

## Formatting Tools

To ensure consistent formatting across all files, use the provided scripts:

- `/tmp/format_server_views.sh` - Applies consistent formatting
- `/tmp/verify_formatting.sh` - Verifies formatting compliance

The `.editorconfig` file in the repository root enforces these standards automatically in VS Code.

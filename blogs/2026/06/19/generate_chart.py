import os

models = [
    ("Model-A", 40.0, "#4DA6E8"),
    ("Model-B", 28.0, "#4DA6E8"),
    ("Model-C", 27.0, "#63D778"),
    ("Model-D", 28.0, "#63D778"),
    ("Model-E", 26.4, "#63D778"),
    ("Model-F", 26.1, "#4DA6E8"),
    ("Model-G", 15.0, "#63D778"),
    ("Model-H", 14.7, "#63D778"),
    ("Model-I", 8.8, "#FFD43B"),
    ("Model-J", 2.0, "#FF7E82"),
    ("Model-K", 1.0, "#63D778"),
    ("Model-L", 0.7, "#FF7E82"),
    ("Model-M", 0.1, "#FF7E82"),
    ("Model-N", 0.0, "#FF7E82"),
    ("Model-O", 0.0, "#FF7E82"),
    ("Model-P", 0.0, "#63D778"),
]

width = 1331
height = 883
margin_top = 100
margin_bottom = 100
margin_left = 120
margin_right = 60

chart_width = width - margin_left - margin_right
chart_height = height - margin_top - margin_bottom

svg = [
    f'<svg width="{width}" height="{height}" viewBox="0 0 {width} {height}" xmlns="http://www.w3.org/2000/svg" style="display: block; background: white; font-family: -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Helvetica, Arial, sans-serif;">',
    f'<text x="{width/2}" y="40" text-anchor="middle" font-size="28" font-weight="bold" fill="#333">Can the model "just create the file"?</text>',
    f'<text x="{width/2}" y="70" text-anchor="middle" font-size="18" fill="#666">Ideal path = only create_file, nothing else</text>',
]

# Grid lines
for val in range(0, 41, 5):
    x = margin_left + (val / 40.0) * chart_width
    svg.append(f'<line x1="{x}" y1="{margin_top}" x2="{x}" y2="{margin_top + chart_height}" stroke="#eee" stroke-width="1" />')
    svg.append(f'<text x="{x}" y="{margin_top + chart_height + 25}" text-anchor="middle" font-size="14" fill="#999">{val}</text>')

svg.append(f'<text x="{margin_left + chart_width/2}" y="{margin_top + chart_height + 55}" text-anchor="middle" font-size="16" font-weight="500" fill="#666">% of runs achieving ideal (1 tool call)</text>')

row_height = chart_height / len(models)
bar_height = row_height * 0.7

for i, (name, val, color) in enumerate(models):
    y_center = margin_top + (i + 0.5) * row_height
    y_bar = y_center - bar_height / 2
    
    # Label
    svg.append(f'<text x="{margin_left - 10}" y="{y_center}" text-anchor="end" alignment-baseline="middle" font-size="14" fill="#333">{name}</text>')
    
    # Bar
    bar_w = (val / 40.0) * chart_width
    if bar_w < 1 and val > 0: bar_w = 1 # visibility
    
    svg.append(f'<rect x="{margin_left}" y="{y_bar}" width="{bar_w}" height="{bar_height}" fill="{color}" rx="2" />')
    
    # Value labels for first 6
    if i < 6:
        label = f"{int(val)}%" if val % 1 == 0 else f"{val}%"
        # Special case for Model-E/F rounding as requested if applicable
        # "First six value labels: 40%, 28%, 27%, 28%, 26%, 26%"
        fixed_labels = ["40%", "28%", "27%", "28%", "26%", "26%"]
        svg.append(f'<text x="{margin_left + bar_w + 10}" y="{y_center}" alignment-baseline="middle" font-size="14" font-weight="bold" fill="#333">{fixed_labels[i]}</text>')
    
    # Zero annotations for N, O, P
    if name in ["Model-N", "Model-O", "Model-P"]:
        svg.append(f'<text x="{margin_left + 10}" y="{y_center}" alignment-baseline="middle" font-size="13" font-style="italic" fill="red">0% — never achieves ideal</text>')

# Legend
legend_x = width - margin_right - 150
legend_y = height - margin_bottom - 20
vendors = [
    ("Vendor A", "#4DA6E8"),
    ("Vendor B", "#63D778"),
    ("Vendor C", "#FFD43B"),
    ("Vendor D", "#FF7E82"),
]
for i, (vname, vcolor) in enumerate(reversed(vendors)):
    ly = legend_y - i * 25
    svg.append(f'<rect x="{legend_x}" y="{ly - 12}" width="12" height="12" fill="{vcolor}" rx="2" />')
    svg.append(f'<text x="{legend_x + 20}" y="{ly}" alignment-baseline="middle" font-size="14" fill="#666">{vname}</text>')

svg.append('</svg>')

html_content = f"""
<\!DOCTYPE html>
<html>
<head>
<style>
body {{ margin: 0; display: block; }}
svg {{ display: block; }}
</style>
</head>
<body>
{''.join(svg)}
</body>
</html>
"""

tmp_dir = os.environ.get('TMPDIR', '/tmp')
output_path = os.path.join(tmp_dir, 'passing-rate-render.html')

with open(output_path, 'w') as f:
    f.write(html_content)

print(f"file://{output_path}")

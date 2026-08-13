import os
import re

with open('tieude.b64', 'r') as f:
    b64_data = f.read().replace('\n', '')

css_file = 'style.css'
with open(css_file, 'r') as f:
    css_content = f.read()

# Replace the src: url(...) with the base64 data
new_src = f"src: url(data:font/ttf;base64,{b64_data}) format('truetype');"

new_css = re.sub(
    r"src:\s*local\('DFVN Float Regular'\),\s*url\('\./tieude\.ttf'\)\s*format\('truetype'\);",
    new_src,
    css_content
)

with open(css_file, 'w') as f:
    f.write(new_css)

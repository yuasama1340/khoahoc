import re

with open('style_v8.css', 'r') as f:
    css = f.read()

replacements = [
    # Navy blues to dark purple
    ('rgba(4, 9, 28', 'rgba(15, 6, 28'),
    ('rgba(8, 12, 36', 'rgba(20, 10, 36'),
    ('rgba(10, 14, 40', 'rgba(25, 12, 40'),
    ('rgba(5, 10, 30', 'rgba(15, 8, 30'),
    ('rgba(10, 18, 46', 'rgba(25, 15, 46'),
    ('rgba(14, 18, 56', 'rgba(30, 13, 56'),
    # Remaining cyan to warm amber/gold
    ('rgba(94,210,220', 'rgba(212,147,90'),
    # Light purple to match theme
    ('rgba(200,100,175', 'rgba(176,128,216'),
]

count = 0
for old, new in replacements:
    if old in css:
        count += css.count(old)
        css = css.replace(old, new)

with open('style_v8.css', 'w') as f:
    f.write(css)

print(f"Replaced {count} instances.")

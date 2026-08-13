import re

with open('style_v6.css', 'r') as f:
    css = f.read()

# --- MAPPING: old colors → new purple/amber palette ---
replacements = [
    # OLD TEAL/CYAN → vivid purple
    ('#2EC8D8', '#7B3FAE'),
    ('#1A9DB0', '#5A2D88'),
    ('#9EEEFF', '#C090E0'),
    ('#0fd4e8', '#7B3FAE'),
    
    # OLD PINK/ROSE → warm gold
    ('#E870A4', '#D4935A'),
    ('#C44880', '#9B5E2A'),
    ('#F5AECE', '#E8B88A'),
    
    # OLD BLUE (non-purple) → purple
    ('#4A8ED9', '#7B3FAE'),
    ('#2A5BB0', '#5A2D88'),
    ('#A0C8FF', '#C090E0'),
    
    # OLD NAVY BACKGROUNDS → deep purple-dark
    ('#0B2D3E', '#1A0D2E'),
    ('#12203D', '#2A1850'),
    ('#1C1A52', '#3C2468'),
    ('#0F1E38', '#22104A'),
    ('#0C3E52', '#2A1248'),
    ('#0c3e52', '#2a1248'),
    
    # OLD TEAL RGBA → purple rgba
    ('rgba(46,200,216', 'rgba(123,63,174'),
    ('rgba(46, 200, 216', 'rgba(123, 63, 174'),
    ('rgba(232,112,164', 'rgba(212,147,90'),
    ('rgba(232, 112, 164', 'rgba(212, 147, 90'),
    ('rgba(74,142,217', 'rgba(90,45,136'),
    ('rgba(74, 142, 217', 'rgba(90, 45, 136'),
    
    # OLD LAVENDER/MINT OLD COLORS
    ('#9B7ED4', '#B080D8'),
    ('rgba(155,126,212', 'rgba(176,128,216'),
    ('rgba(155, 126, 212', 'rgba(176, 128, 216'),
    ('#5EEAD4', '#C87941'),
    ('rgba(94,234,212', 'rgba(200,121,65'),
    ('#7558B8', '#5A2D88'),
    ('#C8AEFF', '#D0A8F0'),
    
    # OLD GOLD (too light/different) → new amber gold
    ('#F4BC7E', '#D4935A'),
    ('#C9902A', '#9B5E2A'),
    ('#FDDDB3', '#E8B88A'),
    ('rgba(244,188,126', 'rgba(212,147,90'),
    ('rgba(244, 188, 126', 'rgba(212, 147, 90'),
    
    # Fix old background gradients that still use blue/teal
    ('#0C3E52 0%', '#2A1248 0%'),
    ('#1A1460 50%', '#1E0D38 50%'),
    ('#38104A 100%', '#2A1510 100%'),
]

count = 0
for old, new in replacements:
    if old in css:
        count += css.count(old)
        css = css.replace(old, new)

with open('style_v6.css', 'w') as f:
    f.write(css)

print(f"Done! Replaced {count} color instances.")

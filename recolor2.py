with open('style_v7.css', 'r') as f:
    css = f.read()

# Final comprehensive cleanup of all remaining blue/teal/cyan
replacements = [
    # Leftover neon blue/cyan hardcodes
    ('#00e5ff', '#D4935A'),
    ('#00E5FF', '#D4935A'),
    ('#00D4FF', '#C87941'),
    ('#00d4ff', '#C87941'),
    ('#6C63FF', '#7B3FAE'),
    ('#8a2be2', '#7B3FAE'),
    ('#8A2BE2', '#7B3FAE'),
    ('#ff2a85', '#D4935A'),
    ('#a78bfa', '#B080D8'),
    ('#A78BFA', '#B080D8'),
    
    # Fix old gradient in .section-title (the neon one)
    ('linear-gradient(90deg, #ff2a85 0%, #7B3FAE 50%, #D4935A 100%)', 
     'linear-gradient(90deg, #B080D8 0%, #D4935A 60%, #E8B88A 100%)'),
    
    # Old orb colors
    ('.orb-teal { background: radial-gradient(circle, #D4935A 0%, transparent 70%); }',
     '.orb-teal { background: radial-gradient(circle, #7B3FAE 0%, transparent 70%); }'),
    
    # benefit-card h3 gradient that still uses cyan
    ('linear-gradient(90deg, #D4935A 0%, #B080D8 100%)',
     'linear-gradient(90deg, #B080D8 0%, #D4935A 100%)'),
    
    # Remaining blue/indigo tones in backgrounds  
    ('#1A1460', '#1E0D38'),
    ('#38104A', '#2A1510'),
    ('#0C3E52', '#2A1248'),
    ('#12203D', '#2A1850'),
    ('#0B2D3E', '#1A0D2E'),
    ('#0F1E38', '#22104A'),

    # Nav hover/active – keep as gold accent (not teal)
]

for old, new in replacements:
    if old in css:
        n = css.count(old)
        css = css.replace(old, new)
        print(f'Replaced {n}x: {old} -> {new}')

# Fix section-title gradient specifically
import re
css = re.sub(
    r'background:\s*linear-gradient\(90deg,\s*#[a-fA-F0-9]+ 0%,\s*#[a-fA-F0-9]+ 50%,\s*#[a-fA-F0-9]+ 100%\);\s*\n\s*-webkit-background-clip: text;\s*\n\s*background-clip: text;\s*\n\s*color: transparent;',
    'background: linear-gradient(135deg, #C090E0 0%, #D4935A 55%, #E8B88A 100%);\n  -webkit-background-clip: text;\n  background-clip: text;\n  color: transparent;',
    css
)

with open('style_v7.css', 'w') as f:
    f.write(css)

print('Done!')

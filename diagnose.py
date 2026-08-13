with open('style_v8.css', 'r') as f:
    css = f.read()

# Replace var(--teal) with context-appropriate purple/gold
# Since --teal is now #7B3FAE (vivid purple), these should actually be fine
# But let's also fix teal-light which can look blue-ish

# Check what --teal-light value is now
import re
teal_light_match = re.search(r'--teal-light:\s*(#[0-9a-fA-F]+)', css)
print(f"--teal-light is: {teal_light_match.group(1) if teal_light_match else 'NOT FOUND'}")

teal_match = re.search(r'--teal:\s*(#[0-9a-fA-F]+)', css)
print(f"--teal is: {teal_match.group(1) if teal_match else 'NOT FOUND'}")

# The nav link color "Về Khoá Học" is cyan - this must be coming from 
# var(--teal-light) in some rule OR a hardcoded color

# Check for any hex color that looks cyan/blue-ish that wasn't caught
blue_hexes = re.findall(r'#[0-9a-fA-F]{6}', css)
suspicious = []
for h in set(blue_hexes):
    r = int(h[1:3], 16)
    g = int(h[3:5], 16)  
    b = int(h[5:7], 16)
    # Blue/teal: high blue channel
    if b > 180 and b > r + 50:
        suspicious.append((h, r, g, b))

print("\nRemaining blue-ish hex colors:")
for h, r, g, b in sorted(suspicious):
    # find which lines use it
    lines = [i+1 for i, line in enumerate(css.split('\n')) if h in line or h.lower() in line.lower()]
    print(f"  {h} (r={r},g={g},b={b}) on lines: {lines[:5]}")

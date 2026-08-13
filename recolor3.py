with open('style_v8.css', 'r') as f:
    css = f.read()

original_len = len(css)

# Replace ALL var(--teal) with exact purple hex
css = css.replace('var(--teal)', '#7B3FAE')
css = css.replace('var(--teal-light)', '#C090E0')
css = css.replace('var(--teal-dark)', '#5A2D88')
css = css.replace('var(--teal-glow)', 'rgba(123,63,174,0.4)')

# Replace var(--pink) and var(--blue) which might look blue-ish
css = css.replace('var(--pink)', '#9B60C8')
css = css.replace('var(--pink-light)', '#E8B88A')
css = css.replace('var(--pink-dark)', '#7B3FAE')
css = css.replace('var(--pink-glow)', 'rgba(155,96,200,0.3)')
css = css.replace('var(--blue)', '#5A2D88')
css = css.replace('var(--blue-light)', '#8A5CC0')
css = css.replace('var(--blue-dark)', '#3A1E60')
css = css.replace('var(--blue-glow)', 'rgba(90,45,136,0.35)')
css = css.replace('var(--lavender)', '#B080D8')
css = css.replace('var(--lavender-dark)', '#7B3FAE')
css = css.replace('var(--lavender-light)', '#D0A8F0')
css = css.replace('var(--lavender-glow)', 'rgba(176,128,216,0.3)')
css = css.replace('var(--mint)', '#C87941')
css = css.replace('var(--mint-glow)', 'rgba(200,121,65,0.25)')

with open('style_v8.css', 'w') as f:
    f.write(css)

print(f"Done! File size: {original_len} -> {len(css)}")
print("All CSS variables resolved to direct hex values.")

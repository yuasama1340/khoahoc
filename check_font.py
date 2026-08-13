import sys
from fontTools.ttLib import TTFont

font = TTFont('tieude.ttf')
cmap = font.getBestCmap()
chars = [chr(c) for c in cmap.keys()]
print("Supported chars:")
print("".join(chars))

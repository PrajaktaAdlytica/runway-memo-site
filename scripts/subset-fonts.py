"""Optional asset regeneration: pip install 'fonttools[woff]'. Originals and licenses stay in fonts/."""
from pathlib import Path
from fontTools import subset
from fontTools.ttLib import TTFont
from fontTools.varLib.instancer import instantiateVariableFont

root = Path(__file__).resolve().parent.parent / "fonts"
unicodes = list(range(0x0000, 0x0250)) + list(range(0x2000, 0x2200)) + [0x2212, 0x2713]
for name in ["SourceSerif4", "IBMPlexMono-Regular", "IBMPlexMono-Medium", "Caveat"]:
    font = TTFont(root / f"{name}.ttf")
    options = subset.Options()
    options.flavor = "woff2"
    options.layout_features = ["*"]
    subsetter = subset.Subsetter(options=options)
    subsetter.populate(unicodes=unicodes)
    subsetter.subset(font)
    if name == "SourceSerif4":
        font = instantiateVariableFont(font, {"wght": (400, 400, 700)})
    if name == "Caveat":
        font = instantiateVariableFont(font, {"wght": 400})
    font.flavor = "woff2"
    font.save(root / f"{name}-latin.woff2")

# A small static font for the build-time Open Graph renderer.
font = TTFont(root / "SourceSerif4.ttf")
font = instantiateVariableFont(font, {axis.axisTag: axis.defaultValue for axis in font["fvar"].axes})
subsetter = subset.Subsetter()
subsetter.populate(unicodes=unicodes)
subsetter.subset(font)
font.save(root / "SourceSerif4-OG.ttf")

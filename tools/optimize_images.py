#!/usr/bin/env python3
"""Make lightweight web versions (WebP) of the images shown on the site.

Originals are left untouched; web versions are written to a `web/` folder next
to them (e.g. images/research/web/tsukada2024.webp), and the HTML points at
those. Only new or changed originals are converted unless --force is given.

    python3 tools/optimize_images.py           # convert new/changed images
    python3 tools/optimize_images.py --force   # rebuild everything

After adding a new paper figure to images/research/, run this script and use
images/research/web/<name>.webp in research.html and research_en.html.
"""
import argparse
import io
from pathlib import Path

from PIL import Image, ImageCms, ImageOps

ROOT = Path(__file__).resolve().parent.parent

# (glob relative to the site root, max width in px, WebP quality)
JOBS = [
    ("images/research/*.png", 1000, 85),   # paper figures: cards are at most ~630 px wide
    ("images/research/*.jpg", 1000, 85),
    ("images/research/*.jpeg", 1000, 85),
    ("images/profile/prof_fc_ice.jpg", 1400, 84),   # profile photo (shown cropped to 4:5)
    ("images/profile/cover_image.png", 1200, 88),   # intro image on the top page (old, 600 px)
    ("images/profile/cover_image_origin.png", 1200, 86),   # intro image on the top page (full resolution)
    ("images/covers/cover4.jpg", 900, 80),          # photo cards on the top page
    ("images/covers/cover7.jpg", 900, 80),
    ("images/covers/cover10.jpg", 900, 80),
]

SRGB = ImageCms.createProfile("sRGB")


def to_srgb(im: Image.Image) -> Image.Image:
    """Convert images tagged with another colour space (e.g. iPhone Display P3) to sRGB."""
    icc = im.info.get("icc_profile")
    if not icc:
        return im
    src = ImageCms.ImageCmsProfile(io.BytesIO(icc))
    if "srgb" in ImageCms.getProfileDescription(src).lower():
        return im
    mode = "RGBA" if "A" in im.getbands() else "RGB"
    return ImageCms.profileToProfile(im.convert(mode), src, SRGB, outputMode=mode)


def convert(src: Path, max_w: int, quality: int, force: bool) -> None:
    dst = src.parent / "web" / f"{src.stem}.webp"
    if dst.exists() and not force and dst.stat().st_mtime >= src.stat().st_mtime:
        return
    dst.parent.mkdir(exist_ok=True)
    with Image.open(src) as im:
        im = ImageOps.exif_transpose(im)               # respect camera orientation
        im = to_srgb(im)
        has_alpha = "A" in im.getbands() and im.getchannel("A").getextrema()[0] < 255
        im = im.convert("RGBA" if has_alpha else "RGB")  # drop unused alpha
        if im.width > max_w:
            im = im.resize((max_w, round(im.height * max_w / im.width)), Image.LANCZOS)
        im.save(dst, "WEBP", quality=quality, method=6)  # metadata (EXIF etc.) is not copied
    print(f"{src.relative_to(ROOT)}  {src.stat().st_size // 1024:>5} KB  ->  "
          f"{dst.relative_to(ROOT)}  {dst.stat().st_size // 1024:>4} KB  ({im.width}x{im.height})")


def main() -> None:
    ap = argparse.ArgumentParser(description=__doc__.splitlines()[0])
    ap.add_argument("--force", action="store_true", help="rebuild even if the web version is up to date")
    args = ap.parse_args()
    for pattern, max_w, quality in JOBS:
        for src in sorted(ROOT.glob(pattern)):
            convert(src, max_w, quality, args.force)


if __name__ == "__main__":
    main()

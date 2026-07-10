"""Generate the Comparison pair — RICH, dimensional, jace-style fragments.
Neutral / near-black base + tasteful MUTED colour. NO red, NO prices/numbers.

  comparison-stack  -> the whole stack you replace (cluster of role/tool tiles)
  comparison-engine -> one Agentica engine tile that replaces them all

Run:
  set -a; source /Users/venelin/io-agentica/agentica/.env; set +a
  python3 scripts/gen/generate-comparison.py
"""
import os
from pathlib import Path
from google import genai
from google.genai import types

client = genai.Client(api_key=os.environ["GEMINI_API_KEY"])
OUT = Path("public/images/agentica")
OUT.mkdir(parents=True, exist_ok=True)

STYLE = """
OUTPUT: a premium, RICH, tactile marketing PRODUCT-FRAGMENT illustration for a landing-page comparison card (think jace.ai, Ramp, Linear, Vercel marketing visuals). Figma at 2x. Not a photo, not a flat greyscale wireframe — dimensional, soft and alive. 4:3.

VISUAL SYSTEM:
- CARD BACKGROUND: a soft, gently GRADIENT tinted surface — warm off-white fading into a barely-there pastel corner glow. Never a flat grey rectangle.
- ELEMENTS float with realistic soft drop shadows and gentle depth — rounded (16-22px radius), tactile, lightly glossy, layered. Crisp surfaces with hairline borders and generous whitespace.
- Text: near-black #171717 primary, #6B7280 secondary.
- COLOUR: tasteful and MUTED, harmonizing with a near-black UI — soft slate blue, sage green, warm amber, soft sand, soft lilac-grey. Rich but refined, never primary-bright, never neon.
- ABSOLUTELY NO red, crimson, oxblood, scarlet or hot-pink anywhere. And NO prices, NO currency, NO numbers of any kind.
- A small rounded pill BADGE sits TOP-LEFT with a soft tint and dark text.
- Typography: a tight geometric grotesk (Plus Jakarta Sans / Geist feel). Never serif.

FORBIDDEN: any real brand / app logos; browser chrome, cursors; photos of people; techy purple/cyan gradients, glowing orbs, particles, robots, sparkles; ANY red; ANY price/number; Lorem Ipsum, visible hex codes, the literal words "card / panel / badge".
"""

SCREENS = {
    "comparison-stack": """
THIS FRAGMENT — "the whole stack you'd otherwise juggle". On a soft warm card, FIVE separate elevated tiles are clustered together, overlapping slightly at gentle angles so it feels busy and fragmented — like a pile of disconnected tools and specialists. Each tile is a small rounded card with a simple monoline icon and a role label, and each tile has a DIFFERENT muted tint:
  - "Media buyer" (soft slate)
  - "Designer" (soft amber)
  - "CRO specialist" (sage green)
  - "Landing-page tool" (soft sand)
  - "Ad automation" (soft lilac-grey)
No prices, no numbers anywhere. Dimensional soft shadows, a slightly cluttered, many-things feeling.
Badge (top-left): "The old way".
""",
    "comparison-engine": """
THIS FRAGMENT — "one engine that replaces the whole stack". On a soft warm card, a SINGLE calm, elevated, premium near-black tile sits centered — a dark rounded card with a small minimal geometric diamond logo mark and the wordmark "Agentica" in clean white, plus a thin caption underneath "One engine, end to end". Around it, a few faint hairline connector lines fan inward, hinting it quietly absorbs all the separate roles. Minimal, singular, confident — the opposite of clutter. No prices, no numbers.
Badge (top-left): "With Agentica".
""",
}


def generate(name: str, spec: str) -> None:
    out = OUT / f"{name}.png"
    resp = client.models.generate_content(
        model="gemini-3-pro-image-preview",
        contents=[STYLE + "\n\n" + spec.strip()],
        config=types.GenerateContentConfig(
            image_config=types.ImageConfig(aspect_ratio="4:3", image_size="2K"),
        ),
    )
    for part in resp.parts:
        if getattr(part, "inline_data", None):
            part.as_image().save(out)
            print("saved:", out)
            return
    print("!! no image for", name)


if __name__ == "__main__":
    for name, spec in SCREENS.items():
        try:
            generate(name, spec)
        except Exception as e:  # noqa: BLE001
            print("!! ERROR", name, e)

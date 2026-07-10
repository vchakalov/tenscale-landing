"""Generate the 3 Reclaim 'product fragment' visuals — RICH, dimensional, jace-style.
Neutral / near-black base, but tactile and with tasteful MUTED colour accents
(green = winning/live, amber = testing). NO red / oxblood anywhere.

  1) Describe your offer         -> one offer -> many angles fanning out
  2) Generate angles + creatives -> an overlapping stack of ad-creative thumbnails
  3) Launch personalized funnels -> a fanned stack of landing-page thumbnails

Run:
  set -a; source /Users/venelin/io-agentica/agentica/.env; set +a
  python3 scripts/gen/generate-reclaim.py
"""
import os
from pathlib import Path
from google import genai
from google.genai import types

client = genai.Client(api_key=os.environ["GEMINI_API_KEY"])
OUT = Path("public/images/agentica")
OUT.mkdir(parents=True, exist_ok=True)

STYLE = """
OUTPUT: a premium, RICH, tactile marketing PRODUCT-FRAGMENT illustration for a landing-page card — as if crafted by a top product-marketing design team (think jace.ai, Ramp, Linear, Vercel marketing cards). Figma at 2x. Not a photo, not a full dashboard, and NOT a flat greyscale wireframe — it must feel dimensional, soft and alive. 4:3.

VISUAL SYSTEM (apply to the whole image):
- CARD BACKGROUND: a soft, gently GRADIENT tinted surface — a warm off-white that fades into a barely-there pastel corner glow (a whisper of soft amber or soft slate). Never a flat grey rectangle. It should feel warm and premium.
- ELEMENTS float with realistic soft drop shadows and gentle depth — rounded (16-22px radius), tactile, lightly glossy, layered. Crisp white surfaces #FFFFFF with hairline borders and generous whitespace.
- Text: near-black #171717 primary, #6B7280 secondary.
- COLOUR: tasteful and MUTED, harmonizing with a near-black UI — soft pastels and muted-jewel tones only: slate blue, sage / emerald green, warm amber / honey, soft lilac, warm sand. Colour is used with restraint — for small status tags, tiny tinted icon chips, and the card's soft gradient. Rich but refined, never primary-bright, never neon, never garish.
- STATUS SEMANTICS: green = winning / live, amber = testing, neutral grey = new / draft.
- ABSOLUTELY NO red, crimson, oxblood, scarlet or hot-pink anywhere.
- A small rounded pill BADGE sits TOP-LEFT with a soft colour tint (e.g. soft amber or soft lilac) and dark text — like a premium marketing label.
- Typography: a tight geometric grotesk (Plus Jakarta Sans / Geist feel); tiny figures in clean monospace. Never serif.

ABSOLUTELY FORBIDDEN: any real brand / app logos (no Gmail, Slack, Google, Meta, Notion, etc.); browser chrome, URL bars, OS chrome, cursors; photos of people; techy purple/cyan "AI" gradients, glowing 3D orbs, particles, robot/brain icons, sparkles; ANY red / oxblood; Lorem Ipsum, visible hex codes, or the literal words "card / panel / badge". Only text that would truly appear in the product.
"""

SCREENS = {
    "reclaim-describe": """
THIS FRAGMENT — "one offer becomes many angles". On the left, a single elevated white OFFER tile labelled "Biotico" with a small softly-tinted product thumbnail and the faint word "Offer" above it. From its right edge, smooth soft-grey connector curves fan out to FIVE small rounded angle chips stacked on the right, each an elevated white pill with an angle name and a small status tag: "Hidden bacteria" + a soft GREEN "Winning" tag, "Bloating 50+" + amber "Testing", "Gut reset" + amber "Testing", "Post-antibiotic" + grey "New", "Daily balance" + grey "New". Rich, airy, dimensional — pills cast soft shadows.
Badge (top-left): "One description".
""",
    "reclaim-creatives": """
THIS FRAGMENT — "a library of winning creatives". An overlapping STACK of four ad-creative thumbnail cards, fanned like a hand of cards with real depth and soft shadows. Each thumbnail is a tidy premium mini ad: a clean product shot (a supplement bottle / box) on a SOFT PASTEL-TINTED background (soft sage, soft amber, soft slate, soft sand — a different gentle tint per card), one short headline line, and a small pill button. The FRONT card carries a small soft-GREEN "Winner" tag in its corner. A subtle "+128 creatives" count sits to the side.
Badge (top-left): "Hundreds of creatives".
""",
    "reclaim-funnels": """
THIS FRAGMENT — "a personalized page per angle". A fanned STACK of three or four landing-page thumbnails, overlapping like glossy sheets with soft depth. Each is a simplified premium web page: a slim top bar, a bold headline block, a hero image block with a SOFT PASTEL tint (a different gentle tone per page), a couple of text lines, and a small CTA button — and each page is subtly DIFFERENT (different headline, different hero). The front page shows a small soft-GREEN "Live" dot with the word "Live"; the others are neutral drafts.
Badge (top-left): "A page per angle".
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

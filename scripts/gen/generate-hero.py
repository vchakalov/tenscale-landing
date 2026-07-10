"""Generate the LIGHT, Vercel-monochrome hero: the Agentica 'Overview' awareness
line. Strictly greyscale (no accent colour). Reference = the real product screen.

Run:
  set -a; source /Users/venelin/io-agentica/agentica/.env; set +a
  python3 scripts/gen/generate-hero.py
"""
import os
from pathlib import Path
from google import genai
from google.genai import types
from PIL import Image

client = genai.Client(api_key=os.environ["GEMINI_API_KEY"])
REF = Path("assets/reference-screenshots/ref-hero-awareness.png")
OUT = Path("public/images/agentica/hero-awareness.png")
OUT.parent.mkdir(parents=True, exist_ok=True)

PROMPT = """
OUTPUT: a pixel-crisp, premium marketing MOCKUP of a real B2B SaaS product UI — as if exported from Figma at 2x. Not a photo. A clean, high-end web-app screenshot for a landing-page hero. 16:9 widescreen.

PRODUCT: Agentica — an AI engine that builds a personalized ad funnel for every awareness stage of every buyer.

THIS SCREEN — the "Overview" panel (NO sidebar, just the main content area). A page title "Overview" at top-left. Below it, one large white offering card titled "Biotico" (expanded, with an up-chevron on the right). Inside the card, on a very subtle dotted-grid background, runs a horizontal AWARENESS LINE, left to right, through three circular stage nodes: COLD (sublabel "Unaware · Problem-aware"), WARM (sublabel "Solution-aware"), HOT (sublabel "Product · Most-aware").

The COLD node is filled solid near-black #171717 with a soft, subtle light-grey halo (active). WARM and HOT are clean thin-outlined grey circles (inactive). The connecting track is a thin line running from light grey on the left to a slightly darker charcoal on the right — a restrained GREYSCALE gradient. Absolutely NO blue, orange or red anywhere.

Under the COLD node hang two small strategy chips (pill dropdowns) labelled "funnel" and "Koliki", each with a tiny neutral grey dot and a small chevron. Under WARM and under HOT sit soft dashed empty-state boxes reading "Nothing speaks to warm audiences yet" and "Nothing speaks to hot audiences yet", each with a faint "+ Add strategy" link. Below the Biotico card, a second collapsed offering row "Joint Cure" with a down-chevron. At the very bottom, the start of an "Engine activity" section header with one or two faint activity rows just beginning (this lower part will be cropped off).

VERCEL / LINEAR PREMIUM MONOCHROME SYSTEM (apply to the whole screen):
- Canvas: warm off-white #FAF9F7 with a very subtle dotted grid inside the card. Cards/surfaces pure white #FFFFFF, 1px hairline border #ECEAE4, 16px radius, a very soft shadow (0 1px 2px rgba(16,24,40,0.05)). Generous whitespace, 24-32px padding.
- Text: near-black #171717 primary, #6B7280 secondary, #9CA3AF faint labels.
- STRICTLY MONOCHROME - black, white and greys ONLY. NO accent colour at all: no red, no oxblood, no blue, no orange, no purple, no green. The only emphasis is the near-black filled COLD node with its soft grey halo.
- Typography: a tight geometric grotesk (Plus Jakarta Sans / Sohne / Geist feel); any figures in a clean monospace. Never serif, never default-Inter-bland.

ABSOLUTELY FORBIDDEN: Meta / Facebook / Instagram or any real brand logos; browser chrome, URL bars, OS chrome, mouse cursors; photos of people; purple/cyan "AI" gradients, glowing 3D orbs, particles, robot/brain iconography, sparkles; ANY accent colour - keep it pure greyscale; Lorem Ipsum, placeholder strings, visible hex codes, or the words "sidebar / card / panel". Only render text that would truly appear in the product UI.

USE THE ATTACHED SCREENSHOT as the layout and content reference (same awareness line, same COLD / WARM / HOT structure and sublabels, same "funnel"/"Koliki" strategy chips under COLD, same empty warm/hot states, same dotted grid) but redraw it sleeker, sharper and more premium in the Vercel monochrome system above - pure greyscale, no colour at all. Keep it 16:9 widescreen.
"""

resp = client.models.generate_content(
    model="gemini-3-pro-image-preview",
    contents=[PROMPT, Image.open(REF)],
    config=types.GenerateContentConfig(
        image_config=types.ImageConfig(aspect_ratio="16:9", image_size="2K"),
    ),
)
for part in resp.parts:
    if getattr(part, "inline_data", None):
        part.as_image().save(OUT)
        print("saved:", OUT)
        break
else:
    print("!! no image returned")

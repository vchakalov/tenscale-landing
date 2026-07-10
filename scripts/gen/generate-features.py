"""Generate Features 'product screenshot' visuals — look like REAL screenshots
from the Agentica app (authentic chrome). Neutral app UI + tasteful MUTED colour
(green = winning/live, amber = testing). NO red / oxblood / orange anywhere.

Run one screen:
  set -a; source /Users/venelin/io-agentica/agentica/.env; set +a
  python3 scripts/gen/generate-features.py features-angles
Or all:
  python3 scripts/gen/generate-features.py
"""
import os
import sys
from pathlib import Path
from google import genai
from google.genai import types
from PIL import Image

client = genai.Client(api_key=os.environ["GEMINI_API_KEY"])
REF_DIR = Path("assets/reference-screenshots")
OUT = Path("public/images/agentica")
OUT.mkdir(parents=True, exist_ok=True)

LP_PROMPT = """
OUTPUT: a pixel-crisp screenshot that looks captured straight from a real premium B2B SaaS product — the Agentica app. An authentic PRODUCT SCREENSHOT, not a marketing illustration. 16:9.

THIS SCREEN — a "Pages" compare view. A light neutral app frame: top bar with a small sparkle icon, the page title "Save up to $967", a soft "COLD" chip, a segmented toggle "Original | Personalized" (Personalized selected), a small green "Live" dot with "Live", a "Copy link" item, and a dark near-black "Re-deploy" button. Below, TWO rendered landing-page previews SIDE BY SIDE in soft-shadowed browser-style frames — the SAME page (muted slate-blue hero, big headline, a sub-line with "Save up to $967", a form "Are you currently insured?" with stacked "Yes"/"No" buttons). Only the headline differs and is softly HIGHLIGHTED (pale amber): LEFT tag "Audi owners", headline "Why pay a premium just because you drive an Audi?"; RIGHT tag "Honda owners", headline "Stop overpaying for your Honda insurance". Footer: "Only the highlighted copy changes — prices & facts stay untouched." Muted slate hero, green live, pale amber highlight. NO red, orange, crimson.
"""

ANGLES_PROMPT = """
OUTPUT: a pixel-crisp screenshot that looks captured straight from a real premium B2B SaaS product — the Agentica app. An authentic PRODUCT SCREENSHOT (not a marketing illustration, not a flat wireframe). Figma-2x. 16:9.

THIS SCREEN — the "Angle Evaluator", a three-column kanban board.
- Top-left breadcrumb "NexoBiota / Performance". Below it two tabs "Explorer" and "Evaluator" with Evaluator ACTIVE (a subtle near-black underline). Page title "Angle Evaluator". A small product chip with a tiny bottle icon reading "CLEAR" and "· ran 9h". Top-right: a "History" button, an "Active" dropdown, and a date chip "6 Jul – 6 Jul".
- THREE columns, each header has a count and a small "Rules" button on the right. Each card is a white rounded card: a title, a metric row with four labelled figures ROAS / CPA / SPEND / PURCH, and a footer line + an "Edit" link.

Column 1 — "Winning 3" (soft GREEN underline under the header):
  - "New | Colonoscopy" — ROAS 4.2× (green) / CPA €5.10 / SPEND €352 / PURCH 44 — footer "9 ads · promoted"
  - "New | Gas & Bloating 50+" with a small "Pinned" tag — ROAS 5.6× (green) / CPA €4.20 / SPEND €287 / PURCH 39 — footer "7 ads · promoted"
  - "New | Hidden Bacteria" — ROAS 3.9× (green) / CPA €5.80 / SPEND €410 / PURCH 51 — footer "6 ads · promoted"

Column 2 — "Testing 5" (soft amber underline):
  - "New | The Top Button" with an amber "Testing" tag — ROAS 3.1× / CPA €7.40 / SPEND €96 / PURCH 12
  - "New | The Unwanted Guests" with a grey "Not tested" tag — ROAS — / CPA — / SPEND €0.00 / PURCH 0
  - "New | The Age Lie" grey "Not tested" — — / — / €0.00 / 0
  - "New | The Shrinking Menu" grey "Not tested" — — / — / €0.00 / 0

Column 3 — "Losers 3" (soft neutral-grey underline):
  - "New | Wasted Money" — ROAS 1.6× / CPA €18.20 / SPEND €54.60 / PURCH 3 — footer "5 ads · weak roas"
  - "Hidden Bacteria SIBO" — ROAS 1.2× / CPA €22.40 / SPEND €22.40 / PURCH 1 — footer "4 ads · weak roas"
  - "New | Antibiotics" with a "Pinned" tag — ROAS 2.1× / CPA €12.10 / SPEND €12.10 / PURCH 1 — footer "1 ad · weak roas"

VISUAL SYSTEM:
- Warm off-white #FAF9F7 canvas, white cards #FFFFFF, hairline borders #ECEAE4, soft shadows, generous whitespace, tight geometric grotesk type, near-black #171717 text, grey #6B7280 labels. Metric figures in a clean monospace, tabular.
- Accents: GREEN = winning ROAS + the Winning column underline; soft amber = Testing; neutral grey = Losers / Not tested. ABSOLUTELY NO red, crimson, orange or oxblood anywhere — the real product's red accents must become near-black or green here.

FORBIDDEN: real brand / app logos; OS or browser chrome, URL bars, cursors; photos of people; purple/cyan gradients, orbs, robots, sparkles; ANY red or orange; Lorem Ipsum, visible hex codes, the words "card / panel". Only text that would truly appear in the product.

USE THE ATTACHED SCREENSHOT as the layout reference (same three columns, headers, Rules buttons, card structure, breadcrumb, tabs) but redraw it cleaner and more premium in the mono + green/amber palette above, using the improved numbers listed. Keep it 16:9.
"""

WORKFLOWS_PROMPT = """
OUTPUT: a pixel-crisp screenshot that looks captured straight from a real premium B2B SaaS product — the Agentica app. An authentic PRODUCT SCREENSHOT (not a marketing illustration, not a flat wireframe). Figma-2x. 16:9.

THIS SCREEN — the automatic-rules "Workflows" builder.
- Top-left breadcrumb "NexoBiota / Workflows". Below it a back chevron and the rule title "CBO CLEAR | RECREATE | P&R". Top-right: a GREEN primary "Save" button.
- A "SEES" row of scope chips: a "CBO CLEAR" chip with a small megaphone icon, "Ad sets · Active" (with an x), "Ads · Active" (with an x), and a dashed "No offering" chip.
- Below, a nested condition builder inside a white panel:
  - An outer GREEN "AND" group (a vertical green rail on the left labelled "AND"), with a "No timeframe" dropdown and a small green "+" button.
  - First condition row: a "Spend" dropdown, a ">" selector, and a value field "€ 22".
  - A nested GREEN "OR" group (green rail labelled "OR") with a "Last 3 days" dropdown and a green "+", containing two condition rows: "Results = 0" and "Cost Per Result > € 11", with muted "+ Condition" and "+ Group" links below.
  - A second nested GREEN "OR" group with a "Custom…" dropdown, a "last_2d" value chip and a green "+", containing "Results = 0" and "Cost Per Result > € 11", and "+ Condition" / "+ Group" links.
  - On the right of each group row, small grey gear / duplicate / trash icons.

VISUAL SYSTEM:
- Warm off-white #FAF9F7 canvas, white surfaces #FFFFFF, hairline borders #ECEAE4, soft shadows, generous whitespace, tight geometric grotesk type, near-black #171717 text, grey #6B7280 labels.
- Accent: a MUTED EMERALD GREEN (around #2F855A) for the AND/OR group labels + their vertical rails, the "Save" button, and the small "+" add buttons. Everything else neutral greyscale. ABSOLUTELY NO red, crimson, orange or oxblood anywhere — every red element in the reference must become this muted green.

FORBIDDEN: real brand / app logos; OS or browser chrome, URL bars, cursors; photos of people; purple/cyan gradients, orbs, robots, sparkles; ANY red or orange; Lorem Ipsum, visible hex codes, the words "card / panel". Only text that would truly appear in the product.

USE THE ATTACHED SCREENSHOT as the exact layout reference (same breadcrumb, title, Save, SEES chips, nested AND/OR groups, conditions, +Condition / +Group links, right-side icons) but redraw it cleaner and more premium, recolouring EVERY red element to the muted green. Keep it 16:9.
"""

DEMO_PROMPT = """
OUTPUT: a pixel-crisp screenshot that looks captured straight from a real premium B2B SaaS product — the Agentica app. An authentic PRODUCT SCREENSHOT (not a marketing illustration, not a flat wireframe). Figma-2x. 16:9.

THIS SCREEN — the "Funnel Builder" with a performance rail on the right.
- Top bar: a back chevron, title "Audi Owners"; a pill reading "Angle · Save up to $967 · Strategy · Audi Owners"; a soft "COLD" chip; a "Draft" chip; and on the right a subtle "Deploy" button plus a GREEN primary "+ Add step" button.
- LEFT: a vertical funnel of THREE connected node cards, each a white rounded card with a small monoline icon and a green "Ready" dot, connected top-to-bottom by a thin line:
  1. "The Ad" with a small "ROOT" tag — a megaphone icon — "Ready".
  2. "Landing Page" with a small "Angle" tag — a web-page / layout icon — "Ready · edit".
  3. "Checkout" with a small "Angle" tag — a shopping-cart / checkout icon — "Ready".
- RIGHT rail titled "FUNNEL PERFORMANCE · Last 30 days": four stat cards in a 2x2 grid:
  - "Conversions" 1,786 with a small green "↑ 22% vs prev".
  - "Conv. rate" 9.6%.
  - "Cost / purchase" €4.10.
  - "ROAS" 5.3× — this figure in GREEN (the one positive highlight).
  Below, a "STAGE BREAKDOWN" waterfall:
  - "The Ad" 18,600 · 100% (a full-width soft neutral bar).
  - "↳ 80% continue · 20% drop".
  - "Landing page" 14,880 · 80% (an 80% bar).
  - "↳ 12% continue · 88% drop".
  - "Checkout" 1,786 · 9.6% (a short bar).
  Then a soft callout box: "9.6% of everyone who saw the ad checked out — a personalized page and checkout for every angle."

VISUAL SYSTEM:
- Warm off-white #FAF9F7 canvas, white cards #FFFFFF, hairline borders #ECEAE4, soft shadows, generous whitespace, tight geometric grotesk type, near-black #171717 text, grey #6B7280 labels. Figures in clean monospace, tabular.
- Accents: GREEN for the "+ Add step" button, the "Ready" dots, the positive "↑ 22% vs prev" trend and the ROAS figure. The waterfall bars are neutral grey. ABSOLUTELY NO red, crimson, orange or oxblood anywhere — every red element in the reference must become green or neutral grey.

FORBIDDEN: real brand / app logos; real URLs (use "Landing Page", never a github address); OS or browser chrome, cursors; photos of people; purple/cyan gradients, orbs, robots, sparkles; ANY red or orange; Lorem Ipsum, visible hex codes, the words "card / panel". Only text that would truly appear in the product.

USE THE ATTACHED SCREENSHOT as the layout reference (same funnel-builder layout, same performance rail, stat cards, stage-breakdown waterfall, callout) but change the funnel to "The Ad → Landing Page (Angle) → Checkout (Angle)", use the improved numbers above, and recolour every red element to green or neutral. Keep it 16:9.
"""

SCREENS = {
    "demo-funnel": {
        "refs": ["ref-demo-funnel.png"],
        "prompt": DEMO_PROMPT,
    },
    "features-lp": {
        "refs": ["ref-features-editor.png", "ref-features-page.png"],
        "prompt": LP_PROMPT,
    },
    "features-angles": {
        "refs": ["ref-features-angles.png"],
        "prompt": ANGLES_PROMPT,
    },
    "features-workflows": {
        "refs": ["ref-features-workflows.png"],
        "prompt": WORKFLOWS_PROMPT,
    },
}


def generate(name: str, cfg: dict) -> None:
    out = OUT / f"{name}.png"
    contents = [cfg["prompt"]]
    for ref in cfg["refs"]:
        p = REF_DIR / ref
        if p.exists():
            contents.append(Image.open(p))
    resp = client.models.generate_content(
        model="gemini-3-pro-image-preview",
        contents=contents,
        config=types.GenerateContentConfig(
            image_config=types.ImageConfig(aspect_ratio="16:9", image_size="2K"),
        ),
    )
    for part in resp.parts:
        if getattr(part, "inline_data", None):
            part.as_image().save(out)
            print("saved:", out)
            return
    print("!! no image for", name)


if __name__ == "__main__":
    want = sys.argv[1:] or list(SCREENS)
    for name in want:
        generate(name, SCREENS[name])

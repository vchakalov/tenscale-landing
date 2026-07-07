"""Generate premium LIGHT (Ramp-style) demo mockups for the Agentica landing.

Each screen uses the user's REAL product screenshot as a layout/content reference,
re-rendered as a pristine, premium, light-theme SaaS UI mockup. Model:
gemini-3-pro-image-preview (Nano Banana Pro). Key from env (source agentica/.env).

Run:
  set -a; source /Users/venelin/io-agentica/agentica/.env; set +a
  python3 scripts/gen/generate-agentica-demos.py
"""
import os
from pathlib import Path
from google import genai
from google.genai import types
from PIL import Image

client = genai.Client(api_key=os.environ["GEMINI_API_KEY"])

REF_DIR = Path("assets/reference-screenshots")
OUT_DIR = Path("public/images/agentica")
OUT_DIR.mkdir(parents=True, exist_ok=True)

# ---------------------------------------------------------------------------
# LIGHT premium visual system — Ramp-inspired. Luxurious, clean, ONE red accent.
# ---------------------------------------------------------------------------
STYLE_PREFIX = """
OUTPUT: a pixel-crisp, premium marketing MOCKUP of a real B2B SaaS product UI — as if exported from Figma at 2x. Not a photo. A clean, high-end web-app screenshot for a landing page.

PRODUCT: Agentica — an AI engine that builds personalized ad funnels for Meta advertisers (angles, creatives, personalized landing pages, automatic ad rules, and Messenger sales bots).

LIGHT VISUAL SYSTEM (apply to the whole screen — think Ramp, Linear, Vercel dashboards):
- Canvas background: pure white #FFFFFF, with an optional very light #FAFAFA panel behind cards.
- Card / surface: #FFFFFF, 1px hairline border #ECECEC, 12px radius, a very soft shadow (0 1px 2px rgba(16,24,40,0.05)). Generous whitespace, 24–32px padding.
- Primary text: near-black #171717. Secondary/muted text: #6B7280. Faint labels: #9CA3AF.
- ONE signature accent: warm red #E5484D — used SPARINGLY: the primary button, the active sidebar item, ONE hero metric per screen, focus rings, and "Winner"/"Live" status pills. Never large red fills.
- Positive deltas & "Active/Live" dots may use green #16A34A. No other accent colors.
- Data & metrics in a monospace face (JetBrains Mono feel): tabular figures, crisp. UI text in a tight geometric grotesk (Plus Jakarta Sans / Söhne feel) — never default Inter-bland, never serif.
- Charts: thin, elegant lines/bars, no heavy gridlines, one baseline; a subtle red area-fill under a hero line is allowed.
- Currency is Euro (€). Numbers must look real (ROAS 2.7×, CPL €18.40, CTR 1.84%, conv 5.0%) — no round placeholders, no "Sample Data", no Lorem Ipsum.

ABSOLUTELY FORBIDDEN:
- Meta / Facebook / Instagram logos or Ads-Manager chrome; real brand logos; real photos of people.
- Browser chrome, URL bars, OS chrome, mouse cursors.
- Purple/cyan "AI" gradients, glowing 3D shapes, particles, robot/brain iconography, sparkles.
- Multiple competing accent colors (ONE red + optional green only).
- Lorem Ipsum, placeholder strings, broken layout, or any visible style-spec text (hex codes, font names, the words "sidebar/card/panel").
- Only render text that would truly appear in the product UI.

USE THE ATTACHED SCREENSHOT as the exact reference for layout, structure, the labels, and the numbers. Redraw it faithfully in the light premium system above — same content, same panels, same figures — but cleaner, sharper, more premium and legible. Keep it 16:9 widescreen.
"""

SCREENS = {
    "funnel-builder": """
THIS SCREEN — the Funnel Builder. A vertical flow of three connected nodes on a light canvas: "The Ad" (ROOT) → a landing-page node → "Instant form", each a white card with a small monoline icon and a green "Ready" dot. Top bar: back chevron, title "Audi Owners", a pill "Angle · Save up to $967 · Strategy · Audi Owners", a blue "COLD" chip, a "Draft" chip, and top-right a subtle "Deploy" button + a red "+ Add step" primary button. Right rail "FUNNEL PERFORMANCE · Last 30 days": four stat cards — Conversions 627 (green ↑12% vs prev), Conv. rate 5.0%, Cost/lead €3.80, ROAS 2.7× (the ROAS is the ONE red hero metric). Below, a "STAGE BREAKDOWN" waterfall: The Ad 12,480 · 100% (full bar), 62% continue · 38% drop, landing 7,738 · 62%, 8.1% continue · 92% drop, Instant form 627 · 5%. A soft callout: "5.0% of everyone who saw the ad converted. The biggest drop is at the landing page."
""",
    "angle-evaluator": """
THIS SCREEN — the Angle Evaluator, a three-column kanban board on white. Top: breadcrumb "NexoBiota / Performance", tabs "Explorer" and an active "Evaluator", title "Angle Evaluator", a small product chip "CLEAR · ran 9h", and top-right "History", "Active ▾", a date chip "6 Jul – 6 Jul". Three columns each with a header and a "Rules" button: "Winning 1" (green underline) with card "New | Colonoscopy" ROAS 2.9× / CPA €13.26 / SPEND €252 / PURCH 19, footer "8 ads · promoted"; "Testing 5" (blue underline) with cards "New | Gas & Bloating 50+" (Pinned) ROAS 9.4× (green) / CPA €2.98 / SPEND €2.98 / PURCH 1, then "New | The Top Button", "New | The Unwanted Guests", "New | The Age Lie" (all "Not tested", €0.00 / 0); "Losers 3" with "New | Wasted Money" ROAS 2.2× / CPA €16.14 / SPEND €48.41 / PURCH 3, "Hidden Bacteria SIBO" ROAS 1.4×, "New | Antibiotics" (Pinned) ROAS 2.5×. Each metric row uses mono figures.
""",
    "creative-library": """
THIS SCREEN — the Creative Library / Leads view. Left sidebar (220px) with wordmark "Agentica" and nav: Hub, Leads (active, red), Creatives, Checkouts, Sales, Settings. Top bar: title "LEADS — BIOTICO", breadcrumb "Hub › Leads", a search field, avatar + bell. Tabs "FB" (active red underline) / "GOOGLE". A row of five lead-gen tool cards, the first ("ADS", with red crosshair corner brackets) then "POST COMMENTER", "FB GROUPS", "ANSWER COMMENTS", "DMs", each showing "VOL 7d" and "CPL" (924 / €19.20, 312 / €4.10, 287 / €6.80, 194 / €2.40, 125 / €9.10). Below, "ADS — RECENT CREATIVES": five clean product-ad cards for a supplement brand "Biotico" (white capsule/bottle product shots on soft neutral backgrounds), two marked "WINNER" (red pill), each with a headline and a "Learn more"/"Shop now" button and "1.2K · 84 comments". Right rail "LIVE STATS": hero number 1,842 (red) "LEADS — LAST 7 DAYS" with a red area-line chart, "CPL overall €18.40", "Best tool POST COMMENTER €4.10", "Auto-pause triggered 3 times this week", and an "Open Engine →" button.
""",
    "register-lp": """
THIS SCREEN — a centered modal "REGISTER A LANDING PAGE" on a dimmed light backdrop, progress bar ~40%. Heading "Add one line to your site" with sub "This snippet does both jobs — it lets us read your page now, and personalizes it per angle once you're live." A dark code block (the ONE dark element, a terminal card) titled "PASTE BEFORE </HEAD>" with a "Copy" button, showing a small async <script> snippet with data-company / data-base / data-api attributes (generic, no real secrets). Below, a "Where" row of platform chips: "HTML head", "Google Tag Manager", "Shopify theme.liquid", "Webflow". A waiting row "● Waiting for your site…" with an "I've added it" button. A reassuring green line: "Safe to add now — it does nothing to your live page until you publish an angle, and only rewrites text we mapped (never structure, prices or facts)." Footer: "← Back" and a red primary "Read my page →".
""",
    "workflows": """
THIS SCREEN — the automatic-rules Workflow builder on white. Top: breadcrumb "NexoBiota / Workflows", title "CBO CLEAR | RECREATE | P&R", a red "Save" button top-right. A "SEES" row of scope chips: "CBO CLEAR", "Ad sets · Active", "Ads · Active", "No offering ▾". Below, a nested condition builder with coloured vertical rails: a blue "AND" group containing a condition "Spend > € 22" with a "No timeframe ▾" selector; inside it green "OR" groups, one "Last 3 days" with conditions "Results = 0" and "Cost Per Result > € 11", another "Custom… last_2d" with "Results = 0" and "Cost Per Result > € 11". Each condition is a clean white pill-row with dropdown fields and mono numbers; "+ Condition" and "+ Group" add-links in muted text; small gear/duplicate/trash icons on the right of a group.
""",
}


def generate(name: str, spec: str) -> None:
    ref_path = REF_DIR / f"ref-{name}.png"
    out_path = OUT_DIR / f"{name}.png"
    prompt = STYLE_PREFIX + "\n\n" + spec.strip()
    print(f"Generating {name} (ref: {ref_path.name}) ...")
    contents = [prompt]
    if ref_path.exists():
        contents.append(Image.open(ref_path))
    resp = client.models.generate_content(
        model="gemini-3-pro-image-preview",
        contents=contents,
        config=types.GenerateContentConfig(
            image_config=types.ImageConfig(aspect_ratio="16:9", image_size="2K"),
        ),
    )
    for part in resp.parts:
        if getattr(part, "inline_data", None):
            part.as_image().save(out_path)
            print(f"  saved: {out_path}")
            return
    print(f"  !! no image returned for {name}")


if __name__ == "__main__":
    for name, spec in SCREENS.items():
        try:
            generate(name, spec)
        except Exception as e:  # noqa: BLE001
            print(f"  !! ERROR {name}: {e}")
    print("done.")

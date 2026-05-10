from pathlib import Path
from xml.sax.saxutils import escape

from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER, TA_LEFT
from reportlab.lib.pagesizes import LETTER
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import inch
from reportlab.platypus import (
    HRFlowable,
    KeepTogether,
    PageBreak,
    Paragraph,
    SimpleDocTemplate,
    Spacer,
    Table,
    TableStyle,
)


ROOT = Path(__file__).resolve().parents[1]

BG = colors.HexColor("#050708")
PANEL = colors.HexColor("#0b1315")
PANEL_2 = colors.HexColor("#101b1d")
LINE = colors.HexColor("#2a4448")
TEXT = colors.HexColor("#f4f8f8")
SOFT = colors.HexColor("#cbe3e4")
MUTED = colors.HexColor("#9fb7b9")
CYAN = colors.HexColor("#5fe7ff")
LIME = colors.HexColor("#bdff5a")
AMBER = colors.HexColor("#ffd67a")

CONTACT = {
    "email": "dejesusmisael95@gmail.com",
    "phone": "630-352-1725",
    "location": "Los Angeles, CA",
    "site": "misaeldejesus.xyz",
    "site_url": "https://misaeldejesus.xyz",
}


def draw_background(canvas, doc):
    canvas.saveState()
    width, height = LETTER
    canvas.setFillColor(BG)
    canvas.rect(0, 0, width, height, fill=1, stroke=0)
    canvas.setFillColor(colors.Color(0.37, 0.91, 1, alpha=0.08))
    canvas.circle(width - 0.7 * inch, height - 0.65 * inch, 2.2 * inch, fill=1, stroke=0)
    canvas.setFillColor(colors.Color(0.74, 1, 0.35, alpha=0.055))
    canvas.circle(0.15 * inch, 0.55 * inch, 2.0 * inch, fill=1, stroke=0)
    canvas.setStrokeColor(colors.Color(1, 1, 1, alpha=0.12))
    canvas.setLineWidth(0.4)
    for i in range(0, 9):
        x = 0.5 * inch + i * 0.82 * inch
        canvas.line(x, 0.35 * inch, x + 1.6 * inch, height - 0.25 * inch)
    canvas.setFillColor(MUTED)
    canvas.setFont("Helvetica", 7)
    canvas.drawRightString(width - 0.5 * inch, 0.32 * inch, f"{CONTACT['site']} / {doc.page}")
    canvas.restoreState()


def make_styles(accent):
    styles = getSampleStyleSheet()
    return {
        "title": ParagraphStyle(
            "Title",
            parent=styles["Normal"],
            fontName="Helvetica-Bold",
            fontSize=23,
            leading=25,
            textColor=TEXT,
            alignment=TA_CENTER,
            spaceAfter=5,
        ),
        "subtitle": ParagraphStyle(
            "Subtitle",
            parent=styles["Normal"],
            fontName="Helvetica-Bold",
            fontSize=9.5,
            leading=12,
            textColor=accent,
            alignment=TA_CENTER,
            spaceAfter=6,
        ),
        "contact": ParagraphStyle(
            "Contact",
            parent=styles["Normal"],
            fontName="Helvetica",
            fontSize=8.2,
            leading=11,
            textColor=SOFT,
            alignment=TA_CENTER,
            spaceAfter=14,
        ),
        "section": ParagraphStyle(
            "Section",
            parent=styles["Normal"],
            fontName="Helvetica-Bold",
            fontSize=9.2,
            leading=11,
            textColor=accent,
            spaceBefore=8,
            spaceAfter=6,
        ),
        "body": ParagraphStyle(
            "Body",
            parent=styles["Normal"],
            fontName="Helvetica",
            fontSize=8.35,
            leading=11.2,
            textColor=SOFT,
            spaceAfter=5,
        ),
        "small": ParagraphStyle(
            "Small",
            parent=styles["Normal"],
            fontName="Helvetica",
            fontSize=7.55,
            leading=9.7,
            textColor=MUTED,
            spaceAfter=2,
        ),
        "role": ParagraphStyle(
            "Role",
            parent=styles["Normal"],
            fontName="Helvetica-Bold",
            fontSize=8.8,
            leading=11,
            textColor=TEXT,
            spaceAfter=3,
        ),
        "chip": ParagraphStyle(
            "Chip",
            parent=styles["Normal"],
            fontName="Helvetica-Bold",
            fontSize=7.2,
            leading=9,
            textColor=TEXT,
            alignment=TA_CENTER,
        ),
        "label": ParagraphStyle(
            "Label",
            parent=styles["Normal"],
            fontName="Helvetica-Bold",
            fontSize=7.3,
            leading=9.3,
            textColor=accent,
            spaceAfter=2,
        ),
        "plain_title": ParagraphStyle(
            "PlainTitle",
            parent=styles["Normal"],
            fontName="Helvetica-Bold",
            fontSize=13,
            leading=15,
            textColor=TEXT,
            spaceAfter=4,
        ),
        "plain_subtitle": ParagraphStyle(
            "PlainSubtitle",
            parent=styles["Normal"],
            fontName="Helvetica",
            fontSize=9,
            leading=12,
            textColor=colors.HexColor("#111111"),
            alignment=TA_LEFT,
        ),
        "plain_body": ParagraphStyle(
            "PlainBody",
            parent=styles["Normal"],
            fontName="Helvetica",
            fontSize=8.4,
            leading=10.7,
            textColor=colors.HexColor("#111111"),
            spaceAfter=4,
        ),
        "plain_section": ParagraphStyle(
            "PlainSection",
            parent=styles["Normal"],
            fontName="Helvetica-Bold",
            fontSize=9.2,
            leading=11,
            textColor=colors.HexColor("#0b5966"),
            spaceBefore=8,
            spaceAfter=5,
        ),
    }


def P(text, style):
    return Paragraph(text, style)


def safe(text):
    return escape(text)


def contact_line(styles):
    return P(
        f"{safe(CONTACT['location'])} / "
        f"<link href='mailto:{CONTACT['email']}' color='#cbe3e4'>{CONTACT['email']}</link> / "
        f"{CONTACT['phone']} / "
        f"<link href='{CONTACT['site_url']}' color='#cbe3e4'>{CONTACT['site']}</link>",
        styles["contact"],
    )


def heading(text, styles, accent):
    return [
        P(text.upper(), styles["section"]),
        HRFlowable(width="100%", thickness=0.6, color=colors.Color(accent.red, accent.green, accent.blue, alpha=0.45)),
        Spacer(1, 5),
    ]


def bullet_items(items, styles):
    flow = []
    for item in items:
        flow.append(P(f"- {safe(item)}", styles["body"]))
    return flow


def card(title, meta, bullets, styles, accent):
    content = [
        P(safe(title), styles["role"]),
        P(safe(meta), styles["label"]),
    ]
    content.extend(P(f"- {safe(item)}", styles["small"]) for item in bullets)
    table = Table([[content]], colWidths=[7.15 * inch])
    table.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, -1), PANEL),
                ("BOX", (0, 0), (-1, -1), 0.55, LINE),
                ("LEFTPADDING", (0, 0), (-1, -1), 10),
                ("RIGHTPADDING", (0, 0), (-1, -1), 10),
                ("TOPPADDING", (0, 0), (-1, -1), 8),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 7),
            ]
        )
    )
    return KeepTogether([table, Spacer(1, 6)])


def chip_grid(items, styles, accent):
    rows = []
    row = []
    for item in items:
        row.append(P(safe(item), styles["chip"]))
        if len(row) == 3:
            rows.append(row)
            row = []
    if row:
        while len(row) < 3:
            row.append("")
        rows.append(row)
    table = Table(rows, colWidths=[2.32 * inch, 2.32 * inch, 2.32 * inch], hAlign="LEFT")
    table.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, -1), PANEL_2),
                ("BOX", (0, 0), (-1, -1), 0.45, LINE),
                ("INNERGRID", (0, 0), (-1, -1), 0.35, LINE),
                ("LEFTPADDING", (0, 0), (-1, -1), 6),
                ("RIGHTPADDING", (0, 0), (-1, -1), 6),
                ("TOPPADDING", (0, 0), (-1, -1), 5),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 5),
            ]
        )
    )
    return table


def build_dark_pdf(path, title, subtitle, accent, story_builder):
    styles = make_styles(accent)
    doc = SimpleDocTemplate(
        str(path),
        pagesize=LETTER,
        rightMargin=0.55 * inch,
        leftMargin=0.55 * inch,
        topMargin=0.44 * inch,
        bottomMargin=0.48 * inch,
    )
    story = [
        P(safe(title), styles["title"]),
        P(safe(subtitle), styles["subtitle"]),
        contact_line(styles),
    ]
    story.extend(story_builder(styles, accent))
    doc.build(story, onFirstPage=draw_background, onLaterPages=draw_background)


def build_plain_pdf(path, title, subtitle, sections, accent=CYAN):
    styles = make_styles(accent)
    doc = SimpleDocTemplate(
        str(path),
        pagesize=LETTER,
        rightMargin=0.6 * inch,
        leftMargin=0.6 * inch,
        topMargin=0.5 * inch,
        bottomMargin=0.5 * inch,
    )
    story = [
        P(safe(title), styles["plain_title"]),
        P(safe(subtitle), styles["plain_subtitle"]),
        P(
            f"{safe(CONTACT['location'])} / {CONTACT['email']} / {CONTACT['phone']} / {CONTACT['site']}",
            styles["plain_body"],
        ),
        HRFlowable(width="100%", thickness=0.7, color=colors.HexColor("#0b5966")),
    ]
    for section_title, items in sections:
        story.append(P(section_title.upper(), styles["plain_section"]))
        for item in items:
            if isinstance(item, tuple):
                story.append(P(f"<b>{safe(item[0])}</b> - {safe(item[1])}", styles["plain_body"]))
            else:
                story.append(P(f"- {safe(item)}", styles["plain_body"]))
    doc.build(story)


def product_story(styles, accent):
    story = []
    story.extend(heading("Profile", styles, accent))
    story.append(
        P(
            "Creative technologist and founder-operator building polished web design, product systems, "
            "Web3 launch infrastructure, AI-assisted MVPs, and cinematic brand worlds. Strong at turning "
            "raw ideas into launchable interfaces, build specs, visual identities, and working application flows.",
            styles["body"],
        )
    )
    story.extend(heading("Core Stack", styles, accent))
    story.append(
        chip_grid(
            [
                "React / Next.js / TypeScript",
                "Vite / APIs / Webhooks",
                "Supabase / Render / Vercel",
                "Solana + EVM Architecture",
                "Wallet UX / Escrow Logic",
                "AI Coding Agents / MCP",
                "Product Strategy / UX Writing",
                "Adobe Suite / Blender",
                "Motion / 3D / Generative Assets",
            ],
            styles,
            accent,
        )
    )
    story.extend(heading("Selected Web Design + Product Work", styles, accent))
    projects = [
        (
            "Commit to Ship",
            "Founder/Product Architect / Web3 launch accountability",
            [
                "Designed a Solana accountability assistant with creator-fee escrow thinking, milestone release logic, holder voting, and founder commitment flows.",
                "Mapped Next.js, Supabase, Solana RPC, server-side escrow handling, encrypted wallet storage, and audit-ready data flows.",
            ],
        ),
        (
            "Paco the Chicken",
            "Web Design / Character-led site direction / pacothechicken.xyz",
            [
                "Added character-led web experience assets and project positioning for a meme-native brand world.",
                "Built visual direction around bold campaign art, storytelling moments, and a portfolio-ready live-site case study.",
            ],
        ),
        (
            "Disclaw Interface + Brand System",
            "Brand + Web / Web3 interface presentation",
            [
                "Produced polished Web3-facing identity, banner, logo, promo, and animated product presentation assets.",
                "Focused on launch-ready interface framing, brand consistency, and fast social/product recognition.",
            ],
        ),
        (
            "AmpliFi Social",
            "Product Designer / Systems Architect / amplifisocial.xyz",
            [
                "Created a creator-holder reward system with social account linking, verified holdings, engagement-weighted rewards, and payout transparency.",
                "Designed leaderboard mechanics, incentive structure, and clean Web3 social-finance presentation.",
            ],
        ),
        (
            "Live Site Loop + Milestone Demo",
            "Web Experience / Product flow communication",
            [
                "Developed optimized site-motion previews and product demo framing to show interaction rhythm, MVP logic, and launch readiness.",
                "Translated complex product systems into digestible interface states and campaign visuals.",
            ],
        ),
    ]
    for item in projects:
        story.append(card(*item, styles, accent))
    story.append(PageBreak())
    story.extend(heading("Additional Product Concepts", styles, accent))
    story.extend(
        bullet_items(
            [
                "BlueClaw Calls: Telegram/Discord trading-intelligence bot direction for whale tracking, holder analysis, on-chain signals, and instant group alerts.",
                "Transparent Bundler / ASD: declared-wallet transparency framework and scheduled distribution model for safer token launches.",
                "No Cry Casino: KOL performance betting and analytics concept with PnL tracking, market rounds, escrow wallets, and admin lifecycle endpoints.",
                "ChadPad / Bondit: ETH-first launchpad and agentic market-ops concepts with deterministic guardrails, reputation systems, Uniswap v2 LP routing, and creator vesting logic.",
                "FREE RX Pharmacy: freelance pharmacy web animation and hoodie spin assets built as a compact campaign world.",
            ],
            styles,
        )
    )
    story.extend(heading("Strengths", styles, accent))
    story.append(
        chip_grid(
            [
                "Rapid MVP Scoping",
                "High-Signal UX/UI Direction",
                "Founder-Level Product Taste",
                "Launch Narratives",
                "Technical Prompt Systems",
                "English / Spanish Communication",
            ],
            styles,
            accent,
        )
    )
    story.extend(heading("Execution Style", styles, accent))
    story.append(
        P(
            "Uses AI coding agents as force multipliers while maintaining control over product direction, UX taste, "
            "technical constraints, and launch narrative. Particularly effective at producing build specs, repo-audit "
            "prompts, interface requirements, monetization models, brand systems, and rapid MVP implementation plans.",
            styles["body"],
        )
    )
    return story


def creative_story(styles, accent):
    story = []
    story.extend(heading("Profile", styles, accent))
    story.append(
        P(
            "Los Angeles-based creative technologist, video editor, and multimedia producer creating cinematic, "
            "social-first work across music, brands, Web3 campaigns, 3D worlds, motion graphics, and AI-assisted video workflows.",
            styles["body"],
        )
    )
    story.extend(heading("Core Disciplines", styles, accent))
    story.append(
        chip_grid(
            [
                "Videography / Shot Planning",
                "Editing / Pacing / Story",
                "Color / Sound / Captions",
                "Motion Graphics / Typography",
                "3D Product + Character Worlds",
                "AI-Assisted Visual Development",
                "Creative Direction / Moodboards",
                "Campaign Assets / Rollouts",
                "Premiere / After Effects / Blender",
            ],
            styles,
            accent,
        )
    )
    story.extend(heading("Selected Portfolio Work", styles, accent))
    projects = [
        (
            "Artist Visual Cuts",
            "Editing / music-first social content",
            [
                "Created music-first pacing, stylized cutdowns, visual rhythm, color, overlays, and social-native export formats.",
                "Built short-form visual systems for artist releases across vertical, square, and horizontal formats.",
            ],
        ),
        (
            "Release Motion Pack",
            "Motion graphics / reusable campaign assets",
            [
                "Produced logo spins, square loops, teaser visuals, and release assets designed for fast recognition and replay.",
                "Balanced typography, timing, overlays, and platform-aware formatting.",
            ],
        ),
        (
            "AmpliFi Logo System",
            "Mixed-media identity motion / sound design",
            [
                "Built logo animation, sound design, and identity motion for a Web3 social-finance product world.",
                "Connected motion direction to product personality, social presence, and campaign consistency.",
            ],
        ),
        (
            "BILK Brand Objects + Promo",
            "3D campaign objects / generative video",
            [
                "Rendered surreal branded product objects and internet-native campaign assets.",
                "Combined visual identity, post-production, generative promo direction, and 3D product language.",
            ],
        ),
        (
            "Bombo Worlds / OBALLA / $GANG",
            "Generative visual direction / experimental video",
            [
                "Developed character-world visuals, surreal b-roll, style matching, prompts, and post-production treatments.",
                "Created generative campaign material with fast culture signal and social velocity.",
            ],
        ),
        (
            "Poster Worlds + Shiba Character Set",
            "3D art / character and album-world visuals",
            [
                "Designed poster-grade character and album-world visuals with stylized lighting and campaign finish.",
                "Built collectible character variations and visual identity assets for internet-native brand worlds.",
            ],
        ),
    ]
    for item in projects:
        story.append(card(*item, styles, accent))
    story.append(PageBreak())
    story.extend(heading("Professional Experience", styles, accent))
    experience = [
        (
            "Freelance Videographer, Editor & Creative Technologist",
            "Self-Employed / Los Angeles, CA / 2021 - Present",
            [
                "Produce and edit video content for artists, brands, events, digital campaigns, and social-first media.",
                "Handle concept development, shot planning, footage organization, editing, color, sound, motion graphics, and delivery.",
                "Create music-video visuals, event recaps, promotional edits, short-form clips, motion graphics, thumbnails, and launch assets.",
            ],
        ),
        (
            "Creative Director / Multimedia Producer",
            "Independent brand, music, and digital media projects / 2020 - Present",
            [
                "Direct visual identities, campaign concepts, video assets, and digital content systems for entertainment and internet-native projects.",
                "Combine graphic design, editing, motion, copywriting, and AI-assisted workflows to create high-output media packages.",
            ],
        ),
        (
            "Video Editor / Motion Graphics Specialist",
            "Freelance and contract projects / 2019 - Present",
            [
                "Edit short-form and long-form assets including music content, promotional clips, social media edits, event recaps, and campaign videos.",
                "Build animated titles, captions, lower thirds, social overlays, transitions, and branded motion graphics.",
            ],
        ),
    ]
    for item in experience:
        story.append(card(*item, styles, accent))
    story.extend(heading("Best Fit Roles", styles, accent))
    story.append(
        P(
            "Video Editor, Videographer, Creative Technologist, Multimedia Producer, Motion Graphics Designer, "
            "Social Video Editor, Digital Content Producer, AI Content Producer, Brand Content Editor, Music Video Editor.",
            styles["body"],
        )
    )
    story.extend(heading("Education / Training", styles, accent))
    story.append(
        P(
            "Self-directed creative technology, video production, design, web, AI-assisted production, digital marketing, "
            "motion graphics, and modern content workflow training.",
            styles["body"],
        )
    )
    return story


def build_sources():
    product_sections = [
        (
            "Profile",
            [
                "Creative technologist and founder-operator building polished web design, product systems, Web3 launch infrastructure, AI-assisted MVPs, and cinematic brand worlds.",
                "Portfolio: misaeldejesus.xyz",
            ],
        ),
        (
            "Selected Projects",
            [
                ("Commit to Ship", "Solana launch accountability assistant with milestone release logic, escrow thinking, and founder commitment flows."),
                ("Paco the Chicken", "Character-led web experience and meme-native visual campaign assets for pacothechicken.xyz."),
                ("Disclaw Interface", "Web3-facing brand and interface work with animated presentation and launch-ready assets."),
                ("AmpliFi Social", "Creator-holder reward system with verified holdings, social account linking, leaderboards, and payout transparency."),
                ("Live Site Loop / Milestone Demo", "Site motion preview and product-flow demo for launch-ready MVP communication."),
            ],
        ),
    ]
    creative_sections = [
        (
            "Profile",
            [
                "Creative technologist, video editor, and multimedia producer creating cinematic social-first work across music, brands, Web3 campaigns, 3D worlds, motion graphics, and AI-assisted video workflows.",
                "Portfolio: misaeldejesus.xyz",
            ],
        ),
        (
            "Selected Projects",
            [
                ("Artist Visual Cuts", "Music-first pacing, stylized cutdowns, visual rhythm, color, overlays, and social-native export formats."),
                ("Release Motion Pack", "Logo spins, square loops, teaser visuals, and reusable release assets."),
                ("AmpliFi Logo System", "Mixed-media identity motion and sound design for a Web3 social-finance product world."),
                ("BILK Brand Objects + Promo", "Surreal 3D branded objects, campaign assets, and generative promo direction."),
                ("Bombo Worlds / OBALLA / $GANG", "Generative character-world development, surreal b-roll, prompts, and post-production treatment."),
            ],
        ),
    ]
    build_plain_pdf(
        ROOT / "resume-sources" / "Misael_De_Jesus_Web_Product_Resume_ATS.pdf",
        "Misael De Jesus",
        "Creative Technologist / Web Design / Product Systems",
        product_sections,
        CYAN,
    )
    build_plain_pdf(
        ROOT / "resume-sources" / "Misael_De_Jesus_Creative_Resume_ATS.pdf",
        "Misael De Jesus",
        "Creative Direction / Video Editing / Motion / 3D",
        creative_sections,
        LIME,
    )


def main():
    build_dark_pdf(
        ROOT / "Misael_De_Jesus_Resume.pdf",
        "Misael De Jesus",
        "Creative Technologist / Web Design / Product Systems",
        CYAN,
        product_story,
    )
    build_dark_pdf(
        ROOT / "Misael_De_Jesus_Videography_Editing_Resume.pdf",
        "Misael De Jesus",
        "Creative Direction / Video Editing / Motion / 3D",
        LIME,
        creative_story,
    )
    build_sources()


if __name__ == "__main__":
    main()

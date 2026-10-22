# Accessibility

The app targets **WCAG 2.2 level AAA** wherever it applies. This file records what has
been checked, how, and what still needs a person to check. Automated tools can't confirm
full AAA conformance on their own, so treat this as an audit record rather than a
certificate.

Last audited: 22 October 2026, on all three screens (Home, My Star, Jobs) in light and
dark mode.

## How it was tested

- **axe-core 4.10** with the WCAG 2.0/2.1/2.2 A, AA and AAA rule sets plus best practice:
  no violations.
- **Keyboard only:** every control on every screen can be reached with Tab, and every action
  works without a mouse (marking messages read, ticking actions, sliders, chart points,
  saving jobs, filters, switching tabs).
- **Target size:** every control measured at desktop width, at 360px phone width, and at
  200% zoom.
- **Reflow and zoom:** no sideways scrolling at 360px wide or at 200% zoom.
- **Reading level:** Flesch-Kincaid grade 4.0 (Home), 8.7 (My Star), 2.3 (Jobs).

## AAA criteria and how the app meets them

| Criterion | How it's met |
| --- | --- |
| 1.4.6 Contrast (Enhanced) | All text is at least 7:1 against its background in light and dark mode, including tinted backgrounds. |
| 1.4.8 Visual Presentation | 1.5 line spacing, intro text under 80 characters wide, no justified text, a dark mode, works at 200% zoom. |
| 2.1.3 Keyboard (No Exception) | Everything works from the keyboard. Chart points can be focused; Enter shows the score, Escape hides it. |
| 2.3.3 Animation from Interactions | Animations are switched off when the device's "reduce motion" setting is on. |
| 2.4.8 Location | Each screen has its own page title, and the current tab is marked. |
| 2.4.9 Link Purpose (Link Only) | Every link's text says where it goes, e.g. "View jobs" or "Update my star". |
| 2.4.10 Section Headings | Each section has a heading. Some headings are hidden visually but read by screen readers. |
| 2.4.13 Focus Appearance | A 3px focus ring with at least 13:1 contrast, offset from the control. |
| 2.5.5 Target Size (Enhanced) | Every control is at least 44×44px (see the note on chart points below). |
| 3.1.4 Abbreviations | Abbreviations are spelled out where they first appear, e.g. CV, DBS, SIA, GCSE, GP. |
| 3.1.5 Reading Level | All screens are at lower-secondary reading level or below. |
| 3.2.5 Change on Request | Screens change, and files download, only when the participant asks. |
| 3.3.6 Error Prevention (All) | Replacing or clearing a starting point asks for confirmation; everything else can be undone. |

### Notes

- **Chart points on small phones:** on screens narrower than about 400px, the chart shrinks
  and its points are about 29px across. They fall under the 2.5.5 "Equivalent" exception:
  each score is also shown beside its slider and in the Distance travelled table, both of
  which meet 44px.
- **Reading level:** the My Star screen, at grade 8.7, is close to the top of the
  lower-secondary range. Keep the question wording short when editing `src/questions.js`.
- **No audio, video or timing:** the 1.2 media criteria and the 2.2 timing criteria don't
  apply.

## Still needs a person to check

- Testing with real screen readers: VoiceOver on iPhone and Mac, TalkBack on Android, and
  NVDA or JAWS on Windows.
- Testing with participants, including people with low literacy, dyslexia or learning
  disabilities, to confirm the wording is clear (3.1.5 and 3.3.5).
- Re-auditing after connecting real job adverts or coach messages. That content will come
  from elsewhere, so its reading level, abbreviations and link text will need checking too.

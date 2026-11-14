# Verification record

Final checks on 15 November 2026:

- `browser-results.json`: 1440, 1024, 768, 390 and 320 px; no script errors, missing local responses or document overflow. App and early hardware controls operate inside trusted local frames. Both language choices work; all 24 screens remain available.
- `interaction-results.json`: keyboard menu trapping and focus return, image dialog and focus return, archive `contain` sizing, offscreen App pause, actual MP4 metadata/playback, and pause after closing the video section.
- `local-links.json`: no missing local HTML, README or documentation destinations.
- `remote-links.json`: current MusicTag root, prototype, early concept, gallery and GitHub repository return 200; old the-listening-room prototype path returns 404.
- `media-results.json`: all seven MP4s decode, use H.264/AAC, and contain non-silent captured synthesised audio.
- `cover-*`, `live-*`, `hardware-*`: representative browser screenshots across five widths.

Checks use fresh independent headless Chrome sessions. Network fonts are disabled during deterministic capture, so screenshots use the configured system fallback. These checks establish browser behaviour; they do not substitute for usability testing with intended listeners or for real-device Bluetooth and tactile evaluation.

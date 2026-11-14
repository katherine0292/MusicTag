# Phone-only prototype recording

The current portfolio shows **one directly visible continuous video**, `assets/recordings/phone-full.mp4`.

## What was captured

A fresh browser session operates the **current high-fidelity prototype** in `prototype/`, not the early-concept webpage. The recorder completes onboarding, Library, listening, seeking, save/undo, search, simulated voice miss and recovery, offline recovery, family invitation, output, preferences, MusicTag setup, pairing recovery, button practice and disconnect.

Only the phone's **402 × 812** display area is exported. The surrounding webpage, scenario panel, recording chapter labels and browser controls are excluded. The movie is a single continuous recording of actual UI interactions, not a slideshow of exports. A subtle pointer indicator makes taps visible. Captured Web Audio preserves the synthesised playback and changes to volume; a fixed gain adjustment makes the exported audio easier to hear.

- Duration: approximately **1 minute 49 seconds**.
- Video: H.264, portrait 402 × 812.
- Audio: AAC, captured synthesised preview.
- Poster: `assets/recordings/phone-poster.jpg`.
- Capture manifest: `assets/recordings/phone-full.json`, with actual chapter timing and browser errors.

The case study has no video-selection menu or expand control. Older recordings remain in Git history and at their original paths for earlier references; they are not the portfolio's current walkthrough.

## Reproduce

Start a local HTTP server at port 8765. Configure `PLAYWRIGHT_MODULE`, `PLAYWRIGHT_BROWSERS_PATH`, `CHROME_PATH` and `FFMPEG` for the machine, then run:

```bash
node scripts/record-phone.cjs
```

The recorder uses an isolated browser session with fresh demo storage. It performs actual control clicks and inputs, captures browser-generated sound, and exports only the phone rectangle. It checks for page errors before completing. It does not record a microphone or the user's browser session.

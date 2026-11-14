# Browser operation recordings

Recorded on 15 November 2026. These are actual Playwright-operated browser sessions, with pointer movement and chapter labels. The video recorder captures the rendered UI; a MediaRecorder captures the same Web Audio output the demo generates. ffmpeg encodes H.264/AAC MP4 and makes the feature clips. A constant gain increase makes the captured preview easier to hear in the exported videos while preserving the volume-button changes. No screen-export slideshows or prerecorded songs are substituted.

## Deliverables

- `assets/recordings/app-full.mp4`: one continuous session covering onboarding, Library, listening, seek, undo, typed search, voice recovery, offline recovery, family invitation, output, preferences, MusicTag setup, practice and disconnect.
- `01-listening.mp4`, `02-search-recovery.mp4`, `03-family.mp4`, `04-preferences.mp4`, `05-musictag-setup.mp4`: chapters extracted from the complete session.
- `musictag-early-full.mp4`: independent early-concept operation; phone playlist selection, all five remote controls, three playlists and reset.
- `.vtt`: English captions describing each task and prototype scope; the case study keeps its Chinese and English instructions.
- `.gif`: reduced-frame-rate excerpts for inline GitHub README presentation. The MP4 versions contain audio; GIFs do not.
- `.json`: chapter times, capture scope and browser error results.

The early hardware movie shows the browser simulation in `early-concept/`, not physical-device footage. No raw hardware video was found in any visible Git branch or historical object at the reviewed baseline.

## Reproduce

Run a local HTTP server from the repository root, install Playwright, and have Chrome and ffmpeg available. Configure these environment variables for another machine:

- `PLAYWRIGHT_MODULE`: absolute path to the Playwright module.
- `PLAYWRIGHT_BROWSERS_PATH`: browser/recorder bundle directory, including Playwright's ffmpeg helper.
- `CHROME_PATH`: Chrome executable.
- `FFMPEG`: ffmpeg executable.
- `DEMO_BASE_URL`: preview URL without trailing slash; defaults to `http://127.0.0.1:8765`.

```bash
node scripts/record-demos.cjs
# Only regenerate the early hardware recording:
node scripts/record-demos.cjs hardware
```

The recorder uses fresh browser storage, simulated input and a small fixed catalogue. It aborts external network resources during capture. It never records a microphone, private browser session or physical device. Clip metadata is based on actual interaction elapsed time; chapter labels and captions explain what is being exercised.

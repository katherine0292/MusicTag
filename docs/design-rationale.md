# Design rationale and decisions

**Katherine Lin · MusicTag**

## Product scope

The core interaction is getting to music that already matters to the listener. I prioritised four familiar destinations, persistent playback and visible recovery. Familiar music appears on Home and in Library. Search offers text and voice. MusicTag has a stable destination for setup and help.

I originally proposed a dedicated Melody Box with presets, on-device information, voice access and a charging dock. That direction would have added a new device and a new learning path. The phone-plus-remote concept used capabilities listeners already had and moved only frequent playback actions to hardware. The early controller and library flows appear in the [prototype archive](../early-concept/index.html).

## Decisions and trade-offs

| Decision | Reason and trade-off |
|---|---|
| Pin Liked Songs and show last playback | A predictable return point supports habitual listening. Home reserves space for personal music and keeps browse discovery out of the first release. |
| Keep a persistent mini-player and clearly label transport | Starting a search or checking a playlist should leave playback available. The current track, pause state and output stay visible at the appropriate level. |
| Default to the light listening interface and use indigo for the focused player | The light interface keeps navigation and lists readable. The indigo playback screen uses labelled controls and high-contrast text. Large type and reduced motion are adjustable within the demo. |
| Make the family playlist a named destination | The note and contribution permissions support sharing with familiar people. The invitation flow makes the guest's access visible before sending. |
| Offer voice alongside typing | Speaking is useful when typing is difficult. Clear mic status, visible results and a one-action typed fallback preserve control when recognition is uncertain. |
| Keep MusicTag focused on play, pause, previous, next and volume | Familiar physical actions can reduce the need to look at the phone. Playlist selection and speaker routing remain available in the phone interface. |
| Split MusicTag setup into discovery and connection | A visible found state tells the listener when the device is close enough. Connection confirmation, retry and a button guide make progress understandable. |
| Demonstrate failures as part of the main experience | Voice miss, offline search and pairing failure have clear recovery actions. This lets reviewers try recovery without relying on random events. |

## Experience principles

- **Autonomy.** Preserve playback while the listener navigates. Make choices visible and reversible where practical.
- **Recognition.** Use clear titles, artwork and labelled playback. Test whether elements are still identifiable with larger text.
- **Meaning.** Treat playlists, saved songs and family notes as cues to a routine or memory.
- **Clarity.** State what happened and what the listener can do next. Give the phone, audio output and MusicTag distinct roles.

## Flow coverage

| Flow | Reference screens | Implemented in the browser |
|---|---|---|
| Getting started and Library | Welcome, Home, Library, Liked songs | Resume a track, switch tabs, open saved music and maintain mini-player state. |
| Playlists and invitation | Family, Cantopop, Morning Walk, Invite family | Play a sequence, add a demo song, select guest permissions and copy a demo invitation link. |
| Search | Search, Listening, Voice retry, Results | Type, open recent searches, filter results, simulate a spoken query, retry or switch to typing. |
| Playback and settings | Now playing, Paused, Output, Preferences | Pause, seek, skip, save with undo, select a simulated output, adjust type, motion and speech language preferences. |
| MusicTag setup | Overview, Get ready, Found, Button guide | Discover and pair a simulated remote. Practise play, pause, skipping and volume. |
| Completion and recovery | Connected, Paired overview, Pairing retry, Offline | Review status, disconnect, retry and navigate back to available content. |

## Delivery scope

The university–industry project with Spotify explores the product and interaction model with a deterministic browser prototype. The demo uses a small fixed catalogue, synthesised audio, local state and record artwork. Implementation of a production catalogue, speech recognition, invitation service and Bluetooth firmware would require separate integration and validation.

See the [voice interaction specification](voice-product-spec.md) for voice search and the [evaluation plan](evaluation.md) for planned validation.

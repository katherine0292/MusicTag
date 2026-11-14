# The Listening Room

**Independently commissioned design project · Katherine Lin**

The Listening Room is an accessible music concept for adults aged 65 and over. It brings familiar songs closer through a simplified iOS interface, gives listeners a clear way forward when voice search misunderstands them, and lets them control everyday playback through a tactile remote.

[**Open the interactive prototype**](https://katherine0292.github.io/the-listening-room/prototype/) · [Project brief summary](docs/project-brief.md) · [Browse all 24 screens](https://katherine0292.github.io/the-listening-room/gallery/)

[![The Listening Room. An older listener presses the MusicTag play button beside a cobalt vinyl record.](assets/listening-room-poster.webp)](assets/listening-room-poster.webp)

## Commission and scope

I accepted this commission independently. My scope covered desk research, two qualitative interviews, experience design, interaction prototyping, the voice search specification and an evaluation plan. The delivery includes a high-fidelity browser prototype, 24 iOS design states, an exploratory phone and remote prototype, and documentation linking findings to design decisions.

The brief was to help older listeners find and play personally meaningful music with less effort and greater independence. For the proof of concept, I used Spotify as the interaction context and focused on three jobs: return to something familiar, recover from a mistake and control music already playing.

## From research to design

I compared five music services, conducted two firsthand interviews and organised the evidence around listening routines, breakdowns and workarounds. The interviews and the early walkthrough provided qualitative direction for the following decisions.

| What gets in the listener’s way | What I designed | How to inspect it |
|---|---|---|
| A layout change or competing recommendations make it hard to recover a known song. | Home shows recent listening and Library keeps liked songs and personal playlists in predictable places. A persistent mini-player keeps playback within reach while browsing. | [Find a familiar song](https://katherine0292.github.io/the-listening-room/prototype/?scenario=find) |
| Small controls and unfamiliar icons make playback harder to operate confidently. | The iOS design labels transport controls and offers adjustable text and motion. MusicTag puts play, pause, skip and volume on distinct physical buttons. | [Try the remote controls](https://katherine0292.github.io/the-listening-room/early-concept/) |
| Recognition can miss an accented query or a partly remembered title. | Voice is optional. The interface shows when it is listening, allows cancellation and lets the listener review possible matches before playing one. If it misses, they can retry or type. | [Recover from a voice miss](https://katherine0292.github.io/the-listening-room/prototype/?scenario=voice) |
| A song sent by a family member can be difficult to find again. | Family playlists have a stable place in Library. The invitation flow shows whether the recipient can listen or add songs. | [Share a family playlist](https://katherine0292.github.io/the-listening-room/prototype/?scenario=family) |
| A failed connection can make both the device and the next action unclear. | Pairing separates discovery from connection and offers retry and a button guide. The phone handles playlist choice and speaker routing. MusicTag controls playback. | [Recover from a pairing failure](https://katherine0292.github.io/the-listening-room/prototype/?scenario=tag) |

I chose a phone and remote over the initial dedicated music-player concept. The phone already provides a familiar place to choose music. Moving only repeat playback actions to the remote reduces the number of controls the listener needs to learn.

## Voice search as a product feature

The proposed system has three steps: capture the request, match it to catalogue entries and let the listener choose what to play. Separating these steps keeps a plausible recognition error from starting the wrong song. Title and artist help distinguish candidates. A missed or ambiguous request can be edited or retried, and an offline state leaves Library available.

The [voice product specification](docs/voice-product-spec.md) defines recognition and ranking behaviour, permission and failure states, language coverage, data handling and rollout gates. The prototype demonstrates those interactions using a fixed catalogue and simulated input. Its playback uses synthesised audio, and the pairing, invitations and speaker changes are local simulations.

## What was delivered

| Deliverable | Contents |
|---|---|
| [High-fidelity interactive prototype](https://katherine0292.github.io/the-listening-room/prototype/) | An end-to-end listening flow with onboarding, Library, search, playback, sharing, preferences, MusicTag setup and recovery. |
| [Early interactive concept and hardware studies](https://katherine0292.github.io/the-listening-room/early-concept/) | The original three-screen flow reconstructed for the browser, a tactile control simulation, and the early sketch and mockups. |
| [Screen gallery](https://katherine0292.github.io/the-listening-room/gallery/) and [iOS design boards](assets/archive/listening-room-ios-design.pdf) | 24 reference screens organised around six listening and setup journeys. |
| [Research synthesis](docs/research.md), [interview guide](docs/interview-guide.md) and [literature and product review](docs/literature-and-product-review.md) | Research methods, aggregate themes, design personas and the sources behind the opportunity. |
| [Design rationale](docs/design-rationale.md), [voice product specification](docs/voice-product-spec.md) and [evaluation plan](docs/evaluation.md) | Feature boundaries, trade-offs, AI interaction requirements and what to test next. |

## Evaluation

The early walkthrough pointed to two changes: make the buttons easier to learn and explain where to change playlists. The high-fidelity prototype addresses these with labelled playback controls, MusicTag button practice and explicit audio output. Browser checks verified the primary flows and recovery paths on desktop and at a 320 px mobile width.

The proposed pilot would measure independent task completion, correct-song selection, retries, use of the typing fallback and understanding of the phone–remote split. It would include different levels of digital confidence, as well as voice queries across languages and accents. These are evaluation targets for the next study.

## Run locally

Open `index.html` or serve the repository with `python3 -m http.server 8000`. Both prototypes run in the browser with local assets. In the high-fidelity demo, **Restart prototype** clears saved demo preferences.

Illustrative record sleeves, device renders and the project poster use generated imagery. Icons are distributed under the [Lucide licence](assets/vendor/lucide-license.txt).

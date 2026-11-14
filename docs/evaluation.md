# Evaluation and reflection

**Katherine Lin · The Listening Room**

## Formative evidence

The original design report describes a walkthrough of simplified playback and a paper MusicTag. Tasks included choosing a playlist, playing it and using the remote to pause or skip. Feedback in the record points to the value of larger text, fewer competing options and screen-free playback. It also identifies two open questions: how to learn the remote buttons and where to change playlists.

I translated those questions into the high-fidelity prototype as a button guide with practice controls, labelled transport and a clear distinction between MusicTag and audio output. The design also gives the listener explicit failure paths. The early walkthrough is qualitative feedback on the earlier concept. Impact and usability findings for the newer prototype remain to be established.

## Browser verification

The browser prototype was checked for navigation, state changes and recovery. The working catalogue, controls and error scenarios can be exercised without a Spotify account.

| Journey | Expected behaviour |
|---|---|
| Resume and control playback | Start, pause, seek and skip. The mini-player retains the current track. Saving can be undone. |
| Share a playlist | Add a demo song, select permissions, and see the invitation state. The copy action offers a selectable link if direct clipboard access is unavailable. |
| Find familiar music | Search by title or artist and play a match. A simulated voice miss supports retry and a typing path. |
| Recover when offline | Keep access to Library and recover the Search tab through the retry action. |
| Set up MusicTag | Complete discovery and connection. Exercise failure, cancel, retry, practise controls and disconnect. |
| Adjust the experience | Text size, reduced motion and language preference update the demo. Restart restores defaults. |
| Review on narrow screens | The project demo pages and phone controls remain usable at mobile widths. |

## Proposed validation

Recruit an initial usability round with adults aged 65 and over who vary in digital confidence, language, vision and dexterity. Use both self-selected music and a consistent task title. Provide a simulated voice failure and a physical prototype where available.

| Task | Observe | Measure |
|---|---|---|
| Find and play a previously saved song | Whether Home and Library affordances are recognised | Independent completion, time and wrong turns |
| Speak a title and recover from a miss | Whether mic state, retry and typing are understood | Attempts, path choice, time to correct result and help required |
| Share a family playlist | Understanding of invitation roles | Permission choice and participant explanation |
| Pair MusicTag and skip a track | Whether setup steps and button positions are understood | Setup success, errors and completion without looking at the phone |
| Change speaker and choose a different playlist | Understanding of the phone, speaker and remote relationship | Correct control used and ability to explain what each does |

Before and after each task, ask how confident the listener feels doing this independently. Note differences between what a participant says and what they do. Treat small-sample results as formative and report the number of sessions and conditions.

## What I would carry forward

- **Ask about the last difficult moment.** “Would bigger buttons help?” invites agreement. “Tell me about the last time listening did not work” surfaces the obstacle, the workaround and what was at stake.
- **Trace each decision to a breakdown.** Writing the rationale taught me to tie every design decision to a concrete breakdown.
- **Compare voice with typing.** Run voice recovery and typed search on the same tasks, and check reading and touch conditions early.

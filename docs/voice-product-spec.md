# Voice search: AI interaction specification

**Katherine Lin · The Listening Room**

## Role and boundary

This document defines the experience of an AI feature: when listening starts, how uncertainty is shown, how candidates are ranked for display and how the listener recovers. It does not specify the recognition model, its training or its infrastructure. Those need separate engineering and validation.

## Problem and product goal

Screen search can demand precise typing. Voice can reduce that effort, but a plausible-sounding error is expensive when all the listener wants is their usual song. The goal is to find familiar music with a short, predictable recovery path when speech or catalogue matching is uncertain.

The prototype demonstrates a sample spoken title, search results, a missed utterance, retry, typing and offline recovery. It uses deterministic sample inputs. The implementation below describes a proposed AI feature.

## Scope and ranking

1. Start only when the listener chooses the microphone and show that listening is active. Keep cancel and typing available.
2. A recogniser returns a transcript and useful alternatives under the selected language or supported multilingual configuration.
3. Normalize spacing and punctuation. Match recognised variants to catalogue titles, artists, playlists and supported aliases.
4. Rank exact title and artist matches first. Use an explicitly named playlist as a strong signal. Treat a user’s library as a tie-breaker only where permitted. Display title and artist so the listener can distinguish versions.
5. Present the result to the listener. Playback starts when the listener selects a result.

Candidate confidence combines recognition quality and agreement between the requested title, artist and catalogue entry. Thresholds require calibration with representative speech and catalogue queries.

## States and recovery

| State | Listener sees | Listener can do |
|---|---|---|
| Idle | Search field, mic and recent searches | Type, choose a recent query or start listening |
| Listening | Mic state, example query and stop action | Speak, stop or switch to typing |
| Likely match | Recognised text and ranked choices | Play the chosen result, edit the query or retry |
| Multiple plausible matches | Distinguishable title and artist choices | Choose a result or refine the query |
| Unclear or no result | Plain-language explanation | Retry or type immediately |
| Permission unavailable | Clear explanation and search field | Type or follow system permission controls |
| Offline or service unavailable | Offline message and library route | Retry after reconnecting or open the library |
| Cancelled | Prior search and input restored | Continue typing or browse |

## Language and privacy

Plan coverage for Australian English, Cantonese and Mandarin with explicit preference controls. Include code-switching, alternate spellings, translated titles and same-title songs in the test matrix. A language setting sets expectations without promising accent-level accuracy.

Use a tap-to-start interaction with explicit stop and cancel actions and collect the minimum telemetry needed to evaluate it. The production plan should specify processing location, audio retention and deletion before release. Proposed default analytics can record state transitions and elapsed time without raw audio or transcripts. A separately consented study can collect additional material where necessary.

## Delivery sequence

| Milestone | Deliverable | Exit evidence |
|---|---|---|
| Interaction validation | Deterministic flows in the browser prototype | Participants recognise mic state and recover from a miss with minimal prompting. |
| Recognition and catalogue pilot | Limited-language catalogue matching under explicit consent | Baseline task completion, correction and recovery measures across key language conditions. |
| Controlled release | Voice and typed pathways with observability | Reliable fallback, acceptable latency and comparable recovery across evaluated groups. |

## Measures

**Primary measure:** independent completion of a known-song task, using either input path, within a specified task time. Measure from input start to the listener selecting the intended result, and record whether help was needed.

**Diagnostic measures:** correct result in the first three candidates, time to first useful result, retry count, typed fallback success, permission refusal, abandonment and accidental playback. Compare results by language, accent and prior experience when the cohort size supports the comparison.

Success criteria are hypotheses until a baseline exists. Establish a baseline from typed search and compare voice-assisted tasks on the same titles and conditions. Review errors with particular attention to avoidable retries and false matches.

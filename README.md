# Audio–MIDI notation fixtures

Two deliberately different MusicXML spellings produce the same constructed audio samples and the same minimal MIDI note events. This small fixture set helps educators and developers check one common limitation in audio-to-MIDI and score workflows: equal-tempered sound alone does not preserve the source notation's enharmonic spelling.

## What is included

| File | Purpose |
| --- | --- |
| `fixtures/sharps.musicxml`, `fixtures/flats.musicxml` | Four notes written with different spellings and key signatures. |
| `fixtures/sharps.wav`, `fixtures/flats.wav` | Mono 16-bit PCM, 48 kHz, two seconds per file. The bytes match exactly. |
| `fixtures/sharps.mid`, `fixtures/flats.mid` | Minimal note-event MIDI files. The bytes match exactly. |
| `fixtures/score-check.csv` | A short worksheet for checking pitch equivalence and score-review context. |
| `manifest.json` | Expected sizes and SHA-256 digests. |
| `verify.mjs` | A dependency-free Node.js verifier for hashes, file structure, and the intended equivalences. |

Run `node verify.mjs` from the repository root. It reads the checked-in files and exits with an error if a digest, size, or fixture invariant changes.

The sharp-spelled source writes F♯4–G♯4–A♯4–F♯4; the flat-spelled source writes G♭4–A♭4–B♭4–G♭4. Both resolve to MIDI pitches 66, 68, 70, 66. The constructed signals use the same fixed oscillator and envelope for equal pitches, so their saved PCM and MIDI files are byte-identical while the source MusicXML files differ.

The example is a controlled construction. It does **not** measure transcription accuracy, prove a notation app's behavior, or test real recordings. Choosing written note names for an actual score requires musical context and human review.

The fixture files and method were first published with [AudioToMidiNow's audio-to-sheet-music explanation](https://audiotomidinow.com/audio-to-sheet-music/). That page has the original downloads and further discussion of the limits.

All files in this repository are under the MIT License. The audio and notation examples were constructed for this project; no commercial song recording is included.

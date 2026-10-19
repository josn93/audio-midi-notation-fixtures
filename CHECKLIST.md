# Reviewing an audio-to-MIDI-to-score result

Use this checklist after obtaining a MIDI draft from audio. It is a review aid, not a claim that any converter performs these checks automatically.

1. **Record the source conditions.** Note whether the input is a clear single instrument, a voice, or a mixture, plus the sample format and any trimming or preprocessing.
2. **Listen against the source.** Check missing notes, extra notes, onsets, offsets, and octave errors before polishing the notation.
3. **Inspect MIDI events.** Look for overlapping or very short notes and compare their timing and pitch to the recording. MIDI note numbers by themselves do not encode the original printed spelling.
4. **Choose enharmonic spelling from context.** Check the key, harmony, and melodic direction. The two fixture MusicXML files show why identical audio and MIDI pitches cannot identify whether the author wrote F♯ or G♭.
5. **Export and re-open the score.** Confirm the notation program's clef, key signature, note values, barlines, and instrument range. Keep the original recording as a reference.
6. **Document limits.** If the input is polyphonic, noisy, reverberant, or a complete mixed song, describe those conditions instead of presenting the draft as an exact transcription.

To reproduce the fixture's identity checks, run `node verify.mjs`; see `README.md` for the exact scope.

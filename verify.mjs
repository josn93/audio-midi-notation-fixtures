import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.dirname(fileURLToPath(import.meta.url));
const manifest = JSON.parse(readFileSync(path.join(root, 'manifest.json'), 'utf8'));
const fixture = (name) => readFileSync(path.join(root, 'fixtures', name));

for (const [name, expected] of Object.entries(manifest.files)) {
  const bytes = fixture(name);
  assert.equal(bytes.length, expected.bytes, `${name}: byte length`);
  assert.equal(createHash('sha256').update(bytes).digest('hex'), expected.sha256, `${name}: SHA-256`);
}

const sharpXml = fixture('sharps.musicxml');
const flatXml = fixture('flats.musicxml');
const sharpWav = fixture('sharps.wav');
const flatWav = fixture('flats.wav');
const sharpMidi = fixture('sharps.mid');
const flatMidi = fixture('flats.mid');

assert(!sharpXml.equals(flatXml), 'source spellings must differ');
assert(sharpWav.equals(flatWav), 'constructed WAV bytes must match');
assert(sharpMidi.equals(flatMidi), 'constructed MIDI bytes must match');

const pitchClasses = { C: 0, D: 2, E: 4, F: 5, G: 7, A: 9, B: 11 };
const pitches = (xml) => [...xml.toString('utf8').matchAll(/<pitch><step>([A-G])<\/step><alter>(-?\d+)<\/alter><octave>(\d+)<\/octave><\/pitch>/g)]
  .map((match) => 12 * (Number(match[3]) + 1) + pitchClasses[match[1]] + Number(match[2]));
assert.deepEqual(pitches(sharpXml), manifest.expectedMidiPitches, 'sharp source pitches');
assert.deepEqual(pitches(flatXml), manifest.expectedMidiPitches, 'flat source pitches');

assert.equal(sharpWav.toString('ascii', 0, 4), 'RIFF');
assert.equal(sharpWav.toString('ascii', 8, 12), 'WAVE');
assert.equal(sharpWav.readUInt16LE(22), manifest.expectedWav.channels);
assert.equal(sharpWav.readUInt32LE(24), manifest.expectedWav.sampleRateHz);
assert.equal(sharpWav.readUInt16LE(34), manifest.expectedWav.bitsPerSample);
assert.equal(sharpWav.readUInt32LE(40) / 2, manifest.expectedWav.frames);
assert.equal(sharpMidi.toString('ascii', 0, 4), 'MThd');

console.log('PASS: all fixture hashes, sizes, pitches, WAV metadata, and pair identities match.');

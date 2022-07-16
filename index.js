#!/usr/bin/env node

const PRISONER_COUNT = 100;
const TRIAL_COUNT = 100_000;

// Hey guess what I have no idea how this works.  I just copied and pasted it
// from the internet.
// @see https://www.w3docs.com/snippets/javascript/how-to-randomize-shuffle-a-javascript-array.html
function shuffleArray (arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

// Create an array of `count` lenght where every item is the same as that item's
// index.
function arrayFromRange (count) {
  const prisoners = [];

  for (let i = 0; i < count; i++) {
    prisoners.push(i);
  }

  return prisoners;
}

// Look at the number in the box and compare it against the prisoner's number.
function inspectBox (boxes, prisoner, boxIndex, count = 0) {
  if (count >= (PRISONER_COUNT / 2)) {
    return false;
  }

  const boxNum = boxes[boxIndex];

  if (boxNum === prisoner) {
    return true;
  }

  return inspectBox(boxes, prisoner, boxNum, ++count);
}

// Run a single trial
function runTrial () {
  const boxes = arrayFromRange(PRISONER_COUNT);
  const prisoners = arrayFromRange(PRISONER_COUNT);

  shuffleArray(boxes);

  for (let i = 0; i < prisoners.length; i++) {
    if (inspectBox(boxes, i, i)) {
      continue;
    }

    return false;
  }

  return true;
}

function main () {
  let successCount = 0;
  const startedAt = Date.now();

  for (let i = 0; i < TRIAL_COUNT; i++) {
    const result = runTrial();

    if (result) {
      successCount++;
    }
  }

  console.log(`${(Date.now() - startedAt) / 1000} seconds`);
  console.log(`${(successCount / TRIAL_COUNT) * 100}%`);
}

try {
  main();
  console.log('Script completed successfully');
}
catch (error) {
  console.error(error);
  console.error('CRITICAL ERROR');
}

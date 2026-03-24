let startTime, endTime;
let totalTime = 0;
let rounds = 0;
let maxRounds = 5;
let currentType = "";

function getRandomStimulus() {
  const isLetter = Math.random() < 0.5;

  if (isLetter) {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    currentType = "letter";
    return letters[Math.floor(Math.random() * letters.length)];
  } else {
    currentType = "number";
    return Math.floor(Math.random() * 10);
  }
}

function showStimulus() {
  const stimulus = getRandomStimulus();
  document.getElementById("stimulus").innerText = stimulus;
  document.getElementById("result").innerText = "";
  startTime = new Date().getTime();
}

function startGame() {
  totalTime = 0;
  rounds = 0;
  document.getElementById("result").innerText = "Get Ready...";
  nextRound();
}

function nextRound() {
  if (rounds >= maxRounds) {
    let avg = totalTime / maxRounds;
    document.getElementById("result").innerText =
      "🎯 Average Time: " + avg.toFixed(2) + " ms";
    return;
  }

  document.getElementById("stimulus").innerText = "...";

  setTimeout(showStimulus, 1000);
}

document.addEventListener("keydown", function (e) {
  if (!startTime) return;

  let correct = false;

  if (e.key.toLowerCase() === "a" && currentType === "letter") {
    correct = true;
  }

  if (e.key.toLowerCase() === "l" && currentType === "number") {
    correct = true;
  }

  endTime = new Date().getTime();
  let reactionTime = endTime - startTime;

  if (correct) {
    totalTime += reactionTime;
    document.getElementById("result").innerText =
      "✅ Correct! Time: " + reactionTime + " ms";
  } else {
    document.getElementById("result").innerText =
      "❌ Wrong Key!";
  }

  rounds++;
  startTime = null;

  setTimeout(nextRound, 1000);
});
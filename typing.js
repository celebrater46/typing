"use strict";

{
  const wordSet = [
    "apple",
    "money",
    "gold",
    "journey",
    "goodbye",
  ];

  // const word = "apple";
  let word;
  let loc;
  let score;
  let miss;
  const timeLimit = 3000; // ms
  let startTime;
  let isPlaying = false;
  
  const target = document.getElementById("target");
  const scoreLabel = document.getElementById("score");
  const missLabel = document.getElementById("miss");
  const timerLabel = document.getElementById("timer");
  
  // target.textContent = word;
  // console.log(e.key);
  console.log(word);
  
  function updateTarget() {
    let placeHolder = "";
    for (let i = 0; i < loc; i++) {
      placeHolder += "_";
    }
    target.textContent = placeHolder + word.substring(loc);
  }
  
  function updateTimer() {
    const timeLeft = startTime + timeLimit - Date.now();
    timerLabel.textContent = (timeLeft / 1000).toFixed(2); // toFixed(2)（小数点第二位まで表示）
    // console.log(timeLeft);
    const timeoutId = setTimeout(() => {
      updateTimer();
      // console.log(isPlaying);
    }, 10);
    
    if (timeLeft < 0) {
      isPlaying = false;
      clearTimeout(timeoutId);
      timerLabel.textContent = "0.00";
      setTimeout(() => {
        // alert("Game Over"); // alertが表示されている間、上のtextContent処理がブロックされ、0.01と表示されるため、setTimeoutで遅らせる必要がある
        showResult();
      }, 100);
      target.textContent = "Click To Retry"
    }

  }
  
  function showResult() {
    const accuracy = score + miss === 0 ? 0 : score / (score + miss) * 100;
    alert(`${score} letters. ${miss} missed. ${accuracy.toFixed(2)}% accuracy.`);
  }
  
  window.addEventListener("click", () => {
    if (isPlaying === true) {
      return;
    }
    isPlaying = true;

    loc = 0;
    score = 0;
    miss = 0;
    scoreLabel.textContent = score;
    missLabel.textContent = miss;
    word = wordSet[Math.floor(Math.random() * wordSet.length)];

    target.textContent = word;
    startTime = Date.now();
    updateTimer();
  });

  window.addEventListener("keydown", (e) => {
    if (isPlaying !== true) {
      return;
    }
    if (e.key === word[loc]) {
      // console.log("score");
      loc++;
      if (loc === word.length) {
        word = wordSet[Math.floor(Math.random() * wordSet.length)];
        loc = 0;
      }
      updateTarget();
      score++;
      scoreLabel.textContent = score;
    } else {
      // console.log("Miss");
      miss++;
      missLabel.textContent = miss;
    }
    
  });
  console.log(isPlaying);
}
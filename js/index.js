const correctAnswer = "APPLE";

let attempts = 0;
let index = 0;
let endtimer;

function appStart() {
  const displayGameover = () => {
    const div = document.createElement("div");
    div.innerText = "게임이 종료되었습니다.";
    div.style =
      "display:flex; justify-content:center; align-items:center; position:absolute; top: 29vh; left:39vw; background-color:white; width:200px; height:100px;";
    document.body.appendChild(div);
  };
  const gameover = () => {
    window.removeEventListener("keydown", handleKeydown);
    clearInterval(endtimer);
    displayGameover();
  };

  const nextLine = () => {
    if (attempts === 5) return gameover();
    attempts += 1;
    index = 0;
  };

  const handleEnterKey = async () => {
    let correctData = 0;

    for (let i = 0; i < 5; i++) {
      const block = document.querySelector(
        `.board-block[data-index='${attempts}${i}']`
      );
      const word = block.innerText;
      const correctWord = correctAnswer[i];
      if (word === correctWord) {
        correctData += 1;
        block.style.background = "#6AAA64";
      } else if (correctAnswer.includes(word))
        block.style.background = "#C9B458";
      else block.style.background = "#787C7E";

      block.style.color = "white";
    }

    if (correctData === 5) gameover();
    else nextLine();
  };

  const handleBackspace = () => {
    if (index != 0) index -= 1;
    const preBlock = document.querySelector(
      `.board-block[data-index="${attempts}${index}"]`
    );
    preBlock.innerText = "";
  };

  const handleKeydown = (event) => {
    const key = event.key.toUpperCase();
    const keyCode = event.keyCode;
    const thisBlock = document.querySelector(
      `.board-block[data-index="${attempts}${index}"]`
    );

    if (event.key === "Backspace") handleBackspace();
    else if (index === 5 && event.key === "Enter") handleEnterKey();
    else if (65 <= keyCode && keyCode <= 90 && index < 5) {
      thisBlock.innerText = key;
      index += 1;
    }
  };

  const StartTimer = () => {
    const orginTime = new Date();

    function timer() {
      const newTime = new Date();
      const passedTime = new Date(newTime - orginTime);
      const minutes = passedTime.getMinutes().toString().padStart(2, "0");
      const seconds = passedTime.getSeconds().toString().padStart(2, "0");
      const playTime = document.querySelector(".timer");
      playTime.innerText = `time: ${minutes}:${seconds}`;
    }

    endtimer = setInterval(timer, 1000);
  };

  StartTimer();
  window.addEventListener("keydown", handleKeydown);
}

appStart();

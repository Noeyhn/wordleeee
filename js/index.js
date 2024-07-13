const correctAnswer = "APPLE";
const KeyList = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];

let attempts = 0;
let index = 0;
let endtimer;

function appStart() {
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

  const displayGameover = (check) => {
    const div = document.createElement("div");

    if (check) div.innerText = "축하합니다!";
    else div.innerText = "다시도전하세요.";
    div.classList.add("app");
    document.body.appendChild(div);
  };
  const gameover = (check) => {
    window.removeEventListener("keydown", handleKeydown);
    clearInterval(endtimer);
    displayGameover(check);
  };

  const nextLine = () => {
    if (attempts === 5) return gameover(false);
    attempts += 1;
    index = 0;
  };

  const handleEnterKey = async () => {
    let correctData = 0;
    const correctRow = document.querySelector(`.box-${attempts}`);

    for (let i = 0; i < 5; i++) {
      const block = document.querySelector(
        `.board-block[data-index='${attempts}${i}']`
      );
      const word = block.innerText;
      const correctWord = correctAnswer[i];
      const keyblock = document.querySelector(
        `.keyboard-block[data-key='${word}']`
      );

      if (word === correctWord) {
        correctData += 1;

        block.style.background = "#6AAA64";
        block.classList.add("inputeffect");
        keyblock.classList.remove("include");
        keyblock.classList.add("correct");
      } else if (correctAnswer.includes(word)) {
        block.style.background = "#C9B458";

        if (!keyblock.classList.contains("correct"))
          keyblock.classList.add("include");
      } else {
        block.style.background = "#787C7E";
        keyblock.classList.add("notcorrect");
      }

      block.style.color = "white";
    }

    if (correctData === 5) {
      correctRow.style =
        "display:block; background-color: rgba(0, 255, 0, 0.1);";
      gameover(true);
    } else {
      document
        .querySelector(`.board-row-${attempts}`)
        .classList.add("notcorrect-row");
      correctRow.style =
        "display:block; background-color: rgba(255, 0, 0, 0.1);";
      nextLine();
    }
  };

  const handleBackspace = () => {
    if (index != 0) index -= 1;
    const preBlock = document.querySelector(
      `.board-block[data-index="${attempts}${index}"]`
    );
    preBlock.innerText = "";
    preBlock.classList.remove("inputeffect");
  };

  const handleKeydown = (event) => {
    const key = event.key.toUpperCase();

    inputKeyData(key);
  };

  const handleClick = (event) => {
    const key = event.target.getAttribute("data-key");

    inputKeyData(key);
  };

  const inputKeyData = (key) => {
    const thisBlock = document.querySelector(
      `.board-block[data-index="${attempts}${index}"]`
    );

    if (endtimer === undefined) StartTimer();

    if (key === "BACKSPACE") handleBackspace();
    else if (index === 5 && key === "ENTER") handleEnterKey();
    else if (KeyList.includes(key) && index < 5) {
      thisBlock.innerText = key;
      thisBlock.classList.add("inputeffect");
      index += 1;
    }
  };

  window.addEventListener("keydown", handleKeydown);
  window.addEventListener("click", handleClick);
}

appStart();

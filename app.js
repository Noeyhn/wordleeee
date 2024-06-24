const orginTime = new Data();

function timer() {
  const newTime = new Data();
  const passedTime = new Data(newTime - orginTime);
  const minutes = passedTime.getMinutes().toString().padStart(2, "0");
  const seconds = passedTime.getSeconds().toString().padStart(2, "0");
  const playTime = document.querySelector(".timer");
  playTime.innerText = `time: ${minutes}:${seconds}`;
}

setInterval(timer, 1000);

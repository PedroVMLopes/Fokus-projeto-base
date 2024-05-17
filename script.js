const html = document.querySelector("html");

const timer = document.querySelector(".app__card-timer");

const image = document.querySelector(".app__image");

const text = document.querySelector(".app__title");

const buttons = document.querySelectorAll(".app__card-button");

// Variáveis dos botões do site
const btnFocus = document.querySelector(".app__card-button--foco");
const btnShort = document.querySelector(".app__card-button--curto");
const btnLong = document.querySelector(".app__card-button--longo");
const btnPlay = document.querySelector("#start-pause");
const musicFocusInput = document.querySelector("#alternar-musica");
const btnStartPause = document.querySelector("#start-pause");

let timePassedInSeconds = 5;
let breakID = null;

// Colocando o áudio da música como uma constante
const music = new Audio("/sons/luna-rise-part-one.mp3");
const beepSound = new Audio("/sons/beep.mp3");
const playSound = new Audio("/sons/play.wav");
const pauseSound = new Audio("/sons/pause.mp3");

music.loop == true;

musicFocusInput.addEventListener("change", () => {
  if (music.paused == true) {
    music.play();
  } else {
    music.pause();
  }
});

// Tempo dos tipos de temporizador
const timerFocus = 1500;
const timerShort = 300;
const timerLong = 900;

btnFocus.addEventListener("click", () => {
  alterarContexto("foco");
  btnFocus.classList.add("active");
});

btnShort.addEventListener("click", () => {
  alterarContexto("descanso-curto");
  btnShort.classList.add("active");
});

btnLong.addEventListener("click", () => {
  alterarContexto("descanso-longo");
  btnLong.classList.add("active");
});

function alterarContexto(contexto) {
  buttons.forEach(function (contexto) {
    contexto.classList.remove("active");
  });
  html.setAttribute("data-contexto", contexto);
  image.setAttribute("src", `/imagens/${contexto}.png`);
  switch (contexto) {
    case "foco":
      text.innerHTML = `
            Otimize sua produtividade,<br>
            <strong class="app__title-strong">mergulhe no que importa.</strong>
            `;
      break;
    case "descanso-curto":
      text.innerHTML = `
            Que tal dar uma respirada?<br>
            <strong class="app__title-strong">Faça uma pausa curta.</strong>
            `;
      break;
    case "descanso-longo":
      text.innerHTML = `
            Hora de voltar a superfície<br>
            <strong class="app__title-strong">Faça uma pausa longa.</strong>
            `;
      break;
    default:
      break;
  }
}

const countdown = () => {
  if (timePassedInSeconds <= 0) {
    //beepSound.play();
    alert("Tempo Finalizado!");
    zeroCountdown();
    return;
  }
  timePassedInSeconds -= 1;
  console.log("Temporizador: " + timePassedInSeconds);
};

btnStartPause.addEventListener("click", startPauseCountdown);

btnPlay.addEventListener("click", () => {
  playSound.play();
});

function startPauseCountdown() {
  if (breakID) {
    zeroCountdown();
    pauseSound.play();
    return;
  }
  breakID = setInterval(countdown, 1000);
}

// Função que zera o cronômetro
function zeroCountdown() {
  clearInterval(breakID);
  breakID = null;
}

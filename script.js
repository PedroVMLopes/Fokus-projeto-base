const html = document.querySelector("html");

const timer = document.querySelector(".app__card-timer");

const image = document.querySelector(".app__image");

const text = document.querySelector(".app__title");

const buttons = document.querySelectorAll(".app__card-button");

const timerOnScreen = document.querySelector("#timer");

// Variáveis dos botões do site
const btnFocus = document.querySelector(".app__card-button--foco");
const btnShort = document.querySelector(".app__card-button--curto");
const btnLong = document.querySelector(".app__card-button--longo");
const btnPlay = document.querySelector("#start-pause");
const musicFocusInput = document.querySelector("#alternar-musica");
const btnStartPause = document.querySelector("#start-pause span");
const btnIcon = document.querySelector(".app__card-primary-butto-icon");

let timePassedInSeconds = 1500;
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
  timePassedInSeconds = 1500;
  alterarContexto("foco");
  btnFocus.classList.add("active");
});

btnShort.addEventListener("click", () => {
  timePassedInSeconds = 300;
  alterarContexto("descanso-curto");
  btnShort.classList.add("active");
});

btnLong.addEventListener("click", () => {
  timePassedInSeconds = 900;
  alterarContexto("descanso-longo");
  btnLong.classList.add("active");
});

function alterarContexto(contexto) {
  showTime();
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
    beepSound.play();
    alert("Tempo Finalizado!");

    // Gera uma constante que verifica se o modo foco foi finalizado
    // Cria um dispatch para que outros arquivos possam utilizar essa informação
    const activeFocus = html.getAttribute("data-contexto") == "foco";
    if (activeFocus) {
      const event = new CustomEvent("FinishedFocus");
      document.dispatchEvent(event);
    }
    zeroCountdown();
    return;
  }
  timePassedInSeconds -= 1;
  showTime();
};

btnStartPause.addEventListener("click", startPauseCountdown);

function startPauseCountdown() {
  if (breakID) {
    zeroCountdown();
    pauseSound.play();
    return;
  }
  playSound.play();
  breakID = setInterval(countdown, 1000);
  btnStartPause.textContent = "Pausar";
  btnIcon.setAttribute("src", "/imagens/pause.png");
}

// Função que zera o cronômetro
function zeroCountdown() {
  clearInterval(breakID);
  btnStartPause.textContent = "Começar";
  btnIcon.setAttribute("src", "/imagens/play_arrow.png");
  breakID = null;
}

function showTime() {
  const time = new Date(timePassedInSeconds * 1000);
  const timeFormatted = time.toLocaleTimeString("pt-Br", {
    minute: "2-digit",
    second: "2-digit",
  });
  timerOnScreen.innerHTML = `${timeFormatted}`;
}

// Invoca a função globalmente para o timer estar sempre aparecendo na tela
showTime();

// Funções para captar a data e hora atual do usuário
const currentDate = new Date();

const ano = currentDate.getFullYear(); // Acessa o ano
const mes = currentDate.getMonth(); // Acessa o mês - Janeiro é 0, Fevereiro é 1, ..., Dezembro é 11
const dia = currentDate.getDate(); // Acessa o dia
const horas = currentDate.getHours(); // Acessa as horas
const minutos = currentDate.getMinutes(); // Acessa os minutos
const segundos = currentDate.getSeconds(); // Acessa os segundos
const milissegundos = currentDate.getMilliseconds(); // Acessa os milissegundos

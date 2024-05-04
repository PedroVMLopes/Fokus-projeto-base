const html = document.querySelector("html");

const timer = document.querySelector(".app__card-timer");

const image = document.querySelector(".app__image");

// Variáveis dos botões do site
const btnFocus = document.querySelector(".app__card-button--foco");
const btnShort = document.querySelector(".app__card-button--curto");
const btnLong = document.querySelector(".app__card-button--longo");
const btnPlay = document.querySelector("#start-pause");

// Tempo dos tipos de temporizador
const timerFocus = 1500;
const timerShort = 300;
const timerLong = 900;

btnFocus.addEventListener("click", () => {
  html.setAttribute("data-contexto", "foco");
  image.setAttribute("src", "/imagens/foco.png");
});

btnShort.addEventListener("click", () => {
  html.setAttribute("data-contexto", "descanso-curto");
  image.setAttribute("src", "/imagens/descanso-curto.png");
});

btnLong.addEventListener("click", () => {
  html.setAttribute("data-contexto", "descanso-longo");
  image.setAttribute("src", "/imagens/descanso-longo.png");
});

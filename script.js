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
  alterarContexto("foco");
});

btnShort.addEventListener("click", () => {
  alterarContexto("descanso-curto");
});

btnLong.addEventListener("click", () => {
  alterarContexto("descanso-longo");
});

function alterarContexto(contexto) {
  html.setAttribute("data-contexto", contexto);
  image.setAttribute("src", `/imagens/${contexto}.png`);
}

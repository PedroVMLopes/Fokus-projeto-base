const html = document.querySelector("html");

const timer = document.querySelector(".app__card-timer");

const image = document.querySelector(".app__image");

const text = document.querySelector(".app__title");

const buttons = document.querySelectorAll(".app__card__button");

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
    contexto.classList.remove("ativo");
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
      console.log("descanso longo");
      break;
    default:
      break;
  }
}

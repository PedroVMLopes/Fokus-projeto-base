const btnAddTask = document.querySelector(".app__button--add-task");
const formAddTask = document.querySelector(".app__form-add-task");
const textArea = document.querySelector(".app__form-textarea");
const ulTasks = document.querySelector(".app__section-task-list");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let selectedTask = null;
let liSelectedTask = null;

const paragraphTaskDescription = document.querySelector(
  ".app__section-active-task-description"
);

const btnRemoveCompletedTasks = document.querySelector(
  "#btn-remover-concluidas"
);

const btnRemoveAllTasks = document.querySelector("#btn-remover-todas");

function updateTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function cancelAddTask() {
  btnCancelAddTask.addEventListener("click", () => {});
}

function createTaskElement(task) {
  const li = document.createElement("li");
  li.classList.add("app__section-task-list-item");

  const svg = document.createElement("svg");
  svg.innerHTML = `
    <svg class="app__section-task-icon-status" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="12" fill="#FFF"></circle>
        <path d="M9 16.1719L19.5938 5.57812L21 6.98438L9 18.9844L3.42188 13.4062L4.82812 12L9 16.1719Z" fill="#01080E"></path>
    </svg>
    `;

  const paragraph = document.createElement("p");
  paragraph.textContent = task.description;
  paragraph.classList.add("app__section-task-list-item-description");

  const button = document.createElement("button");
  button.classList.add("app_button-edit");

  button.onclick = () => {
    // debugger;
    const newDescription = prompt("Qual é o novo nome da tarefa ?");
    console.log("Nova descrição da tarefa: ", newDescription);
    if (newDescription) {
      paragraph.textContent = newDescription;
      task.description = newDescription;
      updateTasks();
    }
  };

  const buttonImage = document.createElement("img");
  buttonImage.setAttribute("src", "/imagens/edit.png");

  button.append(buttonImage);

  li.append(svg);
  li.append(paragraph);
  li.append(button);

  // Verifica se a tarefa já está marcada como completa
  if (task.complete) {
    li.classList.add("app__section-task-list-item-complete");
    button.setAttribute("disabled", "disabled");
  } else {
    // Marcação das tarefas em andamento
    li.onclick = () => {
      // Seleciona todos os elementos da lista e remove a classe de ativo
      document
        .querySelectorAll(".app__section-task-list-item-active")
        .forEach((element) => {
          element.classList.remove("app__section-task-list-item-active");
        });

      // Remove a seleção de uma tarefa ao clicar novamente nela
      if (selectedTask == task) {
        paragraphTaskDescription.textContent = "";
        selectedTask = null;
        liSelectedTask = null;
        return;
      }
      selectedTask = task;
      liSelectedTask = li;
      paragraphTaskDescription.textContent = task.description;

      // Adiciona a classe de ativo apenas para o elemento selecionado
      li.classList.add("app__section-task-list-item-active");
    };
  }

  return li;
}

btnAddTask.addEventListener("click", () => {
  formAddTask.classList.toggle("hidden");

  const btnCancelAddTask = document.querySelector(
    ".app__form-footer__button--cancel"
  );
  btnCancelAddTask.addEventListener("click", () => {
    textArea.value = "";
    formAddTask.classList.toggle("hidden");
  });
});

formAddTask.addEventListener("submit", (event) => {
  event.preventDefault();
  const task = {
    description: textArea.value,
  };
  tasks.push(task);
  const taskElement = createTaskElement(task);
  ulTasks.append(taskElement);
  updateTasks();
  textArea.value = "";
  formAddTask.classList.add("hidden");
});

tasks.forEach((task) => {
  const taskElement = createTaskElement(task);
  ulTasks.append(taskElement);
});

// Verifica a tarefa selecionada
// Troca o marcador da tarefa de ativa para completa e desabilita o botão de edição
document.addEventListener("FinishedFocus", () => {
  console.log("foco finalizado");
  if (selectedTask && liSelectedTask) {
    liSelectedTask.classList.remove("app__section-task-list-item-active");
    liSelectedTask.classList.add("app__section-task-list-item-complete");
    liSelectedTask.querySelector("button").setAttribute("disabled", "disabled");
    // Adiciona o atributo 'complete' no elemento na localStorage
    selectedTask.complete = true;
    updateTasks();
  }
});

const removeTasks = (onlyCompleted) => {
  const selector = onlyCompleted
    ? ".app__section-task-list-item-complete"
    : ".app__section-task-list-item";
  document.querySelectorAll(selector).forEach((element) => {
    element.remove();
  });
  tasks = onlyCompleted ? tasks.filter((task) => !task.complete) : [];
  updateTasks();
};

btnRemoveCompletedTasks.onclick = () => removeTasks(true);
btnRemoveAllTasks.onclick = () => removeTasks(false);

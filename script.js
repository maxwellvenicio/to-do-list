const btnAdd = document.querySelector(".btn-add-tarefas");
const inputAdd = document.querySelector(".input-tarefas");
const listaCompleta = document.querySelector(".listaTarefas");

let minhaListaDeItens = [];

//ADD NEW TASK
function addNovaTarefa() {
  if (
    inputAdd.value !== "" &&
    inputAdd.value !== null &&
    inputAdd.value !== undefined
  ) {
    minhaListaDeItens.push({
      tarefa: inputAdd.value,
      concluida: false,
    });
    inputAdd.value = "";
    inputAdd.focus(); //CLEAR O INPUT
  } else {
    alert("Por favor preencha a tarefa!");
  }
  mostrarTarefas();
}

//ADD BTN-ENTER
inputAdd.addEventListener("keyup", function (event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    btnAdd.click();
    console.log(minhaListaDeItens);
  }
});

//SHOW TASK
function mostrarTarefas() {
  let novaLi = "";

  minhaListaDeItens.forEach((item, index) => {
    novaLi =
      novaLi +
      `
      <li class="tarefas ${item.concluida && "done"}">
         <img class="lista-icone" src="/imagem/check.svg" alt="check-na-tarefa" onclick="concluirTarefa(${index})">
          <p>${item.tarefa}</p>
         <img class="lista-icone" src="/imagem/trash.svg" alt="tarefa-para-lixo" onclick="deletarItem(${index})">
     </li>`;
  });

  listaCompleta.innerHTML = novaLi;

  //SET ITEMS LOCALSTORAGE EM LISTA
  localStorage.setItem("lista", JSON.stringify(minhaListaDeItens));
}

//CONCLUIR TASK
function concluirTarefa(index) {
  minhaListaDeItens[index].concluida = !minhaListaDeItens[index].concluida;

  //console.log(minhaListaDeItens);

  mostrarTarefas();
}

//DELETE ITEM
function deletarItem(index) {
  minhaListaDeItens.splice(index, 1);
  //console.log(minhaListaDeItens);

  mostrarTarefas();
}

//RECHARGE TASK
function recarregarTarefas() {
  const tarefasLocalStorage = localStorage.getItem("lista");

  if (tarefasLocalStorage) {
    minhaListaDeItens = JSON.parse(tarefasLocalStorage);
  }

  mostrarTarefas();
}

recarregarTarefas();
btnAdd.addEventListener("click", addNovaTarefa);

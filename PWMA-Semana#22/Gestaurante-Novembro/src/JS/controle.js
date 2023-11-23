let pedidos = [];

const pedidoForm = document.getElementById("pedido-form");
const descricaoInput = document.getElementById("descricao");
const listaPedidos = document.getElementById("lista-pedidos");

pedidoForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const descricao = descricaoInput.value;
  criarPedido(descricao);
  atualizarListaPedidos();
  descricaoInput.value = "";
});

function criarPedido(descricao) {

  const pedido = {
    id: Date.now(),
    descricao: descricao,
    status: "Em preparação",
  };
  pedidos.push(pedido);
}

function atualizarListaPedidos() {
  listaPedidos.innerHTML = "";


  const limitePedidos = Math.min(pedidos.length, 100); // Mostra no máximo 100 pedidos
  const listaContainer = document.createElement("div");
  listaContainer.classList.add("row", "d-flex", "flex-wrap", "justify-content-lefth");

  for (let i = 0; i < limitePedidos; i++) {
    const pedido = pedidos[i];
    const divPedido = document.createElement("div");
    divPedido.classList.add("col-md-4", "mb-3");

    divPedido.innerHTML = `
    <div class="card" >
        <div class="card-body text-center">
          <h2 class="card-title">${pedido.descricao}</h2>
          <p class="card-text">Status: <strong>${pedido.status}</strong></p>
          <button type="submit" class="btn btn-dark mt-20" onclick="atualizarPedido(${pedido.id})">Atualizar Status</button>
          <button type="submit" class="btn btn-dark mt-20" onclick="excluirPedido(${pedido.id})">Excluir Pedido</button>
        </div>
      </div>
    `;

    listaContainer.appendChild(divPedido);
  }

  listaPedidos.appendChild(listaContainer);
  if (pedidos.length === 0) {
    const mensagemNenhumPedido = document.createElement("div");
    mensagemNenhumPedido.classList.add("col-md-12", "text-center", "my-5");
    mensagemNenhumPedido.innerHTML = `
      <p>Nenhum pedido disponível.</p>
    `;
    listaPedidos.appendChild(mensagemNenhumPedido);
  }
}

function atualizarPedido(id) {
  const novoStatus = prompt("Novo status do pedido:");
  const pedido = pedidos.find((pedido) => pedido.id === id);
  
  if (pedido && pedido != "") {
    pedido.status = novoStatus;
  }
  atualizarListaPedidos();
}

function excluirPedido(id) {
  pedidos = pedidos.filter((pedido) => pedido.id !== id);
  atualizarListaPedidos();
}

atualizarListaPedidos();
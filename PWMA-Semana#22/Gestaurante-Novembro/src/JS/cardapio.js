const regNome = new RegExp("[a-zA-Z\u00C0-\u017F]{2,20}");
const regDescricao = new RegExp("[a-zA-Z\u00C0-\u017F]{5,50}");
exibirCardapio()

function checkImage(url) {
  var image = new Image();
  image.onload = function() {
    if (this.width > 0) {
      return true
    }
  }
  image.onerror = function() {
    return false
  }
  image.src = url;
}

function adicionarPrato() {
  let foto = document.getElementById("foto").value
  const nome = document.getElementById("nome").value
  const descricao = document.getElementById("descricao").value
  const preco = document.getElementById("preco").value
  const peso = document.getElementById("peso").value

  if(foto == "") {
   foto =  "src/img/displayPrato.jpeg"
  }

  if (validarEntrada(nome,descricao, preco, peso)) {
    const prato = {
    foto: foto,
    nome: nome,
    descricao: descricao,
    preco: preco,
    peso: peso
  }
    if (localStorage.getItem('pratos') === null) {
      // Adicionando um array com um objeto no localstorage
      localStorage.setItem('pratos', JSON.stringify([prato]));
    } else {
      // Copiando o array existente no localstorage e adicionando o novo objeto ao final.
      localStorage.setItem(
        'pratos',
        // O JSON.parse transforma a string em JSON novamente, o inverso do JSON.strigify
        JSON.stringify([
          ...JSON.parse(localStorage.getItem('pratos')),
          prato
        ])
      );
    }
  }
  exibirCardapio()
}

function validarEntrada(nome, descricao, preco, peso) {

    if (!regNome.test(nome)) {
        alert("Informe um nome de 2 a 20 caracteres!");
        return false;
    }

    if (!regDescricao.test(descricao)) {
        alert("Informe uma descrição de 5 a 50 caracteres!");
        return false;
    }

      if(preco === "") {
         alert("Informe o preço do prato!");
         return false;
      }

      if(peso === "") {
         alert("Informe o peso do prato em gramas!");
         return false;
      }


    return true;
}

function exibirCardapio() {
  var pratos
  if (localStorage.getItem("pratos") == null) {
      pratos = []
  } else {
      pratos = JSON.parse(localStorage.getItem("pratos"))
  }
 
  
  const cardapio = document.getElementById("cardapio")
  cardapio.innerHTML = ""

  
  for (let i = 0; i < pratos.length; i++) {
    cardapio.innerHTML += `<div id="card-${i}" class="card my-3" style="width: 18rem;">
  <img src=${pratos[i].foto} alt=${pratos[i].nome}>
  <div class="card-body">
    <h5 class="card-title"><strong>${pratos[i].nome}</strong></h5>
    <p class="card-text"> ${pratos[i].descricao}</p>
  </div>
  <ul class="list-group list-group-flush">
    <li class="list-group-item">R$ ${pratos[i].preco}</li>
    <li class="list-group-item">${pratos[i].peso} g</li>
  </ul>
  <div class="card-body">
    <button onclick="editar(${i})" class="btn btn-dark">Editar</button>
    <button onclick="excluir(${i})" class="btn btn-dark">Excluir </button>
  </div>
</div>`
  }

}



function editar(indice) {
  exibirCardapio()

  var pratos
  if (localStorage.getItem("pratos") == null) {
      pratos = []
  } else {
      pratos = JSON.parse(localStorage.getItem("pratos"))
  }
  
  const cardPrato = document.getElementById(`card-${indice}`)

  cardPrato.innerHTML = `
      <img class="card-img-top" src=${pratos[indice].foto} alt=${pratos[indice].nome}>
      <div class="card-body">
      <label for="nomeAlter"> Nome </label>
      <input type="text" value="${pratos[indice].nome}" id="nomeAlter" class="form-control"> 
      
      <label for="descricaoAlter"> Descrição: </label>
    <input type="text" value="${pratos[indice].descricao}" id="descricaoAlter" class="form-control"> 
      </div>

      <div class="card-body">
       <label for="precoAlter"> Preço (R$): </label>
      <input type="text" value="${pratos[indice].preco}" id="precoAlter" class="form-control"> 
      <label for="pesoAlter"> Peso (g): </label>
        <input type="text" value="${pratos[indice].peso}" id="pesoAlter" class="form-control">
        
     
      </div>
      <div class="card-body">
        <button onclick="confirmarEditar(${indice})" class="btn btn-dark">Salvar</button>
        <button onclick="exibirCardapio()" class="btn btn-dark">Cancelar  </button>
      </div>
   `
}

    function confirmarEditar(indice) {
      var pratos
      if (localStorage.getItem("pratos") == null) {
          pratos = []
      } else {
          pratos = JSON.parse(localStorage.getItem("pratos"))
      }
      
      const novoNome = document.getElementById("nomeAlter")
      const novaDescricao = document.getElementById("descricaoAlter")
      const novoPreco = document.getElementById("precoAlter")
      const novoPeso = document.getElementById("pesoAlter")

      if (validarEntrada(novoNome,novaDescricao, novoPreco, novoPeso)) {
      pratos[indice].nome = novoNome.value
      pratos[indice].descricao = novaDescricao.value
      pratos[indice].preco = novoPreco.value
      pratos[indice].peso = novoPeso.value
      localStorage.setItem("pratos", JSON.stringify(pratos))
      exibirCardapio()
      }
      
    }



function excluir(indice) {
  var pratos
  if (localStorage.getItem("pratos") == null) {
      pratos = []
  } else {
      pratos = JSON.parse(localStorage.getItem("pratos"))
  }
  
    if (confirm(`Aperte em "OK" para excluir "${pratos[indice].nome}"" do cardápio, ou clique em "Cancelar".`)) {
        const copiaPratos = pratos.slice(0, indice).concat(pratos.slice(indice + 1))
       localStorage.setItem("pratos", JSON.stringify(copiaPratos))
    }
    exibirCardapio()

}

function apagaCardapio() {
  if (confirm("Tem certeza de que deseja excluir todo o cardápio?\n\nEssa ação é irreversível.")) {
  localStorage.removeItem("pratos")
  exibirCardapio()
  }
}
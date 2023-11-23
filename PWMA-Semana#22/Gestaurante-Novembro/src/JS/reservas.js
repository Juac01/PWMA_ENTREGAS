const mesaDisponivel = true

let qtdMesas = 10
let mesasReservadas = 0

document.getElementById("qtd-mesas").value = 10
gerarMesas()



function gerarMesas() {
  mesasReservadas = 0
  const mesas = document.getElementById("mesas")
  qtdMesas = Number(document.getElementById("qtd-mesas").value)

  if(qtdMesas > 1 && qtdMesas <= 150) {
  
  mesas.innerHTML = `<p> <b>Clique em uma mesa para reservá-la. </b></p> <p id="mesas-disponiveis"> Mesas Disponíveis: ${qtdMesas} </p><br> <p id="mesas-reservadas">Mesas Reservadas: ${mesasReservadas}</p>`
  for (let i = 1; i <= qtdMesas; i++) {
    mesas.innerHTML += `<div class="mesa col-md-1 text-center bg-success border border-secondary rounded
" id="mesa-${i}" onclick="alterarStatus(${i})"> ${i} </div>`
  }
  

} else {
    mesas.innerHTML = "Informe um número entre 2 e 150."
}
}


function alterarStatus(indice) {
  const mesa = document.getElementById("mesa-" + indice)
  let numMesasDisponiveis = document.getElementById("mesas-disponiveis")
  let numMesasReservadas = document.getElementById("mesas-reservadas")

  
  if (mesa.classList.contains("bg-success")) {
    mesa.classList.remove("bg-success")
    mesa.classList.add("bg-danger")
    qtdMesas--
    mesasReservadas++
  } else {
      mesa.classList.remove("bg-danger")
      mesa.classList.add("bg-success")
      mesasReservadas--
      qtdMesas++
  }

  numMesasDisponiveis.innerHTML = `Mesas Disponíveis: ${qtdMesas}`
  numMesasReservadas.innerHTML = `Mesas Reservadas: ${mesasReservadas}`  
    
  }



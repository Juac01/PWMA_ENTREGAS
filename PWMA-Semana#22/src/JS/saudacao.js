
let res = document.getElementById("nome-restaurante");

atualizarNome() 
function iniciarInteracao() {
	let nome = window.prompt("Qual é o seu nome?");
  localStorage.setItem("login", nome)
  atualizarNome()
}

function atualizarNome() {

  if ((localStorage.getItem("login") === null) || (localStorage.getItem("login") === "")) {
    localStorage.setItem("login", "Nome do Restaurante")
  }
  else
  {
    res.innerHTML = ""
    res.innerHTML = `<strong> ${localStorage.getItem("login")} </strong>`
  }
}
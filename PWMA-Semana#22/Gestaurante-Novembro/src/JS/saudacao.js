
let res = document.getElementById("saudacao");

atualizarNome() 
function iniciarInteracao() {
	let nome = window.prompt("Qual é o seu nome?");
  localStorage.setItem("login", nome)
  atualizarNome()
}

function atualizarNome() {
res.innerHTML = ""
  if (!(localStorage.getItem("login") === null) && !(localStorage.getItem("login") === "")) {
    res.innerHTML = `<p>Olá, <strong> ${localStorage.getItem("login")}</strong>! Bem vindo(a) ao Gestaurante! &#x1F37A;</p>`
  }
}
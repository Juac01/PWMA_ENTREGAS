//CONDIÇÕES REGEX
const regNomeFuncionario = new RegExp("[a-zA-Z\u00C0-\u017F]{3,14}");
const regCPF = new RegExp("[0-9]{3}.[0-9]{3}.[0-9]{3}/[0-9]{2}");


exibirTabela()

const listaDepartamentos = ["Cozinha","Delivery", "Financeiro", "Gerência", "Limpeza"]


const tiposDepartamento = document.getElementById("departamento")

preencherOpcoesTipoDepartamento(tiposDepartamento)


function handleCPF(event) {
    let input = event.target
    input.value = cpfMask(input.value)
  }


  function cpfMask(v){
    v=v.replace(/\D/g,"")                    //Remove tudo o que não é dígito
    v=v.replace(/(\d{3})(\d)/,"$1.$2")       //Coloca um ponto entre o terceiro e o quarto dígitos
    v=v.replace(/(\d{3})(\d)/,"$1.$2")       //Coloca um ponto entre o terceiro e o quarto dígitos
                                             //de novo (para o segundo bloco de números)
    v=v.replace(/(\d{3})(\d{1,2})$/,"$1/$2") //Coloca um hífen entre o terceiro e o quarto dígitos
    return v
}




function preencherOpcoesTipoDepartamento(elementoHtml) {
    for (let i = 0; i < listaDepartamentos.length; i++) {
        elementoHtml.innerHTML += `<option value="${listaDepartamentos[i]}"> ${listaDepartamentos[i]} </option>`
    }
}


function adicionarFuncionario() {
    const nomeInput = document.getElementById("nome").value
    const cpfInput = document.getElementById("cpf").value
    const dataAdmissaoInput = document.getElementById("data-admissao").value
    const departamentoInput = document.getElementById("departamento").value

    if (validarEntrada(nomeInput, cpfInput, departamentoInput, dataAdmissaoInput)) {
        const funcionario = {
            nome: nomeInput,
            cpf: cpfInput,
          departamento: departamentoInput,
          dataAdmissao: formatarData(dataAdmissaoInput)
        }


        if (localStorage.getItem('funcionarios') === null) {
            // Adicionando um array com um objeto no localstorage
            localStorage.setItem('funcionarios', JSON.stringify([funcionario]));
          } else {
            // Copiando o array existente no localstorage e adicionando o novo objeto ao final.
            localStorage.setItem(
              'funcionarios',
              // O JSON.parse transforma a string em JSON novamente, o inverso do JSON.strigify
              JSON.stringify([
                ...JSON.parse(localStorage.getItem('funcionarios')),
                funcionario
              ])
            );
          }
          console.log(JSON.parse(localStorage.getItem("funcionarios")))
        }

        exibirTabela()
    }


function validarEntrada(nome, cpf, departamento, dataAdmissao) {
   

    if (!regNomeFuncionario.test(nome)) {
        alert("Informe um nome válido!");
        return false;
    }

    if (!regCPF.test(cpf)) {
        alert("Informe um CPF válido!");
        return false;
    }

    if (!departamento) {
        alert("Informe o Departamento!");
        return false;
    }



    if (!dataAdmissao) {
        alert("Informe uma Data de Admissão válida!");
        return false;
    }

    return true;

}

    


function formatarData(data) {
    const divisaoData = data.split("-")
    const ano = divisaoData[0]
    const mes = divisaoData[1]
    const dia = divisaoData[2]
    const dataFormatada = dia + "/" + mes + "/" + ano

    return dataFormatada
}

function formatarNome(nome) {
    return nome.charAt(0).toUpperCase() + nome.slice(1);
}

function exibirTabela() {
  var funcionarios
  if (localStorage.getItem("funcionarios") == null) {
      funcionarios = []
  } else {
      funcionarios = JSON.parse(localStorage.getItem("funcionarios"))
  }
    const tabela = document.getElementById("tabela")
  tabela.innerHTML = ""
  

    for (let i = 0; i < funcionarios.length; i++) {
        tabela.innerHTML +=
            `<tr>
                <td id="nome-funcionario-${i}" class="text-center align-middle"> ${funcionarios[i].nome} </td>
                <td id="cpf-funcionario-${i}" class="text-center align-middle"> ${funcionarios[i].cpf} </td>
                <td id="departamento-funcionario-${i}" class="text-center align-middle"> ${funcionarios[i].departamento} </td>
                <td id="dataAdmissao-funcionario-${i}" class="text-center align-middle"> ${funcionarios[i].dataAdmissao} </td>

                <td id="acoes-funcionario-${i}" class="text-center align-middle">
                <img onclick="editarfuncionario(${i})" src="https://www.freeiconspng.com/thumbs/edit-icon-png/edit-new-icon-22.png" alt="deletar">
                    <img onclick="apagarfuncionario(${i})" src="https://www.iconpacks.net/icons/1/free-trash-icon-347-thumb.png" alt="alterar">

                </td>
            </tr> `
    }
}





function apagarfuncionario(indice) {
    var funcionarios
    if (localStorage.getItem("funcionarios") == null) {
        funcionarios = []
    } else {
        funcionarios = JSON.parse(localStorage.getItem("funcionarios"))
    }

    if (confirm("Tem certeza de que deseja excluir esse funcionario?")) {

        const copiafuncionarios = funcionarios.slice(0, indice).concat(funcionarios.slice(indice + 1))
        localStorage.setItem("funcionarios", JSON.stringify(copiafuncionarios))
    }
    exibirTabela()

}

function editarfuncionario(indice) {
    exibirTabela()

    var funcionarios
    if (localStorage.getItem("funcionarios") == null) {
        funcionarios = []
    } else {
        funcionarios = JSON.parse(localStorage.getItem("funcionarios"))
    }

    const nomefuncionarioTabela = document.getElementById("nome-funcionario-" + indice)
    const cpfFuncionarioTabela = document.getElementById("cpf-funcionario-" + indice)
    const departamentoFuncionarioTabela = document.getElementById("departamento-funcionario-" + indice)
    const dataAdmissaoTabela = document.getElementById("dataAdmissao-funcionario-" + indice)
    let acoesFuncionarioTabela = document.getElementById("acoes-funcionario-" + indice)

  const dataDesformatada = funcionarios[indice].dataAdmissao.split("/")[2] + "-" + funcionarios[indice].dataAdmissao.split("/")[1] + "-" + funcionarios[indice].dataAdmissao.split("/")[0]



    nomefuncionarioTabela.innerHTML = `<input type="text" value="${funcionarios[indice].nome}" class="form-control" id="nomeAlter">`
    cpfFuncionarioTabela.innerHTML =       `<input type="text" value="${funcionarios[indice].cpf}" class="form-control" id="cpfAlter" maxlength="14" onkeyup="handleCPF(event)">`

   departamentoFuncionarioTabela.innerHTML = `<select name="departamento" class="form-control" id="departamentoAlter">
    <option selected disabled hidden style='display: none' value=''></option>
</select>`
  
        dataAdmissaoTabela.innerHTML = `<input type="date" value="${dataDesformatada}" class="form-control" id="admissaoAlter">`

   acoesFuncionarioTabela.innerHTML = `<img onclick="confirmaAlteracao(${indice})" src="https://creazilla-store.fra1.digitaloceanspaces.com/emojis/47298/check-mark-button-emoji-clipart-xl.png" alt="cofirmar">
   <img onclick="exibirTabela()" src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Eo_circle_red_letter-x.svg/1200px-Eo_circle_red_letter-x.svg.png" alt="deletar">`


    let listaOpcoesDepartamentoEditar = document.getElementById("departamentoAlter")


    preencherOpcoesTipoDepartamento(listaOpcoesDepartamentoEditar)

    listaOpcoesDepartamentoEditar.value = funcionarios[indice].departamento


    acoesFuncionarioTabela.innerHTML = `<img onclick="confirmaAlteracao(${indice})" src="https://creazilla-store.fra1.digitaloceanspaces.com/emojis/47298/check-mark-button-emoji-clipart-xl.png" alt="cofirmar">
                <img onclick="exibirTabela()" src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Eo_circle_red_letter-x.svg/1200px-Eo_circle_red_letter-x.svg.png" alt="deletar">`



}

function confirmaAlteracao(indice) {
    var funcionarios
    if (localStorage.getItem("funcionarios") == null) {
        funcionarios = []
    } else {
        funcionarios = JSON.parse(localStorage.getItem("funcionarios"))
    }

    const nomeAlter = document.getElementById("nomeAlter").value
    const cpfAlter = document.getElementById("cpfAlter").value    
    const departamentoAlter = document.getElementById("departamentoAlter").value  
    const dataAdmissaoAlter = document.getElementById("admissaoAlter").value


    if (validarEntrada(nomeAlter, cpfAlter, departamentoAlter, dataAdmissaoAlter)) {
        funcionarios[indice].nome = nomeAlter
        funcionarios[indice].cpf = cpfAlter
        funcionarios[indice].departamento = departamentoAlter
        funcionarios[indice].dataAdmissao = formatarData(dataAdmissaoAlter)
        localStorage.setItem("funcionarios", JSON.stringify(funcionarios))

        exibirTabela()
    }
}
          function apagarFuncionarios() {
            if (confirm("Tem certeza de que deseja excluir todos os funcionários?\n\nEssa ação é irreversível.")) {
            localStorage.removeItem("funcionarios")
            exibirTabela()
            }
          }
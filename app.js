
let inputName = document.querySelector("#name")
let botaConfirmar = document.querySelector("#btn-confirmar")
let botaoExcluir = document.querySelector("#btn-excluir")
let botaoSortear = document.querySelector(".btn-sortear")
let divResult = document.querySelector(".result")
let resultado = document.querySelector(".resultado")
let resultadoGanhador = document.querySelector("#result-ganhador")
let resultadoData = document.querySelector("#result-data")
let pData = document.querySelector("#data")
let voltar = document.querySelector("#voltar")
let list = document.querySelector("#box-card")

let storage = localStorage.getItem("pessoa") || "[]"
let dados = JSON.parse(storage)

function sorteiaPessoa(){
  let numeroSorteado = Math.floor(Math.random() * dados.length)
  let pessoas = []
  
  dados.forEach((nome) => {
    pessoas.push(nome.name)
    console.log(pessoas[numeroSorteado]);
    resultadoGanhador.textContent = pessoas[numeroSorteado]   
  })
}

function timer(){
  setTimeout(() => {
    sorteiaPessoa()
    divResult.classList.add("success")
  }, 1000)
}

voltar.addEventListener("click", (e) => {
  e.preventDefault()
  divResult.classList.remove("success")
})

botaoSortear.addEventListener("click", () => {
  timer()
})


let data = new Date()
pData.textContent = data
resultadoData.textContent = data


function addParticipante() {
  if(inputName.value == ""){
    alert("O campo precisa ser preenchido!!")
    return
  }else{    
     const pessoa = inputName.value
      let item = {
        id: crypto.randomUUID(),
        name:pessoa
      }

     dados.push(item)
     localStorage.setItem('pessoa', JSON.stringify(dados))
     inputName.value = ""
  }
}

function deleteParticipante(id){
    const newList = dados.filter(item => item.id !== id)
    dados = newList
    listaParticipantes()
    localStorage.setItem("pessoa", JSON.stringify(dados))
}


function listaParticipantes(){
    let html = ""
    dados.forEach(pessoa => {
      html += `
        <div id="card">
          <label>Código : ${pessoa.id}</label></br>
          <div id="card-container">
            <p>${pessoa.name}</p>
            <button id="btn-excluir" onclick="deleteParticipante('${pessoa.id}')">Deletar</button>
          </div>
        </div>
      `
    })
    list.innerHTML = html
    
}


listaParticipantes()

inputName.addEventListener('keydown', (e) =>{
  if(inputName.valuue == "") return
  if(e.key == "Enter"){
    addParticipante()
    inputName.focus()
  }
})


botaConfirmar.addEventListener("click", (e) => {
  e.preventDefault()
  addParticipante() 
  listaParticipantes()   
})






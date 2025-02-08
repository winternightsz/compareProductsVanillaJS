const resources = document.querySelector("#resourcesContainer");
const template = document.querySelector("template");
const btnFilter = document.querySelectorAll(".btnFilter");

let category = 'all';
let filteredDataResources = [];

const dataResources = [
  {'title': 'FlexBox Froggy',
   'link': 'https://flexboxfroggy.com/',
   'imagem': 'https://flexboxfroggy.com/',
   'preco': 400,
   'numId': 0,
   'description': 'A game where you help Froggy and friends by writing CSS code!',
   'tags': ['all', 'css', 'game']
  },
  {'title': 'freeCodeCamp',
   'link': 'https://www.freecodecamp.org/',
   'imagem': 'https://flexboxfroggy.com/',
   'preco': 200,
   'numId': 1,
   'description': 'Learn to code at home. Build projects. Earn certifications.',
   'tags': ['all', 'html', 'css', 'js', 'certification']
  },
  {'title': 'State of JavaScript',
   'link': 'https://stateofjs.com/',
   'imagem': 'https://flexboxfroggy.com/',
   'preco': 300,
   'numId': 2,
   'description': 'Find out which libraries developers want to learn next, satisfaction ratings, and much more.',
   'tags': ['all', 'js', 'survey']
  },
  {'title': 'Mais um pra lista',
    'link': 'https://stateofjs.com/',
    'imagem': 'https://flexboxfroggy.com/',
    'preco': 700,
    'numId': 3,
    'description': 'Find out which libraries developers want to learn next.',
    'tags': ['all', 'css', 'html']
   }
]
//primeiro ele remove de todos o active
//e entao ele adiciona active somente pro que foi selecionado
btnFilter.forEach(item => {
  item.addEventListener('click', function () {
      btnFilter.forEach(i => {
          i.classList.remove('active');
      })
      item.classList.add('active');
  })
});

//Encher a variavel de qual filtro clicou
//e chamar pra atualizar os cards dependendo do filtro
function fillResourcesContainer() {
  category = this.id;
  clearContainer(resources);
  filterResources(category);
}

function clearContainer(container) {
  container.innerHTML = "";
}

function filterResources(category) {
  filteredDataResources = dataResources.filter( resourceData => {
    if (resourceData.tags.includes(category)) {
       const resourceCard = copyTemplateCard(resourceData);
       resources.appendChild(resourceCard);
       
    } 
  })
}

filterResources(category);

//funcao chamada quando clica no filterResources que se chama sozinho e
//tambem chamado se o usuario escolhe um filtro
function copyTemplateCard(resourceData) {

  const resourceTemplate = document.importNode(template.content, true);

  const card = resourceTemplate.querySelector("#resource");
  card.style.height = `400px`;
  const imagem = card.querySelector("#imagem");
  imagem.src = resourceData.imagem;

  const title = card.querySelector("#title");
  title.innerText = resourceData.title;
  title.href = resourceData.link;

  const preco = card.querySelector("#preco");
  preco.innerText = `R$` + resourceData.preco;

  const description = card.querySelector("#description");
  description.innerText = resourceData.description;
 
  const btnComparar = card.querySelector(".btnComparar");
  btnComparar.id = resourceData.numId;
  btnComparar.addEventListener("click", encherCompararContainer);

  const btnDesistir = card.querySelector(".btnDesistir");
  btnDesistir.id = btnComparar.id;
  btnDesistir.addEventListener("click", desistirDoItem);

  return card;
}

//Chamando isso somente quando renderiza a primeira vez
//EventListener pra se o usuario escolheu algum filtro
btnFilter.forEach(function(btn) {
    btn.addEventListener("click", fillResourcesContainer);
});

const compararContainer = document.querySelector("#compararContainer");
const btnComparar = document.querySelectorAll(".btnComparar");
const btnDesistir = document.querySelectorAll(".btnDesistir");
const btnCompararPrincipal = document.querySelector("#btnCompararPrincipal");

const alertBoxContainer = document.querySelector("#alertBoxContainer");
const ladoDireitoContainer = document.querySelector("#ladoDireitoContainer");

let opComp = -1;
let opcoesComparar = [];

let vetCont = 0;
let vetComp = [];

let mostrando = false;

let copiaDados = [];
let opcoesComparar2 = [];

let copiaCont = 0;
let copiaVet = [];

//Botao de comparar
function encherCompararContainer(e) { 
  this.style.color = "red";
  opComp = this.id;
  console.log(opComp);
  if(vetCont < 3)
  {
    this.style.display = "none";
    vetComp[vetCont++] = opComp;
    visibilizarDesistir(opComp);
  }else
  {
    mostrarAlert();
  }
}

function mostrarDesistirSeSelecionado(btnNum){
  vetComp.forEach((item)=>{
    if (item == btnNum){
      visibilizarDesistir(btnNum);
    }
  });
}

function visibilizarDesistir(btnNum){
  mostrarVet();
  document.querySelectorAll(".btnDesistir").forEach((item) => {
    if (item.id == btnNum){
      console.log("Ativando botão Desistir");
      item.style.display = "block";
    }
  });
}


function tirarDesistir(btnNum){
  document.querySelectorAll(".btnDesistir").forEach((item) => {
    if(item.id == btnNum){
      item.style.display = "none";
    }
  })
}

function desistirDoItem(e){
  //this.style.display = "none";
  opComp = this.id;
  visibilizarComparar(opComp);
  vetComp = vetComp.filter(item => item !== opComp);
  vetCont--;
  clearContainer(ladoDireitoContainer);
  mostrarVet();
}

function visibilizarComparar(btnNum){
  mostrarVet();
  document.querySelectorAll(".btnComparar").forEach((item) => {
    if (item.id == btnNum){
      console.log("Ativando botão Comparar");
      item.style.display = "block";
    }
  });
}



//Coloca a opcao certz pra saber qual card fazer depois colocar no container
//Numero do id do botao ta sendo igual o numero numId
// que coloco o id quando faco o card de cima
function escolherOpcoes(opComp) {
opcoesComparar = dataResources.filter( resourceData => {
    if (resourceData.numId == opComp ) {
       const comparacaoCard = fazerCardComparacao(resourceData);
       compararContainer.appendChild(comparacaoCard);
    } 
  })
}

escolherOpcoes(opComp);

function mostrarAlert(){
  const modal_container = document.getElementById("alertBoxContainer");
  alertBoxContainer.style.display = "block";
  modal_container.classList.add("show");
  const btnConfirma = document.querySelector("#btnConfirma");
  btnConfirma.addEventListener('click', function (){
    alertBoxContainer.style.display = "none";
  });
}

function limparVet(){
  vetComp.forEach((item) =>{
    tirarDesistir(item);
    visibilizarComparar(item);
  });
  vetCont = 0;
  vetComp = [];
  copiaCont = 0;
  copiaVet = [];
  copiaDados = [];
}


function copiarVet(opComp){
  opcoesComparar2 = dataResources.filter( resourceData => {
    if (resourceData.numId == opComp ) {
      copiaDados.push({
        numId: resourceData.numId,
        preco: resourceData.preco
      });
    } 
  })
}

function ordenarVetor(){
  copiaDados.sort((a, b) => a.preco - b.preco);
  copiaDados.forEach((item) =>{
    copiaVet[copiaCont++] = item.numId;
  });
}

function mostrarCards()
{

  if(vetCont < 2)
  {
    alert("Precisa de mais de um item escolhido para fazer a comparação.");
  }else if (mostrando == true)
  {
    alert("Já esta comparando itens, favor começar denovo e escolher novamente.");
    location.href='index.html#compararContainer'
  }else
  {
    const pTeste = document.querySelector("#testeCompararIds");
    pTeste.innerText = vetComp;

    vetComp.forEach( (opComp) =>
    {
      copiarVet(opComp);
    });
    ordenarVetor();   
    copiaVet.forEach( (opComp) =>
    {
      escolherOpcoes(opComp);
    });
    location.href='index.html#compararContainer'
    pTeste.style.visibility = "visible";
    compararContainer.style.display = "flex";
    mostrando = true;
  }

}
function resetarComp(){
   clearContainer(compararContainer);    
   limparVet();
   mostrando = false;
   clearContainer(ladoDireitoContainer); 
}

function fazerCardComparacao(resourceData) {

  const resourceTemplate = document.importNode(template.content, true);

  const card = resourceTemplate.querySelector("#resource");

  const imagem = card.querySelector("#imagem");
  imagem.src = resourceData.imagem;

  const title = card.querySelector("#title");
  title.innerText = resourceData.title;
  title.href = resourceData.link;

  const preco = card.querySelector("#preco");
  preco.innerText = `R$` + resourceData.preco;

  const description = card.querySelector("#description");
  description.innerText = resourceData.description;
  
  const btnComparar = card.querySelector(".btnComparar");
  btnComparar.style.display = "none";

  return card;
}


function mostrarVet(){
  clearContainer(ladoDireitoContainer);
  vetComp.forEach( (opComp) =>
    {
      opcoesVetor(opComp);
    });
}

function opcoesVetor(opComp) {
  opcoesComparar = dataResources.filter( resourceData => {
      if (resourceData.numId == opComp ) {
         const comparacaoCard = fazerCardVetor(resourceData);
         ladoDireitoContainer.appendChild(comparacaoCard);
      } 
    })
  }

function fazerCardVetor(resourceData) {

  const resourceTemplate = document.importNode(template.content, true);

  const card = resourceTemplate.querySelector("#resource");
  card.style.height = `200px`;
  const imagem = card.querySelector("#imagem");
  imagem.src = resourceData.imagem;

  const title = card.querySelector("#title");
  title.innerText = resourceData.title;
  title.href = resourceData.link;

  const preco = card.querySelector("#preco");
  preco.innerText = `R$` + resourceData.preco;

  const description = card.querySelector("#description");
  description.style.display = "none";
  
  const btnComparar = card.querySelector(".btnComparar");
  btnComparar.style.display = "none";

  return card;
}
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
  }
]

//Encher a variavel de qual filtro clicou
//e chamar pra atualizar os cards dependendo do filtro
function fillResourcesContainer() {
  category = this.id;
  clearContainer(resources);
  filterResources(category)
}

function clearContainer(container) {
  container.innerHTML = "";
}

//
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
  
  const imagem = card.querySelector("#imagem");
  imagem.src = resourceData.imagem;

  const title = card.querySelector("#title");
  title.innerText = resourceData.title;
  title.href = resourceData.link;

  const preco = card.querySelector("#preco");
  preco.innerText = resourceData.preco;

  const description = card.querySelector("#description");
  description.innerText = resourceData.description;


  return card;
}

//EventListener pra se o usuario escolheu algum filtro
btnFilter.forEach(function(btn) {
    btn.addEventListener("click", fillResourcesContainer);
});

const compararContainer = document.querySelector("#compararContainer");
const btnComparar = document.querySelectorAll(".btnComparar");
const btnCompararPrincipal = document.querySelector("#btnCompararPrincipal");

let opComp = -1;
let opcoesComparar = [];
let vetCont = 0;
let cardCont = 0;
let vetComp = [];

//Botao de comparar
function encherCompararContainer(e) { 
  this.style.color = "red";
  opComp = this.id;
  console.log(opComp);
  vetComp[vetCont++] = opComp;
  escolherOpcoes(opComp);
}

function escolherOpcoes(opComp) {
opcoesComparar = dataResources.filter( resourceData => {
    if (resourceData.numId == opComp ) {
       const comparacaoCard = fazerCardComparacao(resourceData);
       compararContainer.appendChild(comparacaoCard);
    } 
  })
}

escolherOpcoes(opComp);

function testarNumeros(){
  const pTeste = document.querySelector("#testeCompararIds");
  pTeste.innerText = vetComp;
  console.log(vetComp);
  pTeste.style.visibility = "visible";
  compararContainer.style.display = "flex";
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
  preco.innerText = resourceData.preco;

  const description = card.querySelector("#description");
  description.innerText = resourceData.description;
  
  return card;
}

let idCont = 0;

btnComparar.forEach(function(btn) {
  btn.style.color = "blue";
  btn.id = idCont++;
  btn.addEventListener("click", encherCompararContainer);
});


function compararProdutos(){
  compararContainer.style.display = "block";
  clearContainer(compararContainer);
}
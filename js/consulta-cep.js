// viacep.com.br/ws/RS/Porto Alegre/Domingos Jose/json/ 

let rua = document.querySelector('#rua');
let cidade = document.querySelector('#cidade');
let uf = document.querySelector('#estado');
let btnCep = document.querySelector('#btnBuscarCep');
let listaCep = document.querySelector('#listaCep');

rua.value = 'Digite o Nome da Rua';
cidade.value = 'São Paulo';
uf.value = 'SP';

btnCep.addEventListener('click', function(e) {
  e.preventDefault();

  let urlBase = 'https://viacep.com.br/ws/';
  let parametros = uf.value + '/' + cidade.value + '/' + rua.value + '/json/';
  let callback = '?callback=popularNaoSeiMeuCep';

  let script = document.createElement('script');
  script.src = urlBase + parametros + callback;
  document.body.appendChild(script);
});

function popularNaoSeiMeuCep(resposta) {

  if (!Array.isArray(resposta)) {
    alert('O retorno não é uma lista de CEPs');
    return;
  }

  resposta.forEach(function(i) {

    let li = document.createElement('li');
    let endereco = i.logradouro + ' | ' + i.bairro + ' | ' + i.localidade + ' | ' + i.uf + ' | ' + i.cep;
    li.innerHTML = endereco;
    li.addEventListener("click", () => toggleMessage(`Copie o cep: ${i.cep.replace('-', '')}`))
    listaCep.appendChild(li);
  });
}
const closeButton = document.querySelector("#close-message");
const toggleMessage = (msg) => {
  const fadeElement = document.querySelector("#fade");
  const messageElement = document.querySelector("#message");

  const messageTextElement = document.querySelector("#message p");

  messageTextElement.innerText = msg;

  fadeElement.classList.toggle("hide");
  messageElement.classList.toggle("hide");
};

closeButton.addEventListener("click", () => toggleMessage());

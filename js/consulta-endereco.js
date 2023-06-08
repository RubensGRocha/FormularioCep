const enderecoForm = document.querySelector("#endereco-form");
let cep = document.querySelector('#cep');
let rua = document.querySelector('#rua');
let bairro = document.querySelector('#bairro');
let cidade = document.querySelector('#cidade');
let estado = document.querySelector('#estado');
const formInputs = document.querySelectorAll("[data-input]");

// cep.value = '05890420';

// cep.addEventListener('blur', function (e) {
//   let cep = e.target.value;
//   let script = document.createElement('script');
//   consol
//   script.src = 'https://viacep.com.br/ws/' + cep + '/json/?callback=popularForm';
//   document.body.appendChild(script);
// });

cep.addEventListener("keypress", (e) => {
  const onlyNumbers = /[0-9]|\./;
  const key = String.fromCharCode(e.keyCode);

  // allow only numbers
  if (!onlyNumbers.test(key)) {
    e.preventDefault();
    return;
  }
});

cep.addEventListener("keyup", (e) => {
  const inputValue = e.target.value;
  //   Check if we have a CEP
  if (inputValue.length === 8) {
    popularForm(inputValue);
  }
});

const popularForm = async (resposta) => {
  toggleLoader();

  cep.blur();
  const apiUrl = `https://viacep.com.br/ws/${resposta}/json/`;

  const response = await fetch(apiUrl);

  const data = await response.json();

  // Show error and reset form
  if (data.erro) {

    if (!estado.hasAttribute("disabled")) {
      toggleDisabled();
    }

    enderecoForm.reset();
    toggleLoader();
    toggleMessage("CEP Inválido, tente novamente.");
    return;
  }

  // Activate disabled attribute if form is empty
  if (estado.value === "") {
    toggleDisabled();
  }

  rua.value = data.logradouro;
  bairro.value = data.localidade;
  cidade.value = data.bairro;
  estado.value = data.uf;

  toggleLoader();
};


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

const toggleDisabled = () => {
  if (estado.hasAttribute("disabled")) {
    formInputs.forEach((input) => {
      input.removeAttribute("disabled");
    });
  } else {
    formInputs.forEach((input) => {
      input.setAttribute("disabled", "disabled");
    });
  }
};

// Save address
enderecoForm.addEventListener("submit", (e) => {
  e.preventDefault();

  toggleLoader();

  setTimeout(() => {
    toggleLoader();
    toggleMessage("Endereço salvo com sucesso!");

    enderecoForm.reset();

    toggleDisabled();
  }, 1000);
});

// exibir ou retirar loader
const toggleLoader = () => {
  const fadeElement = document.querySelector("#fade");
  const loaderElement = document.querySelector("#loader");

  fadeElement.classList.toggle("hide");
  loaderElement.classList.toggle("hide");
};
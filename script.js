$.support.cors = true;
const transactionsUL = document.querySelector("#transactions");
const form = document.querySelector("#form");
const inputText = document.querySelector("#text");
const inputValue = document.querySelector("#amount");

$(document).ready(
  function(){
    GetUser();
  }
)

function GetUser(){

  $.ajax({
    type:'GET',
    url:'https://transa-87193-default-rtdb.firebaseio.com/transacoes.json?auth=UnlutBiGXp40SRaxtjbbvVxPVbvte2ubAycnLMy9',
    contentType: 'aapplication/json',
    crossDomain: true,
    headers:{
      
    },
    success: function(data){
      $.each(data, function(valor, nome){
        $("#transactions").append(
          '</tr>'+
          '<li class="minus">'+
        'Salário <span>'+valor[0].valor+'</span><button class="delete-btn">x</button>'+
        '</li>'
        )
      }),
      console.log(data)
  },
  error: function(data){
      console.log(data);
  }
})
}

const posttransaction = () => {
  var param = {nome: $('#text').val(), valor: $('#amount').val()};

  $.ajax({
    url: 'https://transa-87193-default-rtdb.firebaseio.com/transacoes.json?auth=UnlutBiGXp40SRaxtjbbvVxPVbvte2ubAycnLMy9',
    type: "POST",
    data: JSON.stringify(param),
  })
};

const clearInputs = () => {
  inputValue.value = "";
  inputText.value = "";
};

const handleFormSubmit = (event) => {
  event.preventDefault();

  const transactionName = inputText.value.trim();
  const transactionValue = inputValue.value.trim();
  const isSomeInputEmpty = transactionName === "" || transactionValue === "";

  if (isSomeInputEmpty) {
    alert("Por favor preencha tanto o nome quanto o valor da transação!");
    return;
  }
  posttransaction();
  clearInputs()
};

form.addEventListener("submit", handleFormSubmit);
// Seleciona os elementos do formulário
const form = document.querySelector("form")
const amount = document.getElementById("amount")
const expense = document.getElementById("expense")
const category = document.getElementById("category")

// Captura o evento de input para formatar o valor
amount.oninput = () => {
  // Remove todos os caracteres que não são dígitos
  let value = amount.value.replace(/\D/g, "")

  // Transforma o valor em centavos
  value = Number(value) / 100 // Exemplo: 1234 se torna 12.34

  // Atualiza o valor do input
  amount.value = formatCurrencyBRL(value)
  
}

function formatCurrencyBRL(value){
  // Formata o valor como moeda brasileira
  value = value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  })

  // Retorna o valor formatado
  return value
}

form.onsubmit = (event) => {
  event.preventDefault() // Impede o envio do formulário
}
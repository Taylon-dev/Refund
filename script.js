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

// Captura o evento de submit do formulário
form.onsubmit = (event) => {
  event.preventDefault() // Impede o envio do formulário
  
  // Cria um objeto com os dados da nova despesa
  const newExpense = {
    id: new Date().getTime(), // Gera um ID único com base no timestamp
    expense: expense.value,
    category: category.value,
    category_name: category.options[category.selectedIndex].text, // Obtém o nome da categoria selecionada
    amount: amount.value,
    created_at: new Date(),
  }

  expenseAdd(newExpense) // Chama a função para adicionar a nova despesa
}

function expenseAdd(newExpense){

  try {
    // Cria o elemento de li para adicionar na lista (ul)
    const expenseItem = document.createElement("li")
    expenseItem.classList.add("expense")
  } catch (error) {
    alert("Não foi possível atualizar a lista de despesas.")
    console.log(error)
  }
}
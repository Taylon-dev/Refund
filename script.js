// Seleciona os elementos do formulário
const form = document.querySelector("form")
const amount = document.getElementById("amount")
const expense = document.getElementById("expense")
const category = document.getElementById("category")

// Seleciona os elementos da lista
const expenseList = document.querySelector("ul")
const expenseQuantity = document.querySelector("aside header p span")

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
    category_id: category.value,
    category_name: category.options[category.selectedIndex].text, // Obtém o nome da categoria selecionada
    amount: amount.value,
    created_at: new Date(),
  }

  expenseAdd(newExpense) // Chama a função para adicionar a nova despesa
}

// Adiciona um novo item na lista
function expenseAdd(newExpense){

  try {
    // Cria o elemento de li para adicionar na lista (ul)
    const expenseItem = document.createElement("li")
    expenseItem.classList.add("expense")

    // Cria o ícone da categoria
    const expenseIcon = document.createElement("img")
    expenseIcon.setAttribute("src",`img/${newExpense.category_id}.svg`)
    expenseIcon.setAttribute("alt", newExpense.category_name)

    // Cria a info da despesa
    const expenseInfo = document.createElement("div")
    expenseInfo.classList.add("expense-info")

    // Cria o nome da despesa
    const expenseName = document.createElement("strong")
    expenseName.textContent = newExpense.expense

    // Cria a categoria da despesa
    const expenseCategory = document.createElement("span")
    expenseCategory.textContent = newExpense.category_name

    // Adiciona name e category em expense Info
    expenseInfo.append(expenseName, expenseCategory)

    // Cria o valor da despesa
    const expenseAmount = document.createElement("span")
    expenseAmount.classList.add("expense-amount")
    expenseAmount.innerHTML = `<small>R$</small>${newExpense.amount.toUpperCase().replace("R$", "")}`

    // Cria o ícone de remover
    const removeIcon = document.createElement("img")
    removeIcon.classList.add("remove-icon")
    removeIcon.setAttribute("src", "img/remove.svg")
    removeIcon.setAttribute("alt", "Remover")

    // Adiciona as informações no item
    expenseItem.append(expenseIcon, expenseInfo, expenseAmount, removeIcon)
    

    // Adiciona o item na lista
    expenseList.append(expenseItem)

    // Atualiza os totais
    updateTotals()

  } catch (error) {
    alert("Não foi possível atualizar a lista de despesas.")
    console.log(error)
  }
}

// Atualizar os totais
function updateTotals(){
  try {
    // Recupera todos os itens (li) da lista (ul)
    const items = expenseList.children
    
    // Atualiza quantidade de itens da lista
    expenseQuantity.textContent = `${items.length} ${items.length > 1 ? "despesas" : "despesa"}`

    // Variável para incrementar o total
    let total = 0

    // Percorre os itens da lista
    for (let item = 0; item < items.length; item++) {
      const itemAmount = items[item].querySelector(".expense-amount")

      console.log(itemAmount)
    }

  } catch (error) {
    
    console.log(error)
    alert("Não foi possível atualizar os totais.")
  }
}
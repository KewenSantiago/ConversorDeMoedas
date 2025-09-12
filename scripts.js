//currency quote of the day
const USD = 5.43;
const EUR = 6.37;
const GBP = 7.35;

//Getting the elements from the  form.
const form = document.querySelector("form");
const amount = document.getElementById("amount");
const currency = document.getElementById("currency");
const footer = document.querySelector("main footer");
const description = document.getElementById("description");
const result = document.getElementById("result");

//Manipulating the input to accept only numbers.
amount.addEventListener("input", () => {
    const hasCharacterRegex = /\D+/g
    amount.value = amount.value.replace(hasCharacterRegex)
})

//Adding a form submit event
form.onsubmit = (event) => {
    event.preventDefault();

    switch (currency.value) {
        case "USD":
            convertCurrency(amount.value, USD, "US$")
            break;
        case "EUR":
            convertCurrency(amount.value, EUR, "€")
            break;
        case "GBP":
            convertCurrency(amount.value, GBP, "£")
            break;
    }
}

//Function to convert the currency
function convertCurrency(amount, price, symbol) {
    try {
        //Exibe a cotação da moeda selecionada.
        description.textContent = `${symbol} 1 = ${formatCurrencyBRL(price)}`

        //Calcula o total
        let total = amount * price

        //Verificar se o resultado não é um número.
        if (isNaN(total)) {
            return alert("Por favor, digite o valor corretamente para converter.")
        }

        //Formata o valor total
        total = formatCurrencyBRL(total).replace("R$", "")

        //Exibe o resultado total da conversão.
        result.textContent = `${total} Reais`

        //Aplica a classe que exibe o footer para mostrar o resultado
        footer.classList.add("show-result")
    } catch (error) {
        //Remove a classe que exibe o footer para esconder o resultado
        footer.classList.remove("show-result")

        console.error(error)
        alert("Não foi possível realizar a conversão. Tente novamente mais tarde.")
    }
}

//Formata a moeda em Real Brasileiro.
function formatCurrencyBRL(value) {
    //Converte para número para utilizar o toLocaleString para formatar no padrão BRL (R$ 00,00).
    return Number(value).toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL' });
}
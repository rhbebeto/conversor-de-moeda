const chaveApi = '6c9d8098f5797b8413297393'; 
// Atualiza a URL para usar a moeda base dinamicamente
async function buscarTaxas(moeda) {
    const resposta = await fetch(`https://v6.exchangerate-api.com/v6/${chaveApi}/latest/${moeda}`);
    const dados = await resposta.json();
    return dados.conversion_rates;
}


// Função de conversão de moeda, chamada ao clicar no botão "Converter"
async function converter() {
    // Obtém os valores das moedas selecionadas e o valor a ser convertido
    let moeda1 = document.getElementById("moeda1").value;
    let moeda2 = document.getElementById("moeda2").value;
    let valor1 = parseFloat(document.getElementById("valor1").value);

    // Verifica se o valor inserido é válido
    if (!isNaN(valor1)) {
        try {
            // Busca as taxas de câmbio para a moeda selecionada
            const taxas = await buscarTaxas(moeda1);
            // Obtém a taxa de câmbio entre as duas moedas
            let taxa = taxas[moeda2];
            // Faz a conversão
            let resultado = valor1 * taxa;
            // Exibe o valor convertido no campo de saída
            document.getElementById("valor2").value = resultado.toFixed(2);
        } catch (erro) {
            // Em caso de erro ao obter as taxas de câmbio
            console.error("Erro ao obter as taxas de câmbio:", erro);
            alert("Falha ao obter taxas de câmbio. Tente novamente mais tarde.");
        }
    } else {
        // Alerta o usuário se o valor inserido for inválido
        alert("Por favor, insira um valor válido.");
    }
}
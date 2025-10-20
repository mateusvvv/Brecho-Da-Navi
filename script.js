function getResponse() {
  const input = document.getElementById('userInput').value.toLowerCase();
  const response = document.getElementById('response');
  let reply = "Desculpe, não entendi sua pergunta. Por favor, tente novamente.";

  if (input.includes("horário") || input.includes("funcionamento")) {
    reply = "Nosso brechó funciona de segunda a sábado, das 9h às 19h.";
  } else if (input.includes("localização") || input.includes("endereço")) {
    reply = "Estamos localizados na Rua Exemplo, 123, Centro.";
  } else if (input.includes("promoção") || input.includes("desconto")) {
    reply = "Hoje estamos com 20% de desconto em peças selecionadas!";
  } else if (input.includes("comprar") || input.includes("compra")) {
    reply = "Você pode comprar diretamente pelo nosso site ou visitando nossa loja física.";
  } else if (input.includes("troca") || input.includes("devolução")) {
    reply = "Aceitamos trocas e devoluções em até 7 dias após a compra, com a peça em perfeito estado.";
  } else if (input.includes("contato") || input.includes("telefone") || input.includes("email")) {
    reply = "Você pode nos contatar pelo email contato@brechodanavi.com ou pelo telefone (00) 1234-5678.";
  } else if (input.includes("loja física") || input.includes("loja online")) {
    reply = "Temos loja física e também vendemos online pelo site.";
  } else if (input.includes("pagamento") || input.includes("formas de pagamento")) {
    reply = "Aceitamos dinheiro, cartão de crédito, débito e Pix.";
  } else if (input.includes("novas") || input.includes("usadas") || input.includes("produtos")) {
    reply = "Trabalhamos com peças usadas em ótimo estado, focadas na moda sustentável.";
  } else if (input.includes("qualidade") || input.includes("garantia")) {
    reply = "Todas as peças passam por inspeção de qualidade antes de serem vendidas.";
  }

  response.textContent = reply;
}

function setQuestion(question) {
  document.getElementById('userInput').value = question;
}

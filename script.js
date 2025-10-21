// Variável global para armazenar os produtos carregados
let produtos = [
  { id: 1, nome: 'Produto 1', imagem: 'produto1.jpg', preco: 99.90 },
  { id: 2, nome: 'Produto 2', imagem: 'produto2.jpg', preco: 149.90 },
  { id: 3, nome: 'Produto 3', imagem: 'produto3.jpg', preco: 79.90 }
];

// Função para exibir os produtos no container com classe '.produtos-grid'
function exibirProdutos(produtos) {
  const grid = document.querySelector('.produtos-grid');
  if (!grid) {
    console.error('Elemento .produtos-grid não encontrado.');
    return;
  }

  grid.innerHTML = '';

  produtos.forEach(produto => {
    const card = document.createElement('div');
    card.classList.add('produto-card');

    card.innerHTML = `
      <img src="produtos/${produto.imagem}" alt="${produto.nome}" />
      <h3>${produto.nome}</h3>
      <p>R$ ${produto.preco.toFixed(2)}</p>
      <button onclick="adicionarAoCarrinho(${produto.id})">Adicionar ao carrinho</button>
    `;

    grid.appendChild(card);
  });
}

// Inicializa a exibição dos produtos ao carregar o script
exibirProdutos(produtos);

// Array para armazenar os itens do carrinho
let carrinho = [];

// Função para adicionar produto ao carrinho
function adicionarAoCarrinho(idProduto) {
  const produto = produtos.find(p => p.id === idProduto);
  if (!produto) {
    console.error('Produto não encontrado:', idProduto);
    return;
  }

  carrinho.push(produto);
  console.log('Produto adicionado:', produto.nome);
  console.log('Carrinho:', carrinho);
  atualizarCarrinho();
}

// Atualizar a interface do carrinho com os itens e valor total
function atualizarCarrinho() {
  const carrinhoItens = document.getElementById('carrinho-itens');
  const totalElemento = document.getElementById('total');

  carrinhoItens.innerHTML = '';

  let total = 0;

  carrinho.forEach(item => {
    total += item.preco;
    const itemDiv = document.createElement('div');
    itemDiv.textContent = `${item.nome} - R$ ${item.preco.toFixed(2)}`;
    carrinhoItens.appendChild(itemDiv);
  });

  totalElemento.innerHTML = `<strong>Total: R$ ${total.toFixed(2)}</strong>`;
}

// Função que responde perguntas do chatbot
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

// Função para setar pergunta no input do chatbot por clique
function setQuestion(question) {
  document.getElementById('userInput').value = question;
}

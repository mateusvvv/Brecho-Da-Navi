// Produtos usados tanto para grid quanto para carrossel
const produtos = [
  { id: 1, nome: 'Oculos De Sol', imagem: 'produto1.jpg', preco: 99.90 },
  { id: 2, nome: 'Camiseta', imagem: 'produto2.jpg', preco: 149.90 },
  { id: 3, nome: 'Camisa De Manga Longa', imagem: 'produto3.jpg', preco: 79.90 }
];

// Exibir produtos no grid (opcional)
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
      <img src="produtos/${produto.imagem}" alt="${produto.nome}">
      <h3>${produto.nome}</h3>
      <p>R$ ${produto.preco.toFixed(2)}</p>
      <button onclick="adicionarAoCarrinho(${produto.id})">Adicionar ao carrinho</button>
    `;
    grid.appendChild(card);
  });
}
exibirProdutos(produtos);

// Carrossel
const track = document.querySelector('.carousel-track');
const nav = document.querySelector('.carousel-nav');
const nextButton = document.getElementById('nextBtn');
const prevButton = document.getElementById('prevBtn');
let currentIndex = 0;

function setupCarousel() {
  if (!track || !nav) return;
  produtos.forEach((produto, idx) => {
    const slide = document.createElement('li');
    slide.classList.add('carousel-slide');
    if (idx === 0) slide.classList.add('current-slide');
    slide.innerHTML = `
      <img src="produtos/${produto.imagem}" alt="${produto.nome}">
      <h3>${produto.nome}</h3>
      <p>R$ ${produto.preco.toFixed(2)}</p>
      <button onclick="adicionarAoCarrinho(${produto.id})">Adicionar ao carrinho</button>
    `;
    track.appendChild(slide);

    const navButton = document.createElement('button');
    navButton.classList.add('nav-button');
    if (idx === 0) navButton.classList.add('current-slide');
    navButton.setAttribute('aria-label', produto.nome);
    navButton.addEventListener('click', () => {
      currentIndex = idx;
      updateCarousel();
    });
    nav.appendChild(navButton);
  });
  updateCarousel();
}

function updateCarousel() {
  const slideWidth = track.children[0]?.getBoundingClientRect().width || 0;
  track.style.transform = `translateX(-${slideWidth * currentIndex}px)`;
  Array.from(track.children).forEach((slide, idx) =>
    slide.classList.toggle('current-slide', idx === currentIndex)
  );
  Array.from(nav.children).forEach((btn, idx) =>
    btn.classList.toggle('current-slide', idx === currentIndex)
  );
}

nextButton?.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % produtos.length;
  updateCarousel();
});

prevButton?.addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + produtos.length) % produtos.length;
  updateCarousel();
});

setupCarousel();

// Carrinho
let carrinho = [];

function adicionarAoCarrinho(idProduto) {
  const produto = produtos.find(p => p.id === idProduto);
  if (!produto) {
    console.error('Produto não encontrado:', idProduto);
    return;
  }
  carrinho.push(produto);
  alert(`${produto.nome} adicionado ao carrinho!`);
  atualizarCarrinho();
}

function atualizarCarrinho() {
  const carrinhoItens = document.getElementById('carrinho-itens');
  const totalElemento = document.getElementById('total');
  if (!carrinhoItens || !totalElemento) return;

  carrinhoItens.innerHTML = '';
  let total = 0;
  carrinho.forEach(item => {
    total += item.preco;
    const divItem = document.createElement('div');
    divItem.textContent = `${item.nome} - R$ ${item.preco.toFixed(2)}`;
    carrinhoItens.appendChild(divItem);
  });
  totalElemento.innerHTML = `<strong>Total: R$ ${total.toFixed(2)}</strong>`;
}

// Chatbot
function getResponse() {
  const input = document.getElementById('userInput')?.value.toLowerCase() || '';
  const response = document.getElementById('response');
  let reply = "Desculpe, não entendi sua pergunta. Por favor, tente novamente.";

  if (input.includes("horário") || input.includes("funcionamento")) reply = "Nosso brechó funciona de segunda a sábado, das 9h às 19h.";
  else if (input.includes("localização") || input.includes("endereço")) reply = "Estamos localizados na Rua Exemplo, 123, Centro.";
  else if (input.includes("promoção") || input.includes("desconto")) reply = "Hoje estamos com 20% de desconto em peças selecionadas!";
  else if (input.includes("comprar") || input.includes("compra")) reply = "Você pode comprar diretamente pelo nosso site ou visitando nossa loja física.";
  else if (input.includes("troca") || input.includes("devolução")) reply = "Aceitamos trocas e devoluções em até 7 dias após a compra, com a peça em perfeito estado.";
  else if (input.includes("contato") || input.includes("telefone") || input.includes("email")) reply = "Você pode nos contatar pelo email contato@brechodanavi.com ou pelo telefone (00) 1234-5678.";
  else if (input.includes("loja física") || input.includes("loja online")) reply = "Temos loja física e também vendemos online pelo site.";
  else if (input.includes("pagamento") || input.includes("formas de pagamento")) reply = "Aceitamos dinheiro, cartão de crédito, débito e Pix.";
  else if (input.includes("novas") || input.includes("usadas") || input.includes("produtos")) reply = "Trabalhamos com peças usadas em ótimo estado, focadas na moda sustentável.";
  else if (input.includes("qualidade") || input.includes("garantia")) reply = "Todas as peças passam por inspeção de qualidade antes de serem vendidas.";

  if(response) response.textContent = reply;
}

function setQuestion(question) {
  const input = document.getElementById('userInput');
  if(input) input.value = question;
}

// =========================
// Produtos (grid e carrossel)
// =========================
const produtos = [
  { id: 1, nome: 'Oculos De Sol', imagem: 'produto1.jpg', preco: 99.90 },
  { id: 2, nome: 'Camiseta', imagem: 'produto2.jpg', preco: 149.90 },
  { id: 3, nome: 'Camisa De Manga Longa', imagem: 'produto3.jpg', preco: 79.90 }
];

// Exibir produtos no grid
function exibirProdutos(produtos) {
  const grid = document.querySelector('.produtos-grid');
  if (!grid) return;
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

// =========================
// Carrossel
// =========================
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
  if (!track || track.children.length === 0) return;
  const slideWidth = track.children[0].getBoundingClientRect().width;
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

// =========================
// Carrinho
// =========================
let carrinho = [];

function adicionarAoCarrinho(idProduto) {
  const produto = produtos.find(p => p.id === idProduto);
  if (!produto) return;
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

// =========================
// Chatbot
// =========================
const chatBtn = document.getElementById('chat-btn');
const chatWindow = document.getElementById('chat-window');
const closeBtn = document.getElementById('close-btn');
const sendBtn = document.getElementById('send-btn');
const chatInput = document.getElementById('chat-input');
const chatBody = document.getElementById('chat-body');

// Palavras-chave e respostas
const respostas = {
  "horário": "Nosso brechó funciona de segunda a sábado, das 9h às 19h.",
  "endereço": "Estamos localizados na Rua Exemplo, 123, Centro.",
  "promoção": "Hoje estamos com 20% de desconto em peças selecionadas!",
  "compra": "Você pode comprar diretamente pelo nosso site ou visitando nossa loja física.",
  "troca": "Aceitamos trocas e devoluções em até 7 dias após a compra, com a peça em perfeito estado.",
  "contato": "Você pode nos contatar pelo email contato@brechodanavi.com ou pelo telefone (00) 1234-5678.",
  "loja": "Temos loja física e também vendemos online pelo site.",
  "pagamento": "Aceitamos dinheiro, cartão de crédito, débito e Pix.",
  "produto": "Trabalhamos com peças usadas em ótimo estado, focadas na moda sustentável.",
  "garantia": "Todas as peças passam por inspeção de qualidade antes de serem vendidas."
};

// 5 perguntas rápidas
const perguntas = [
  "Qual é o horário de funcionamento?",
  "Qual o endereço da loja?",
  "Tem alguma promoção hoje?",
  "Como posso comprar online?",
  "Qual a política de troca e devolução?"
];

// Retornar resposta usando palavras-chave
function getBotResponse(msg) {
  msg = msg.toLowerCase();
  for (let key in respostas) {
    if (msg.includes(key)) return respostas[key];
  }
  return "Desculpe, não entendi sua pergunta. Por favor, tente novamente.";
}

// Abrir chat
chatBtn.addEventListener('click', () => {
  chatWindow.style.display = 'flex';
  chatWindow.setAttribute('aria-hidden', 'false');
  renderSuggestions();
});

// Fechar chat
closeBtn.addEventListener('click', () => {
  chatWindow.style.display = 'none';
  chatWindow.setAttribute('aria-hidden', 'true');
});

// Adicionar mensagem
function addMessage(content, sender) {
  const msg = document.createElement('div');
  msg.classList.add('message', sender === 'user' ? 'user-message' : 'bot-message');
  msg.textContent = content;
  chatBody.appendChild(msg);
  chatBody.scrollTop = chatBody.scrollHeight;
}

// Enviar mensagem
function sendMessage(msg) {
  if (!msg) return;
  addMessage(`Você: ${msg}`, 'user');
  const botReply = getBotResponse(msg);
  setTimeout(() => addMessage(`Bot: ${botReply}`, 'bot'), 400);
}

// Botão enviar
sendBtn.addEventListener('click', () => {
  const msg = chatInput.value.trim();
  sendMessage(msg);
  chatInput.value = '';
});

// Enter para enviar
chatInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') sendBtn.click();
});

// Renderizar sugestões (apenas 5)
function renderSuggestions() {
  let suggestionsContainer = document.getElementById('suggestions');
  if (!suggestionsContainer) {
    suggestionsContainer = document.createElement('div');
    suggestionsContainer.id = 'suggestions';
    suggestionsContainer.style.marginTop = '10px';
    chatWindow.appendChild(suggestionsContainer);
  }
  suggestionsContainer.innerHTML = '';

  perguntas.forEach(q => {
    const btn = document.createElement('button');
    btn.textContent = q;
    btn.style.margin = '4px 2px';
    btn.style.padding = '6px 10px';
    btn.style.fontSize = '0.85rem';
    btn.style.cursor = 'pointer';
    btn.style.borderRadius = '6px';
    btn.style.border = '1px solid #d81b60';
    btn.style.backgroundColor = '#fff';
    btn.style.color = '#d81b60';
    btn.addEventListener('click', () => {
      chatInput.value = q;
      sendBtn.click();
    });
    suggestionsContainer.appendChild(btn);
  });
}

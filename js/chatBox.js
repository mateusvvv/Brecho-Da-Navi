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

// Retorna mensagem usando palavras chave

function getBotResponse(msg) {
  msg = msg.toLowerCase();
  for (let key in respostas) {
    if (msg.includes(key)) return respostas[key];
  }
  return "Desculpe, não entendi sua pergunta. Por favor, tente novamente.";
}

// Abrir chat
chatBtn.addEventListener('click', (e) => {
  e.stopPropagation(); // impede fechar imediatamente
  const isOpen = chatWindow.style.display === 'flex';

  if (isOpen) {
    chatWindow.style.display = 'none';
    chatWindow.setAttribute('aria-hidden', 'true');
  } else {
    chatWindow.style.display = 'flex';
    chatWindow.setAttribute('aria-hidden', 'false');
    renderSuggestions();
  }
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
    })
}

document.addEventListener('click', (e) => {
  const clicouNoChat = chatWindow.contains(e.target);
  const clicouNoBotao = chatBtn.contains(e.target);

  if (!clicouNoChat && !clicouNoBotao) {
    chatWindow.style.display = 'none';
    chatWindow.setAttribute('aria-hidden', 'true');
  }
});

chatWindow.addEventListener('click', (e) => {
  e.stopPropagation();
});

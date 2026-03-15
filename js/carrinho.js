// ================= MODAL LGPD =================
const lockLink = document.querySelector('.a-lock');
const modal = document.getElementById('modal-lgpd');
const closeModal = document.querySelector('.close-modal');

if (lockLink && modal && closeModal) {
    lockLink.addEventListener('click', (e) => {
        e.preventDefault();
        modal.classList.add('active');
    });

    closeModal.addEventListener('click', () => {
        modal.classList.remove('active');
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });
}

// ================= CARRINHO =================

// Busca carrinho do localStorage
function getCart() {
    return JSON.parse(localStorage.getItem("cart")) || [];
}

// Salva carrinho no localStorage
function saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
}

// Renderiza o carrinho
function renderCart() {
    const cart = getCart();
    const empty = document.getElementById('cart-empty');
    const content = document.getElementById('cart-content');
    const itemsContainer = document.getElementById('cart-items');
    const totalEl = document.getElementById('cart-total');

    if (!empty || !content || !itemsContainer || !totalEl) return;

    if (cart.length === 0) {
        empty.style.display = 'block';
        content.style.display = 'none';
        totalEl.innerText = 'R$ 0,00';
        return;
    }

    empty.style.display = 'none';
    content.style.display = 'block';
    itemsContainer.innerHTML = '';

    let total = 0;

    cart.forEach((item, index) => {
        total += item.price * item.qty;

        const div = document.createElement('div');
        div.classList.add('cart-item');

        div.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div class="cart-item-info">
                <h3>${item.name}</h3>
                <p>R$ ${item.price.toFixed(2)}</p>

                <div class="cart-controls">
                    <button onclick="decrease(${index})">−</button>
                    <span>${item.qty}</span>
                    <button onclick="increase(${index})">+</button>
                    <button onclick="removeItem(${index})">🗑</button>
                </div>
            </div>
        `;

        itemsContainer.appendChild(div);
    });

    totalEl.innerText = `R$ ${total.toFixed(2)}`;
}

// Aumenta quantidade
function increase(index) {
    const cart = getCart();
    cart[index].qty++;
    saveCart(cart);
    renderCart();
}

// Diminui quantidade
function decrease(index) {
    const cart = getCart();
    cart[index].qty--;

    if (cart[index].qty <= 0) {
        cart.splice(index, 1);
    }

    saveCart(cart);
    renderCart();
}

// Remove item
function removeItem(index) {
    const cart = getCart();
    cart.splice(index, 1);
    saveCart(cart);
    renderCart();
}

// ================= WHATSAPP =================
function finalizarWhatsApp() {
    const cart = getCart();

    if (cart.length === 0) {
        alert("Seu carrinho está vazio!");
        return;
    }

    let mensagem ="Pedido - Brechó da Navi%0A%0A";
    let total = 0;

    cart.forEach(item => {
        mensagem += `• ${item.name}%0A`;
        mensagem += `Qtd: ${item.qty}%0A`;
        mensagem += `Valor: R$ ${(item.price * item.qty).toFixed(2)}%0A%0A`;
        total += item.price * item.qty;
    });

    mensagem += `*Total: R$ ${total.toFixed(2)}*`;

    // ✅ SEU NÚMERO REAL
    const telefone = "553195295031";

    const url = `https://wa.me/${telefone}?text=${mensagem}`;
    window.open(url, "_blank");
}

// Botão WhatsApp
const btnWhatsapp = document.getElementById("finish-order");

if (btnWhatsapp) {
    btnWhatsapp.addEventListener("click", finalizarWhatsApp);
}

// Inicializa carrinho
document.addEventListener("DOMContentLoaded", renderCart);

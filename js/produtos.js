const produtos = [
    { imagem: "img/imagens-produtos/bermudaJeans.png", nome: "Bermuda Jeans", preco: 36, tamanho: "36", id:1 },
    { imagem: "img/imagens-produtos/camisaNike.png", nome: "Camisa Nike", preco: 30, tamanho: "M",id:2 },
    { imagem: "img/imagens-produtos/blusaAzulMar.png", nome: "Blusa Azul com Transparência", preco: 20, tamanho: "P",id:3 },

    { imagem: "img/imagens-produtos/bolsaCherry.png", nome: "Bolsa Vermelha Cherry", preco: 25, tamanho: "M",id:4},
    { imagem: "img/imagens-produtos/bolsaCroche.png", nome: "Bolsa Crochê", preco: 30, tamanho: "M",id:5 },
    { imagem: "img/imagens-produtos/jaquetaJeans.png", nome: "Jaqueta Jeans", preco: 30, tamanho: "P",id:6 },

    { imagem: "img/imagens-produtos/oculos.png", nome: "Óculos de sol", preco: 30, tamanho: "M",id:7 },
    { imagem: "img/imagens-produtos/camisaSocial.png", nome: "Camisa Social", preco: 20, tamanho: "M",id:8 },

    { imagem: "img/imagens-produtos/oculosVintage.png", nome: "Óculos de Sol Vintage", preco: 15, tamanho: "P",id:9},
    { imagem: "img/imagens-produtos/camisaBulls.png", nome: "Camisa Bulls", preco: 20, tamanho: "M" },
    { imagem: "img/imagens-produtos/macaquinhoJeans.png", nome: "Macaquinho Jeans", preco: 45, tamanho: "M",id:10 },

    { imagem: "img/imagens-produtos/saiaCamuflada.png", nome: "Saia Camuflada", preco: 25, tamanho: "P",id:11 },
    { imagem: "img/imagens-produtos/oculosSolPreto.png", nome: "Óculos de Sol Preto", preco: 30, tamanho: "M",id:12 },
    { imagem: "img/imagens-produtos/saiaCanelada.png", nome: "Saia Canelada", preco: 40, tamanho: "P",id:13 }
];

document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("container-produtos");

    produtos.forEach(item => {
        const card = document.createElement("div");
        card.classList.add("produtos-card");

        const precoFormatado = item.preco.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        });

           card.innerHTML = `
      <img src="${item.imagem}" alt="${item.nome}">
      <h3>${item.nome}</h3>
      <p>Preço: ${precoFormatado}</p>
      <p>Tamanho: ${item.tamanho}</p>
      <button 
        class="btn-card"
        data-id="${item.id}"
        data-name="${item.nome}"
        data-price="${item.preco}"
        data-image="${item.imagem}"
      >
        Adicionar ao Carrinho
      </button>
    `;

    container.appendChild(card);
  });
});

//carrinnho
function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function addToCart(product) {
  const cart = getCart();
  const item = cart.find(p => p.id === product.id);

  if (item) {
    item.qty++;
  } else {
    cart.push({ ...product, qty: 1 });
  }

  saveCart(cart);
}

//botao 

document.addEventListener("click", e => {
  if (e.target.classList.contains("btn-card")) {
    const btn = e.target;

   addToCart({
      id: Number(btn.dataset.id),
      name: btn.dataset.name,
      price: Number(btn.dataset.price),
      image: btn.dataset.image
    });

    showToast()
    }
})

function showToast() {
  const toast = document.getElementById("toast");
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 2000);
}



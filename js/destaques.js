const destaques = [
    { imagem: "img/imagens-produtos/camisaSocial.png", nome: "Camisa Social", preco: 20, tamanho: "M" },
    { imagem: "img/imagens-produtos/jaquetaJeans.png", nome: "Jaqueta Jeans", preco: 89, tamanho: "M" },
    { imagem: "img/imagens-produtos/macaquinhoJeans.png", nome: "Macaquinho Jeans", preco: 45, tamanho: "M" },
    { imagem: "img/imagens-produtos/camisaNike.png", nome: "Camisa Nike", preco: 30, tamanho: "P" },
    { imagem: "img/imagens-produtos/bermudaJeans.png", nome: "Bermuda Jeans", preco: 35, tamanho: "36" }
];


const container = document.getElementById("destaques-container");

destaques.forEach(item => {
    const card = document.createElement("div");
    card.classList.add("destaque-card");

    const precoFormatado = item.preco.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });

    card.innerHTML = `
    <img src="${item.imagem}">
    <h3>${item.nome}</h3>
    <p>R$ ${item.preco}</p>

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

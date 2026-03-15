// código para mensagem do WhatsApp
const msg = "Olá, Navi! Quero vender meus desapegos no seu brechó 😊";
const encodMsg = encodeURIComponent(msg);
document.getElementById("whatsLink").href="https://wa.me/553195295031?text=" + encodMsg;


import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CarrinhoComponent } from './carrinho/carrinho.component';

interface Produto {
  id: number;
  nome: string;
  imagem: string;
  preco: number;
}

interface Mensagem {
  texto: string;
  tipo: 'user' | 'bot';
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule, CommonModule, CarrinhoComponent, MatSnackBarModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  // =========================
  // Produtos
  // =========================
  produtos: Produto[] = [
    { id: 1, nome: 'Oculos De Sol', imagem: 'produto1.jpg', preco: 99.90 },
    { id: 2, nome: 'Camiseta', imagem: 'produto2.jpg', preco: 149.90 },
    { id: 3, nome: 'Camisa De Manga Longa', imagem: 'produto3.jpg', preco: 79.90 }
  ];

  // =========================
  // Carrinho
  // =========================
  carrinho: Produto[] = [];
  carrinhoAberto = false;

  constructor(private snackBar: MatSnackBar) { }

  toggleCarrinho() {
    this.carrinhoAberto = !this.carrinhoAberto;
  }

  adicionarAoCarrinho(idProduto: number): void {
    const produto = this.produtos.find(p => p.id === idProduto);
    if (!produto) return;
    this.carrinho.push(produto);

    this.snackBar.open(`${produto.nome} adicionado ao carrinho!`, 'Fechar', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      panelClass: ['snackbar-success']
    });
  }

  get total(): number {
    return this.carrinho.reduce((acc, p) => acc + p.preco, 0);
  }

  // =========================
  // Chatbot
  // =========================
  chatAberto = false;
  mensagens: Mensagem[] = [];
  entrada = '';

  respostas: Record<string, string> = {
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

  perguntas: string[] = [
    "Qual é o horário de funcionamento?",
    "Qual o endereço da loja?",
    "Tem alguma promoção hoje?",
    "Como posso comprar online?",
    "Qual a política de troca e devolução?"
  ];

  abrirChat(): void {
    this.chatAberto = true;
  }

  fecharChat(): void {
    this.chatAberto = false;
  }

  private getBotResponse(msg: string): string {
    const lower = msg.toLowerCase();
    for (const key of Object.keys(this.respostas)) {
      if (lower.includes(key)) return this.respostas[key];
    }
    return "Desculpe, não entendi sua pergunta. Por favor, tente novamente.";
  }

  enviar(): void {
    const msg = this.entrada.trim();
    if (!msg) return;
    this.mensagens.push({ texto: `Você: ${msg}`, tipo: 'user' });
    const reply = this.getBotResponse(msg);
    setTimeout(() => this.mensagens.push({ texto: `Bot: ${reply}`, tipo: 'bot' }), 400);
    this.entrada = '';
  }

  onKeyPress(e: KeyboardEvent): void {
    if (e.key === 'Enter') this.enviar();
  }

  usarSugestao(q: string): void {
    this.entrada = q;
    this.enviar();
  }
}

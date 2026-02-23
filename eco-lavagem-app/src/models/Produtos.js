export class Produto {
    constructor(nome, quantidade, preco) {
        this.id = Date.now(); 
        this.nome = nome;
        this.quantidade = Number(quantidade);
        this.preco = Number(preco);
    }
}
export const database = {
   
    salvar(chave, dados) {
        localStorage.setItem(chave, JSON.stringify(dados));
    },

    buscar(chave) {
        const dados = localStorage.getItem(chave);
        return dados ? JSON.parse(dados) : [];
    }
};
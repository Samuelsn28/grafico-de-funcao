
function configuraUmBotao(id, acao) {
	document.getElementById(id).addEventListener("click", acao);
}

function configuraBotoesMovimentacao() {
	configuraUmBotao("botao-movimentacao-no", () => {movimentaEixoXParaSul(); movimentaEixoYParaLeste();});
	configuraUmBotao("botao-movimentacao-n", () => {movimentaEixoXParaSul();});
	configuraUmBotao("botao-movimentacao-ne", () => {movimentaEixoXParaSul(); movimentaEixoYParaOeste();});
	configuraUmBotao("botao-movimentacao-o", () => {movimentaEixoYParaLeste();});
	configuraUmBotao("botao-movimentacao-l", () => {movimentaEixoYParaOeste();});
	configuraUmBotao("botao-movimentacao-so", () => {movimentaEixoXParaNorte(); movimentaEixoYParaLeste();});
	configuraUmBotao("botao-movimentacao-s", () => {movimentaEixoXParaNorte();});
	configuraUmBotao("botao-movimentacao-se", () => {movimentaEixoXParaNorte(); movimentaEixoYParaOeste();});
}

configuraBotoesMovimentacao();




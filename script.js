
var intervaloMenor = 0;
var intervaloMaior = 0;
var escala = 0.0;
var taxaVariacao = 0.0;

function geraNovoGrafico() {
	atualizaGraficoAtributos();

	const [haErros, mensagemErro] = verificaErros();
	if (haErros) {
		alert(mensagemErro);
		return;
	}

	let intervalo = {xi: intervaloMenor, xf: intervaloMaior};

	criaGrafico(intervalo, escala, taxaVariacao);
}

function atualizaGraficoAtributos() {
	intervaloMenor = parseInt(document.getElementById("intervalo-menor-input").value);
	intervaloMaior = parseInt(document.getElementById("intervalo-maior-input").value);
	escala = parseFloat(document.getElementById("escala-input").value);
	taxaVariacao = parseFloat(document.getElementById("taxa-variacao-input").value);
}

function verificaErros() {
	if (escala <= 0) {
		return [true, "A escala deve ser maior do que zero."];
	}
	
	if (taxaVariacao <= 0) {
		return [true, "A taxa de variação deve ser maior do que zero."];
	}

	return [false, ""];
}

function inicializaSite() {
	limpaGrafico();
}

inicializaSite();





function geraNovoGrafico() {
	let intervaloMenor = parseInt(document.getElementById("intervalo-menor-input").value);
	let intervaloMaior = parseInt(document.getElementById("intervalo-maior-input").value);

	let intervalo = {xi: intervaloMenor, xf: intervaloMaior};

	let escala = parseFloat(document.getElementById("escala-input").value);
	let taxaVariacao = parseFloat(document.getElementById("taxa-variacao-input").value);

	criaGrafico(intervalo, escala, taxaVariacao);
	


}





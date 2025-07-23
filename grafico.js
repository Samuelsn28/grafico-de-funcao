
const plano = document.getElementById("plano");
const context = plano.getContext("2d");
const margemHorizontalEixoY = 50;
const alturaEixoX = 400;

var coordenadas = [];

// Especificações do gráfico
var funcao = (x) => {
    return Math.cos(x);
}
var intervaloXDesejado = {xi: 0, xf: 30};
var taxaVariacaoX = 1;
var escala = 50;

function desenhaEixos() {
	// Eixo x
	context.moveTo(0, alturaEixoX);
	context.lineTo(1200, alturaEixoX);
	context.stroke();

	// Eixo y
	context.moveTo(margemHorizontalEixoY, 0);
	context.lineTo(margemHorizontalEixoY, 600);
	context.stroke();
}

function adaptaValorX(x) {
	return x * escala + margemHorizontalEixoY;
}

function adaptaValorY(y) {
	return alturaEixoX - y * escala;
}

function desenhaPontos() {

	function desenhaUmPonto(x, y) {
		const raio = 0.05;
		const corPonto = "black";

		x = adaptaValorX(x);
		y = adaptaValorY(y);

		context.beginPath();
		context.arc(x, y, raio, 0, 2 * Math.PI);
		context.fillStyle = corPonto;
		context.fill();
		context.strokeStyle = corPonto;
		context.stroke();

		/*
		// Linhas horizontais
		context.beginPath();
		context.strokeStyle = "blue";
		context.moveTo(margemHorizontalEixoY, y);
		context.lineTo(x, y);
		context.stroke();

		// Linhas verticais
		context.beginPath();
		context.strokeStyle = "red";
		context.moveTo(x, alturaEixoX);
		context.lineTo(x, y);
		context.stroke();
		*/
	}

	for (let i = 0; i < coordenadas.length; i++) {
		desenhaUmPonto(
			coordenadas[i].x,
			coordenadas[i].y
		);
	}
}

function verificaSeEContinuo(pontoAnterior, pontoAtual) {
	const casasDecimais = 5;

	let valorXAlvo = pontoAtual.x;

	let valorTendenciaDireita = funcao( (valorXAlvo + (1 / (10 ** casasDecimais))) );
	let valorTendenciaEsquerda = funcao( (valorXAlvo - (1 / (10 ** casasDecimais))) );

	function calculaQuantidadeCasasDecimaisDoAlvo(alvoX) {
		let quantidadeCasas = 0;
		let copiaAlvoX = alvoX;

		while ( (copiaAlvoX % 1) != 0) {
			copiaAlvoX *= 10;

			quantidadeCasas++;
		}
		return quantidadeCasas;
	}

	let casasDecimaisAlvo = calculaQuantidadeCasasDecimaisDoAlvo(pontoAtual.y);

	let tendenciaDireitaArredondado = parseFloat(valorTendenciaDireita.toFixed(casasDecimaisAlvo));
	let tendenciaEsquerdaArredondado = parseFloat(valorTendenciaEsquerda.toFixed(casasDecimaisAlvo));

	let maior = 0;
	let menor = 0;

	if (valorTendenciaEsquerda > valorTendenciaDireita) {
		maior = valorTendenciaEsquerda;
		menor = valorTendenciaDireita;
	} else {
		maior = valorTendenciaDireita;
		menor = valorTendenciaEsquerda;
	}

	if ( (menor < pontoAtual.y) && (pontoAtual.y < maior) ) {
		
	} else {
		return false;
	}
	
	return true;
}

function verificaSeEContinua(pontoAnterior, pontoAtual) {
	const casasDecimais = 10;
	
	let valoresTendencia = [];

	// Tendencia da esquerda para o ponto

	for (let i = 1; i <= casasDecimais; i++) {
		let valorDescontar = 1 / (10 ** i);
	
		let imagemObtida = funcao( (pontoAtual.x - valorDescontar) );
		valoresTendencia.push(imagemObtida);
	}

	let valoresArredondado  = [];

	valoresTendencia.forEach( (valor) => {
		valoresArredondado.push(parseFloat(valor.toFixed(2)));
	});

	// Tendencia da direita para o ponto
	
	let valoresTendenciaDireita = [];

	for (let j = 1; j <= casasDecimais; j++) {
		let valorAcrescentar = 1 / (10 ** j);

		let imagemObtida = funcao( pontoAtual.x + valorAcrescentar );
		valoresTendenciaDireita.push(imagemObtida);
	}
	
	let valoresDireitaArredondados = []

	valoresTendenciaDireita.forEach( (valor) => {
		valoresDireitaArredondados.push(parseFloat(valor.toFixed(2)));
	});

	// Se os dois arrays de valores arredondados forem diferentes, nao e continuo
	
	let somaEsquerdaTotal = 0;

	valoresArredondado.forEach( (valor) => {
		somaEsquerdaTotal += valor;
	});

	let somaDireitaTotal = 0;

	valoresDireitaArredondados.forEach( (valor) => {
		somaDireitaTotal += valor;
	});

	somaEsquerdaTotal = Math.round(somaEsquerdaTotal);
	somaDireitaTotal = Math.round(somaDireitaTotal);

	if (somaEsquerdaTotal != somaDireitaTotal) {
		return false;
	}

	return true;
}

function desenhaSegmentosDeRetas() {
	const corSegmentos = "black";

	let pontoAnterior = {
		x: adaptaValorX(coordenadas[0].x),
		y: adaptaValorY(coordenadas[0].y)
	};

	let pontoAnteriorSemAdaptacao = {
		x: coordenadas[0].x,
		y: coordenadas[0].y
	};

	for (let i = 1; i < coordenadas.length; i++) {
		let pontoAtual = {
			x: adaptaValorX(coordenadas[i].x), 
			y: adaptaValorY(coordenadas[i].y)
		};

		let pontoAtualSemAdaptacao = {
			x: coordenadas[i].x,
			y: coordenadas[i].y
		};

		if (verificaSeEContinuo(pontoAnteriorSemAdaptacao, pontoAtualSemAdaptacao)) {
		context.beginPath();
		context.strokeStyle = corSegmentos;
		context.moveTo(pontoAnterior.x, pontoAnterior.y);
		context.lineTo(pontoAtual.x, pontoAtual.y);
		context.stroke();
		}

		pontoAnterior = {x: pontoAtual.x, y: pontoAtual.y};
		pontoAnteriorSemAdaptacao = {x: pontoAtualSemAdaptacao.x, y: pontoAtualSemAdaptacao.y};
	}
}

function calculaCoordenadas() {
	for (let i = intervaloXDesejado.xi; i <= intervaloXDesejado.xf; i += taxaVariacaoX){
		coordenadas.push({
			x: i,
			y: funcao(i)
		});
	}
}

function criaGrafico(intervaloPedido, escalaPedida, taxaVariacaoPedida) {
	intervaloXDesejado = intervaloPedido;
	escala = escalaPedida;
	taxaVariacaoX = taxaVariacaoPedida;

	limpaGrafico();
	calculaCoordenadas();
	desenhaPontos();
	desenhaSegmentosDeRetas();
}

function limpaGrafico() {
	context.reset();
	coordenadas = [];

	desenhaEixos();
}



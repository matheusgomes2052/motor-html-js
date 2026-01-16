const parametros = new URLSearchParams(window.location.search);

let altura_biela = Number(parametros.get("biela"));
let pistoes = parametros.get("pistoes").split(" ");
console.log(pistoes);
let aneis_quantia = 3; //coloque no máximo 3
let velocidade = Number(parametros.get("velocidade")) / 10;		

document.addEventListener("DOMContentLoaded", () => {
	class motor{
		constructor(angulos, velocidade, tamanho_biela, quantia_aneis){
			this.angulos_pistoes = angulos;
			this.velocidade = velocidade;
			this.tamanho_biela = tamanho_biela;
			this.quantia_aneis = quantia_aneis;
			this.borda_embaixo = 100;
			this.left_quantia = 50
			this.angulos_pistoes.forEach((angulo) => {

			})
		}
		colocaEspacador(larguraEspacador = 30){

		}
		insereManivela(anguloInicial = 0){

		}
		inserePistao(anguloInicial = 0){
			
		}
	}

	let motor = new motor(pistoes, velocidade, altura_biela, aneis_quantia);
})
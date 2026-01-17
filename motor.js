const parametros = new URLSearchParams(window.location.search);

let altura_biela = Number(parametros.get("biela"));
let pistoes = parametros.get("pistoes").split(" ");
console.log(pistoes);
let aneis_quantia = 3; //coloque no máximo 3
let velocidade = Number(parametros.get("velocidade")) / 10;		

document.addEventListener("DOMContentLoaded", () => {
	class motor{
		constructor(angulos){
			this.angulos_pistoes = angulos;
			this.velocidade = 30;
			this.alturaBiela = 80;
			this.larguraBiela = 20;
			this.quantia_aneis = 3;
			this.borda_embaixo = 100;
			this.anguloAtual = 0;
			this.left_quantia = 20;
			this.larguraManivela = 20;
			this.grossuraVirabrequim = 20;
			this.larguraBronzina = 50;
			this.alturaBronzina = 30;
			this.larguraCabecaPistao = 80;
			this.alturaCabecaPistao = 40;
			this.paraMotor = 0;
			this.margemManivela = 4;
			this.containerMotor = document.querySelector(".container-motor");
			this.insereEspacador(20, this.grossuraVirabrequim);
			this.contPistao = 1;
			this.angulos_pistoes.forEach((angulo) => {
				this.anguloPistaoForeach = angulo;
				this.insereManivela(this.larguraManivela);
				this.inserePistao();
				this.insereManivela(this.larguraManivela);
				this.insereEspacador(20, this.grossuraVirabrequim);
				this.contPistao++;
			})
			this.gire();
		}
		insereEspacador(larguraEspacador, alturaEspacador){
			let espacador = document.createElement('div');
			espacador.className = "espaco";
			espacador.style.bottom = this.borda_embaixo+"px";
			espacador.style.left = this.left_quantia + "px";
			espacador.style.width = larguraEspacador + "px";
			espacador.style.height = alturaEspacador + "px";
			this.left_quantia = this.left_quantia + larguraEspacador;
			this.containerMotor.appendChild(espacador);
		}
		insereManivela(larguraManivela){
			let manivela = document.createElement("div");
			manivela.style.left = this.left_quantia + "px";
			manivela.className = "manivela";
			this.left_quantia = this.left_quantia + larguraManivela;
			manivela.style.width = larguraManivela + "px";
			manivela.style.height = "80px"; // Tamanho temporário;
			manivela.style.bottom = this.borda_embaixo + "px";
			manivela.dataset.numPistao = this.contPistao;
			manivela.dataset.angulo = this.anguloPistaoForeach;
			this.containerMotor.appendChild(manivela);
		}
		inserePistao(){
			let pistao = document.createElement("div");
			let bronzina = document.createElement("div");
			let biela = document.createElement("div");
			let cabecaPistao = document.createElement("div");
			bronzina.style.width = this.larguraBronzina + "px";
			bronzina.style.height = this.alturaBronzina + "px";
			bronzina.className = "bronzina";
			cabecaPistao.style.height = this.alturaCabecaPistao + "px";
			cabecaPistao.style.width = this.larguraCabecaPistao + "px";
			cabecaPistao.className = "cabeca";
			biela.style.width = this.larguraBiela + "px";
			biela.style.height = this.alturaBiela + "px";
			biela.className = "biela";
			pistao.appendChild(cabecaPistao);
			pistao.appendChild(biela);
			pistao.appendChild(bronzina);
			pistao.className = "pistao";
			pistao.dataset.pistao = this.contPistao;
			pistao.dataset.angulo = this.anguloPistaoForeach;
			pistao.style.left = this.left_quantia - ((this.larguraCabecaPistao - this.larguraBronzina) / 2) + "px";
			pistao.style.bottom = (this.borda_embaixo - ((this.alturaBronzina - this.grossuraVirabrequim) / 2)) + "px";
			this.left_quantia = this.left_quantia + this.larguraBronzina;
			this.containerMotor.appendChild(pistao);
		}
		trave(){
			this.paraMotor = 1;
		}
		gire(){
			this.anguloAtual = this.anguloAtual + this.velocidade;		

			document.querySelectorAll(".pistao").forEach((pistao) => {
				let numPistao = pistao.dataset.pistao;
				let anguloPistao = (Number(pistao.dataset.angulo) + this.anguloAtual) % 360;
				this.radiano = (anguloPistao / 180) * Math.PI;
				this.cos = Math.cos(this.radiano);				
				let alturaManivela = ((this.alturaBiela / 2) + this.alturaBronzina - this.margemManivela);
				let alturaAtualManivela = (((alturaManivela - this.grossuraVirabrequim) * Math.abs(this.cos)) + this.grossuraVirabrequim);
				document.querySelectorAll("[data-num-pistao='"+numPistao+"']").forEach((manivela) => {
					manivela.style.height = alturaAtualManivela + "px";
					if (anguloPistao > 270 || anguloPistao < 90){
						manivela.style.bottom = this.borda_embaixo + "px";
					}else{
						manivela.style.bottom = (this.borda_embaixo - alturaAtualManivela + this.grossuraVirabrequim) + "px";
					}
				})
				let variacao = (((this.alturaBronzina - this.grossuraVirabrequim) / 2) + alturaManivela - this.alturaBronzina) * -1;
				pistao.style.transform = "translateY("+(variacao * this.cos)+"px)";
			})

			if (this.paraMotor == 0){
				setTimeout(() => this.gire(), 0);
			}else{
				this.paraMotor = 0;
			}
		}
	}

	let motor_obj = new motor(pistoes);
})
const parametros = new URLSearchParams(window.location.search);

let altura_biela = Number(parametros.get("biela"));
let pistoes = parametros.get("pistoes").split(" ");
console.log(pistoes);
let aneis_quantia = 3; //coloque no máximo 3
let velocidade = Number(parametros.get("velocidade")) / 10;		

document.addEventListener("DOMContentLoaded", function () {
	let quantia_pistoes = pistoes.length;
	let angulo = 0;
	let margem_pistao_manivela = 5;
	let largura_bronzina = 50;
	let largura_manivela = 20;
	let largura_espaco = 20;
	let altura_container = 600;
	let altura_bronzina = 30;
	let borda_embaixo = 200;
	let grossura_virabrequim = 30;

	let contador_pistao = 1;
	let left_itens = 20;
	let container_motor = document.querySelector('.container-motor');
	pistoes.forEach(function (angulo_manivela){
		angulo_manivela = angulo_manivela % 360
		let tamanho_manivela = 0;
		let pistao = document.createElement("div");
		pistao.className = "pistao";
		pistao.dataset.pistao = contador_pistao;
		pistao.dataset.angulo = angulo_manivela;
		let bronzina = document.createElement("div");
		bronzina.className = "bronzina";
		bronzina.style.width = largura_bronzina+"px";
		let biela = document.createElement("div");
		biela.className = "biela";
		biela.style.height = altura_biela+"px";
		let cabeca = document.createElement("div");
		cabeca.className = "cabeca";

		let radius = (angulo_manivela / 180) * Math.PI;
		let cos = Math.cos(radius);

		pistao.appendChild(cabeca);
		pistao.appendChild(biela);
		pistao.appendChild(bronzina);

		for(let i = 1; i <= aneis_quantia; i++){
			let anel = document.createElement("div");
			anel.className = "anel";
			cabeca.appendChild(anel);
		}

		let manivela_esquerda = document.createElement("div");
		let manivela_direita = document.createElement("div");
		let manivelas = [manivela_esquerda, manivela_direita];
		let altura_manivela = altura_biela + altura_bronzina - margem_pistao_manivela;
		manivelas.forEach(function (manivela){
			manivela.className = "manivela";
			manivela.dataset.angulo = angulo_manivela;
			manivela.dataset.pistao = contador_pistao;
			tamanho_manivela = grossura_virabrequim + ((altura_manivela - grossura_virabrequim) * Math.abs(cos));
			pistao.style.bottom = borda_embaixo+"px";
			if (angulo_manivela > 180){
				manivela.style.bottom = "unset";
				manivela.style.top = altura_container - grossura_virabrequim - borda_embaixo + "px";
			}else{
				manivela.style.bottom = "100px";
				manivela.style.top = "unset";
			}					
			
			manivela.style.height = tamanho_manivela + "px";
		})				

		let espaco_virabrequim = document.createElement("div");
		espaco_virabrequim.className = "espaco";
		espaco_virabrequim.style.width = largura_espaco + "px";

		manivela_esquerda.style.left = left_itens + "px";
		pistao.style.left = (left_itens + largura_manivela - 15)+"px";
		manivela_direita.style.left = (left_itens + largura_bronzina + largura_manivela) + "px";
		espaco_virabrequim.style.left = (left_itens + (2 * largura_manivela) + largura_bronzina) + "px";

		container_motor.appendChild(manivela_esquerda);
		container_motor.appendChild(pistao);
		container_motor.appendChild(manivela_direita);				
		container_motor.appendChild(espaco_virabrequim);

		left_itens = left_itens + (2 * largura_manivela) + largura_bronzina + largura_espaco;
		contador_pistao++
	})
	let angulo_atual = 0;
	let pistoes_gerados = document.querySelectorAll(".pistao");
	let altura_manivela = altura_biela + altura_bronzina - margem_pistao_manivela;
	function gire(){
		angulo_atual = angulo_atual + velocidade;
		pistoes_gerados.forEach(function (pistao_gerado){
			let numero_pistao = pistao_gerado.dataset.pistao;
			let angulo_pistao = Number(pistao_gerado.dataset.angulo);
			let angulo_somado = (angulo_atual + angulo_pistao) % 360;

			let radius = (angulo_somado / 180) * Math.PI;
			let cos = Math.cos(radius);	
				
			pistao_gerado.style.transform = "translateY("+(cos * (altura_biela - margem_pistao_manivela))+"px)";
			let manivelas = document.querySelectorAll(".manivela[data-pistao='"+numero_pistao+"']");
			manivelas.forEach(function (manivela){
				if ((angulo_somado > 270) || (angulo_somado < 90)){
					manivela.style.bottom = "unset";
					manivela.style.top = altura_container - grossura_virabrequim - borda_embaixo + "px";
				}else{
					manivela.style.bottom = borda_embaixo + "px";
					manivela.style.top = "unset";
				}
				manivela.dataset.anguloAtual = angulo_somado;
				manivela.style.height = grossura_virabrequim + ((altura_manivela - altura_bronzina) * Math.abs(cos)) + "px";
			})
		})
		setTimeout(gire, 0);
	}
	gire();
})
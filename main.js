document.addEventListener("DOMContentLoaded", function (){
	document.querySelectorAll("input[type='range'],input[type='number']").forEach(function (input) {
		input.addEventListener("input", function (){
			let velocidade_selecionada = document.getElementById("velocidade").value;
			let biela = document.getElementById("biela").value;
			let valvula = document.getElementById("valvula").value;
			let pistoes = [];
			document.querySelectorAll("[data-type='pistao']").forEach(function (input_pistao){
				if (input_pistao.value != ''){
					pistoes.push(input_pistao.value);
				}
			})
			document.getElementById("iframe").src = "motor.html?biela="+biela+"&valvula="+valvula+"&velocidade="+velocidade_selecionada+"&pistoes="+pistoes.join("+");
		})
	})
})
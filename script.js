var numeros = [];

var executando = false;
var pausado = false;
var cancelar = false;

var input = document.getElementById("numeros");
var grafico = document.getElementById("grafico");
var passo = document.getElementById("passo");
var resultado = document.getElementById("resultado");

var btnComecar = document.getElementById("btnComecar");
var btnGerar = document.getElementById("btnGerar");
var btnParar = document.getElementById("btnParar");
var btnLimpar = document.getElementById("btnLimpar");

function mostrarGrafico(pos1, pos2, quantidadeOrdenada) {

    grafico.innerHTML = "";

    for (var i = 0; i < numeros.length; i++) {

        var barra = document.createElement("div");

        barra.className = "barra";

        barra.style.height = (numeros[i] * 2 + 30) + "px";

        barra.innerHTML = numeros[i];

        if (i == pos1 || i == pos2) {
            barra.classList.add("comparando");
        }

        if (i >= numeros.length - quantidadeOrdenada) {
            barra.classList.remove("comparando");
            barra.classList.add("ordenado");
        }


        grafico.appendChild(barra);
    }
}

function esperar(tempo) {

    return new Promise(function(resolve) {

        setTimeout(resolve, tempo);

    });
}

async function verificarPausa() {

    while (pausado && !cancelar) {

        await esperar(100);

    }

}


async function bubbleSort() {

    if (executando) {
        return;
    }

    if (numeros.length < 2) {

        alert("Digite pelo menos 2 números!");

        return;
    }


    executando = true;
    cancelar = false;
    pausado = false;

    btnComecar.disabled = true;
    btnGerar.disabled = true;

    btnParar.innerHTML = "Pausar";


    for (var i = 0; i < numeros.length - 1; i++) {

        for (var j = 0; j < numeros.length - 1 - i; j++) {

            if (cancelar) {

                executando = false;

                return;
            }

            await verificarPausa();


            if (cancelar) {

                executando = false;

                return;
            }

            mostrarGrafico(j, j + 1, i);

            passo.innerHTML =
                "Comparando " +
                numeros[j] +
                " com " +
                numeros[j + 1];

            await esperar(600);

            await verificarPausa();

            if (cancelar) {

                executando = false;

                return;
            }

            if (numeros[j] > numeros[j + 1]) {

                passo.innerHTML =
                    numeros[j] +
                    " é maior que " +
                    numeros[j + 1] +
                    " → trocando";

                await esperar(500);


                var aux = numeros[j];

                numeros[j] = numeros[j + 1];

                numeros[j + 1] = aux;

                mostrarGrafico(-1, -1, i);

                await esperar(500);

            } else {

                passo.innerHTML =
                    numeros[j] +
                    " é menor que " +
                    numeros[j + 1] +
                    " → não troca";

                await esperar(500);
            }
        }
    }

    mostrarGrafico(-1, -1, numeros.length);

    passo.innerHTML = "Ordenação terminada!";

    resultado.innerHTML = numeros.join(", ");


    executando = false;

    btnComecar.disabled = false;
    btnGerar.disabled = false;

    btnParar.innerHTML = "Pausar";
}

btnComecar.onclick = function() {

    if (executando) {
        return;
    }


    if (input.value.trim() == "") {

        alert("Digite os números!");

        return;
    }


    var valores = input.value.split(",");

    numeros = [];


    for (var i = 0; i < valores.length; i++) {

        var numero = Number(valores[i].trim());


        if (isNaN(numero)) {

            alert("Digite apenas números separados por vírgula!");

            return;
        }


        numeros.push(numero);
    }


    if (numeros.length < 2) {

        alert("Digite pelo menos 2 números!");

        return;
    }


    resultado.innerHTML = "-";

    passo.innerHTML = "Começando a ordenação...";

    mostrarGrafico(-1, -1, 0);

    bubbleSort();
};

btnGerar.onclick = function() {

    if (executando) {
        return;
    }


    numeros = [];


    for (var i = 0; i < 10; i++) {

        var numero = Math.floor(Math.random() * 100) + 1;

        numeros.push(numero);
    }


    input.value = numeros.join(", ");

    resultado.innerHTML = "-";

    passo.innerHTML =
        "Números gerados. Clique em começar.";


    mostrarGrafico(-1, -1, 0);
};

btnParar.onclick = function() {

    if (!executando) {
        return;
    }


    pausado = !pausado;


    if (pausado) {

        btnParar.innerHTML = "Continuar";

        passo.innerHTML = "Ordenação pausada.";

    } else {

        btnParar.innerHTML = "Pausar";

        passo.innerHTML = "Continuando...";

    }
};


btnLimpar.onclick = function() {

    cancelar = true;

    executando = false;
    pausado = false;

    numeros = [];


    input.value = "";

    grafico.innerHTML = "";

    resultado.innerHTML = "-";

    passo.innerHTML =
        "Digite os números e clique em começar.";


    btnComecar.disabled = false;
    btnGerar.disabled = false;

    btnParar.innerHTML = "Pausar";
};

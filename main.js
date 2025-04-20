const botoes = document.querySelectorAll(".botao");
const textos = document.querySelectorAll(".aba-conteudo");

for (let i = 0; i < botoes.length; i++) {
    botoes[i].onclick = function () {
        for (let j = 0; j < botoes.length; j++) {
            botoes[j].classList.remove("ativo");
            textos[j].classList.remove("ativo");
        }

        botoes[i].classList.add("ativo");
        textos[i].classList.add("ativo");
    }
}

const contadores = document.querySelectorAll(".contador");
const tempoObjetivo1 = new Date("2025-11-01T00:00:00");
const tempoObjetivo2 = new Date("2025-12-10T00:00:00");
const tempoObjetivo3 = new Date("2025-12-20T00:00:00");
const tempoObjetivo4 = new Date("2026-01-01T00:00:00");

const tempos = [tempoObjetivo1, tempoObjetivo2, tempoObjetivo3, tempoObjetivo4];
const niveis = document.querySelectorAll(".nivel");

function calculaTempo(tempoObjetivo) {
    let tempoAtual = new Date();
    let tempoFinal = tempoObjetivo - tempoAtual;
    let segundos = Math.floor(tempoFinal / 1000);
    let minutos = Math.floor(segundos / 60);
    let horas = Math.floor(minutos / 60);
    let dias = Math.floor(horas / 24);

    segundos %= 60;
    minutos %= 60;
    horas %= 24;

    return tempoFinal > 0 ? [dias, horas, minutos, segundos] : [0, 0, 0, 0];
}

function atualizaCronometro() {
    for (let i = 0; i < contadores.length; i++) {
        const [dias, horas, minutos, segundos] = calculaTempo(tempos[i]);
        document.getElementById("dias" + i).textContent = dias;
        document.getElementById("horas" + i).textContent = horas;
        document.getElementById("min" + i).textContent = minutos;
        document.getElementById("seg" + i).textContent = segundos;
    }
}

function atualizaTermometro() {
    const agora = new Date();

    for (let i = 0; i < tempos.length; i++) {
        const fim = tempos[i];
        const total = fim - agora;
        const inicio = new Date(); // agora como base
        const progresso = 1 - (fim - agora) / (fim - inicio); // 0 a 1

        const percentual = Math.max(0, Math.min(100, progresso * 100));
        niveis[i].style.height = `${percentual}%`;
    }
}

function comecaCronometro() {
    atualizaCronometro();
    atualizaTermometro();
    setInterval(() => {
        atualizaCronometro();
        atualizaTermometro();
    }, 1000);
}

comecaCronometro();
// Função para exibir a fórmula de acordo com a operação selecionada
function mostrarFormula() {
    const operacao = document.getElementById('operacao').value;
    let formula = '';

    if (operacao === 'fresamento') {
        formula = 'Fórmula de Fresamento:\nRPM = (1000 × Vc) / (π × D)\nAvanço = fz × Z × RPM';
        document.getElementById('numDentesDiv').style.display = 'block'; // Mostrar o campo de número de dentes para fresamento
    } else if (operacao === 'furacao') {
        formula = 'Fórmula de Furação:\nRPM = (1000 × Vc) / (π × D)\nAvanço = f × RPM';
        document.getElementById('numDentesDiv').style.display = 'none'; // Esconder o campo de número de dentes para furação
    }

    document.getElementById('formula').innerText = formula;
}

// Função para atualizar o intervalo de Vc com base no material e tipo de ferramenta selecionados
function atualizarVcRange() {
    const material = document.getElementById('material').value;
    const ferramenta = document.getElementById('ferramenta').value;
    
    let vcMin, vcMax;

    // Definir os valores de Vc com base no material e tipo de ferramenta
    if (material === 'aco_carbono_menor_045') {
        vcMin = ferramenta === 'hss' ? 20 : 70;
        vcMax = ferramenta === 'hss' ? 30 : 90;
    } else if (material === 'aco_carbono_maior_045') {
        vcMin = ferramenta === 'hss' ? 15 : 60;
        vcMax = ferramenta === 'hss' ? 25 : 80;
    } else if (material === 'aco_inoxidavel') {
        vcMin = ferramenta === 'hss' ? 10 : 40;
        vcMax = ferramenta === 'hss' ? 20 : 60;
    } else if (material === 'aco_ferramenta') {
        vcMin = ferramenta === 'hss' ? 8 : 25;
        vcMax = ferramenta === 'hss' ? 15 : 45;
    } else if (material === 'ferro_fundido') {
        vcMin = ferramenta === 'hss' ? 15 : 50;
        vcMax = ferramenta === 'hss' ? 25 : 70;
    } else if (material === 'aluminio_ligas') {
        vcMin = ferramenta === 'hss' ? 80 : 200;
        vcMax = ferramenta === 'hss' ? 150 : 400;
    } else if (material === 'latao') {
        vcMin = ferramenta === 'hss' ? 70 : 150;
        vcMax = ferramenta === 'hss' ? 140 : 300;
    } else if (material === 'cobre') {
        vcMin = ferramenta === 'hss' ? 50 : 120;
        vcMax = ferramenta === 'hss' ? 80 : 250;
    } else if (material === 'plasticos') {
        vcMin = ferramenta === 'hss' ? 100 : 200;
        vcMax = ferramenta === 'hss' ? 200 : 400;
    }

    // Atualizar o controle de range e o valor exibido
    const vcRange = document.getElementById('vcRange');
    vcRange.min = vcMin;
    vcRange.max = vcMax;
    vcRange.value = (vcMin + vcMax) / 2; // Valor inicial intermediário
    document.getElementById('vcOutput').value = vcRange.value; // Exibir valor inicial
}

// Função para realizar o cálculo de RPM e avanço
function calcular() {
    const diametroFerramenta = parseFloat(document.getElementById('diametroFerramenta').value);
    if (!diametroFerramenta || diametroFerramenta <= 0) {
        alert("Por favor, insira um diâmetro de ferramenta válido.");
        return;
    }

    const vc = parseFloat(document.getElementById('vcRange').value); // Vc selecionado pelo usuário
    const rpm = (1000 * vc) / (Math.PI * diametroFerramenta); // Cálculo do RPM

    const avanco = parseFloat(document.getElementById('avanco').value);
    if (!avanco || avanco <= 0) {
        alert("Por favor, insira um avanço válido.");
        return;
    }

    let feedRate = 0;
    const operacao = document.getElementById('operacao').value;

    if (operacao === 'fresamento') {
        const numDentes = parseInt(document.getElementById('numDentes').value);
        if (!numDentes || numDentes <= 0) {
            alert("Por favor, insira o número de dentes da ferramenta.");
            return;
        }
        feedRate = avanco * numDentes * rpm; // Cálculo de avanço para fresamento
    } else if (operacao === 'furacao') {
        feedRate = avanco * rpm; // Cálculo de avanço para furação
    }

    // Exibir os resultados no HTML
    document.getElementById('resultado').innerHTML = `
        Vc (velocidade de corte): ${vc.toFixed(2)} m/min<br>
        RPM calculado: ${rpm.toFixed(2)}<br>
        Avanço calculado: ${feedRate.toFixed(2)} mm/min
    `;
}

// Adicionar eventos para atualizar o VcRange quando o material ou ferramenta mudar
document.getElementById('material').addEventListener('change', atualizarVcRange);
document.getElementById('ferramenta').addEventListener('change', atualizarVcRange);

// Inicializar valores de Vc quando a página carregar
window.onload = function() {
    mostrarFormula(); // Mostrar fórmula inicial
    atualizarVcRange(); // Definir Vc inicial
};

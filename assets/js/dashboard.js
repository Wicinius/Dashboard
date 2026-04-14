const options = {
    chart: {
        type: 'bar',
        height: 350,
        foreColor: 'white',
        toolbar: {
            show: false
        }
    },
    series: [{
        name: 'Vendas',
        data: [12000, 19000, 7000, 25000]
    }],
    xaxis: {
        categories: ['Jan', 'Fev', 'Mar', 'Abr']
    },
    colors: ['#4f46e5'],
    tooltip: {
        theme: 'dark'
    }
};


const chart = new ApexCharts(document.querySelector('#meuGrafico'), options);
chart.render();

const vendas = [
    { valor: 1200, cliente: "João", status: "pago" },
    { valor: 850, cliente: "Maria", status: "pago" },
    { valor: 2300, cliente: "Carlos", status: "pendente" }
];

const vendasPorMes = [
    { mes: "Jan", total: 12000 },
    { mes: "Fev", total: 19000 },
    { mes: "Mar", total: 7000 },
    { mes: "Abr", total: 25000 }
];


function preencherTabela() {
    const tbody = document.querySelector('.tabelaVendas tbody')
    tbody.innerHTML = '';
    for(let i = 0; i < vendas.length; i++) {
    const linha = tbody.insertRow();
    linha.insertCell(0).innerHTML = vendas[i].cliente;
    linha.insertCell(1).innerHTML = "R$ " + vendas[i].valor;
    linha.insertCell(2).innerHTML = `<span class="status ${vendas[i].status}">${vendas[i].status}</span>`;
    }
}

function calcularTotais() {
    let totalVendas = 0;
    let pago = 0;
    for(let i = 0; i < vendas.length; i++) {
        totalVendas = totalVendas + vendas[i].valor;
    }
    for(let i = 0; i < vendas.length; i++) {
        if (vendas[i].status == 'pago') {
            pago++;
        }
    }
    const ticketMedio = totalVendas / vendas.length;
    const clientesNovos = vendas.length;
    const vendasPagas = pago / vendas.length * 100;
    
    return { totalVendas, ticketMedio, clientesNovos, vendasPagas };
}

function atualizarCards() {
    const totais = calcularTotais();
    
    document.querySelector('.card:nth-child(1) .valor').innerHTML = `R$ ${totais.totalVendas}`;
    document.querySelector('.card:nth-child(2) .valor').innerHTML = `R$ ${totais.ticketMedio.toFixed(2)}`;
    document.querySelector('.card:nth-child(3) .valor').innerHTML = totais.clientesNovos;
    document.querySelector('.card:nth-child(4) .valor').innerHTML = totais.vendasPagas.toFixed(0) + "%";
}

function atualizarGrafico(valorNovaVenda) {
    const ultimoMes = vendasPorMes[vendasPorMes.length - 1];
    ultimoMes.total += valorNovaVenda;
    
    chart.updateOptions({
        series: [{ data: vendasPorMes.map(item => item.total) }]
    });
}

function adicionarVenda() {
    const novosClientes = ['Ana', 'Pedro', 'Luciana', 'Rafael', 'Fernanda'];
    const nomeAleatorio = novosClientes[Math.floor(Math.random() * novosClientes.length)];
    const valorAleatorio = Math.floor(Math.random() * 3000) + 500;
    const statusAleatorio = Math.random() > 0.7 ? 'pendente' : 'pago';
    
    vendas.push({
        cliente: nomeAleatorio,
        valor: valorAleatorio,
        status: statusAleatorio
    });
    
    preencherTabela();
    atualizarCards();
    atualizarGrafico(valorAleatorio);
}

preencherTabela();
atualizarCards();

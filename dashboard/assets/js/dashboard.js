const options = {
    chart: {
        type: 'bar',
        height: 350,
        foreColor: 'white'
    },
    series: [{
        name: 'Vendas',
        data: [12, 19, 7, 25]
    }],
    xaxis: {
        categories: ['Jan', 'Fev', 'Mar', 'Abr']
    },
    colors: ['#4f46e5']
    
};


const chart = new ApexCharts(document.querySelector('#meuGrafico'), options);
chart.render();

const vendas = [
    { valor: 1200, cliente: "João", status: "pago" },
    { valor: 850, cliente: "Maria", status: "pago" },
    { valor: 2300, cliente: "Carlos", status: "pendente" }
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

preencherTabela();
const btnConvertir = document.querySelector('#convertir')
const valorIngresado = document.querySelector('#monto')
const tipoCambio = document.querySelector('#monedaCambio')


btnConvertir.addEventListener("click", () => {
  if (valorIngresado.value !== "")  {
    getConvertir()
  }else{
    alert("Favor Ingrese Valor Numerico")
  }
})

async function getConvertir(){
      try{
        const res = await fetch("https://mindicador.cl/api")
        const data = await res.json()
        const valorConvertido = document.querySelector("#valor")
        valor=Number(valorIngresado.value)
        tipo=tipoCambio.value
        switch (tipo){
            case 'dolar':
                 resultado=Number(data['dolar'].valor) * valor
                 break;
             case 'uf':
                resultado=Number(data['uf'].valor) * valor
                 break;
             case 'utm':
                resultado=Number(data['utm'].valor) * valor
                 break;
             case 'euro':
                resultado=Number(data['euro'].valor) * valor
                 break;
        }
        valorConvertido.innerHTML = "Resultado : " + resultado
        renderGrafica()
    } catch(error) {
          alert("API no Disponible")
    }
}

async function renderGrafica() {
    const data = await getAndCreateDataToChart();
    const config = {
        type: "line",
        data: {
            labels: data.labels,
            datasets: data.datasets
        }
    }
    const canvasElement = document.getElementById("grafico");
    new Chart(canvasElement, config);
}

async function getAndCreateDataToChart() {
    const res_grafico = await fetch("https://mindicador.cl/api");
    const data_grafico = await res_grafico.json();
    const indicadores = ['dolar', 'uf', 'utm', 'euro'];
    const labels = indicadores.map((key) => key.toUpperCase());
    const data = indicadores.map((key) => data_grafico[key]?.valor || 0);

    const datasets = [
        {
            label: "Valores de Indicadores Económicos",
            borderColor: "rgb(75, 192, 192)",
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            data: data
        }
    ];

    return { labels, datasets };
}
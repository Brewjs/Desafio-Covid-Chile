
//funcion asincronica para la data de confirmados
const getDatosConfirmados = async (jwt) => {
    try {
        const response = await fetch('http://localhost:3000/api/confirmed',
            {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${jwt}`
                }
            });
        const { data } = await response.json();
        return data;
    }
    catch (err) {
        console.log(`Error: ${err}`)
    }
}
//funcion asincronica para la data de muertes
const getDatosMuertes = async (jwt) => {
    try {
        const response = await fetch('http://localhost:3000/api/deaths',
            {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${jwt}`
                }
            });
        const { data } = await response.json();
        return data;
    }
    catch (err) {
        console.log(`Error: ${err}`)
    }
}
//funcion asincronica para la data de recuperados
const getDatosRecuperados = async (jwt) => {
    try {
        const response = await fetch('http://localhost:3000/api/recovered',
            {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${jwt}`
                }
            });
        const { data } = await response.json();
        return data;
    }
    catch (err) {
        console.log(`Error: ${err}`)
    }
}

//Funcion para crear grafico en base a los datos retornados mediante metodos forEach y push
const mostrarGrafico = (datosUno, datosDos, DatosTres) => {

    let confirmados = [];
    datosUno.forEach(element => {
        confirmados.push({ x: new Date(element.date), y: element.total })
    });

    let muertes = [];
    datosDos.forEach(element => {
        muertes.push({ x: new Date(element.date), y: element.total })
    });

    let recuperados = [];
    DatosTres.forEach(element => {
        recuperados.push({ x: new Date(element.date), y: element.total })
    });

    var chart = new CanvasJS.Chart("graficoChile",
        {
            title: {
                text: "Situación COVID-19 en Chile"
            },
            data: [
                {
                    type: "line",
                    name: "Confirmados",
                    showInLegend: true,
                    dataPoints: confirmados,
                },
                {
                    type: "line",
                    name: "Muertos",
                    showInLegend: true,
                    dataPoints: muertes,
                },
                {
                    type: "line",
                    name: "Recuperados",
                    showInLegend: true,
                    dataPoints: recuperados,
                }
            ],
        });
    chart.render();
}


// Función IIFE para cargar el gráfico, llamando a las tres funciones
// pásandole como argumento el JWT guardado en localStorage
const initSituacionChile = (async () => {

    const token = localStorage.getItem('jwt-token');

    const confirmados = await getDatosConfirmados(token);
    const muertos = await getDatosMuertes(token);
    const recuperados = await getDatosRecuperados(token);

    mostrarGrafico(confirmados, muertos, recuperados);
})();
let productos = [
	{ 
		id:1,
		producto:"Polera",
		modelo:"Heather",
		color:"Military Green",
		diseno:"Ride Your Bike",
		imagen:"img/disenos/Corona-Bicicleta.png",
		alt:"Polera diseño Corona Bicicleta",
		precio:10000
	},
	{
		id:2,
		producto:"Polera",
		modelo:"Heather",
		color:"Military Green",
		diseno:"E.T. San Cristóbal",
		imagen:"img/disenos/ET-CRISTOBAL.png",
		alt:"Polera diseño E.T. San Cristóbal",
		precio:10000
	},
	{
		id:3,
		producto:"Polera",
		modelo:"Heather",
		color:"Red Jaspe",
		diseno:"Funicular Santiago",
		imagen:"img/disenos/Funicular.png",
		alt:"Polera diseño Funicular Bellavista",
		precio:10000
	},
	{ 
		id:4,
		producto:"Polera",
		modelo:"Heather Royal",
		color:"Azul Marino Jaspe",
		diseno:"I was in Santiago de Chile",
		imagen:"img/disenos/I-Was-In.png",
		alt:"Polera diseño I Was In Chile",
		precio:10000
	},
	{ 
		id:5,
		producto:"Polera",
		modelo:"Heather Royal",
		color:"Granito Jaspe",
		diseno:"Cerro Manquehue",
		imagen:"img/disenos/Manquehe.png",
		alt:"Cerro Manquehue",
		precio:12000
	},
	{ 
		id:6,
		producto:"Polera",
		modelo:"infantil",
		color:"Blanca",
		diseno:"Polera diseño Metro Bus",
		imagen:"img/disenos/Metro-Bus.png",
		alt:"Polera diseño Liebre Bus",
		precio:10000
	},
	{ 
		id:7,
		producto:"Polera",
		modelo:"Teleferico Sky",
		color:"Mostaza Jaspe",
		diseno:"I was in Santiago de Chile",
		imagen:"img/disenos/Sky-change-colors-final.png",
		alt:"Polera diseño Teleferico Sky",
		precio:10000
	},
	{ 
		id:8,
		producto:"Polera",
		modelo:"Heather Royal",
		color:"Azul Marino Jaspe",
		diseno:"Polera diseño Teleférico de Santiago",
		imagen:"img/disenos/Teleferico-Digital.png",
		alt:"Polera diseño Teleférico de Santiago",
		precio:13000
	}
	];


//Función Que presenta los productos en Pantalla
function printScreen(array) {
    let counter = 0;
    array.some(element => {
        if (counter < 4) {
            let card = `<div class='card'><img src='${element.imagen}' alt='${element.alt}'><div class='info'><p>Modelo: ${element.modelo}</p><p>Color: ${element.color}</p><p>Diseño: ${element.diseno}</p><p>Precio $${element.precio}</p><p>ID: ${element.id}</p></div>`;
            var miDiv = document.getElementById('productos_banner');
            miDiv.insertAdjacentHTML('beforeend', card);
            counter++;
        } else {
            return true; // Termina el bucle después de imprimir cuatro tarjetas
        }
    });
}

//Función para mezclar las propiedades del Array
function ArrayMix(array) {
    const Array_Mix = [...array]; // Crear una copia del array original

    for (let i = Array_Mix.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1)); // Obtener un índice aleatorio
        [Array_Mix [i], Array_Mix [j]] = [Array_Mix [j], Array_Mix [i]]; // Intercambiar elementos
    }

    return Array_Mix;
}

let produtos_desordenando = ArrayMix(productos);
printScreen(produtos_desordenando);
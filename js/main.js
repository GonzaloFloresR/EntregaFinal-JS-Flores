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

//función con dos argumentos para agregar contenido al HTML
function agregarHtml (divId, contenido) {
	var miDiv = document.getElementById(divId);
	miDiv.insertAdjacentHTML('beforeend', contenido);
}

//Función Que presenta los productos en Pantalla
function protuctosEnPantalla(array) {
    let counter = 0;
    array.some(element => {
        if (counter < 4) {
            let card = `<div class='card'><img src='${element.imagen}' alt='${element.alt}'><div class='info'><p>Modelo: ${element.modelo}</p><p>Color: ${element.color}</p><p>Diseño: ${element.diseno}</p><p>Precio $${element.precio}</p><p>ID: ${element.id}</p></div>`;
            agregarHtml('productos_banner',card);
            counter++;
        } else {
            return true; // Termina el bucle después de imprimir cuatro tarjetas
        }
    });
}

//Función para mezclar las propiedades del Array
function ArrayMix(array) {
	const Array_Mix = array;	// Crear una copia del array original
    for (let i = Array_Mix.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));	// Obtener un índice aleatorio
        [Array_Mix [i], Array_Mix [j]] = [Array_Mix [j], Array_Mix [i]]; // Intercambiar elementos
    }

    return Array_Mix;
}

//Función flecha que solicita nombre al cliente y valida
let validarNombre = () => {
    let nombre = prompt("Por favor ingresar su nombre");
    nombre = nombre.trim();
    let regExp = /\d/; //La expresión regular /\d/ verifica si una cadena contiene al menos un dígito (0-9).
    let tieneNumeros = regExp.test(nombre);
    while (nombre === "" || tieneNumeros ){
        if(nombre === ""){ alert("Nombre no ingresado");}else{ alert("Nombre ingresado con numeros");}
        nombre = prompt("Por favor ingresar su nombre correctamente y sin numeros");
        nombre = nombre.trim();
        tieneNumeros = regExp.test(nombre);
    } 
    return nombre;
};

//Funcion seleccionar color de polera y validar la entrada del cliente
function colorPolera(Array){
	let polera_color = false;
	let color;

	while(polera_color === false){
		color = parseInt(prompt("¿Que color de Polera desea ver? \n 1) Military Green \n 2) Red Jaspe \n 3) Azul Marino Jaspe \n 4) Granito Jaspe \n 5) Blanca \n 6) Mostaza Jaspe \n 7) Todos "));
		if((typeof color)==="number" && (color > 0 && color <= 7) ){
			switch (color){
				case 1: polera_color = Array.filter((polera)=>{return polera.color.includes('Green')});
					alert("Usted selecciono el color Green");
				break;
				case 2: polera_color = Array.filter((polera)=>{return polera.color.includes('Red')});
					alert("Usted selecciono el color Red");
				break;
				case 3: polera_color = Array.filter((polera)=>{return polera.color.includes('Azul')});
					alert("Usted selecciono el color Azul");
				break;
				case 4: polera_color = Array.filter((polera)=>{return polera.color.includes('Granito')});
					alert("Usted selecciono el color Granito");
				break;
				case 5: polera_color = Array.filter((polera)=>{return polera.color.includes('Blanca')});
					alert("Usted selecciono el color Blanco");
				break;
				case 6: polera_color = Array.filter((polera)=>{return polera.color.includes('Mostaza')});
					alert("Usted selecciono el color Mostaza");
				break;
				case 7: polera_color = Array;
					alert("Usted desea ver todas las poleras");
				break;
			}
		} else {
			alert("Debe escribir un numero del 1 al 7 segundo el color elegido"); 
			polera_color = false;		
		} 
	}
	return polera_color;
}

//Solicitar Nombre al cliente
agregarHtml('login',validarNombre());

//Consultar al cliente y ordenar aleatoriamente los productos seleccionados
let produtos_desordenando = ArrayMix(colorPolera(productos));

//Exponer los productos en pantalla
protuctosEnPantalla(produtos_desordenando);






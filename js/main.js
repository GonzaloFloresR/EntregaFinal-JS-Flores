async function indicadoresDiario() {
    try {
        const response = await fetch('https://mindicador.cl/api/dolar');
        if (!response.ok) {
        throw new Error('La respuesta de la red no fue correcta');
    }

    const indicadorDiario = await response.json();
    document.getElementById("Dolar").innerHTML = `El valor actual del Dólar es $ ${indicadorDiario.serie[0].valor} pesos Chilenos`;
    } catch (error) {
        console.error('Solicitud fallida', error);
    }
}

//-----------------------------función con dos argumentos para agregar contenido HTML al documento
function agregarHtml(divId, contenido) {
    let miDiv = document.getElementById(divId);
    miDiv.innerHTML = ""; //Limpiar el contenedor
    miDiv.insertAdjacentHTML('beforeend', contenido);
	return miDiv;
}

//---------------------Función que da formato CARD HTML a cada producto y presenta los productos en Pantalla.
function productosEnPantalla(array) {
    const cards = array.map(element => {
        return `<div class="card">
				<img src="${element.imagen}" alt="${element.alt}">
				<div class="info">
					<p>Modelo: ${element.modelo}</p>
					<p>Color: ${element.color}</p>
					<p>Diseño: ${element.diseno}</p>
					<p>Precio $${element.precio}</p>
					<button class="boton-comprar" data-id="${element.id}">Agregar al Carrito</button>
				</div>
			</div>`;
    });
    // Une los strings en un solo string
    const cardsHTML = cards.join(''); 
    agregarHtml('productos_banner', cardsHTML);
}

//Función para mezclar las propiedades del Array
function ArrayMix(array) {
    const Array_Mix = array; 
    for (let i = Array_Mix.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1)); 
        [Array_Mix[i], Array_Mix[j]] = [Array_Mix[j], Array_Mix[i]]; 
    }
    return Array_Mix;
}

//Funcion que toma la busqueda desde un input y va haciendo una busqueda incremental

let productosFiltrados = []; 

function inicializarFiltro(productos) {
    const inputBusqueda = document.getElementById("Buscador");

    inputBusqueda.addEventListener("input", function () {
        const textoDeBusqueda = inputBusqueda.value.toLowerCase();

        // Si no hay texto en el campo de búsqueda, mostrar todos los productos
        if (textoDeBusqueda === '') {
            productosEnPantalla(productos);
            productosFiltrados = [];
            return;
        }
        // Filtrar incrementalmente solo los nuevos productos que coincidan con el filtro previo
        const nuevosProductosFiltrados = productosFiltrados.length > 0
            ? productosFiltrados.filter(producto => producto.diseno.toLowerCase().includes(textoDeBusqueda))
            : productos.filter(producto => producto.diseno.toLowerCase().includes(textoDeBusqueda));
        productosEnPantalla(nuevosProductosFiltrados);
        productosFiltrados = nuevosProductosFiltrados; 
    });
}

//----------------------------- Funciones de sesión de usuario
function getCookieValue(name) {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.startsWith(name + '=')) {
            return decodeURIComponent(cookie.substring(name.length + 1));
        }
    }
    return null;
}

function setCookie(name, value, days) {
    let expires = '';
    if (days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = `; expires=${date.toUTCString()}`;
    }
    document.cookie = `${name}=${encodeURIComponent(value)}${expires}; path=/`;
}

function deleteCookie(name) {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}

function login() {
    const userName = 'userName';
    const miDiv = document.getElementById("login");
    const existingCookie = getCookieValue(userName);
    
    const renderLoginForm = () => {
        miDiv.innerHTML = `
            <form>
                <input type="text" name="nombre" placeholder="Ingresar su Nombre">
                <input type="submit" value="Iniciar Sesión">
            </form>
        `;
        const form = document.querySelector('form');
        form.addEventListener('submit', (event) => {
            event.preventDefault();
            const nombre = event.target.elements.nombre.value;
            setCookie(userName, nombre, 7); // 7 days expiration, you can modify this value
            updateUI();
        });
    };

    const renderLoggedInUser = (username) => {
        miDiv.innerHTML = `
            <p>${username}  |</p>
            <a href="#" id="cerrarSesion">Cerrar Sesión</a>
        `;
        const parrafoCerrarSesion = document.getElementById("cerrarSesion");
        parrafoCerrarSesion.addEventListener('click', () => {
            deleteCookie(userName);
            updateUI();
        });
    };

    const updateUI = () => {
        const existingCookie = getCookieValue(userName);
        if (existingCookie) {
            const nombreUsuario = existingCookie.replace("%20", " ");
            renderLoggedInUser(nombreUsuario);
        } else {
            renderLoginForm();
        }
    };

    updateUI(); // Initial UI update
}

//----------------------------------------------- Funciones del Carrito
const BotonAbrirModal = document.getElementById('abrirModal');
const divModal = document.getElementById('modal');
const closeBtn = document.querySelector('.modal__cerrar');

function abrirModal(e) {
    e.preventDefault();
    divModal.style.display = 'block';
}

function cerrarModal() {
    divModal.style.display = 'none';
}

BotonAbrirModal.addEventListener('click', abrirModal);
closeBtn.addEventListener('click', cerrarModal);

window.addEventListener('click', (event) => {
    if (event.target === divModal) {
        cerrarModal();
    }
});

// Función para obtener el carrito del LocalStorage
function verificarCarritoLocalStorage () {
    let carrito = [];
    if(localStorage.getItem('carrito')){
        carrito = JSON.parse(localStorage.getItem('carrito'));
    } 
    return carrito;
}

let carrito = verificarCarritoLocalStorage();
let total = 0;

let boton_vaciar_carrito = document.getElementById("borrar_productos");
boton_vaciar_carrito.addEventListener("click",(e) => {
    e.preventDefault();
    if(carrito.length < 1){ 
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "El Carrito ya se encuentra vacio",
    });
    } else { 
    //
    Swal.fire({
        title: "¿Vaciar Carrito?",
        text: "Estás a punto de eliminar todos los productos",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Vaciar Carrito"
    }).then((result) => {
        if (result.isConfirmed) {
            carrito = [];
            localStorage.removeItem('carrito');
            agregarCantidadProductos();
            cargarModal();
            Swal.fire({
            title: "Carrito vaciado",
            text: "Eliminaste todos los productos",
            icon: "success"
            });
        }
    });
    //
}});

function cantidadProductos(){
    return carrito.reduce((total, producto) => total + producto.cantidad,0);
}

function agregarCantidadProductos(){
    let iconCarrito = document.getElementById("header_total_productos");
    let modal__totaProductos = document.getElementById("total-productos");
    iconCarrito.innerHTML = "";
    iconCarrito.innerHTML = cantidadProductos();
    modal__totaProductos.innerHTML = "";
    modal__totaProductos.innerHTML = cantidadProductos();
}

function guardarCarritoEnLocalStorage() {
    localStorage.getItem('carrito') && localStorage.removeItem('carrito');
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

function calcularTotalCarrito() {
    return carrito.reduce((total, producto) => total + producto.precio * producto.cantidad, 0);
}

//Función que limpia el HTML del Modal y lo carga con productos del Carrito actual
function cargarModal() {
    const itemsCarrito = document.getElementById('items-carrito');
    itemsCarrito.innerHTML = ''; 

    carrito.forEach(producto => {
        const precio = producto.precio.toLocaleString("es-CL", {
            style: "currency",
            currency: "CLP",
            minimumFractionDigits: 0,
            // Separador de miles
            thousandsSeparator: ".",
            // Separador decimal
            decimalSeparator: ",",
        });
        const nuevoItem = document.createElement('li');
        nuevoItem.innerHTML = `<img src="${producto.imagen}" alt="${producto.diseno}">
                                <span class="diseno">${producto.diseno}</span><span>c/u ${precio}</span>
                                <span><div class="cantidadProductos"><button class="eliminarUnaUnidad" aria-label="eliminar una unidad" data-id="${producto.id}"> － </button>
                                <input class="mostrarCantidad" name="mostrarCantidad" aria-label="${producto.cantidad} ${producto.cantidad > 1? "Productos": "Producto"}" value="${producto.cantidad}" data-id="${producto.id}" disable>
                                <button class="agregarUnaUnidad" aria-label="agregar una unidad" data-id="${producto.id}">+</button></div></span>
                                <span><img class="basurero" src="img/icons/delete_24.png" alt="Eliminar Producto" data-id="${producto.id}"></span> `;
        itemsCarrito.appendChild(nuevoItem); 
        agregarCantidadProductos();
    });

    total = calcularTotalCarrito();
    total = total.toLocaleString("es-CL", {
        style: "currency",
        currency: "CLP",
        minimumFractionDigits: 0,
        // Separador de miles
        thousandsSeparator: ".",
        // Separador decimal
        decimalSeparator: ",",
    });
    const totalCarrito = document.getElementById('total-carrito');
    totalCarrito.textContent = total;
    eventosBotonesProductosModal();
}

function eventosBotonesProductosModal() {
    const botonAdicionarProducto = document.getElementsByClassName("agregarUnaUnidad");
    const botonSustraerProducto = document.getElementsByClassName("eliminarUnaUnidad");
    const basureros = document.getElementsByClassName("basurero");

    function removeListeners(elements) {
        [...elements].forEach((element) => {
            const clonedElement = element.cloneNode(true);
            element.parentNode.replaceChild(clonedElement, element);
        });
    }

    removeListeners(botonAdicionarProducto);
    removeListeners(botonSustraerProducto);
    removeListeners(basureros);

    [...botonAdicionarProducto].forEach((boton) => {
            boton.addEventListener("click", () => {
            const idProducto = boton.dataset.id;
            const productoACambiar = carrito.find((producto) => producto.id === parseInt(idProducto));
            productoACambiar.cantidad += 1;
            guardarCarritoEnLocalStorage();
            cargarModal();
        })
    });
    [...botonSustraerProducto].forEach((boton) => {

        const idProducto = boton.dataset.id;
        const productoACambiar = carrito.find((producto) => producto.id === parseInt(idProducto));
        let cantidad = productoACambiar.cantidad;
            if(cantidad === 1 ){
                boton.disabled = true;
            }
        
        boton.addEventListener("click",() => {
            const idProducto = boton.dataset.id;
            const productoACambiar = carrito.find((producto) => producto.id === parseInt(idProducto));
            let cantidad = productoACambiar.cantidad;
            
            productoACambiar.cantidad -= 1;
            
            guardarCarritoEnLocalStorage();
            cargarModal();
        })
    });

    [...basureros].forEach((tachito) => {
        tachito.addEventListener("click",() => {
            //
            Swal.fire({
                title: "¿Desea Eliminar el prodcuto?",
                text: "¿Te quedaras sin tu polera?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Si, Eliminar Producto"
            }).then((result) => {
                if (result.isConfirmed) {
                    const idTachito = tachito.dataset.id;
                    carrito = carrito.filter((producto) => producto.id !== parseInt(idTachito));
                    guardarCarritoEnLocalStorage();
                    cargarModal();
                    Swal.fire({
                        title: "Eliminado",
                        text: "Producto Eliminado del carrito",
                        icon: "success"
                    });
                }
            });
        })
    });
}

function agregarProductoAlCarrito(producto) {
    let idProducto = producto.id;
    let productoExistente = carrito.find((seleccionados) => seleccionados.id === idProducto);
    productoExistente ? productoExistente.cantidad += 1 : carrito.push(producto);
    guardarCarritoEnLocalStorage();
}

function botonProductoAgregar(productos) {
    const botonesProducto = document.getElementsByClassName("boton-comprar");
    [...botonesProducto].forEach((boton) => {
        boton.addEventListener("click", () => {
            const idProducto = boton.dataset.id;
            const productoSeleccionado = productos.find((producto) => producto.id === parseInt(idProducto));
            agregarProductoAlCarrito(productoSeleccionado);
            cargarModal(); 

            Swal.fire({
                position: "center",
                icon: "success",
                title: "El Producto se Agregó Al Carrito",
                showConfirmButton: false,
                timer: 1500
            });
        });
    });
}



fetch('./json/productos.json')
    .then((response) => response.json())
    .then((data) => {
        let productos = data;

        cargarModal();

        login();

        productosEnPantalla(ArrayMix(productos));

        botonProductoAgregar(productos);

        inicializarFiltro(productos);

        eventosBotonesProductosModal();
    
    })
    .catch(error => {
        console.error('Error al cargar el archivo JSON:', error);
    });

    indicadoresDiario();
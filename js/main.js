import productos from './productos.js';


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
					<button class="boton-comprar" data-id="${element.id}">COMPRAR</button>
				</div>
			</div>`;
    });
    const cardsHTML = cards.join(''); // Une los strings en un solo string
    agregarHtml('productos_banner', cardsHTML);
}

//Función para mezclar las propiedades del Array
function ArrayMix(array) {
    const Array_Mix = array; // Crear una copia del array original
    for (let i = Array_Mix.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1)); // Obtener un índice aleatorio
        [Array_Mix[i], Array_Mix[j]] = [Array_Mix[j], Array_Mix[i]]; // Intercambiar elementos
    }

    return Array_Mix;
}

//-------------------------------Funcion que toma la busqueda desde un input y va haciendo una busqueda incremental
// Variable para almacenar los productos filtrados
let productosFiltrados = []; 

function inicializarFiltro() {
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
        productosFiltrados = nuevosProductosFiltrados; // Actualizar el estado del filtro
    });
}

//-------------------------------------------------Funciones de sesión de usuario
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

    if (existingCookie) {
        const nombreUsuario = existingCookie.replace("%20", " ");
        const contenidoLogin = `<p>${nombreUsuario}</p> | <a href="#" id="cerrarSesion">Cerrar Sesión</a>`;
        miDiv.innerHTML = contenidoLogin;

        const parrafoCerrarSesion = document.getElementById("cerrarSesion");
        parrafoCerrarSesion.addEventListener('click', () => {
            deleteCookie(userName);
            miDiv.innerHTML = "";
            const loginForm = `<form>
                                    <input type="text" name="nombre" placeholder="Iniciar Sesión">
                                    <input type="submit" value="Iniciar Sesión">
                                </form>`;
            miDiv.innerHTML = loginForm;
        });
    } else {
        miDiv.innerHTML = "";
        const loginForm = `<form>
                                <input type="text" name="nombre" placeholder="Iniciar Sesión">
                                <input type="submit" value="Iniciar Sesión">
                            </form>`;
        miDiv.innerHTML = loginForm;

        const form = document.querySelector('form');
        form.addEventListener('submit', (event) => {
            event.preventDefault();
            const nombre = event.target.elements.nombre.value;
            setCookie(userName, nombre, 7); // 7 days expiration, you can modify this value
            login(); // Update the UI after setting the cookie
        });
    }
}

//-----------------------------------------------Funciones del Carrito
 // Obtener referencias a elementos del DOM
const BotonAbrirModal = document.getElementById('abrirModal');
const divModal = document.getElementById('modal');
const closeBtn = document.querySelector('.modal__cerrar');

// Función para abrir el modal
function abrirModal(e) {
    e.preventDefault();
    divModal.style.display = 'block';
}

// Función para cerrar el modal
function closeCartModal(e) {
    e.preventDefault();
    divModal.style.display = 'none';
}

// Event listeners para abrir y cerrar el modal
BotonAbrirModal.addEventListener('click', abrirModal);
closeBtn.addEventListener('click', closeCartModal);

// Event listener para cerrar el modal haciendo click fuera de él
window.addEventListener('click', (event) => {
    if (event.target === divModal) {
        closeCartModal();
    }
});

/////////////////////////////////////////////////////////
// Función para obtener el carrito del LocalStorage
function verificarCarritoLocalStorage () {
    let carrito = [];
    if(localStorage.getItem('carrito')){
        carrito = JSON.parse(localStorage.getItem('carrito'));
    } 
    return carrito;
}


let boton_vaciar_carrito = document.getElementById("borrar_productos");
boton_vaciar_carrito.addEventListener("click",(e) => {
    e.preventDefault();
    carrito = [];
    localStorage.removeItem('carrito');
    agregarCantidadProductos();
    cargarModal(); });

function cantidadProductos(){
    return carrito.length;
}

function agregarCantidadProductos(){
    let iconCarrito = document.getElementById("header_total_productos");
    let modal__totaProductos = document.getElementById("total-productos");
    iconCarrito.innerHTML = "";
    iconCarrito.innerHTML = cantidadProductos();
    modal__totaProductos.innerHTML = "";
    modal__totaProductos.innerHTML = cantidadProductos();

}

// Función para guardar el carrito en el LocalStorage
function guardarCarritoEnLocalStorage() {
    localStorage.getItem('carrito') && localStorage.removeItem('carrito');
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

// Función para calcular el total del carrito
function calcularTotalCarrito() {
    return carrito.reduce((total, producto) => total + producto.precio * producto.cantidad, 0);
}

//Función que limpia el HTML del Modal y lo carga con productos del Carrito actual
function cargarModal () {
    const itemsCarrito = document.getElementById('items-carrito');
    // Limpiar el contenido antes de cargar los productos
    itemsCarrito.innerHTML = ''; 

    carrito.forEach(producto => {
        const nuevoItem = document.createElement('li');
        nuevoItem.textContent = `${producto.diseno} - $${producto.precio.toFixed(2)} - Cantidad: ${producto.cantidad}`;
        itemsCarrito.appendChild(nuevoItem); 
        agregarCantidadProductos();
    });

    total = calcularTotalCarrito();
    const totalCarrito = document.getElementById('total-carrito');
    totalCarrito.textContent = `$${total.toFixed(2)}`;
}

// Función para agregar un producto al carrito
function agregarProductoAlCarrito(producto) {
    carrito.push(producto);
    guardarCarritoEnLocalStorage();
}

// Función para agregar evento a los botones de compra
function botonProductoAgregar() {
    const botonesProducto = document.getElementsByClassName("boton-comprar");
    [...botonesProducto].forEach((boton) => {
        boton.addEventListener("click", () => {
            const idProducto = boton.dataset.id;
            const productoSeleccionado = productos.find((producto) => producto.id === parseInt(idProducto));
            agregarProductoAlCarrito(productoSeleccionado);
            // Actualizar visualmente el carrito
            cargarModal(); 
        });
    });
}

let carrito = verificarCarritoLocalStorage();
let total = 0;

cargarModal();

login();

productosEnPantalla(ArrayMix(productos));

botonProductoAgregar();

inicializarFiltro();

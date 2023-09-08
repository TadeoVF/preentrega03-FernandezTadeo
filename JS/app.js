// genero mi array de objetos con los productos
const productos = [
    {id: 1, nombre: "camisa", precio: 1500},
    {id: 2, nombre: "pantalon", precio: 2800},
    {id: 3, nombre: "zapatillas", precio: 3400},
    {id: 4, nombre: "gorro", precio: 820},
    {id: 5, nombre: "campera", precio: 2500},
    {id: 6, nombre: "medias", precio: 500},
    {id: 7, nombre: "pantuflas", precio: 1650}
];

//genero el array del que será el carrito
let carrito = []

//traigo al dom el espacio en el que voy a mostrar mis productos
const contenedorTarjetas = document.getElementById('contenedorTarjetas');

// aqui creo un ciclo foreach para recorrer el array y crear un espacio para que se muestren todos los productos dentro de mi pagina 
productos.forEach(producto =>{
    //creo su espacio en un div
    const spot = document.createElement('div')
    //le asigno una clase
    spot.className = 'card';
    //con el innerhtml agrego tanto el nombre como el precio y un boton para agregar al carrito a cada producto del array
    spot.innerHTML =`
    <p class="titulo">${producto.nombre}</p>
    <p class="precio">Precio: $${producto.precio}</p>
    <button class="btn btn-primary" id="agregarCarrito">Agregar al Carrito</button>
    ` ;
    //aqui designamos donde ubicamos nuestra creación
    contenedorTarjetas.appendChild(spot);
});

// aqui me fijo si ya tenia un carrito guardado, en cuyo caso lo traigo
// no supe hacerlo con &&
if (localStorage.getItem('carrito')) {
    carrito = JSON.parse(localStorage.getItem('carrito'));
}

//agrego una variable que encierre todos los botones "agregar al carrito"
const btnAgregarCarrito = document.querySelectorAll(".btn.btn-primary")

//creo un foreach para agregar el evento a los botones de agregar carrito
btnAgregarCarrito.forEach((boton, index) => {
    //agrego el evento del click
    boton.addEventListener('click', () => {
        // Verifico si el boton tiene un producto valido
        if (productos[index]) {
            // Si es true, la funcion sigue y añade el producto
            const productoSeleccionado = productos[index];
            carrito.push(productoSeleccionado);
            // Actualizo el carrito en el localStorage, pasando los elementos a JSON
            localStorage.setItem('carrito', JSON.stringify(carrito));
        }
    });
});

//traigo al dom los elementos necesarios para el carrito
const listaCarrito = document.getElementById('listaCarrito');
const totalCarrito = document.getElementById('totalCarrito');

// Función para mostrar los productos en el carrito 
function agregarACarrito(){
 
    //limpio el modal
    listaCarrito.innerHTML = ''; 
    //ciclo foreach por cada elemento del carrito
    carrito.forEach(producto => {
        //por cada producto se crea un li
        const itemCarrito = document.createElement('li');
        //se asigna clase de bootstrap
        itemCarrito.className = 'list-group-item';
        //dentro de los li este será el texto, siendo el nombre y precio el respectivo de cada producto dentro de carrito
        itemCarrito.textContent = `${producto.nombre} - $${producto.precio}`;
        //agregamos los li como hijos de la lista ul
        listaCarrito.appendChild(itemCarrito);
    });

    // hacemos que total empiece con valor 0
    let total = 0;
    //realizo un foreach para que el total valla sumandose al precio de cada uno de los objetos
    carrito.forEach(producto => {
        total += producto.precio;
    });
    //agrego el texto el total a pagar
    totalCarrito.textContent = total;
}

// traigo al dom los elementos para el modal
const abrirModal = document.getElementById('abrirModal');
const modalCarrito = document.getElementById('modalCarrito');
const cerrarModal = document.getElementById('cerrarModal');
const finalizarCompra = document.getElementById("finalizarCompra")

//agrego el evento para cuando se precione el boton sea habra el modal
abrirModal.addEventListener('click', () => {
    //si carrito tiene contenido, utilizara la funcion anteriormente explicada agregarACarrito, y aparte mostrará
    if (carrito.length > 0) {
        agregarACarrito(); 
        modalCarrito.style.display = 'block'; 
    }
});

//aqui agrego un evento apra volver a ocultar el modal
cerrarModal.addEventListener('click', () => {
    modalCarrito.style.display = 'none';
});

//al finalizar compra, el localstorage hace clear y se completa el ciclo
finalizarCompra.addEventListener('click', () => {
    localStorage.clear();
});

// Inicializar el carrito con el contenido guardado en localStorage, si existe.
// Inicializar el carrito desde localStorage
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];


// Función para agregar productos al carrito
function agregarAlCarrito(nombre, precio) {
    // Verificar si el producto ya está en el carrito
    let productoExistente = carrito.find(item => item.nombre === nombre);

    if (productoExistente) {
        // Si el producto ya existe, incrementar la cantidad
        productoExistente.cantidad += 1;
    } else {
        // Si el producto no existe, agregarlo con cantidad 1
        carrito.push({ nombre, precio, cantidad: 1 });
    }

    // Guardar el carrito actualizado en localStorage
    localStorage.setItem('carrito', JSON.stringify(carrito));

    // Actualizar el contador del carrito en la barra de navegación
    actualizarContadorCarrito();
}

// Función para actualizar el contador de productos en el carrito
function actualizarContadorCarrito() {
    const contador = carrito.reduce((total, item) => total + item.cantidad, 0);  // Contar la cantidad total de productos
    document.getElementById('carrito-count').textContent = contador;  // Actualizar el contador en la interfaz
}

// Función para eliminar un producto del carrito
function eliminarProducto(nombre) {
    // Filtrar el carrito para eliminar el producto con el nombre indicado
    carrito = carrito.filter(item => item.nombre !== nombre);

    // Guardar el carrito actualizado en localStorage
    localStorage.setItem('carrito', JSON.stringify(carrito));

    // Actualizar el carrito en la página
    actualizarCarrito();
}

// Función para actualizar el carrito en la página
function actualizarCarrito() {
    let carritoHTML = document.getElementById('carrito-contenido');
    carritoHTML.innerHTML = '';  // Limpiar el carrito mostrado

    if (carrito.length === 0) {
        carritoHTML.innerHTML = '<p>Tu carrito está vacío</p>';
        return;
    }

    // Mostrar los productos en el carrito
    carrito.forEach(item => {
        let div = document.createElement('div');
        div.classList.add('producto-carrito');
        div.innerHTML = `
            <p>${item.nombre} x ${item.cantidad} - $${item.precio * item.cantidad}</p>
            <button onclick="eliminarProducto('${item.nombre}')">Eliminar</button>
        `;
        carritoHTML.appendChild(div);
    });
}

// Llamar a la función que actualiza el contador cuando la página se carga
window.onload = function() {
    actualizarContadorCarrito();  // Actualizar el contador cuando se carga la página
    actualizarCarrito();  // Actualizar el carrito en la página
};


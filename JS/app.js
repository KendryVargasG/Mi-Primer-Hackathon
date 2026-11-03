const destinos = [
  {
    id: 1,
    nombre: "Medellín",
    descripcion: "Ciudad de la eterna primavera",
    precio: 120000,
    imagen: "../IMG/medellin.jpg"
  },
  {
    id: 2,
    nombre: "Cartagena",
    descripcion: "Historia, cultura y playas",
    precio: 180000,
    imagen: "../IMG/cartagena.jpg"
  },
  {
    id: 3,
    nombre: "Santa Marta",
    descripcion: "Mar Caribe y naturaleza",
    precio: 90000,
    imagen: "../IMG/santa_marta.jpg"
  },
  {
    id: 4,
    nombre: "Neiva",
    descripcion: "Puerta al desierto de la Tatacoa",
    precio: 140000,
    imagen: "../IMG/neiva.jpg"
  }
];

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

const catalogo = document.getElementById("catalogo");
const carritoHTML = document.getElementById("carrito");
const totalHTML = document.getElementById("total");
const botonVaciar = document.getElementById("vaciar-carrito");
const cantidadProductos = document.getElementById("cantidad-productos");

function mostrarProductos() {

  catalogo.innerHTML = "";

  destinos.forEach(destino => {

    catalogo.innerHTML += `
      <div class="col-md-3">
        <div class="card h-100 shadow">

          <img
            src="${destino.imagen}"
            class="card-img-top"
            alt="${destino.nombre}"
          >

          <div class="card-body">

            <h5 class="card-title fw-bold">
              ${destino.nombre}
            </h5>

            <p class="text-muted">
              ${destino.descripcion}
            </p>

            <p class="fw-bold text-primary">
              $${destino.precio.toLocaleString("es-CO")}
            </p>

            <button
              class="btn btn-primary"
              onclick="agregarAlCarrito(${destino.id})">

              Añadir a mi maleta

            </button>

          </div>

        </div>
      </div>
    `;
  });
}

function agregarAlCarrito(id) {

  const producto = destinos.find(
    destino => destino.id === id
  );

  carrito.push(producto);

  guardarCarrito();

  renderizarCarrito();
}

function guardarCarrito() {

  localStorage.setItem(
    "carrito",
    JSON.stringify(carrito)
  );

}

function renderizarCarrito() {

  carritoHTML.innerHTML = "";

  let total = 0;

  carrito.forEach((producto, index) => {

    total += producto.precio;

    carritoHTML.innerHTML += `
      <li class="list-group-item d-flex justify-content-between align-items-center">

        ${producto.nombre}

        <button
          class="btn btn-danger btn-sm"
          onclick="eliminarProducto(${index})">

          X

        </button>

      </li>
    `;
  });

  cantidadProductos.textContent = carrito.length;

  totalHTML.textContent =
    total.toLocaleString("es-CO");
}

function eliminarProducto(index) {

  carrito.splice(index, 1);

  guardarCarrito();

  renderizarCarrito();

}

function vaciarCarrito() {

  carrito = [];

  guardarCarrito();

  renderizarCarrito();

}

botonVaciar.addEventListener(
  "click",
  vaciarCarrito
);

mostrarProductos();
renderizarCarrito();
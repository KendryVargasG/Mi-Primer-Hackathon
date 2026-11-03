const destinos = [
  {
    id: 1,
    nombre: "Medellin",
    precio: 120000,
    imagen: "img/medellin.jpg"
  },
  {
    id: 2,
    nombre: "Cartagena",
    precio: 180000,
    imagen: "img/cartagena.jpg"
  },
  {
    id: 3,
    nombre: "Santa marta",
    precio: 90000,
    imagen: "img/santa_marta.jpg"
  },
  {
    id: 4,
    nombre: "Neiva",
    precio: 140000,
    imagen: "img/neiva.jpg"
  }
];

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

const catalogo = document.getElementById("catalogo");
const carritoHTML = document.getElementById("carrito");
const totalHTML = document.getElementById("total");

function mostrarProductos() {

  catalogo.innerHTML = "";

  destinos.forEach(destino => {

    catalogo.innerHTML += `
      <div class="col-md-3">
        <div class="card h-100 shadow">

          <img src="${destino.imagen}"
               class="card-img-top"
               alt="${destino.nombre}">

          <div class="card-body">
            <h5>${destino.nombre}</h5>
            <p>$${destino.precio.toLocaleString("es-CO")}</p>

            <button
              class="btn btn-primary"
              onclick="agregarAlCarrito(${destino.id})">
              Agregar
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

function renderizarCarrito() {

  carritoHTML.innerHTML = "";

  let total = 0;

  carrito.forEach((producto, index) => {

    total += producto.precio;

    carritoHTML.innerHTML += `
      <li class="list-group-item
                 d-flex
                 justify-content-between">

        ${producto.nombre}

        <button
          class="btn btn-danger btn-sm"
          onclick="eliminarProducto(${index})">

          X
        </button>

      </li>
    `;
  });

  totalHTML.textContent = total;
}

function eliminarProducto(index) {

  carrito.splice(index, 1);

  guardarCarrito();
  renderizarCarrito();
}

function guardarCarrito() {

  localStorage.setItem(
    "carrito",
    JSON.stringify(carrito)
  );
}

mostrarProductos();
renderizarCarrito();
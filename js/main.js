let productos = [];

fetch("js/productos.json")
   .then(response => response.json())
  .then(data => {
 
     productos = data;
     cargarProductos(productos);

  })
    
const contenedorProductos = document.querySelector ("#productosDestacados");
let botones = document.querySelectorAll(".boton");
const numerito = document.querySelector("#numerito");

function cargarProductos(){
    
  productos.forEach(producto => {
    
    const div = document.createElement("div");
    div.classList.add("producto");
   div.innerHTML = `

   <div class="card" style="width: 18rem;">
   <img src="${producto.imagen}" class="card-img-top" alt="${producto.titulo}">
   <div class="card-body">
     <h5 class="card-title">${producto.titulo}</h5>
     <p>${producto.precio}</p>
     <div>
       <button class="boton btn btn-primary" id= "${producto.id}" type="submit">Agregar al Carrito</button>
       
     </div>
   </div>
   </div>
   `;

   contenedorProductos.append(div);
   
   
  } )

  actualizarBotones()
  
}

function actualizarBotones() {
  botones = document.querySelectorAll(".boton");

   botones.forEach(boton => {
       boton.addEventListener("click", agregarAlCarrito);

   });
}

let productosCarrito;
let productosCarritoLs = localStorage.getItem("productos-en-carrito");


if (productosCarritoLs){

  productosCarrito = JSON.parse(productosCarritoLs);
  actualizarNumero();

}else{

   productosCarrito = [];
}

function agregarAlCarrito(e) {
  Toastify({
    text: "Agregado al carrito",
    duration: 1300,
    destination: "./carrito.html",
    newWindow: true,
    close: true,
    gravity: "bottom", // `top` or `bottom`
    position: "right", // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: {
      background: "linear-gradient(to right, #000, #000)",
      borderRadius: "2rem",
    },
    onClick: function(){} // Callback after click
  }).showToast();

   const idBoton = e.currentTarget.id;
   const productoAgregado = productos.find(producto => producto.id === idBoton);
 
    if(productosCarrito.some(producto => producto.id === idBoton)){
     const index = productosCarrito.findIndex(producto => producto.id ===idBoton);
      productosCarrito[index].cantidad++;
 
    }else{
      productoAgregado.cantidad = 1;
      productosCarrito.push(productoAgregado);
    }
    actualizarNumero()

    localStorage.setItem("productos-en-carrito", JSON.stringify(productosCarrito));
}

function actualizarNumero() {
 
    let nuevoNumero = productosCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);

    numerito.innerText = nuevoNumero;

}
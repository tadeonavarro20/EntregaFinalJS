const productos = [
  // Remeras
 {
   id: "remera-01",
   titulo: "Remera Madness - Negra",
   imagen: "../assets/img/remera.webp",
   categoria: {
     nombre: "Remera",
     id: "remera"
   },
   precio: 1000
 },

//  Pantalones
 {
  id: "pantalon-01",
  titulo: "Pantalon Mora - Amarillo",
  imagen: "../assets/img/pantalonAmarillo.jpg",
  categoria: {
    nombre: "Pantalon",
    id: "Pantalon"
  },
  precio: 2000
},
// Buzos
{
  id: "buzo-01",
  titulo: "Buzo Falling Star - Negro",
  imagen: "../assets/img/buzo.webp",
  categoria: {
    nombre: "Buzo",
    id: "buzo"
  },
  precio: 3000
},

// Zapatillas
{
  id: "zapatilla-01",
  titulo: "Zapatilla Union LA - Azul",
  imagen: "../assets/img/zapatilla.jpg",
  categoria: {
    nombre: "Remera",
    id: "remera"
  },
  precio: 4000

}

];




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


cargarProductos();


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





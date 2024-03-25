let productosCarrito = localStorage.getItem("productos-en-carrito");
productosCarrito = JSON.parse(productosCarrito);

const contenedorCarritoVacio = document.querySelector("#carritoVacio");
const contenedorCarritoProductos = document.querySelector("#carritoProductos");
const contenedorCarritoAcciones = document.querySelector("#carritoAcciones");
const contenedorCarritoComprado = document.querySelector("#carritoComprado");
let botonEliminar = document.querySelectorAll(".carritoEliminar");
const botonVaciar = document.querySelector("#vaciarCarrito")
const contenedorTotal = document.querySelector("#total")
const botonComprar = document.querySelector("#comprarCarrito")


function cargarProductosCarrito() {
     
     if (productosCarrito && productosCarrito.length > 0) {
         
         contenedorCarritoVacio.classList.add("disabled");
         contenedorCarritoProductos.classList.remove("disabled");
         contenedorCarritoAcciones.classList.remove("disabled");
         contenedorCarritoComprado.classList.add("disabled");
 
         
         contenedorCarritoProductos.innerHTML = "";
 
       
         productosCarrito.forEach(producto => {
             const div = document.createElement("div");
             div.classList.add("carritoProducto");
             div.innerHTML = `
                 <div class="borde">
                     <div class="carritoProducto">
                         <img class="carritoImagen" src="${producto.imagen}" alt="${producto.titulo}">
                         <div class="carritoTitulo">
                             <small>Titulo</small>
                             <h3>${producto.titulo}</h3>
                         </div>
                         <div class="carritoCantidad">
                             <small>Cantidad</small>
                             <p>${producto.cantidad}</p>
                         </div>
                         <div class="carritoPrecio">
                             <small>Precio</small>
                             <p>${producto.precio}</p>
                         </div>
                         <div class="carritoSubtotal">
                             <small>Subtotal</small>
                             <p>${producto.precio * producto.cantidad}</p>
                         </div>
                         <button class="carritoEliminar" id="${producto.id}">
                             <img src="./assets/img/eliminar.png" alt="">
                         </button>
                     </div>
                 </div>
             `;
             contenedorCarritoProductos.append(div);
         });
 
        
         actualizarBotonesEliminar();
     } else {
         
         contenedorCarritoVacio.classList.remove("disabled");
         contenedorCarritoProductos.classList.add("disabled");
         contenedorCarritoAcciones.classList.add("disabled");
         contenedorCarritoComprado.classList.add("disabled");
     }
 }

cargarProductosCarrito();
actualizarTotal()


 function actualizarBotonesEliminar() {
      botonEliminar = document.querySelectorAll(".carritoEliminar");
   
       botonEliminar.forEach(boton => {
           boton.addEventListener("click", eliminarDelCarrito);
   
       });
    }


    function eliminarDelCarrito(e){

    const idBoton = e.currentTarget.id;
    
    const index = productosCarrito.findIndex(producto => producto.id === idBoton);

    productosCarrito.splice(index, 1);

   cargarProductosCarrito();

    localStorage.setItem("productos-en-carrito", JSON.stringify(productosCarrito));

    }

  botonVaciar.addEventListener("click", vaciarCarrito);

   function  vaciarCarrito(){
     productosCarrito.length = 0;

     localStorage.setItem("productos-en-carrito", JSON.stringify(productosCarrito));
     cargarProductosCarrito()

   }

   function actualizarTotal(){
     const totalCalculado =  productosCarrito.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0);
     total.innerText = `$${totalCalculado}`;
}
     

botonComprar.addEventListener("click", comprarCarrito);

   function  comprarCarrito(){
     productosCarrito.length = 0;

     localStorage.setItem("productos-en-carrito", JSON.stringify(productosCarrito));
     
     contenedorCarritoVacio.classList.add("disabled");
     contenedorCarritoProductos.classList.add("disabled");
     contenedorCarritoAcciones.classList.add("disabled");
     contenedorCarritoComprado.classList.remove("disabled");
   }
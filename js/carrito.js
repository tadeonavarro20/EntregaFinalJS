let productosCarrito = localStorage.getItem("productos-en-carrito");
productosCarrito = JSON.parse(productosCarrito);

const contenedorCarritoVacio = document.querySelector("#contenedor-carrito-vacio");
const contenedorCarritoProductos = document.querySelector("#contenedor-carrito-productos");
const contenedorCarritoAcciones = document.querySelector("#contenedor-carrito-acciones");
const contenedorCarritoComprado = document.querySelector("#contenedor-carrito-comprado");
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
              div.classList.add("contenedor-productos");
              div.innerHTML = `
                          <div class="carrito-producto">
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
        Toastify({
          text: "Producto eliminado",
          duration: 1300,
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
    
      const index = productosCarrito.findIndex(producto => producto.id === idBoton);

      productosCarrito.splice(index, 1);

     cargarProductosCarrito();

      localStorage.setItem("productos-en-carrito", JSON.stringify(productosCarrito));

      }

    botonVaciar.addEventListener("click", vaciarCarrito);

     function  vaciarCarrito(){

      Swal.fire({
        title: "Estas seguro?",
        icon: "question",
        html: `
          Se borraran todos los productos del carrito
        `,
        showCloseButton: true,
        showCancelButton: true,
        focusConfirm: false,
        confirmButtonText: ` Si`,
        cancelButtonText: ` No `,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          productosCarrito.length = 0;

          localStorage.setItem("productos-en-carrito", JSON.stringify(productosCarrito));
          cargarProductosCarrito()
        }
      });

       

     }
     function actualizarTotal(){
      const totalCalculado =  productosCarrito.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0);
       total.innerText = `$${totalCalculado}`;
  }
     
  botonComprar.addEventListener("click", comprarCarrito);

     function  comprarCarrito(){

      Swal.fire({
  title: "Gracias por tu compra",
  text: "Vuelve cuando quieras",
  icon: "success"
});
       productosCarrito.length = 0;

       localStorage.setItem("productos-en-carrito", JSON.stringify(productosCarrito));
     
       contenedorCarritoVacio.classList.add("disabled");
      contenedorCarritoProductos.classList.add("disabled");
       contenedorCarritoAcciones.classList.add("disabled");
       contenedorCarritoComprado.classList.remove("disabled");
     }
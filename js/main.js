
alert("Bienvenido/a a Trendy Threads por favor ingrese sus datos");


function ingresarNombreApellido() {
  let nombre = prompt("Por favor, ingresa tu nombre:");
  let apellido = prompt("Ahora, ingresa tu apellido:");
  
  
  let nombreCompleto = nombre + " " + apellido;
  
  
  return nombreCompleto;
}

let nombreCompleto = ingresarNombreApellido();

alert ("Bienvenido/a " + nombreCompleto + " que es lo que desea hacer");


const productos = [
    { id: 1, nombre: "Remera", precio: 10000 },
    { id: 2, nombre: "Pantalón", precio: 30000 },
    { id: 3, nombre: "Zapatos", precio: 50000 }
  ];
  
  
  function mostrarProductos() {
    let listaProductos = "Productos disponibles:\n";
    productos.forEach(producto => {
      listaProductos += `${producto.id}: ${producto.nombre} - $${producto.precio}\n`;
    });
    alert(listaProductos);
  }
  
  
  function calcularTotal(carrito) {
    let total = 0;
    carrito.forEach(item => {
      total += item.cantidad * item.producto.precio;
    });
    return total;
  }
  
  
  function tienda() {
    const carrito = [];
  
    while (true) {
      const opcion = prompt(
        "Seleccione una opción:\n1. Ver productos\n2. Añadir producto al carrito\n3. Ver carrito\n4. Comprar\n5. Salir"
      );
  
      switch (opcion) {
        case "1":
          mostrarProductos();
          break;
        case "2":
          const idProducto = parseInt(prompt("Ingrese el ID del producto:"));
          const cantidad = parseInt(prompt("Ingrese la cantidad:"));
          const productoEncontrado = productos.find(
            producto => producto.id === idProducto
          );
  
          if (productoEncontrado) {
            carrito.push({ producto: productoEncontrado, cantidad });
            alert("Producto añadido al carrito.");
          } else {
            alert("Producto no encontrado.");
          }
          break;
        case "3":
          let contenidoCarrito = "Carrito de compras:\n";
          carrito.forEach(item => {
            contenidoCarrito += `${item.producto.nombre} x ${
              item.cantidad
            } - $${item.producto.precio * item.cantidad}\n`;
          });
          alert(contenidoCarrito);
          break;
        case "4":
          const totalCompra = calcularTotal(carrito);
          alert(`El total de la compra es: $${totalCompra}`);
          break;
        case "5":
          alert("Gracias por su compra.");
          return;
        default:
          alert("Opción no válida.");
      }
    }
  }
  
  
  tienda();

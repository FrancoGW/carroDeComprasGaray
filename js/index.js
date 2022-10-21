// carrito 

const contenedorProductos = document.getElementById('contenedor-productos');
const contenedorCarrito = document.getElementById('contenedor-carrito');
const precioTotal = document.getElementById('precioToal');




let productos 



let carrito = [];
document.addEventListener('DOMContentLoaded', () =>{
  if(localStorage.getItem('carrito')){
    carrito = JSON.parse(localStorage.getItem('carrito'))
    actualizarCarrito()
  }
})
function cargarProductos(){

  fetch('js/stockProductos.json')
      .then(respuesta => respuesta.json())
      .then(stockProductos => {
        productos = stockProductos
            stockProductos.forEach((producto)=>{
            const div = document.createElement('div')
            div.classList.add('producto')
            div.innerHTML = `
            <div class="img">
            
            <img src=${producto.img} alt="">
            </div>
            <h3>${producto.nombre}</h3>
            <p>${producto.desc}</p>
            <p class="precioProducto">Precio:$ ${producto.precio}</p>
            <button id="agregar${producto.id}" class="botonAgregar">Comprar</button>
            `
            contenedorProductos.appendChild(div);

            const boton = document.getElementById(`agregar${producto.id}`)
            boton.addEventListener('click', () => {
              agregarAlCarrito(producto.id)
            })
           })
  })
}       

cargarProductos();

const agregarAlCarrito = (prodId) => {

  const existe = carrito.some (prod => prod.id === prodId)

  if(existe){

    const prod = carrito.map(prod => {
      if(prod.id === prodId){

        prod.cantidad++
      }
    })
  }else{
    const item = productos.find((prod)=> prod.id === prodId)
    carrito.push(item)
    console.log(carrito)
  }
  
  actualizarCarrito()
 
}
const eliminarDelCarrito = (prodId) =>{
  const item = carrito.find((prod) => prod.id === prodId)
  const indice = carrito.indexOf(item)
  carrito.splice(indice, 1)
  actualizarCarrito()

}
const actualizarCarrito = () =>{
  contenedorCarrito.innerHTML="";
  carrito.forEach((prod) =>{
    const div = document.createElement('div')
    div.className = ('productoEnCarrito')
    div.innerHTML = `
    <p>${prod.nombre}</p>
    <p>$${prod.precio}</p>
    <p> Cantidad: <span id="cantidad">${prod.cantidad}</span></p>
    <a onClick="eliminarDelCarrito(${prod.id})" class="botonEliminar">X</a>
    `
    contenedorCarrito.appendChild(div)
    localStorage.setItem('carrito', JSON.stringify(carrito))
  })
  contadorCarrito.innerText = carrito.length
  precioTotal.innerText = carrito.reduce((acc,prod)=> acc+ prod.precio, 0 )
}

let swiper = new Swiper(".mySwiper", {
  pagination: {
    el: ".swiper-pagination",
    type: "progressbar",
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

function alerta () {
  swal({title:"Gracias por tu compra",
    icon:"success"
})
}
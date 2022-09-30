// carrito 

const contenedorProductos = document.getElementById('contenedor-productos');
const contenedorCarrito = document.getElementById('contenedor-carrito');
const precioTotal = document.getElementById('precioToal');


let stockProductos = [
  {id:1, nombre: "GPRO", cantidad: 1, desc: 'El mejor del mercado', precio: 10500,img:'./assets/img/mouse.webp'},
  {id:2, nombre: "RAZER", cantidad: 1, desc: 'El mejor del mercado', precio: 20500,img:'./assets/img/teclado.webp'},
  {id:3, nombre: "SAMSUNG", cantidad: 1, desc: 'El mejor del mercado', precio: 70000,img:'./assets/img/monitor.webp'},
  {id:4, nombre: "RTX 3090", cantidad: 1, desc: 'El mejor del mercado', precio: 700000,img:'./assets/img/rtx.webp'},
  {id:5, nombre: "PC GAMER", cantidad: 1, desc: 'El mejor del mercado', precio: 250000,img:'./assets/img/pc-completa.png'},
  {id:6, nombre: "NOTEBOOK GAMER", cantidad: 1, desc: 'El mejor del mercado', precio: 175000,img:'./assets/img/notebook-gamer.jpeg'},
  {id:7, nombre: "ASTROS", cantidad: 1, desc: 'El mejor del mercado', precio: 30000,img:'./assets/img/astros.png'},
  {id:8, nombre: "MOUSEPAD", cantidad: 1, desc: 'El mejor del mercado', precio: 1000,img:'./assets/img/mousepad.png'},
  {id:9, nombre: "SILLA", cantidad: 1, desc: 'El mejor del mercado', precio: 90500,img:'./assets/img/silla.png'},
  {id:10, nombre: "PLACA MADRE", cantidad: 1, desc: 'El mejor del mercado', precio: 20500,img:'./assets/img/placa-madre.png'},
  

];
let carrito = [];
document.addEventListener('DOMContentLoaded', () =>{
  if(localStorage.getItem('carrito')){
    carrito = JSON.parse(localStorage.getItem('carrito'))
    actualizarCarrito()
  }
})

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
const agregarAlCarrito = (prodId) => {

  const existe = carrito.some (prod => prod.id === prodId)

  if(existe){

    const prod = carrito.map(prod => {
      if(prod.id === prodId){

        prod.cantidad++
      }
    })
  }else{
    const item = stockProductos.find((prod)=> prod.id === prodId)
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

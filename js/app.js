// Variables
let carrito ;
let listaCursos ;
let contenedorCarrito ;
let vaciarCarritoBtn ;
let articulosCarrito = [];

// Listeners
document.addEventListener('DOMContentLoaded', () => {
     cargarEventListeners();
})

function cargarEventListeners() {
      carrito = document.querySelector('#carrito');
      listaCursos = document.querySelector('#lista-cursos');
      contenedorCarrito = document.querySelector('#lista-carrito tbody');
      vaciarCarritoBtn = document.querySelector('#vaciar-carrito');

     // Dispara cuando se presiona "Agregar Carrito"
     listaCursos.addEventListener('click', agregarCurso);

     // Cuando se elimina un curso del carrito
     carrito.addEventListener('click', eliminarCurso);

     // Al Vaciar el carrito
     vaciarCarritoBtn.addEventListener('click', vaciarCarrito);

}

// Funciones
// Función que añade el curso al carrito
function agregarCurso(e) {
     e.preventDefault();
     // Delegation para agregar-carrito
     if(e.target.classList.contains('agregar-carrito')) {
          const curso = e.target.parentElement.parentElement;
          // Enviamos el curso seleccionado para tomar sus datos
          leerDatosCurso(curso);
     }

     console.log('agregarCurso');
}

// Lee los datos del curso
function leerDatosCurso(curso) {
     const infoCurso = {
          imagen: curso.querySelector('img').src,
          titulo: curso.querySelector('h4').textContent,
          precio: curso.querySelector('.precio span').textContent,
          id: curso.querySelector('a').getAttribute('data-id'),
          cantidad: 1
     }

     if( articulosCarrito.some( curso => curso.id === infoCurso.id ) ) {
          const cursos = articulosCarrito.map( curso => {
               if( curso.id === infoCurso.id ) {
                    curso.cantidad++;
                     return curso;
                } else {
                     return curso;
             }
          })
          articulosCarrito = [...cursos];
     }  else {
          articulosCarrito = [...articulosCarrito, infoCurso];
     }

     carritoHTML();
}

// Elimina el curso del carrito en el DOM
function eliminarCurso(e) {
     e.preventDefault();
     if(e.target.classList.contains('borrar-curso') ) {
          // e.target.parentElement.parentElement.remove();
          const cursoId = e.target.getAttribute('data-id')

          // Eliminar del arreglo del carrito
          articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId);

          carritoHTML();
     }
}

// Muestra el curso seleccionado en el Carrito
function carritoHTML() {

     console.log('carritoHTML');

     let importeTotal = 0;

     vaciarCarritoVisual();

     articulosCarrito.forEach(curso => {

          let precio = curso.precio.substring(1, curso.precio.length);
          console.log(`Precio Producto: ${precio}`);
          importeTotal +=  Number.parseFloat(precio) *  Number.parseFloat(curso.cantidad) ;
               

          const row = document.createElement('tr');
          row.innerHTML = `
               <td>
                    <img src="${curso.imagen}" width=100>
               </td>
               <td>${curso.titulo}</td>
               <td>${curso.precio}</td>
               <td>${curso.cantidad} </td>
               <td>
                    <a href="#" class="borrar-curso" data-id="${curso.id}">X</a>
               </td>
          `;
          contenedorCarrito.appendChild(row);
     });

     console.log(`Importe Total: ${importeTotal}`);

     document.getElementById('tableTotal').textContent = importeTotal ;
 
     ocultarBtnVaciar();
}

function ocultarBtnVaciar() {
     let btnVaciar = document.getElementById('vaciar-carrito');
     let rowTotal = document.getElementById('tableFooter');
     if (articulosCarrito.length==0){
          //Ocultarlo
          btnVaciar.style.display = 'none';
          rowTotal.style.display = 'none';
     } else {
          //Mostrarlo
          btnVaciar.style.display = '';
          rowTotal.style.display = '';
     }
}

// Elimina los cursos del carrito en el DOM
function vaciarCarrito() {
     articulosCarrito = [];
     vaciarCarritoVisual();
     ocultarBtnVaciar();
}

// Elimina los cursos del carrito en el DOM
function vaciarCarritoVisual() {
     while(contenedorCarrito.firstChild) {
          contenedorCarrito.removeChild(contenedorCarrito.firstChild);
     }

     ocultarBtnVaciar();
}

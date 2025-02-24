const input = document.getElementById('ingresar-tarea');
const boton = document.querySelector('button');
const listaDeTarea = document.getElementById('lista-de-tareas');

boton.addEventListener('click', agregarTarea);
input.addEventListener('keydown', (e) => {
  if (e.key == 'Enter') {
    agregarTarea();
  }
});

function agregarTarea() {
    if (input.value) {
    
      // Crear y agregar iconos.
        //Completar Tarea
      let contCompletada = document.createElement('div');
      contCompletada.classList.add('cont-completada');

      let completar = document.createElement("img");
      completar.src = "imagenes/listo.png";
      completar.alt = "icono completar";
      completar.classList.add("icono-completo");

      completar.addEventListener('click', tareaCompletada)
      contCompletada.appendChild(completar);

      // Crear tarea.
      let tareaNueva = document.createElement('div');
      tareaNueva.classList.add('tarea');

      // Texto ingresado por el usuario.
      let texto = document.createElement('p');
      texto.innerText = input.value;
      tareaNueva.appendChild(texto);

      // Crear y agregar contenedor de los iconos
      let iconos = document.createElement('div');
      iconos.classList.add('iconos'); 
      tareaNueva.appendChild(iconos);

      //Editar Tarea
      let editar = document.createElement('img');
      editar.src = 'imagenes/editar.png';
      editar.alt ='icono editar';
      editar.classList.add('icono-editar');

      editar.addEventListener('click', editarTarea);
      iconos.appendChild(editar);

      //Eliminar Traea
      let eliminar = document.createElement("img");
      eliminar.src = "imagenes/icon-eliminar.png";
      eliminar.alt = "icono eliminar";
      eliminar.classList.add('icono-eliminar');

      eliminar.addEventListener('click', eliminarTarea);
      iconos.appendChild(eliminar);

      iconos.append(editar, eliminar);

          // Agregar la tarea a la lista.
      let contenedorTarea = document.createElement('div');
      contenedorTarea.classList.add('contenedor-tarea');
      contenedorTarea.append(contCompletada, tareaNueva);

      listaDeTarea.appendChild(contenedorTarea);
      input.value = '';

    } else {
      alert('Por favor ingresa una tarea.');
    }
  }

  
  // Marcar una tarea como completada.
  function tareaCompletada(e) {
    let tarea = e.target.closest('.contenedor-tarea').querySelector('.tarea');
    tarea.classList.toggle('completada');
  }
  
  // Eliminar una tarea del DOM.
  function eliminarTarea(e) {
    let tarea = e.target.closest('.contenedor-tarea')
    tarea.remove();
  }

  //Editar una tarea
  // function editarTarea(e) {
  //   let tarea = e.target.parentNode.parentNode;
  //   let text = tarea.querySelector('p');
  //   let nuevoText = prompt('Edita tu tarea : ', text.innerText);

  //   if (nuevoText) {
  //     text.innerText = nuevoText;
  //   }
  // }

  async function editarTarea(e) {
    let tarea = e.target.parentNode.parentNode;
    let text = tarea.querySelector('p');

    const { value: nuevoText } = await Swal.fire({
        title: "Edita aqui tu Tarea",
        input: "text",
        inputValue: text.innerText, // Mostrar el texto actual en el input
        inputPlaceholder: "Edita tu tarea",
        showCancelButton: true,
        confirmButtonText: "Agregar",
        cancelButtonText: "Cancelar",
        confirmButtonClass: "swal2-confirm",
        cancelButtonClass: "swal2-cancel"
    });

    if (nuevoText) {
        text.innerText = nuevoText;
    }
  }

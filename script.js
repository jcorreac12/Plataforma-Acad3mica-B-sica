const formulario = document.getElementById('formulario-nombre');
const campoNombre = document.getElementById('nombre');
const listaNombres = document.getElementById('lista-nombres');
const fechaHora = document.getElementById('fecha-hora');

const nombres = new Map();

function actualizarFechaHora() {
  const ahora = new Date();
  const fecha = ahora.toLocaleDateString('es-ES', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
  const hora = ahora.toLocaleTimeString('es-ES');
  fechaHora.textContent = `${fecha} · ${hora}`;
}

function claveNombre(nombre) {
  return nombre
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLocaleLowerCase('es');
}

function mostrarNombres() {
  listaNombres.innerHTML = '';

  if (nombres.size === 0) {
    const mensaje = document.createElement('li');
    mensaje.className = 'vacio';
    mensaje.textContent = 'Aún no hay nombres registrados.';
    listaNombres.appendChild(mensaje);
    return;
  }

  [...nombres.values()]
    .sort((a, b) => a.nombre.localeCompare(b.nombre, 'es'))
    .forEach(({ nombre, cantidad }) => {
      const elemento = document.createElement('li');
      elemento.textContent = cantidad > 1 ? `${nombre} - ${cantidad}` : nombre;
      listaNombres.appendChild(elemento);
    });
}

formulario.addEventListener('submit', (evento) => {
  evento.preventDefault();
  const nombre = campoNombre.value.trim();

  if (!nombre) {
    campoNombre.focus();
    return;
  }

  const clave = claveNombre(nombre);
  const registro = nombres.get(clave);

  if (registro) {
    registro.cantidad += 1;
  } else {
    nombres.set(clave, { nombre, cantidad: 1 });
  }

  alert('El sitio web está en desarrollo. ¡Vuelve pronto para ver las mejoras!');
  mostrarNombres();
  formulario.reset();
  campoNombre.focus();
});

actualizarFechaHora();
setInterval(actualizarFechaHora, 1000);
mostrarNombres();

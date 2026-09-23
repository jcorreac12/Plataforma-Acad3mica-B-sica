const formulario = document.getElementById('formulario-nombre');
const campoNombre = document.getElementById('nombre');
const listaNombres = document.getElementById('lista-nombres');
const fechaHora = document.getElementById('fecha-hora');
const ultimoNombre = document.getElementById('ultimo-nombre');
const contadorTotal = document.getElementById('contador-total');
const modal = document.getElementById('modal');
const cerrarModal = document.getElementById('cerrar-modal');

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

function normalizarNombre(nombre) {
  return nombre
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim()
    .toLocaleLowerCase('es');
}

function mostrarNombres() {
  listaNombres.innerHTML = '';

  if (nombres.size === 0) {
    const mensaje = document.createElement('li');
    mensaje.className = 'vacio';
    mensaje.textContent = 'Aún no hay nombres registrados.';
    listaNombres.appendChild(mensaje);
    contadorTotal.textContent = '0';
    return;
  }

  const registros = [...nombres.values()].sort((a, b) => a.nombre.localeCompare(b.nombre, 'es'));
  contadorTotal.textContent = String(registros.length);

  registros.forEach(({ nombre, cantidad }) => {
    const elemento = document.createElement('li');
    elemento.textContent = cantidad > 1 ? `${nombre} - ${cantidad}` : nombre;
    listaNombres.appendChild(elemento);
  });
}

function abrirModal() {
  modal.classList.remove('oculto');
}

function cerrarModalVentana() {
  modal.classList.add('oculto');
}

formulario.addEventListener('submit', (evento) => {
  evento.preventDefault();

  const nombre = campoNombre.value.trim();

  if (!nombre) {
    campoNombre.focus();
    return;
  }

  const clave = normalizarNombre(nombre);
  const registroExistente = nombres.get(clave);

  if (registroExistente) {
    registroExistente.cantidad += 1;
    registroExistente.nombre = registroExistente.nombre;
  } else {
    nombres.set(clave, { nombre, cantidad: 1 });
  }

  ultimoNombre.textContent = nombre;
  mostrarNombres();
  formulario.reset();
  campoNombre.focus();
  abrirModal();
});

cerrarModal.addEventListener('click', cerrarModalVentana);
modal.addEventListener('click', (evento) => {
  if (evento.target === modal) {
    cerrarModalVentana();
  }
});

actualizarFechaHora();
setInterval(actualizarFechaHora, 1000);
mostrarNombres();

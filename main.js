/* =========================================================
   Portfolio de Jose Pascual Martín Rodríguez · Interacción
   1. Menú hamburguesa para móviles
   2. Modo oscuro / claro
   ========================================================= */

/* ---------- 1. Menú hamburguesa ---------- */
const botonMenu = document.getElementById('boton-menu');
const menu = document.querySelector('.menu');

function cerrarMenu() {
    menu.classList.remove('activo');
    botonMenu.innerHTML = '<i class="bx bx-menu"></i>';
    botonMenu.setAttribute('aria-expanded', 'false');
    botonMenu.setAttribute('aria-label', 'Abrir menú');
}

botonMenu.addEventListener('click', () => {
    const abierto = menu.classList.toggle('activo');
    botonMenu.innerHTML = abierto ? '<i class="bx bx-x"></i>' : '<i class="bx bx-menu"></i>';
    botonMenu.setAttribute('aria-expanded', String(abierto));
    botonMenu.setAttribute('aria-label', abierto ? 'Cerrar menú' : 'Abrir menú');
});

// Al pulsar un enlace del menú, este se cierra
menu.querySelectorAll('a').forEach((enlace) => enlace.addEventListener('click', cerrarMenu));

/* ---------- 2. Modo oscuro / claro ---------- */
const botonTema = document.getElementById('boton-tema');
const raiz = document.documentElement;

function aplicarTema(tema) {
    raiz.setAttribute('data-theme', tema);
    const oscuro = tema === 'oscuro';
    botonTema.innerHTML = oscuro ? '<i class="bx bx-sun"></i>' : '<i class="bx bx-moon"></i>';
    botonTema.setAttribute('aria-label', oscuro ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro');
}

// Tema inicial: el guardado por el usuario o, si no hay, el del sistema
let temaGuardado = null;
try {
    temaGuardado = localStorage.getItem('tema');
} catch (error) {
    // Si el navegador bloquea localStorage, se usa el tema del sistema
}
const prefiereOscuro = window.matchMedia('(prefers-color-scheme: dark)').matches;
aplicarTema(temaGuardado || (prefiereOscuro ? 'oscuro' : 'claro'));

botonTema.addEventListener('click', () => {
    const nuevoTema = raiz.getAttribute('data-theme') === 'oscuro' ? 'claro' : 'oscuro';
    aplicarTema(nuevoTema);
    try {
        localStorage.setItem('tema', nuevoTema);
    } catch (error) {
        // No se puede guardar la preferencia; el cambio se mantiene solo en esta visita
    }
});

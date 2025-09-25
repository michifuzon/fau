// Partículas musicales — confeti (fall) o burbujas (rise) + rebote opcional
(() => {
  const hero = document.querySelector('.hero--center');
  const layer = hero?.querySelector('.notes');
  if (!hero || !layer) return;

  const MODE = document.body.getAttribute('data-notes-mode') || 'fall'; // 'fall' | 'rise'
  const EMOJIS = ['🎵','🎶','🎼','🎹','🎤','🎧','🎷','🎺','🎸','🎻','🥁'];
  const INTERVAL_MS = 600;    // cada cuánto generamos un lote
  const BATCH = 5;            // cuántas notas por lote
  const MIN_DUR = 5000;       // ms (caída/subida)
  const MAX_DUR = 9000;
  const BOUNCE_PROB = 0.45;   // 45% de las que caen rebotan

  const vw = () => Math.max(document.documentElement.clientWidth, window.innerWidth || 0);

  function spawnOne(){
    const el = document.createElement('span');
    el.className = 'note';
    el.textContent = EMOJIS[Math.floor(Math.random()*EMOJIS.length)];

    // Posición y tamaño aleatorio
    const left = Math.random() * vw();
    const size = 14 + Math.random() * 18;            // 14–32px
    const drift = (Math.random() * 120 - 60) + 'px';  // -60 a 60 px
    const duration = MIN_DUR + Math.random() * (MAX_DUR - MIN_DUR);
    const delay = Math.random() * 400;               // pequeño desfasaje
    const hue = Math.random() < 0.5 ? 'var(--accent-blue, #60a5fa)' : 'var(--accent-yellow, #ffd166)';

    el.style.left = `${left}px`;
    el.style.fontSize = `${size}px`;
    el.style.setProperty('--drift', drift);
    el.style.color = hue;

    // Modo animación principal
    const key = MODE === 'rise' ? 'note-rise' : 'note-fall';
    el.style.animation = `${key} ${duration}ms ease-in ${delay}ms forwards`;
    layer.appendChild(el);

    // Al terminar la animación principal…
    el.addEventListener('animationend', () => {
      // Si es caída y “toca el piso”, chance de rebotar:
      if (MODE === 'fall' && Math.random() < BOUNCE_PROB) {
        // Inicia rebote (900ms aprox)
        el.style.animation = `note-bounce 900ms ease-out forwards`;
        // Remover al finalizar el rebote
        el.addEventListener('animationend', () => el.remove(), { once: true });
      } else {
        el.remove();
      }
    }, { once: true });
  }

  function spawnBatch(){
    for (let i = 0; i < BATCH; i++) spawnOne();
  }

  // Arranque + intervalos
  spawnBatch();
  const timer = setInterval(spawnBatch, INTERVAL_MS);

  // Limpieza simple si la pestaña se oculta
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) clearInterval(timer);
  }, { once: true });
})();

// === CONFIGURÁ TU NÚMERO AQUÍ (formato internacional sin + ni espacios) ===
const PHONE = "5493517628450"; // <- reemplazar por tu número

// Helpers
const dialog = document.getElementById('dialog');
if (dialog) {
  const title = document.getElementById('dlg-title');
  const meta  = document.getElementById('dlg-meta');
  const ok    = document.getElementById('dlg-ok');
  const cancel= document.getElementById('dlg-cancel');

  let selected = { titulo: "", fecha: "" };

  // Al hacer click en una card, abrimos el modal
  document.querySelectorAll('.card').forEach(card=>{
    card.addEventListener('click', ()=>{
      selected.titulo = card.dataset.titulo; // ej: "Radiohead — In Rainbows"
      selected.fecha  = card.dataset.fecha;   // ej: "Jueves 02/10 — 23:30 hs"

      title.textContent = selected.titulo;
      meta.textContent  = selected.fecha;

      // Armamos link de WhatsApp dinámico
      const msg = `¡Acepto la cita! Vamos a la función de ${selected.titulo} el día ${selected.fecha}.`;
      const encoded = encodeURIComponent(msg);

      // wa.me funciona en móvil y en WhatsApp Web
      const waUrl = `https://wa.me/${PHONE}?text=${encoded}`;

      ok.href = waUrl;           
      ok.textContent = "Confirmar";
      dialog.showModal();
    });
  });

  cancel?.addEventListener('click', ()=> dialog.close());
}

/* ============================================================
   tweaks/panel.jsx
   Responsabilidades:
     - useTweaks   : hook que gerencia e persiste o estado dos tweaks
     - TweaksPanel : shell flutuante e arrastável
   Estilos: src/tweaks/panel.css (carregado via <link> no index.html)
   ============================================================ */

/* global React */

// ── useTweaks ─────────────────────────────────────────────────────────────────
// Estado dos tweaks com persistência via postMessage para o host (edit mode).
function useTweaks(defaults) {
  const [values, setValues] = React.useState(defaults);

  const setTweak = React.useCallback((keyOrEdits, val) => {
    const edits = typeof keyOrEdits === 'object' && keyOrEdits !== null
      ? keyOrEdits
      : { [keyOrEdits]: val };
    setValues((prev) => ({ ...prev, ...edits }));
    window.parent.postMessage({ type: '__edit_mode_set_keys', edits }, '*');
    window.dispatchEvent(new CustomEvent('tweakchange', { detail: edits }));
  }, []);

  return [values, setTweak];
}

// ── TweaksPanel ───────────────────────────────────────────────────────────────
// Shell flutuante e arrastável. Ativa/desativa via postMessage do host.
function TweaksPanel({ title = 'Tweaks', children }) {
  const [open, setOpen] = React.useState(false);
  const dragRef = React.useRef(null);
  const offsetRef = React.useRef({ x: 16, y: 16 });
  const PAD = 16;

  const clampToViewport = React.useCallback(() => {
    const panel = dragRef.current;
    if (!panel) return;
    const w = panel.offsetWidth, h = panel.offsetHeight;
    offsetRef.current = {
      x: Math.min(Math.max(PAD, window.innerWidth - w - PAD), Math.max(PAD, offsetRef.current.x)),
      y: Math.min(Math.max(PAD, window.innerHeight - h - PAD), Math.max(PAD, offsetRef.current.y)),
    };
    panel.style.right  = offsetRef.current.x + 'px';
    panel.style.bottom = offsetRef.current.y + 'px';
  }, []);

  // Re-clamp quando o painel abre ou a viewport muda de tamanho
  React.useEffect(() => {
    if (!open) return;
    clampToViewport();
    if (typeof ResizeObserver === 'undefined') {
      window.addEventListener('resize', clampToViewport);
      return () => window.removeEventListener('resize', clampToViewport);
    }
    const ro = new ResizeObserver(clampToViewport);
    ro.observe(document.documentElement);
    return () => ro.disconnect();
  }, [open, clampToViewport]);

  // Protocolo com o host (ativa / desativa edit mode)
  React.useEffect(() => {
    const onMsg = (e) => {
      const t = e?.data?.type;
      if (t === '__activate_edit_mode')   setOpen(true);
      if (t === '__deactivate_edit_mode') setOpen(false);
    };
    window.addEventListener('message', onMsg);
    window.parent.postMessage({ type: '__edit_mode_available' }, '*');
    return () => window.removeEventListener('message', onMsg);
  }, []);

  const dismiss = () => {
    setOpen(false);
    window.parent.postMessage({ type: '__edit_mode_dismissed' }, '*');
  };

  const onDragStart = (e) => {
    const panel = dragRef.current;
    if (!panel) return;
    const r = panel.getBoundingClientRect();
    const sx = e.clientX, sy = e.clientY;
    const startRight  = window.innerWidth  - r.right;
    const startBottom = window.innerHeight - r.bottom;
    const move = (ev) => {
      offsetRef.current = {
        x: startRight  - (ev.clientX - sx),
        y: startBottom - (ev.clientY - sy),
      };
      clampToViewport();
    };
    const up = () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseup', up);
    };
    window.addEventListener('mousemove', move);
    window.addEventListener('mouseup', up);
  };

  if (!open) return null;
  return (
    <div ref={dragRef} className="twk-panel" data-omelette-chrome=""
           style={{ right: offsetRef.current.x, bottom: offsetRef.current.y }}>
        <div className="twk-hd" onMouseDown={onDragStart}>
          <b>{title}</b>
          <button className="twk-x" aria-label="Close tweaks"
                  onMouseDown={(e) => e.stopPropagation()}
                  onClick={dismiss}>✕</button>
        </div>
        <div className="twk-body">{children}</div>
      </div>
  );
}

// ── Exporta para o escopo global (padrão do projeto — sem bundler) ────────────
Object.assign(window, { useTweaks, TweaksPanel });

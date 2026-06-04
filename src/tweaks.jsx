/* global React, ReactDOM, useTweaks, TweaksPanel, TweakSection, TweakRadio, TweakToggle */
const { useEffect } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "direction": "mint",
  "headingFont": "Space Grotesk",
  "grid": true,
  "scanlines": false
}/*EDITMODE-END*/;

const FONT_MAP = {
  "Space Grotesk": "'Space Grotesk', sans-serif",
  "Sora": "'Sora', sans-serif",
};

function TweaksApp() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute("data-theme", t.direction);
    root.style.setProperty("--font-display", FONT_MAP[t.headingFont] || FONT_MAP["Space Grotesk"]);
    document.body.classList.toggle("no-grid", !t.grid);
    root.classList.toggle("force-scan", !!t.scanlines);
  }, [t.direction, t.headingFont, t.grid, t.scanlines]);

  return (
    <TweaksPanel title="Tweaks">
      <TweakSection label="Direção visual" />
      <TweakRadio
        label="Tema"
        value={t.direction}
        options={["mint", "cobalt", "amber"]}
        onChange={(v) => setTweak("direction", v)}
      />
      <TweakSection label="Tipografia" />
      <TweakRadio
        label="Títulos"
        value={t.headingFont}
        options={["Space Grotesk", "Sora"]}
        onChange={(v) => setTweak("headingFont", v)}
      />
      <TweakSection label="Detalhes" />
      <TweakToggle
        label="Grade de fundo"
        value={t.grid}
        onChange={(v) => setTweak("grid", v)}
      />
      <TweakToggle
        label="Scanlines (CRT)"
        value={t.scanlines}
        onChange={(v) => setTweak("scanlines", v)}
      />
    </TweaksPanel>
  );
}

const mount = document.createElement("div");
mount.id = "tweaks-root";
document.body.appendChild(mount);
ReactDOM.createRoot(mount).render(<TweaksApp />);

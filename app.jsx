/* app.jsx — Hero, TOC sidebar, scroll spy, tweaks, mount */
const { useState, useEffect, useCallback, useRef } = React;

/* ======== TOC data ======== */
const TOC_DATA = [
  { id: "opleiding",         num: "01", label: "Wat heb ik geleerd?" },
  { id: "verwezenlijkingen", num: "02", label: "Verwezenlijkingen" },
  { id: "werkplekleren",     num: "03", label: "Werkplekleren" },
  { id: "sterke-punten",     num: "04", label: "Sterke punten" },
  { id: "werkpunten",        num: "05", label: "Werkpunten" },
  { id: "kernkwadrant",      num: "06", label: "Kernkwadrant" },
  { id: "korte-termijn",     num: "07", label: "Korte termijn" },
  { id: "job-zoeken",        num: "08", label: "Job zoeken" },
  { id: "ideale-functie",    num: "09", label: "Ideale functie" },
  { id: "type-bedrijf",      num: "10", label: "Type bedrijf" },
  { id: "verder-studeren",   num: "11", label: "Verder studeren" },
  { id: "reflectie",         num: "12", label: "Reflectie" },
];

/* ======== Coffee-bean SVG shapes for hero bg ======== */
function CoffeeBean({ x, y, size, rotate }) {
  return (
    <svg x={x} y={y} width={size} height={size * 1.6} viewBox="0 0 40 64"
         style={{ transform: `rotate(${rotate}deg)`, transformOrigin: "center" }}>
      <ellipse cx="20" cy="32" rx="15" ry="29" fill="currentColor" />
      <path d="M20 4C17 18 23 46 20 60" stroke="var(--dark-roast)" strokeWidth="2.5"
            strokeLinecap="round" fill="none" opacity="0.5" />
    </svg>
  );
}

function HeroBeansBg() {
  const beans = [
    { x: "5%", y: "10%", size: 48, rotate: 25 },
    { x: "15%", y: "70%", size: 38, rotate: -40 },
    { x: "25%", y: "20%", size: 30, rotate: 60 },
    { x: "75%", y: "15%", size: 44, rotate: -20 },
    { x: "85%", y: "65%", size: 36, rotate: 45 },
    { x: "60%", y: "80%", size: 28, rotate: -55 },
    { x: "40%", y: "5%",  size: 32, rotate: 15 },
    { x: "90%", y: "35%", size: 40, rotate: -30 },
    { x: "8%",  y: "45%", size: 26, rotate: 70 },
    { x: "50%", y: "90%", size: 34, rotate: -15 },
    { x: "70%", y: "45%", size: 30, rotate: 35 },
    { x: "35%", y: "55%", size: 42, rotate: -65 },
  ];
  return (
    <div className="hero-beans-bg" aria-hidden="true">
      {beans.map((b, i) => (
        <svg key={i} width={b.size} height={b.size * 1.6}
             viewBox="0 0 40 64" fill="none"
             style={{ position: "absolute", left: b.x, top: b.y,
                      transform: `rotate(${b.rotate}deg)`, color: "var(--cream)" }}>
          <ellipse cx="20" cy="32" rx="15" ry="29" fill="currentColor" />
          <path d="M20 4C17 18 23 46 20 60" stroke="var(--dark-roast)" strokeWidth="2.5"
                strokeLinecap="round" fill="none" opacity="0.4" />
        </svg>
      ))}
    </div>
  );
}

/* ======== HERO ======== */
function Hero() {
  const palette = [
    { color: "#F5EDE4", name: "Foam" },
    { color: "#D4B896", name: "Cream" },
    { color: "#B8956A", name: "Latte" },
    { color: "#5C3A20", name: "Mocha" },
    { color: "#3B2518", name: "Roast" },
  ];
  return (
    <section className="hero" id="hero">
      <HeroBeansBg />
      <div className="hero-content">
        <div className="hero-name">Wiame</div>
        <div className="hero-surname">El Baroudi</div>

        <div className="hero-photo">
          <image-slot id="profile-photo"
                      style={{ width: "180px", height: "180px", display: "block" }}
                      shape="circle"
                      placeholder="Sleep je foto hierheen">
          </image-slot>
        </div>

        <div className="hero-tagline">Mijn reis, mijn groei, mijn toekomst</div>
        <p className="hero-subtitle">
          Een eerlijk terugblikken, een helder zelfportret en een ambitieuze blik op wat komen gaat — na 35 dagen stage bij Déclik vzw.
        </p>

        <div className="hero-palette">
          {palette.map(s => (
            <div key={s.name} className="sw" style={{ background: s.color, width: 54, height: 32 }}
                 title={s.name}></div>
          ))}
        </div>
      </div>

      <div className="hero-scroll">
        <span>scroll</span>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
             stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 5v14M5 12l7 7 7-7"></path>
        </svg>
      </div>
    </section>
  );
}

/* ======== TOC ======== */
function TOC({ active }) {
  const scrollTo = useCallback((id) => {
    const el = document.getElementById(id);
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.pageYOffset - 16;
    window.scrollTo({ top: y, behavior: "smooth" });
  }, []);

  return (
    <nav className="toc" role="navigation" aria-label="Inhoudstafel">
      <div className="toc-head">Inhoud</div>
      {TOC_DATA.map(item => (
        <button key={item.id}
                className={`toc-item${active === item.id ? " active" : ""}`}
                onClick={() => scrollTo(item.id)}>
          <span className="toc-num">{item.num}</span>
          <span className="toc-label">{item.label}</span>
        </button>
      ))}
    </nav>
  );
}

/* ======== TWEAKS ======== */
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accentTheme": "coffee",
  "sectionSpacing": "regular"
}/*EDITMODE-END*/;

function TweakControls({ t, setTweak }) {
  return (
    <TweaksPanel>
      <TweakSection label="Stijl" />
      <TweakRadio label="Kleurthema"
                  value={t.accentTheme}
                  options={["coffee", "forest", "ocean"]}
                  onChange={v => setTweak("accentTheme", v)} />
      <TweakRadio label="Sectie-afstand"
                  value={t.sectionSpacing}
                  options={["compact", "regular", "ruim"]}
                  onChange={v => setTweak("sectionSpacing", v)} />
    </TweaksPanel>
  );
}

/* ======== THEME APPLICATION ======== */
function useTheme(accentTheme, sectionSpacing) {
  useEffect(() => {
    const r = document.documentElement.style;
    if (accentTheme === "forest") {
      r.setProperty("--latte", "#6B9A6B");
      r.setProperty("--gold", "#8DB88D");
      r.setProperty("--cream", "#A3C9A3");
      r.setProperty("--mocha", "#2E5E2E");
      r.setProperty("--caramel", "#4A7A4A");
      r.setProperty("--dark-roast", "#1A3A1A");
      r.setProperty("--espresso", "#0F2A0F");
      r.setProperty("--milk", "#D4E8D4");
      r.setProperty("--foam", "#E8F3E8");
      r.setProperty("--white", "#F5FAF5");
    } else if (accentTheme === "ocean") {
      r.setProperty("--latte", "#6B8DAA");
      r.setProperty("--gold", "#8DB0CC");
      r.setProperty("--cream", "#A3C1D6");
      r.setProperty("--mocha", "#2A4A64");
      r.setProperty("--caramel", "#4A6E88");
      r.setProperty("--dark-roast", "#162838");
      r.setProperty("--espresso", "#0C1A28");
      r.setProperty("--milk", "#D4E4EE");
      r.setProperty("--foam", "#E8F0F6");
      r.setProperty("--white", "#F5F9FC");
    } else {
      // Reset to coffee defaults
      r.setProperty("--latte", "#B8956A");
      r.setProperty("--gold", "#C8A97E");
      r.setProperty("--cream", "#D4B896");
      r.setProperty("--mocha", "#5C3A20");
      r.setProperty("--caramel", "#8B6B45");
      r.setProperty("--dark-roast", "#3B2518");
      r.setProperty("--espresso", "#2C1A10");
      r.setProperty("--milk", "#E8DAC8");
      r.setProperty("--foam", "#F5EDE4");
      r.setProperty("--white", "#FFFAF5");
    }
    // Spacing
    const pad = sectionSpacing === "compact" ? "52px" : sectionSpacing === "ruim" ? "110px" : "80px";
    r.setProperty("--section-pad-y", pad);
  }, [accentTheme, sectionSpacing]);
}

/* ======== APP ======== */
function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [active, setActive] = useState(TOC_DATA[0].id);

  useTheme(t.accentTheme, t.sectionSpacing);

  /* scroll spy */
  useEffect(() => {
    const ids = TOC_DATA.map(d => d.id);
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        }
      },
      { rootMargin: "-18% 0px -65% 0px", threshold: 0 }
    );
    ids.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Hero />
      <div className="main-layout">
        <div className="content-area">
          <AllSections />
        </div>
        <TOC active={active} />
      </div>
      <TweakControls t={t} setTweak={setTweak} />
    </>
  );
}

/* ======== MOUNT ======== */
ReactDOM.createRoot(document.getElementById("root")).render(<App />);

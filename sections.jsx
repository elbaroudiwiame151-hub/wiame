/* sections.jsx — All 12 portfolio sections + shared UI */
const { useState, useEffect, useRef } = React;

/* ======== SVG ICONS (simple, minimal) ======== */
function Ico({ d, size = 22 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
         stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d={d}></path>
    </svg>
  );
}

const ICONS = {
  palette:   "M12 2a10 10 0 0 0 0 20c.93 0 1.65-.75 1.65-1.69 0-.44-.18-.84-.44-1.13-.28-.29-.44-.65-.44-1.12A1.64 1.64 0 0 1 14.42 16.4h2c3.05 0 5.55-2.5 5.55-5.55C21.96 6 17.46 2 12 2z M7.5 10.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z M12 7.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z M16.5 10.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z",
  monitor:   "M2 4a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4z M8 22h8 M12 18v4",
  camera:    "M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2v11z M12 17a4 4 0 1 0 0-8 4 4 0 0 0 0 8z",
  users:     "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2 M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z M23 21v-2a4 4 0 0 0-3-3.87 M16 3.13a4 4 0 0 1 0 7.75",
  pen:       "M12 20h9 M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z",
  globe:     "M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z M2 12h20 M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10A15.3 15.3 0 0 1 12 2z",
  mail:      "M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z M22 6l-10 7L2 6",
  chat:      "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10z",
  star:      "M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.27 5.82 21 7 14.14l-5-4.87 6.91-1.01L12 2z",
  brain:     "M12 2a7 7 0 0 0-7 7c0 3 2 5.5 5 7v4h4v-4c3-1.5 5-4 5-7a7 7 0 0 0-7-7z M9 22h6",
  shuffle:   "M16 3h5v5 M4 20L21 3 M21 16v5h-5 M15 15l6 6 M4 4l5 5",
  user:      "M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2 M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z",
  calendar:  "M19 4H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z M16 2v4 M8 2v4 M3 10h18",
  lang:      "M5 8l6 10 M2 12h12 M9 2l1 6 M18 2l-4 20 M15 8h7 M21 14c-2 2-5 4-8 4",
  hand:      "M18 11V6a2 2 0 0 0-4 0v5 M14 10V4a2 2 0 0 0-4 0v6 M10 10.5V6a2 2 0 0 0-4 0v9 M18 11a2 2 0 0 1 4 0v2c0 5-4 9-8 9H12c-3 0-6-3-8-5",
  eye:       "M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z",
  briefcase: "M20 7H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16",
  linkedin:  "M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z M2 9h4v12H2z M4 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4z",
  search:    "M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16z M21 21l-4.35-4.35",
  book:      "M4 19.5A2.5 2.5 0 0 1 6.5 17H20 M4 4.5A2.5 2.5 0 0 1 6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15z",
  building:  "M3 21h18 M5 21V7l8-4v18 M19 21V11l-6-3 M9 9v.01 M9 12v.01 M9 15v.01 M9 18v.01",
  rocket:    "M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z M12 15l-3-3 M22 2l-7.5 7.5 M15 9.34V4h5.66 M16 2a10 10 0 0 1-7 17l-2 2H2v-5l2-2a10 10 0 0 1 17-7z",
  grad:      "M2 10l10-5 10 5-10 5-10-5z M6 12v5c3 2 9 2 12 0v-5",
  heart:     "M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 1 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78z",
  target:    "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z M12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12z M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4z",
};

/* ======== REUSABLE: Section wrapper ======== */
function Sec({ id, num, title, sub, bg = "foam", children }) {
  const cls = `section section--${bg}`;
  return (
    <section id={id} className={cls}>
      <div className="section-inner">
        <div className="section-head">
          <span className="section-num">{num}</span>
          <h2 className="section-title">{title}</h2>
          {sub && <p className="section-sub">{sub}</p>}
          <div className="section-rule"></div>
        </div>
        {children}
      </div>
    </section>
  );
}

/* ======== REUSABLE: Card ======== */
function Card({ ico, title, accent, children }) {
  return (
    <div className={`card${accent ? " card--accent" : ""}`}>
      {ico && <div className="card-ico"><Ico d={ICONS[ico]} /></div>}
      {title && <h3 className="card-ttl">{title}</h3>}
      <div className="card-txt">{children}</div>
    </div>
  );
}

/* ======== PDF Viewer (horizontal slider) ======== */
function PdfViewer({ url }) {
  const ref = useRef(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [current, setCurrent] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (typeof pdfjsLib === "undefined") { setError(true); setLoading(false); return; }
    let cancelled = false;
    (async () => {
      try {
        const pdf = await pdfjsLib.getDocument(url).promise;
        if (cancelled) return;
        setTotal(pdf.numPages);
        const el = ref.current;
        el.innerHTML = "";
        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const vp = page.getViewport({ scale: 2 });
          const c = document.createElement("canvas");
          c.width = vp.width; c.height = vp.height;
          el.appendChild(c);
          await page.render({ canvasContext: c.getContext("2d"), viewport: vp }).promise;
        }
        setLoading(false);
      } catch { if (!cancelled) { setError(true); setLoading(false); } }
    })();
    return () => { cancelled = true; };
  }, [url]);

  const go = (dir) => setCurrent(c => Math.max(0, Math.min(total - 1, c + dir)));

  if (error) return <div className="pdf-loading">Kon het PDF-portfolio niet laden.</div>;
  return (
    <div className="pdf-slider">
      {loading && <div className="pdf-loading">Portfolio laden…</div>}
      <div className="pdf-track" ref={ref}
           style={{ transform: `translateX(-${current * 100}%)` }}></div>
      {!loading && total > 1 && (
        <div className="pdf-nav">
          <button className="pdf-btn" onClick={() => go(-1)} disabled={current === 0} aria-label="Vorige">‹</button>
          <span className="pdf-counter">{current + 1} / {total}</span>
          <button className="pdf-btn" onClick={() => go(1)} disabled={current === total - 1} aria-label="Volgende">›</button>
        </div>
      )}
    </div>
  );
}

/* ============================================================
   SECTIONS
   ============================================================ */

function Section01() {
  return (
    <Sec id="opleiding" num="01" title="Wat heb ik geleerd in mijn opleiding?" bg="foam">
      <p className="prose">
        Tijdens mijn opleiding heb ik geleerd om vlot en professioneel te werken met verschillende grafische programma's, zoals <strong>Adobe Express</strong>, <strong>InDesign</strong> en <strong>Photoshop</strong>. Ik kan deze tools nu doelgericht inzetten om visuele content te maken die past bij de opdracht en de doelgroep.
      </p>
      <p className="prose">
        Bij mijn werkplekleren in de oefenfirma <strong>Accolage</strong> (non-profit) heb ik vooral geleerd hoe belangrijk het is om altijd in dezelfde huisstijl te blijven, tot in het kleinste detail. Ik leerde werken met vaste kleuren, lettertypes, lay-outregels en een consequente visuele lijn.
      </p>
      <p className="prose">
        Daarnaast heb ik veel geleerd binnen <strong>event- en projectwerking</strong>: van voorbereiding en planning tot uitvoering en evaluatie. Die ervaring heeft mij enorm geholpen tijdens mijn stages.
      </p>
      <h3 style={{fontFamily:"var(--font-heading)",fontSize:"1.15rem",fontWeight:600,marginTop:32,marginBottom:8}}>
        Mijn branding &amp; design portfolio
      </h3>
      <PdfViewer url={window.__resources?.portfolioPdf || "uploads/PDF-portfolio_en_eco_branding_Wiame_El_Baroudi.pdf"} />
    </Sec>
  );
}

function Section02() {
  return (
    <Sec id="verwezenlijkingen" num="02" title="Op welke verwezenlijkingen ben ik het meest trots?" bg="white">
      <div className="cards cards--3">
        <Card ico="palette" title="Affiches ontwerpen">
          Ik ontwierp professionele communicatieaffiches voor twee van de belangrijkste evenementen van Déclik vzw: de wekelijkse animaties op het Square Jacques Franck en de "Soirée des métiers". Volledig door mij gemaakt, van concept tot drukklaar ontwerp.
        </Card>
        <Card ico="monitor" title="Website bouwen">
          Ik bouwde van nul af een volledige website voor Déclik vzw. Van structuur en design tot teksten en visuals — alles is door mij opgezet. Dit was mijn grootste en meest complexe project.
          <a href="https://declikvzw.com/" target="_blank" rel="noopener noreferrer" style={{display:"inline-flex",alignItems:"center",gap:6,marginTop:10,color:"var(--latte)",fontWeight:600,fontSize:"0.9rem",textDecoration:"none",borderBottom:"1px solid var(--cream)",paddingBottom:2}}>Bekijk de website →</a>
        </Card>
        <Card ico="camera" title="Social media content">
          Ik creëerde regelmatig content voor de social media van Déclik en was ook aanwezig op het terrein om foto's en video's te maken bij de activiteiten.
        </Card>
      </div>
    </Sec>
  );
}

function Section03() {
  return (
    <Sec id="werkplekleren" num="03" title="Waar heb ik werkplekleren gedaan?" bg="dark"
         sub="Stage bij Déclik vzw — Chaussée de Forest 47, 1060 Sint-Gillis (Brussel)">
      <p className="prose">
        Déclik is een Brusselse vzw die jongeren in kwetsbare situaties ondersteunt via sport, creativiteit en sociale activiteiten. Hun missie: <em>"Tous différents, tous égaux"</em> — ieder kind verdient kansen, ongeacht achtergrond.
      </p>
      <h3 style={{fontFamily:"var(--font-heading)",fontSize:"1.1rem",fontWeight:600,marginTop:28,marginBottom:16,color:"var(--gold)"}}>Mijn takenpakket</h3>
      <div className="cards cards--3">
        <Card ico="users" title="Vergaderingen">Bijwonen van interne en externe vergaderingen, notuleren en verslaggeving aan het team.</Card>
        <Card ico="palette" title="Creatieve taken">Ontwerpen van affiches, flyers, video's. Schrijven van artikels, blogs en andere teksten.</Card>
        <Card ico="globe" title="Website">Bouwen van de volledige website van Déclik vzw, van structuur over teksten tot visuele identiteit.</Card>
        <Card ico="camera" title="Social Media">Content creëren voor Facebook, Instagram en TikTok. Interactie met volgers.</Card>
        <Card ico="mail" title="E-mailbeheer">Beantwoorden van e-mails van belanghebbenden, donateurs en vrijwilligers.</Card>
        <Card ico="chat" title="Interne Communicatie">Interne bijeenkomsten en ondersteuning bij presentaties voor het team.</Card>
      </div>
      <div className="callout" style={{marginTop:28}}>
        Mijn stage bij Déclik was een enorm verrijkende ervaring. Ik had direct impact op de communicatie van de organisatie en zag mijn werk effectief gebruikt worden door het team. Soms was het uitdagend door de beperkte middelen, maar dat leerde me creatief en resourceful zijn.
      </div>
    </Sec>
  );
}

function Section04() {
  return (
    <Sec id="sterke-punten" num="04" title="Wat zijn mijn sterke punten & extra talenten?" bg="foam"
         sub="Mijn opleiding en stage hebben mij geholpen om mijn ware sterktes te ontdekken.">
      <div className="cards cards--2">
        <Card ico="brain" title="Creatief denken">
          Ik heb een sterk oog voor design en esthetiek. Of het nu gaat om een affiche, een socialemediapost of een website — ik heb gevoel voor visuele harmonie en merkidentiteit.
        </Card>
        <Card ico="shuffle" title="Aanpassingsvermogen">
          In een non-profitomgeving waar middelen beperkt zijn, leerde ik snel schakelen en oplossingen vinden met wat er beschikbaar is.
        </Card>
        <Card ico="user" title="Zelfstandig werken">
          Ik nam regelmatig initiatief en werkte projecten zelfstandig uit, zonder dat er constant een supervisor nodig was.
        </Card>
        <Card ico="calendar" title="Organisatie">
          Balanceren tussen social media, e-mails, vergaderingen, creatieve projecten en afstudeerproject leerde me prioriteiten stellen en georganiseerd blijven.
        </Card>
      </div>
    </Sec>
  );
}

function Section05() {
  return (
    <Sec id="werkpunten" num="05" title="Wat zijn mijn werkpunten?" bg="white"
         sub="Eerlijk zijn over mijn werkpunten is een teken van zelfkennis en maturiteit.">
      <div className="cards cards--3">
        <Card ico="lang" title="Talen verbeteren">
          Werken in een tweetalige omgeving (Brussel) vraagt sterke taalvaardigheden. Mijn Frans en Engels kunnen beter. Ik plan dit actief te verbeteren via oefening en cursussen.
        </Card>
        <Card ico="hand" title="Meer vragen durven stellen">
          Soms deed ik iets op mijn eigen manier in plaats van te vragen hoe het best kon. Door sneller hulp te zoeken, vermijd ik fouten en leer ik sneller.
        </Card>
        <Card ico="eye" title="Zichtbaarheid">
          In grotere groepen of formele settings neig ik naar stilte. Ik wil actiever participeren en mijn ideeën vaker uitspreken, want ze zijn het waard.
        </Card>
      </div>
      <div className="callout" style={{marginTop:24}}>
        <strong>Hoe ga ik hiermee om?</strong> Voor talen: investeren in online taallessen en elke dag oefenen. Voor vragen stellen: mezelf eraan herinneren dat vragen stellen een teken van betrokkenheid is. In elke vergadering minstens één gerichte vraag stellen.
      </div>
    </Sec>
  );
}

function Section06() {
  return (
    <Sec id="kernkwadrant" num="06" title="Zelfanalyse: Kernkwadrant van Ofman" bg="foam"
         sub="Het kernkwadrant helpt je inzien hoe je kernkwaliteit, valkuil, uitdaging en allergie met elkaar verbonden zijn.">
      <div className="quadrant">
        <div className="q-cell q-cell--1">
          <div className="q-label">Kernkwaliteit</div>
          <div className="q-val">Creativiteit &amp; Initiatief</div>
          <div className="q-desc">Ik denk buiten de kaders, kom spontaan met ideeën en pak taken proactief aan.</div>
        </div>
        <div className="q-cell q-cell--2">
          <div className="q-label">Valkuil</div>
          <div className="q-val">Te snel te ver gaan</div>
          <div className="q-desc">Soms spring ik te snel in een taak zonder eerst te overleggen.</div>
        </div>
        <div className="q-cell q-cell--3">
          <div className="q-label">Uitdaging</div>
          <div className="q-val">Structuur &amp; Overleg</div>
          <div className="q-desc">Meer plannen, overleggen en stap voor stap werken om mijn creativiteit gerichter in te zetten.</div>
        </div>
        <div className="q-cell q-cell--4">
          <div className="q-label">Allergie</div>
          <div className="q-val">Passiviteit &amp; Stilstand</div>
          <div className="q-desc">Te veel structuur zonder actie voelt voor mij als stilstaan. Ik heb vooruitgang nodig.</div>
        </div>
      </div>
      <div className="callout">
        <strong>Wat leer ik hieruit?</strong> Mijn creativiteit is mijn sterkste troef, maar vraagt ook bewuste sturing. Door meer te overleggen en structuur te omarmen als vriend in plaats van vijand, groei ik van een creatieve starter naar een betrouwbare professional.
      </div>
    </Sec>
  );
}

function Section07() {
  return (
    <Sec id="korte-termijn" num="07" title="Wat wil ik op korte termijn?" bg="dark"
         sub="Na mijn graduaat wil ik eerst de arbeidsmarkt opgaan — werkervaring opdoen is mijn grootste prioriteit.">
      <div className="timeline">
        <div className="tl-item">
          <div className="tl-dot"></div>
          <div className="tl-period">Nu → 3 maanden</div>
          <div className="tl-title">Afstuderen en competenties afronden</div>
          <div className="tl-desc">Mijn graduaat afronden en mijn portfolio verder uitwerken.</div>
        </div>
        <div className="tl-item">
          <div className="tl-dot"></div>
          <div className="tl-period">3 → 6 maanden</div>
          <div className="tl-title">Bachelor Marketing starten</div>
          <div className="tl-desc">Mijn kennis verdiepen in marketing en communicatie en mezelf verder ontwikkelen.</div>
        </div>
        <div className="tl-item">
          <div className="tl-dot"></div>
          <div className="tl-period">6 → 12 maanden</div>
          <div className="tl-title">Kennis verdiepen en groeien</div>
          <div className="tl-desc">Nieuwe vaardigheden ontwikkelen en praktijkervaring opdoen tijdens mijn bachelor.</div>
        </div>
        <div className="tl-item">
          <div className="tl-dot"></div>
          <div className="tl-period">Na mijn bachelor</div>
          <div className="tl-title">Solliciteren binnen de marketingsector</div>
          <div className="tl-desc">Actief solliciteren naar een functie die bij mij past en mijn carrière starten.</div>
        </div>
      </div>
    </Sec>
  );
}

function Section08() {
  return (
    <Sec id="job-zoeken" num="08" title="Welke stappen ga ik ondernemen om een job te zoeken?" bg="white"
         sub="Een succesvolle jobzoektocht vraagt een plan. Hier zijn mijn concrete stappen.">
      <div className="steps">
        <div className="step">
          <div className="step-num">1</div>
          <div className="step-ttl">Portfolio samenstellen</div>
          <div className="step-txt">Mijn stageopdrachten (affiches, website, social media content) bundelen in een visueel portfolio op PDF en online.</div>
        </div>
        <div className="step">
          <div className="step-num">2</div>
          <div className="step-ttl">LinkedIn profiel optimaliseren</div>
          <div className="step-txt">Een professionele foto plaatsen, mijn opleiding en stage correct invullen, vaardigheden vermelden en beginnen netwerken.</div>
        </div>
        <div className="step">
          <div className="step-num">3</div>
          <div className="step-ttl">Netwerk inschakelen</div>
          <div className="step-txt">Contact opnemen met mijn stagebegeleider en collega's bij Déclik. Zij kennen mijn werk en kunnen mij doorverwijzen.</div>
        </div>
        <div className="step">
          <div className="step-num">4</div>
          <div className="step-ttl">Jobplatforms raadplegen</div>
          <div className="step-txt">Regelmatig kijken op VDAB, Stepstone, Indeed, LinkedIn Jobs en websites van organisaties die mij interesseren.</div>
        </div>
      </div>
    </Sec>
  );
}

function Section09() {
  return (
    <Sec id="ideale-functie" num="09" title="Mijn ideale functie — wat houdt dat in?" bg="dark">
      <div className="two-col">
        <div>
          <div className="col-head">Wat ik wil doen</div>
          <ul className="col-list">
            <li>Content creëren</li>
            <li>Social media beheren</li>
            <li>Visueel ontwerpen</li>
            <li>Campagnes bedenken</li>
            <li>Nieuwsbrieven schrijven</li>
            <li>Community management</li>
            <li>Fotografie &amp; video</li>
          </ul>
        </div>
        <div>
          <div className="col-head">Werkomgeving</div>
          <ul className="col-list">
            <li>Klein of middelgroot team</li>
            <li>Creatieve vrijheid</li>
            <li>Maatschappelijke impact</li>
            <li>Brussel</li>
          </ul>
        </div>
      </div>
      <div className="callout" style={{marginTop:28}}>
        <strong>Mijn ideale jobomschrijving:</strong> Marketingassistent of social media coördinator bij een organisatie die gelooft in haar missie. Een functie waar ik zowel strategisch kan meedenken als hands-on kan uitvoeren. Ik wil werken in een team dat me uitdaagt, maar ook ruimte geeft voor mijn eigen stempel.
      </div>
    </Sec>
  );
}

function Section10() {
  return (
    <Sec id="type-bedrijf" num="10" title="Waar wil ik terechtkomen? In welk type bedrijf?" bg="foam"
         sub="Mijn stage heeft me geleerd dat ik in een omgeving wil werken waar het werk ertoe doet.">
      <div className="cards cards--3">
        <Card ico="building" title="Middelgrote of grote bedrijven">
          Ik wil graag werken in een bedrijf waar ik kan samenwerken met verschillende teams en veel kan bijleren. Zo kan ik mijn marketingkennis uitbreiden en doorgroeien.
        </Card>
        <Card ico="palette" title="Marketing- & Communicatiebureaus">
          Deze omgeving spreekt mij aan omdat ik er aan diverse projecten en campagnes kan werken voor verschillende klanten. Hierdoor kan ik mijn creativiteit ontwikkelen.
        </Card>
        <Card ico="rocket" title="Innovatieve bedrijven">
          Ik wil werken in een bedrijf dat inzet op digitale marketing, sociale media en nieuwe technologieën. Zo kan ik meegroeien met de nieuwste trends.
        </Card>
      </div>
    </Sec>
  );
}

function Section11() {
  return (
    <Sec id="verder-studeren" num="11" title="Wat wil ik verder studeren?" bg="white"
         sub="Na mijn graduaat wil ik in de eerste plaats werkervaring opdoen. Maar verdere studie is zeker geen gesloten deur.">
      <div className="cards cards--auto">
        <Card ico="grad" title="Bedrijfsmanagement — Bachelor" accent>
          Ik overweeg om naast mijn job de bacheloropleiding Bedrijfsmanagement te volgen, met focus op marketing of communicatie. Die combinatie van praktijkervaring en hogere opleiding lijkt me ideaal om op termijn door te groeien naar meer verantwoordelijkheid — als projectleider, marketingcoördinator of zelfs manager.
        </Card>
      </div>
    </Sec>
  );
}

function Section12() {
  return (
    <Sec id="reflectie" num="12" title="Waar heb ik spijt van? Had ik het anders willen aanpakken?" bg="dark"
         sub="Eerlijkheid over fouten en gemiste kansen is de basis voor echte groei.">
      <div className="cards cards--auto">
        <Card ico="book" title="Het verloren jaar Bedrijfsmanagement">
          Mijn grootste spijt is dat ik ben begonnen met de bacheloropleiding Bedrijfsmanagement, om daarna toch over te stappen naar het graduaat. Ik verloor daardoor een volledig jaar. Als ik kon herbeginnen, had ik van bij het begin gekozen voor het graduaat Marketing Support — een opleiding die veel meer aansluit bij wie ik ben.
        </Card>
      </div>
      <div className="callout" style={{marginTop:28}}>
        Deze ervaringen hebben me geleerd dat zelfkennis en vroeg handelen de sleutel zijn tot groei. Ik neem deze lessen mee als motivatie voor alles wat nog komt.
      </div>
    </Sec>
  );
}

/* ======== Export all sections ======== */
function AllSections() {
  return (
    <>
      <Section01 />
      <Section02 />
      <Section03 />
      <Section04 />
      <Section05 />
      <Section06 />
      <Section07 />
      <Section08 />
      <Section09 />
      <Section10 />
      <Section11 />
      <Section12 />
    </>
  );
}

Object.assign(window, { AllSections, Sec, Card, Ico, ICONS, PdfViewer });

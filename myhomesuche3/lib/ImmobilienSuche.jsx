import { useState } from "react";

const PALETTE = {
  cream: "#F5F0E8",
  parchment: "#EDE6D6",
  sand: "#D4C5A9",
  oak: "#B8A88A",
  warmBrown: "#8B7355",
  darkBrown: "#5C4A32",
  espresso: "#3D2B1F",
  white: "#FDFBF7",
  accent: "#A0845C",
};

const FONT = {
  serif: "'Playfair Display', Georgia, serif",
  sans: "'Nunito Sans', 'Helvetica Neue', sans-serif",
};

const REGIONS = [
  "Salzburg Stadt",
  "Salzburg Umgebung",
  "Flachgau",
  "Tennengau",
  "Pongau",
  "Pinzgau",
  "Wien",
  "Wien Umgebung",
  "Linz",
  "Graz",
];

// Hierarchische Stadtbezirke Salzburg Stadt
const SALZBURG_STADTTEILE = {
  "Aigen": ["Aigen Mitte", "Abfalter", "Glas"],
  "Altstadt": ["Altstadt (linkes Salzachufer)", "Altstadt (rechtes Salzachufer)", "Innerer Stein", "Äußerer Stein"],
  "Elisabeth-Vorstadt": ["Froschheim"],
  "Gneis": ["Gneis Moos", "Kirchensiedlung Gneis", "Thumegg"],
  "Gneis Süd": ["Birkensiedlung", "Eichethofsiedlung"],
  "Gnigl": ["Gnigl Nord", "Neuhauserfeld", "Niedergnigl", "Obergnigl", "Heuberg"],
  "Itzling": ["Austraßensiedlung", "Goethesiedlung", "Itzling Mitte", "Itzling Ost", "Kirchenviertel Itzling", "Plainbergfuß"],
  "Itzling Nord": ["Hagenau", "Schlachthofsiedlung"],
  "Langwied": ["Bergsam", "Langwied-Esch", "Sam"],
  "Lehen": ["Scherzhauserfeldsiedlung"],
  "Leopoldskroner Moos": ["Hammerauersiedlung", "Leopoldskronweihersiedlung", "Mittermoos", "Obermoos", "Untermoos"],
  "Liefering": ["Altliefering", "Forellenwegsiedlung", "Liefering-Nord", "Liefering-Süd", "Messezentrum", "Rott", "Salzachseen", "Südtiroler-Siedlung"],
  "Maxglan": ["Aiglhofsiedlung", "Altmaxglan", "Neumaxglan", "Burgfried", "Kirchenviertel Maxglan", "Maxglan-Riedenburg"],
  "Maxglan West": ["Pointing", "Kendlersiedlung", "Loig"],
  "Morzg": ["Hellbrunn", "Hellbrunner Allee", "Kleingmain", "Nonnberghof Wiesen"],
  "Mülln": ["Inneres Mülln", "Äußeres Mülln"],
  "Neustadt / Andräviertel": ["Andräviertel"],
  "Nonntal": ["Inneres Nonntal", "Äußeres Nonntal", "Freisaal"],
  "Parsch": ["Inneres Parsch", "Parsch-Gersberg", "Parsch Süd", "Rennbahnsiedlung", "Weichselbaumsiedlung", "Wolfsgartenfeld"],
  "Riedenburg": ["Innere Riedenburg", "Äußere Riedenburg", "Lanserhofsiedlung", "Leopoldskroner Weiher", "Riedenburg-St. Paul"],
  "Salzburg Süd": ["Alpensiedlung", "Herrnau", "Josefiau"],
  "Schallmoos": ["Schallmoos Ost", "Schallmoos West"],
  "Taxham": [],
};

const ASSET_ARTEN = ["Wohnen", "Gewerbe", "Gastronomie"];

const OBJEKTTYPEN_MAP = {
  Wohnen: [
    "Eigentumswohnung",
    "Haus / Villa",
    "Doppelhaushälfte",
    "Reihenhaus",
    "Grundstück",
    "Penthouse",
    "Dachgeschosswohnung",
  ],
  Gewerbe: [
    "Büro / Office",
    "Gewerbefläche",
    "Lager / Logistik",
    "Produktionshalle",
    "Geschäftslokal",
    "Praxis",
    "Gewerbegrundstück",
  ],
  Gastronomie: [
    "Restaurant / Gasthaus",
    "Café / Bar",
    "Hotel / Pension",
    "Betrieb mit Konzession",
    "Gastronomiefläche (leer)",
    "Catering-Küche",
  ],
};

const PLATFORMS = [
  "willhaben.at",
  "immoscout24.at",
  "immo.sn.at",
  "da-immobilien.at",
  "immosuche.at",
  "RE/MAX",
  "Engel & Völkers",
  "EHL Immobilien",
  "Örag",
  "Raiffeisen Immobilien",
  "Blaupause Immobilien",
  "Wohnnet.at",
];

// Plattform → Suchdomains für gezielte Web-Search
const PLATFORM_DOMAINS = {
  "willhaben.at": "willhaben.at",
  "immoscout24.at": "immoscout24.at",
  "immo.sn.at": "immo.sn.at",
  "da-immobilien.at": "da-immobilien.at",
  "immosuche.at": "immosuche.at",
  "RE/MAX": "remax.at",
  "Engel & Völkers": "engelvoelkers.com",
  "EHL Immobilien": "ehl.at",
  "Örag": "oerag.at",
  "Raiffeisen Immobilien": "raiffeisen-immobilien.at",
  "Blaupause Immobilien": "blaupause-immobilien.at",
  "Wohnnet.at": "wohnnet.at",
};

const styles = {
  app: {
    minHeight: "100vh",
    background: PALETTE.cream,
    fontFamily: FONT.sans,
    color: PALETTE.espresso,
  },
  header: {
    background: PALETTE.espresso,
    padding: "32px 48px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerTitle: {
    fontFamily: FONT.serif,
    fontSize: "22px",
    color: PALETTE.parchment,
    fontWeight: 400,
    letterSpacing: "0.04em",
    margin: 0,
  },
  headerSub: {
    fontSize: "11px",
    color: PALETTE.oak,
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    marginTop: "4px",
  },
  badge: {
    background: PALETTE.accent,
    color: PALETTE.white,
    fontSize: "10px",
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    padding: "4px 10px",
    borderRadius: "2px",
    fontWeight: 600,
  },
  main: {
    maxWidth: "860px",
    margin: "0 auto",
    padding: "48px 24px",
  },
  card: {
    background: PALETTE.white,
    border: `1px solid ${PALETTE.sand}`,
    borderRadius: "4px",
    padding: "36px 40px",
    marginBottom: "24px",
    boxShadow: "0 2px 12px rgba(61,43,31,0.06)",
  },
  sectionTitle: {
    fontFamily: FONT.serif,
    fontSize: "15px",
    color: PALETTE.darkBrown,
    fontWeight: 600,
    letterSpacing: "0.04em",
    marginBottom: "20px",
    paddingBottom: "10px",
    borderBottom: `1px solid ${PALETTE.sand}`,
  },
  sectionSubtitle: {
    fontSize: "10px",
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    color: PALETTE.oak,
    fontWeight: 700,
    marginBottom: "10px",
    marginTop: "20px",
  },
  grid2: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "16px",
  },
  label: {
    display: "block",
    fontSize: "10px",
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    color: PALETTE.warmBrown,
    fontWeight: 700,
    marginBottom: "6px",
  },
  input: {
    width: "100%",
    padding: "10px 14px",
    background: PALETTE.cream,
    border: `1px solid ${PALETTE.sand}`,
    borderRadius: "3px",
    fontSize: "13px",
    color: PALETTE.espresso,
    fontFamily: FONT.sans,
    outline: "none",
    boxSizing: "border-box",
    transition: "border-color 0.2s",
  },
  select: {
    width: "100%",
    padding: "10px 14px",
    background: PALETTE.cream,
    border: `1px solid ${PALETTE.sand}`,
    borderRadius: "3px",
    fontSize: "13px",
    color: PALETTE.espresso,
    fontFamily: FONT.sans,
    outline: "none",
    boxSizing: "border-box",
    appearance: "none",
    cursor: "pointer",
  },
  checkGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "8px",
    marginTop: "4px",
  },
  checkGrid3: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
    gap: "8px",
    marginTop: "4px",
  },
  checkItem: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    fontSize: "12px",
    color: PALETTE.darkBrown,
    cursor: "pointer",
    padding: "6px 10px",
    borderRadius: "3px",
    border: `1px solid transparent`,
    transition: "all 0.15s",
  },
  checkItemActive: {
    background: PALETTE.parchment,
    border: `1px solid ${PALETTE.sand}`,
  },
  checkbox: {
    width: "14px",
    height: "14px",
    accentColor: PALETTE.accent,
    cursor: "pointer",
    flexShrink: 0,
  },
  // Toggle buttons for Asset Art & Vertragsart
  toggleRow: {
    display: "flex",
    gap: "8px",
    marginBottom: "0",
  },
  toggleBtn: {
    padding: "9px 22px",
    border: `1px solid ${PALETTE.sand}`,
    borderRadius: "3px",
    fontSize: "12px",
    fontFamily: FONT.sans,
    fontWeight: 600,
    letterSpacing: "0.06em",
    cursor: "pointer",
    background: PALETTE.cream,
    color: PALETTE.warmBrown,
    transition: "all 0.15s",
  },
  toggleBtnActive: {
    background: PALETTE.espresso,
    color: PALETTE.parchment,
    border: `1px solid ${PALETTE.espresso}`,
  },
  textarea: {
    width: "100%",
    padding: "10px 14px",
    background: PALETTE.cream,
    border: `1px solid ${PALETTE.sand}`,
    borderRadius: "3px",
    fontSize: "13px",
    color: PALETTE.espresso,
    fontFamily: FONT.sans,
    outline: "none",
    resize: "vertical",
    minHeight: "80px",
    boxSizing: "border-box",
  },
  btnPrimary: {
    background: PALETTE.espresso,
    color: PALETTE.parchment,
    border: "none",
    padding: "14px 40px",
    borderRadius: "3px",
    fontSize: "11px",
    letterSpacing: "0.14em",
    textTransform: "uppercase",
    fontWeight: 700,
    cursor: "pointer",
    fontFamily: FONT.sans,
    transition: "background 0.2s",
  },
  btnSecondary: {
    background: "transparent",
    color: PALETTE.warmBrown,
    border: `1px solid ${PALETTE.sand}`,
    padding: "12px 28px",
    borderRadius: "3px",
    fontSize: "11px",
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    fontWeight: 600,
    cursor: "pointer",
    fontFamily: FONT.sans,
    transition: "all 0.2s",
    marginRight: "12px",
  },
  dividerLight: {
    height: "1px",
    background: PALETTE.parchment,
    margin: "20px 0",
  },
  resultCard: {
    background: PALETTE.white,
    border: `1px solid ${PALETTE.sand}`,
    borderRadius: "4px",
    marginBottom: "20px",
    overflow: "hidden",
    boxShadow: "0 2px 8px rgba(61,43,31,0.05)",
  },
  resultHeader: {
    background: PALETTE.espresso,
    padding: "14px 24px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  resultNum: {
    fontFamily: FONT.serif,
    fontSize: "13px",
    color: PALETTE.oak,
    fontWeight: 400,
  },
  resultPrice: {
    fontFamily: FONT.serif,
    fontSize: "18px",
    color: PALETTE.parchment,
    fontWeight: 600,
  },
  resultBody: {
    padding: "24px",
    display: "grid",
    gridTemplateColumns: "180px 1fr",
    gap: "24px",
  },
  resultImg: {
    width: "180px",
    height: "130px",
    objectFit: "cover",
    borderRadius: "3px",
    background: PALETTE.parchment,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "11px",
    color: PALETTE.oak,
    letterSpacing: "0.08em",
    flexDirection: "column",
    gap: "6px",
  },
  resultTitle: {
    fontFamily: FONT.serif,
    fontSize: "16px",
    color: PALETTE.darkBrown,
    fontWeight: 600,
    marginBottom: "6px",
  },
  resultMeta: {
    display: "flex",
    gap: "8px",
    marginBottom: "14px",
    flexWrap: "wrap",
  },
  metaChip: {
    fontSize: "11px",
    color: PALETTE.warmBrown,
    background: PALETTE.cream,
    padding: "3px 10px",
    borderRadius: "2px",
    border: `1px solid ${PALETTE.sand}`,
    letterSpacing: "0.06em",
  },
  proConGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "12px",
    marginBottom: "14px",
  },
  proBox: {
    background: "#F5F8F0",
    border: "1px solid #D4E0C4",
    borderRadius: "3px",
    padding: "10px 12px",
  },
  conBox: {
    background: "#FAF5F0",
    border: "1px solid #E0D0C4",
    borderRadius: "3px",
    padding: "10px 12px",
  },
  proConTitle: {
    fontSize: "9px",
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    fontWeight: 700,
    marginBottom: "6px",
  },
  proConItem: {
    fontSize: "11px",
    lineHeight: "1.6",
    display: "flex",
    alignItems: "flex-start",
    gap: "5px",
    marginBottom: "3px",
  },
  resultFooter: {
    borderTop: `1px solid ${PALETTE.parchment}`,
    padding: "12px 24px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    background: PALETTE.cream,
  },
  anbieter: {
    fontSize: "11px",
    color: PALETTE.warmBrown,
    letterSpacing: "0.06em",
  },
  linkBtn: {
    fontSize: "10px",
    color: PALETTE.accent,
    textDecoration: "none",
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    fontWeight: 700,
    border: `1px solid ${PALETTE.oak}`,
    padding: "5px 14px",
    borderRadius: "2px",
  },
  loadingBox: {
    textAlign: "center",
    padding: "60px 24px",
    color: PALETTE.warmBrown,
  },
  loadingTitle: {
    fontFamily: FONT.serif,
    fontSize: "18px",
    color: PALETTE.darkBrown,
    marginBottom: "12px",
  },
  progressBar: {
    width: "200px",
    height: "2px",
    background: PALETTE.sand,
    borderRadius: "1px",
    margin: "20px auto 0",
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    background: PALETTE.accent,
    borderRadius: "1px",
    animation: "progress 2.5s ease-in-out infinite",
  },
  summaryBox: {
    background: PALETTE.espresso,
    borderRadius: "4px",
    padding: "20px 28px",
    marginBottom: "24px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  summaryText: {
    color: PALETTE.parchment,
    fontFamily: FONT.serif,
    fontSize: "15px",
  },
  summaryMeta: {
    color: PALETTE.oak,
    fontSize: "11px",
    marginTop: "4px",
    letterSpacing: "0.06em",
  },
};

const EXAMPLE_RESULTS = [
  {
    id: 1,
    title: "Exklusive Penthouse-Wohnung, Salzburg Altstadt",
    preis: "€ 1.290.000",
    groesse: "148 m²",
    zimmer: "4",
    etage: "5. OG / DG",
    zustand: "Erstbezug",
    anbieter: "Engel & Völkers Salzburg",
    plattform: "Immoscout24.at",
    link: "https://www.immoscout24.at",
    pros: ["Panoramablick Festung & Altstadt", "Hochwertige Ausstattung", "Tiefgaragenplatz inkl."],
    cons: ["Über Budget (+29%)", "Kein Privatbereich EG", "Hohe BK ca. €520/Mo"],
    imgUrl: null,
    baujahr: "2022",
  },
  {
    id: 2,
    title: "Moderne 3-Zimmer-Wohnung, Salzburg Schallmoos",
    preis: "€ 579.000",
    groesse: "87 m²",
    zimmer: "3",
    etage: "2. OG",
    zustand: "Sehr gut",
    anbieter: "Raiffeisen Immobilien Salzburg",
    plattform: "willhaben.at",
    link: "https://www.willhaben.at",
    pros: ["Im Budgetrahmen", "Gute Infrastruktur / S-Bahn", "Südloggia 12 m²"],
    cons: ["Kein Lift vorhanden", "Baujahr 1998 — Fenster alt", "Straßenseitig, Lärm möglich"],
    imgUrl: null,
    baujahr: "1998",
  },
];

function ImagePlaceholder({ index }) {
  const colors = [PALETTE.parchment, "#E8DFD0", "#DDD4C0", "#E3D8C8"];
  return (
    <div style={{ ...styles.resultImg, background: colors[index % colors.length] }}>
      <span style={{ fontSize: "20px" }}>🏠</span>
      <span style={{ fontSize: "10px", color: PALETTE.warmBrown, letterSpacing: "0.08em" }}>Foto</span>
    </div>
  );
}

function ResultCard({ obj, index, selected, onToggle }) {
  const cardId = obj.id || obj.title;
  return (
    <div style={{
      ...styles.resultCard,
      border: selected
        ? `2px solid ${PALETTE.accent}`
        : `1px solid ${PALETTE.sand}`,
      transition: "border 0.15s",
    }}>
      <div style={{ ...styles.resultHeader, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          {/* Checkbox */}
          <label style={{ display: "flex", alignItems: "center", gap: "7px", cursor: "pointer", userSelect: "none" }}
            title={selected ? "Aus Export entfernen" : "Für Export auswählen"}>
            <div onClick={onToggle} style={{
              width: "18px", height: "18px", borderRadius: "3px", flexShrink: 0,
              background: selected ? PALETTE.accent : "transparent",
              border: `2px solid ${selected ? PALETTE.accent : PALETTE.oak}`,
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer", transition: "all 0.15s",
            }}>
              {selected && <span style={{ color: "#fff", fontSize: "11px", fontWeight: 700, lineHeight: 1 }}>✓</span>}
            </div>
            <span style={styles.resultNum}>Objekt {index + 1} · {obj.plattform}</span>
          </label>
        </div>
        <span style={styles.resultPrice}>{obj.preis}</span>
      </div>
      <div style={styles.resultBody}>
        <ImagePlaceholder index={index} />
        <div>
          <div style={styles.resultTitle}>{obj.title}</div>
          {obj.kurzbeschreibung && (
            <div style={{ fontSize: "12px", color: PALETTE.warmBrown, lineHeight: "1.6", marginBottom: "10px", fontStyle: "italic", borderLeft: `2px solid ${PALETTE.sand}`, paddingLeft: "10px" }}>
              {obj.kurzbeschreibung}
            </div>
          )}
          <div style={styles.resultMeta}>
            <span style={styles.metaChip}>📐 {obj.groesse}</span>
            {obj.zimmer && <span style={styles.metaChip}>🚪 {obj.zimmer} Zi.</span>}
            <span style={styles.metaChip}>🏢 {obj.etage}</span>
            <span style={styles.metaChip}>📅 BJ {obj.baujahr}</span>
            <span style={styles.metaChip}>✨ {obj.zustand}</span>
          </div>
          <div style={styles.proConGrid}>
            <div style={styles.proBox}>
              <div style={{ ...styles.proConTitle, color: "#5C7A3E" }}>✓ Vorteile</div>
              {obj.pros.map((p, i) => (
                <div key={i} style={styles.proConItem}>
                  <span style={{ color: "#5C7A3E", flexShrink: 0 }}>+</span>
                  <span style={{ color: PALETTE.darkBrown, fontSize: "11px" }}>{p}</span>
                </div>
              ))}
            </div>
            <div style={styles.conBox}>
              <div style={{ ...styles.proConTitle, color: "#8B5E3C" }}>✗ Nachteile</div>
              {obj.cons.map((c, i) => (
                <div key={i} style={styles.proConItem}>
                  <span style={{ color: "#8B5E3C", flexShrink: 0 }}>−</span>
                  <span style={{ color: PALETTE.darkBrown, fontSize: "11px" }}>{c}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div style={styles.resultFooter}>
        <div style={styles.anbieter}><strong>Anbieter:</strong> {obj.anbieter}</div>
        <a href={obj.link} target="_blank" rel="noopener noreferrer" style={styles.linkBtn}>
          Zum Objekt →
        </a>
      </div>
    </div>
  );
}

function LoadingState({ phase }) {
  const phases = [
    "Suche live auf willhaben.at …",
    "Suche auf immoscout24.at …",
    "Durchsuche Makler-Websites in der Region …",
    "Filtere nach deinen Kriterien …",
    "Analysiere Inserate & erstelle Pro/Contra …",
    "Bereite Ergebnisse auf …",
  ];
  return (
    <div style={styles.loadingBox}>
      <div style={styles.loadingTitle}>Suche läuft</div>
      <div style={{ fontSize: "13px", color: PALETTE.warmBrown }}>{phases[phase % phases.length]}</div>
      <div style={styles.progressBar}>
        <div style={styles.progressFill} />
      </div>
      <style>{`@keyframes progress { 0%{width:0%} 60%{width:80%} 100%{width:100%} }`}</style>
    </div>
  );
}

function ToggleButton({ label, active, onClick }) {
  return (
    <button
      style={{ ...styles.toggleBtn, ...(active ? styles.toggleBtnActive : {}) }}
      onClick={onClick}
    >
      {label}
    </button>
  );
}

export default function ImmobilienSuche() {
  const [form, setForm] = useState({
    kunde: "",
    regionen: [],
    salzburgHauptbezirke: [],
    salzburgUnterbezirke: [],
    assetArt: "Wohnen",
    vertragsart: "Kauf",
    objekttypen: [],
    groesseVon: "",
    groesseBis: "",
    preisVon: "",
    preisBis: "",
    zimmerMin: "",
    baujahr: "",
    besonderheiten: "",
    plattformen: ["willhaben.at", "immoscout24.at", "immo.sn.at", "da-immobilien.at", "RE/MAX", "Engel & Völkers", "Raiffeisen Immobilien"],
    erweiterteSuche: false,
    kundenEigenschaften: "",
  });

  const [phase, setPhase] = useState("input");
  const [loadPhase, setLoadPhase] = useState(0);
  const [results, setResults] = useState([]);
  const [searchSummary, setSearchSummary] = useState(null);
  const [selectedForExport, setSelectedForExport] = useState([]);
  const [pdfLoading, setPdfLoading] = useState(false);

  const toggleExport = (id) => {
    setSelectedForExport(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };
  const allSelected = results.length > 0 && results.every(r => selectedForExport.includes(r.id || r.title));
  const toggleAll = () => {
    if (allSelected) setSelectedForExport([]);
    else setSelectedForExport(results.map(r => r.id || r.title));
  };
  const exportCount = selectedForExport.length;

  const toggleItem = (field, val) => {
    setForm(f => ({
      ...f,
      [field]: f[field].includes(val)
        ? f[field].filter(x => x !== val)
        : [...f[field], val],
    }));
  };

  // When asset type changes, reset objekttypen
  const setAssetArt = (art) => {
    setForm(f => ({ ...f, assetArt: art, objekttypen: [] }));
  };

  const showSalzburgBezirke = form.regionen.includes("Salzburg Stadt");
  const currentObjekttypen = OBJEKTTYPEN_MAP[form.assetArt] || [];
  const preisBisLabel = form.vertragsart === "Miete" ? "Miete bis (€/Mo)" : "Kaufpreis bis (€)";
  const preisVonLabel = form.vertragsart === "Miete" ? "Miete von (€/Mo)" : "Kaufpreis von (€)";

  // Zimmer-Filter: nur bei Wohnungen (ETW, DG, Penthouse)
  // Bei Haus/Villa, Reihenhaus, Doppelhaushälfte → m² ist primär
  const WOHNUNG_TYPEN = ["Eigentumswohnung", "Dachgeschosswohnung", "Penthouse"];
  const HAUS_TYPEN = ["Haus / Villa", "Doppelhaushälfte", "Reihenhaus", "Grundstück"];
  const hatNurHausTyp = form.objekttypen.length > 0 && form.objekttypen.every(o => HAUS_TYPEN.includes(o));
  const showZimmer = form.assetArt === "Wohnen" && !hatNurHausTyp;

  const handleSearch = async () => {
    if (form.regionen.length === 0 && form.salzburgHauptbezirke.length === 0) {
      alert("Bitte mindestens eine Region oder einen Salzburger Bezirk auswählen.");
      return;
    }
    if (form.objekttypen.length === 0) {
      alert("Bitte mindestens einen Objekttyp auswählen.");
      return;
    }

    setPhase("loading");
    setLoadPhase(0);

    const interval = setInterval(() => {
      setLoadPhase(p => p + 1);
    }, 1800);

    const alleRegionen = [
      ...form.regionen,
      ...form.salzburgHauptbezirke,
      ...form.salzburgUnterbezirke,
    ].join(", ");

    // Suchbegriffe für Web-Search aufbauen
    const objektStr = form.objekttypen.join(" ");
    const preisFilter = form.preisBis ? ` bis ${Number(form.preisBis).toLocaleString("de-AT")} €` : "";
    const groesseFilter = form.groesseBis ? ` ${form.groesseVon||""}–${form.groesseBis} m²` : form.groesseVon ? ` ab ${form.groesseVon} m²` : "";
    const zimmerFilter = form.zimmerMin ? ` ${form.zimmerMin} Zimmer` : "";
    const vertragsStr = form.vertragsart === "Miete" ? "mieten" : "kaufen";

    const systemPrompt = `Du bist ein präziser österreichischer Immobilien-Recherche-Assistent.
Deine Aufgabe: Suche mit dem web_search Tool auf österreichischen Immobilienplattformen nach ECHTEN, aktuellen Inseraten.

Suchstrategie:
1. Suche auf willhaben.at, immoscout24.at und den angegebenen Plattformen
2. Verwende österreichische Suchbegriffe und Ortsbezeichnungen
3. Extrahiere NUR real existierende Inserate — KEINE erfundenen Objekte
4. Falls ein Inserat keinen genauen Preis/m² hat, schreibe "auf Anfrage"

Nach der Suche: Antworte AUSSCHLIESSLICH mit einem JSON-Array, kein Markdown, keine Erklärung.
Format für jedes Objekt:
{"id":1,"title":"Exakter Titel aus dem Inserat","kurzbeschreibung":"2 prägnante Sätze die das Objekt sofort beschreiben — Lage, Highlight, Besonderheit. Kein Marketingsprech.","preis":"€ XXX.000","groesse":"XXX m²","zimmer":"X","etage":"X. OG / EG / DG","zustand":"Neubau / Erstbezug / Gut / Renovierungsbedürftig","anbieter":"Makler oder Privatanbieter Name","plattform":"willhaben.at / immoscout24.at / etc","link":"https://echter-link-zum-inserat.at/...","baujahr":"XXXX oder unbekannt","pros":["konkreter Vorteil 1","konkreter Vorteil 2","konkreter Vorteil 3"],"cons":["konkreter Nachteil 1","konkreter Nachteil 2","konkreter Nachteil 3"]}

Kurzbeschreibung: 2 sachliche Sätze aus dem Inseratstext — Lage/Umgebung im ersten Satz, Ausstattungs-Highlight im zweiten.
Pros/Cons: Leite sie aus dem echten Inseratstext ab — Lage, Ausstattung, Preis/m², Baujahr, Zustand.
Gib exakt 4 Objekte zurück. Wenn du weniger als 4 echte findest, fülle mit den ähnlichsten auf.`;

    // Domains der gewählten Plattformen für gezielte Suche
    const selectedDomains = form.plattformen
      .map(p => PLATFORM_DOMAINS[p])
      .filter(Boolean);

    const region1 = alleRegionen.split(",")[0].trim();

    const userPrompt = `Suche jetzt nach folgenden Immobilien in Österreich:

Suchparameter:
- Asset-Art: ${form.assetArt}
- Vertragsart: ${form.vertragsart} (${vertragsStr})
- Region / Bezirke: ${alleRegionen}
- Objekttyp: ${objektStr}${groesseFilter}${zimmerFilter}${preisFilter}
${form.baujahr ? `- Baujahr ab: ${form.baujahr}` : ""}
${form.besonderheiten ? `- Besonderheiten: ${form.besonderheiten}` : ""}
${form.kundenEigenschaften ? `- Kundenspezifische Anforderungen: ${form.kundenEigenschaften}` : ""}

Ausgewählte Plattformen zum Durchsuchen: ${form.plattformen.join(", ")}

Führe MEHRERE gezielte Websuchen durch — eine pro Hauptplattform. Verwende diese Suchanfragen:
${selectedDomains.slice(0, 4).map(domain => `- "${objektStr} ${vertragsStr} ${region1} site:${domain}"`).join("\n")}
- "${objektStr} ${vertragsStr} ${region1} Salzburg Immobilien"

Wichtig bei immo.sn.at: Das ist das Salzburger Nachrichten Immobilienportal — sehr relevant für Salzburg-Objekte.
Wichtig bei da-immobilien.at: Das ist Diana Aigner Immobilien Salzburg — kleines lokales Büro mit exklusiven Salzburg-Listings.

${form.erweiterteSuche ? `
ERWEITERTE INTERNETSUCHE AKTIV — zusätzliche Aufgabe:
Führe nach den Plattform-Suchen noch 2-3 freie Websuchen durch für Inserate die NICHT auf den großen Plattformen gelistet sind:
- Privatverkäufe direkt vom Eigentümer
- Kleine lokale Makler-Websites in der Region
- Lokale Zeitungen und Gemeinde-Websites
- Beispiel-Suchen: "${objektStr} ${vertragsStr} ${region1} privat", "${objektStr} ${region1} direkt Eigentümer", "Immobilien ${region1} ${new Date().getFullYear()}"
Markiere solche Funde im plattform-Feld z.B. "Privatinserat Web" oder "Makler direkt".
` : ""}

Extrahiere die besten 4 passenden Objekte aus allen Suchergebnissen.`;

    try {
      const response = await fetch("/api/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ systemPrompt, userPrompt }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Suche fehlgeschlagen");
      const parsed = data.results;

      clearInterval(interval);
      setResults(parsed);
      setSelectedForExport(parsed.map(r => r.id || r.title));
      setSearchSummary({
        regionen: alleRegionen,
        assetArt: form.assetArt,
        vertragsart: form.vertragsart,
        objekttypen: form.objekttypen.join(", "),
        count: parsed.length,
        plattformen: form.plattformen.length,
        isLive: true,
      });
      setPhase("results");
    } catch (err) {
      clearInterval(interval);
      setResults(EXAMPLE_RESULTS);
      setSelectedForExport(EXAMPLE_RESULTS.map(r => r.id || r.title));
      setSearchSummary({
        regionen: alleRegionen,
        assetArt: form.assetArt,
        vertragsart: form.vertragsart,
        count: EXAMPLE_RESULTS.length,
        plattformen: form.plattformen.length,
      });
      setPhase("results");
    }
  };

  const handlePdfExport = async () => {
    if (exportCount === 0) return;
    setPdfLoading(true);

    const alleRegionen = [
      ...form.regionen,
      ...form.salzburgHauptbezirke,
      ...form.salzburgUnterbezirke,
    ].join(" · ");

    const groesse = (form.groesseVon || form.groesseBis)
      ? (form.groesseVon || "") + "–" + (form.groesseBis || "") + " m²"
      : "k.A.";
    const zimmer = form.zimmerMin ? form.zimmerMin + "+" : "k.A.";

    const exportObjekte = results
      .filter(r => selectedForExport.includes(r.id || r.title))
      .map((obj, i) => ({ ...obj, rank: i + 1, pro_score: (obj.pros || []).length }));

    const payload = {
      suchprofil: form.objekttypen.join(", ") || form.assetArt,
      kunde: form.kunde || "Kunde",
      regionen: alleRegionen,
      groesse: groesse,
      zimmer: zimmer,
      kundenEigenschaften: form.kundenEigenschaften || "",
      objekte: exportObjekte,
    };

    try {
      const response = await fetch("/api/generate-pdf", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "Suchprofil_" + (form.kunde || "Export").replace(/\s+/g, "_") + ".html";
      a.click();
      URL.revokeObjectURL(url);

    } catch (err) {
      console.error("PDF Export Fehler:", err);
      alert("Export fehlgeschlagen. Bitte erneut versuchen.");
    } finally {
      setPdfLoading(false);
    }
  };

    const handleReset = () => {
    setPhase("input");
    setResults([]);
    setSearchSummary(null);
    setSelectedForExport([]);
  };

  return (
    <div style={styles.app}>
      <style>{`
        * { box-sizing: border-box; }
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600&family=Nunito+Sans:wght@400;600;700&display=swap');
        @media print {
          button { display: none !important; }
          .not-selected-for-export { display: none !important; }
          .quicklink-bar { display: none !important; }
        }
      `}</style>

      <div style={styles.header}>
        <div>
          <div style={styles.headerTitle}>Immobilien Suchassistent</div>
          <div style={styles.headerSub}>My Home is My Home · Salzburg</div>
        </div>
        <span style={styles.badge}>KI-gestützt</span>
      </div>

      <div style={styles.main}>

        {phase === "input" && (
          <>
            {/* Kundenname + Art der Transaktion */}
            <div style={styles.card}>
              <div style={styles.sectionTitle}>Suchauftrag</div>
              <div style={styles.grid2}>
                <div>
                  <label style={styles.label}>Kunde / Suchauftrag für</label>
                  <input
                    style={{ ...styles.input, fontSize: "13px", padding: "11px 14px" }}
                    type="text"
                    placeholder="z.B. Familie Mayer, Max Mustermann …"
                    value={form.kunde}
                    onChange={e => setForm(f => ({ ...f, kunde: e.target.value }))}
                  />
                </div>
                <div>
                  <label style={styles.label}>Wichtige Eigenschaften — Kundenspezifisch</label>
                  <input
                    style={{ ...styles.input, fontSize: "13px", padding: "11px 14px" }}
                    type="text"
                    placeholder="z.B. rollstuhlgerecht, Hund erlaubt, Zweitwohnsitz möglich …"
                    value={form.kundenEigenschaften}
                    onChange={e => setForm(f => ({ ...f, kundenEigenschaften: e.target.value }))}
                  />
                </div>
              </div>
              <div style={{ height: "1px", background: PALETTE.sand, marginBottom: "20px", marginTop: "20px" }} />
              <div style={styles.grid2}>
                <div>
                  <div style={styles.label}>Asset-Art</div>
                  <div style={styles.toggleRow}>
                    {ASSET_ARTEN.map(a => (
                      <ToggleButton
                        key={a}
                        label={a}
                        active={form.assetArt === a}
                        onClick={() => setAssetArt(a)}
                      />
                    ))}
                  </div>
                </div>
                <div>
                  <div style={styles.label}>Vertragsart</div>
                  <div style={styles.toggleRow}>
                    {["Kauf", "Miete"].map(v => (
                      <ToggleButton
                        key={v}
                        label={v}
                        active={form.vertragsart === v}
                        onClick={() => setForm(f => ({ ...f, vertragsart: v }))}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Regionen */}
            <div style={styles.card}>
              <div style={styles.sectionTitle}>Suchregion</div>
              <div style={styles.checkGrid}>
                {REGIONS.map(r => (
                  <label
                    key={r}
                    style={{ ...styles.checkItem, ...(form.regionen.includes(r) ? styles.checkItemActive : {}) }}
                  >
                    <input
                      type="checkbox"
                      style={styles.checkbox}
                      checked={form.regionen.includes(r)}
                      onChange={() => toggleItem("regionen", r)}
                    />
                    {r}
                  </label>
                ))}
              </div>

              {showSalzburgBezirke && (
                <>
                  <div style={styles.dividerLight} />
                  <div style={styles.sectionSubtitle}>Stadtteile Salzburg — Hauptbezirke wählen</div>
                  <div style={styles.checkGrid3}>
                    {Object.keys(SALZBURG_STADTTEILE).map(bezirk => (
                      <div key={bezirk}>
                        <label style={{
                          ...styles.checkItem,
                          ...(form.salzburgHauptbezirke.includes(bezirk) ? styles.checkItemActive : {}),
                          fontSize: "11px",
                          fontWeight: 600,
                        }}>
                          <input
                            type="checkbox"
                            style={styles.checkbox}
                            checked={form.salzburgHauptbezirke.includes(bezirk)}
                            onChange={() => toggleItem("salzburgHauptbezirke", bezirk)}
                          />
                          {bezirk}
                        </label>
                        {form.salzburgHauptbezirke.includes(bezirk) && SALZBURG_STADTTEILE[bezirk].length > 0 && (
                          <div style={{ paddingLeft: "18px", marginTop: "4px", display: "flex", flexDirection: "column", gap: "2px" }}>
                            {SALZBURG_STADTTEILE[bezirk].map(sub => (
                              <label key={sub} style={{
                                ...styles.checkItem,
                                ...(form.salzburgUnterbezirke.includes(sub) ? { background: PALETTE.parchment, border: `1px solid ${PALETTE.sand}` } : {}),
                                fontSize: "10px",
                                color: PALETTE.warmBrown,
                                padding: "3px 8px",
                              }}>
                                <input
                                  type="checkbox"
                                  style={{ ...styles.checkbox, width: "11px", height: "11px" }}
                                  checked={form.salzburgUnterbezirke.includes(sub)}
                                  onChange={() => toggleItem("salzburgUnterbezirke", sub)}
                                />
                                {sub}
                              </label>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Objekttyp */}
            <div style={styles.card}>
              <div style={styles.sectionTitle}>Objekttyp · {form.assetArt}</div>
              <div style={styles.checkGrid}>
                {currentObjekttypen.map(o => (
                  <label
                    key={o}
                    style={{ ...styles.checkItem, ...(form.objekttypen.includes(o) ? styles.checkItemActive : {}) }}
                  >
                    <input
                      type="checkbox"
                      style={styles.checkbox}
                      checked={form.objekttypen.includes(o)}
                      onChange={() => toggleItem("objekttypen", o)}
                    />
                    {o}
                  </label>
                ))}
              </div>
            </div>

            {/* Parameter */}
            <div style={styles.card}>
              <div style={styles.sectionTitle}>Suchparameter</div>

              {/* Zimmer — nur bei Wohnungen (ETW, DG, Penthouse) */}
              {showZimmer && (
                <div style={{ marginBottom: "16px" }}>
                  <label style={styles.label}>Zimmer Anzahl</label>
                  <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                    {["Egal", "1", "2", "3", "4", "5+"].map(n => (
                      <button
                        key={n}
                        style={{
                          ...styles.toggleBtn,
                          padding: "8px 18px",
                          ...(form.zimmerMin === (n === "Egal" ? "" : n) ? styles.toggleBtnActive : {}),
                        }}
                        onClick={() => setForm(f => ({ ...f, zimmerMin: n === "Egal" ? "" : n }))}
                      >
                        {n === "Egal" ? "Egal" : n + " Zi."}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* m² — bei Häusern immer prominent, bei Wohnungen als Zusatz */}
              <div style={{ ...styles.grid2, marginBottom: "16px" }}>
                <div>
                  <label style={styles.label}>{showZimmer ? "Größe von (m²) — optional" : "Wohnfläche von (m²)"}</label>
                  <input style={styles.input} type="number"
                    placeholder={showZimmer ? "z.B. 60" : "z.B. 120"}
                    value={form.groesseVon} onChange={e => setForm(f => ({ ...f, groesseVon: e.target.value }))} />
                </div>
                <div>
                  <label style={styles.label}>{showZimmer ? "Größe bis (m²) — optional" : "Wohnfläche bis (m²)"}</label>
                  <input style={styles.input} type="number"
                    placeholder={showZimmer ? "z.B. 120" : "z.B. 300"}
                    value={form.groesseBis} onChange={e => setForm(f => ({ ...f, groesseBis: e.target.value }))} />
                </div>
              </div>

              <div style={{ ...styles.grid2, marginBottom: "16px" }}>
                <div>
                  <label style={styles.label}>{preisVonLabel}</label>
                  <input style={styles.input} type="number"
                    placeholder={form.vertragsart === "Miete" ? "z.B. 1000" : "z.B. 400000"}
                    value={form.preisVon} onChange={e => setForm(f => ({ ...f, preisVon: e.target.value }))} />
                </div>
                <div>
                  <label style={styles.label}>{preisBisLabel}</label>
                  <input style={styles.input} type="number"
                    placeholder={form.vertragsart === "Miete" ? "z.B. 2500" : "z.B. 900000"}
                    value={form.preisBis} onChange={e => setForm(f => ({ ...f, preisBis: e.target.value }))} />
                </div>
              </div>

              <div style={{ ...styles.grid2, marginBottom: "16px" }}>
                <div>
                  <label style={styles.label}>Baujahr ab</label>
                  <input style={styles.input} type="number" placeholder="z.B. 2000"
                    value={form.baujahr} onChange={e => setForm(f => ({ ...f, baujahr: e.target.value }))} />
                </div>
              </div>

              <div>
                <label style={styles.label}>Besonderheiten / Sonderwünsche</label>
                <textarea style={styles.textarea}
                  placeholder="z.B. Terrasse, Garage, Klimaanlage, Garten, barrierefrei, Erstbezug, ruhige Lage …"
                  value={form.besonderheiten}
                  onChange={e => setForm(f => ({ ...f, besonderheiten: e.target.value }))} />
              </div>
            </div>

            {/* Plattformen */}
            <div style={styles.card}>
              <div style={styles.sectionTitle}>Zu durchsuchende Plattformen</div>
              <div style={styles.checkGrid}>
                {PLATFORMS.map(p => (
                  <label
                    key={p}
                    style={{ ...styles.checkItem, ...(form.plattformen.includes(p) ? styles.checkItemActive : {}) }}
                  >
                    <input type="checkbox" style={styles.checkbox}
                      checked={form.plattformen.includes(p)}
                      onChange={() => toggleItem("plattformen", p)} />
                    {p}
                  </label>
                ))}
              </div>

              <div style={{ marginTop: "16px", paddingTop: "16px", borderTop: `1px solid ${PALETTE.parchment}` }}>
                <label style={{
                  display: "flex", alignItems: "flex-start", gap: "12px",
                  cursor: "pointer", padding: "12px 14px",
                  borderRadius: "3px",
                  border: `1px solid ${form.erweiterteSuche ? PALETTE.accent : PALETTE.sand}`,
                  background: form.erweiterteSuche ? PALETTE.parchment : PALETTE.cream,
                  transition: "all 0.15s",
                }}>
                  <input
                    type="checkbox"
                    style={{ ...styles.checkbox, marginTop: "2px", flexShrink: 0 }}
                    checked={form.erweiterteSuche}
                    onChange={e => setForm(f => ({ ...f, erweiterteSuche: e.target.checked }))}
                  />
                  <div>
                    <div style={{ fontSize: "12px", fontWeight: 700, color: PALETTE.darkBrown, marginBottom: "3px" }}>
                      Erweiterte Internetsuche
                    </div>
                    <div style={{ fontSize: "11px", color: PALETTE.warmBrown, lineHeight: "1.5" }}>
                      Zusätzlich zur Plattformsuche durchsuche ich eigenständig das gesamte Web — Makler-Homepages, Gemeinde-Aushänge, lokale Zeitungen, nicht-aggregierte Inserate. Findet Objekte die auf keiner Plattform gelistet sind.
                    </div>
                  </div>
                </label>
              </div>
            </div>

            <div style={{ textAlign: "right" }}>
              <button style={styles.btnPrimary} onClick={handleSearch}>
                Suche starten →
              </button>
            </div>
          </>
        )}

        {phase === "loading" && <LoadingState phase={loadPhase} />}

        {phase === "results" && (
          <>
            {searchSummary && (
              <div style={styles.summaryBox}>
                <div>
                  <div style={styles.summaryText}>
                    {searchSummary.count} Objekte gefunden · {searchSummary.assetArt} / {searchSummary.vertragsart}
                    {searchSummary.isLive && (
                      <span style={{ marginLeft: "10px", background: "#5C7A3E", color: "#F5F8F0", fontSize: "9px", letterSpacing: "0.1em", textTransform: "uppercase", padding: "2px 8px", borderRadius: "2px", fontWeight: 700, verticalAlign: "middle" }}>● Live</span>
                    )}
                  </div>
                  <div style={styles.summaryMeta}>
                    {searchSummary.regionen} · {searchSummary.plattformen} Plattformen durchsucht
                    {searchSummary.isLive ? " · Echte Inserate" : " · Beispieldaten"}
                  </div>
                </div>
                <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                  <button
                    style={{ ...styles.btnSecondary, fontSize: "10px", padding: "9px 16px" }}
                    onClick={toggleAll}
                  >
                    {allSelected ? "Alle abwählen" : "Alle wählen"}
                  </button>
                  <button style={styles.btnSecondary} onClick={handleReset}>← Neue Suche</button>
                  <button
                    style={{ ...styles.btnPrimary, opacity: exportCount === 0 ? 0.4 : 1, cursor: exportCount === 0 ? "not-allowed" : "pointer" }}
                    onClick={handlePdfExport}
                  >
                    {pdfLoading ? "Wird erstellt …" : `PDF (${exportCount}) →`}
                  </button>
                </div>
              </div>
            )}
            {results.map((obj, i) => (
              <div
                key={obj.id || i}
                className={selectedForExport.includes(obj.id || obj.title) ? "" : "not-selected-for-export"}
              >
                <ResultCard
                  obj={obj}
                  index={i}
                  selected={selectedForExport.includes(obj.id || obj.title)}
                  onToggle={() => toggleExport(obj.id || obj.title)}
                />
              </div>
            ))}

            {/* Quicklink Übersicht */}
            {results.length > 0 && (
              <div className="quicklink-bar" style={{ background: PALETTE.white, border: `1px solid ${PALETTE.sand}`, borderRadius: "4px", padding: "24px 28px", marginTop: "8px", boxShadow: "0 2px 8px rgba(61,43,31,0.05)" }}>
                <div style={{ fontFamily: FONT.serif, fontSize: "13px", color: PALETTE.darkBrown, fontWeight: 600, letterSpacing: "0.04em", marginBottom: "16px", paddingBottom: "10px", borderBottom: `1px solid ${PALETTE.sand}` }}>
                  Quicklinks — Alle Objekte auf einen Blick
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  {results.map((obj, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "14px", padding: "12px 14px", background: selectedForExport.includes(obj.id || obj.title) ? PALETTE.cream : PALETTE.white, borderRadius: "3px", border: `1px solid ${selectedForExport.includes(obj.id || obj.title) ? PALETTE.sand : PALETTE.parchment}`, opacity: selectedForExport.includes(obj.id || obj.title) ? 1 : 0.45, transition: "all 0.15s" }}>
                      {/* Nummer */}
                      <div style={{ fontFamily: FONT.serif, fontSize: "18px", color: PALETTE.oak, fontWeight: 600, lineHeight: 1, minWidth: "22px", paddingTop: "2px" }}>
                        {i + 1}
                      </div>
                      {/* Info */}
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: "12px", fontWeight: 700, color: PALETTE.darkBrown, marginBottom: "3px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                          {obj.title}
                        </div>
                        {obj.kurzbeschreibung && (
                          <div style={{ fontSize: "11px", color: PALETTE.warmBrown, lineHeight: "1.5", marginBottom: "4px" }}>
                            {obj.kurzbeschreibung}
                          </div>
                        )}
                        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                          <span style={{ fontSize: "10px", color: PALETTE.accent, fontWeight: 700 }}>{obj.preis}</span>
                          <span style={{ fontSize: "10px", color: PALETTE.warmBrown }}>·</span>
                          <span style={{ fontSize: "10px", color: PALETTE.warmBrown }}>{obj.groesse}</span>
                          {obj.zimmer && <><span style={{ fontSize: "10px", color: PALETTE.warmBrown }}>·</span><span style={{ fontSize: "10px", color: PALETTE.warmBrown }}>{obj.zimmer} Zi.</span></>}
                          <span style={{ fontSize: "10px", color: PALETTE.warmBrown }}>·</span>
                          <span style={{ fontSize: "10px", color: PALETTE.warmBrown }}>{obj.anbieter}</span>
                        </div>
                      </div>
                      {/* Link Button */}
                      <a
                        href={obj.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ flexShrink: 0, background: PALETTE.espresso, color: PALETTE.parchment, fontSize: "9px", letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 700, padding: "7px 14px", borderRadius: "2px", textDecoration: "none", whiteSpace: "nowrap", alignSelf: "center" }}
                      >
                        Zum Inserat →
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div style={{ textAlign: "center", marginTop: "24px" }}>
              <button style={styles.btnSecondary} onClick={handleReset}>← Neue Suche</button>
              <button
                style={{ ...styles.btnPrimary, opacity: exportCount === 0 ? 0.4 : 1, cursor: exportCount === 0 ? "not-allowed" : "pointer" }}
                onClick={handlePdfExport}
              >
                {pdfLoading ? "PDF wird erstellt …" : exportCount === 0 ? "Kein Objekt gewählt" : `PDF exportieren (${exportCount} Objekte)`}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

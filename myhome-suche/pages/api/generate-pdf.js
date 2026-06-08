import Anthropic from "@anthropic-ai/sdk";

const MONTHS_DE = ["Januar","Februar","März","April","Mai","Juni","Juli","August","September","Oktober","November","Dezember"];

function datumDe() {
  const now = new Date();
  return `${now.getDate()}. ${MONTHS_DE[now.getMonth()]} ${now.getFullYear()}`;
}

function renderProsCons(pros, cons) {
  const proItems = pros.map(p => `<li>${p}</li>`).join('');
  const conItems = cons.map(c => `<li>${c}</li>`).join('');
  return `
    <div class="pc-grid">
      <div class="pc-box pc-pro">
        <div class="pc-label">Vorteile</div>
        <ul>${proItems}</ul>
      </div>
      <div class="pc-box pc-con">
        <div class="pc-label">Nachteile</div>
        <ul>${conItems}</ul>
      </div>
    </div>`;
}

function renderObjekt(obj, idx) {
  return `
    <div class="objekt-card">
      <div class="objekt-header">
        <span class="objekt-rank">${idx + 1}</span>
        <span class="objekt-preis">${obj.preis}</span>
      </div>
      <div class="objekt-body">
        <div class="objekt-title">${obj.title}</div>
        ${obj.kurzbeschreibung ? `<p class="objekt-desc">${obj.kurzbeschreibung}</p>` : ''}
        <div class="meta-row">
          <span class="meta-chip">${obj.groesse}</span>
          ${obj.zimmer ? `<span class="meta-chip">${obj.zimmer} Zimmer</span>` : ''}
          <span class="meta-chip">${obj.etage}</span>
          <span class="meta-chip">BJ ${obj.baujahr}</span>
          <span class="meta-chip">${obj.zustand}</span>
        </div>
        ${renderProsCons(obj.pros || [], obj.cons || [])}
        <div class="objekt-footer">
          <div class="anbieter-info">
            <span class="anbieter-label">Anbieter</span>
            <span class="anbieter-name">${obj.anbieter}</span>
            <span class="plattform-tag">${obj.plattform}</span>
          </div>
          <a href="${obj.link}" class="link-box">${obj.link}</a>
        </div>
      </div>
    </div>`;
}

function buildHtml(data) {
  const objekteHtml = (data.objekte || []).map((o, i) => renderObjekt(o, i)).join('');
  const anzahl = data.objekte?.length || 0;

  return `<!DOCTYPE html>
<html lang="de">
<head>
<meta charset="UTF-8">
<style>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600&family=Inter:wght@300;400;500;600&display=swap');
* { margin:0; padding:0; box-sizing:border-box; }
:root {
  --greige-light: #F2EDE6;
  --greige-mid:   #E0D8CE;
  --greige-dark:  #C8BCB0;
  --black:        #1A1814;
  --dark:         #2C2822;
  --mid:          #6B6560;
  --light:        #9A948E;
  --divider:      #E8E3DC;
  --white:        #FFFFFF;
  --pro-bg:       #F6F8F4;
  --pro-border:   #C8D8BE;
  --pro-text:     #3D5C30;
  --con-bg:       #FAF7F4;
  --con-border:   #D8C8B8;
  --con-text:     #6B4830;
}
@page { size: A4; margin: 0; }
@page content { size: A4; margin: 18mm 18mm 22mm 18mm; }
body { font-family: 'Inter', sans-serif; color: var(--black); background: white; -webkit-print-color-adjust: exact; print-color-adjust: exact; }

/* DECKBLATT */
.cover { width:210mm; height:297mm; background:var(--greige-light); display:flex; flex-direction:column; page-break-after:always; position:relative; overflow:hidden; }
.cover-content { position:relative; z-index:10; display:flex; flex-direction:column; height:100%; padding:18mm 18mm 16mm 18mm; }
.cover-top { display:flex; justify-content:space-between; align-items:flex-start; }
.cover-brand { font-family:'Inter',sans-serif; font-size:8pt; font-weight:500; letter-spacing:0.18em; text-transform:uppercase; color:var(--mid); }
.cover-datum { font-family:'Inter',sans-serif; font-size:8pt; color:var(--light); letter-spacing:0.06em; }
.cover-center { flex:1; display:flex; flex-direction:column; justify-content:center; padding-bottom:20mm; }
.cover-title { font-family:'Playfair Display',serif; font-size:36pt; font-weight:400; color:var(--black); line-height:1.15; letter-spacing:-0.01em; margin-bottom:2mm; }
.cover-count { font-family:'Playfair Display',serif; font-size:11pt; font-weight:400; color:var(--dark); letter-spacing:0.01em; margin-bottom:3mm; }
.cover-subtitle { font-family:'Playfair Display',serif; font-size:11pt; font-weight:400; color:var(--mid); font-style:italic; margin-bottom:8mm; line-height:1.4; }
.cover-divider { width:14mm; height:0.5pt; background:var(--greige-dark); margin-bottom:6mm; }
.cover-kunde { font-family:'Inter',sans-serif; font-size:9pt; font-weight:500; color:var(--mid); letter-spacing:0.08em; margin-bottom:7mm; }
.cover-meta-grid { display:grid; grid-template-columns:1fr 1fr; gap:4mm 12mm; }
.cover-meta-item { display:flex; flex-direction:column; gap:1mm; }
.cover-meta-label { font-size:7pt; font-weight:500; letter-spacing:0.12em; text-transform:uppercase; color:var(--light); }
.cover-meta-value { font-size:9.5pt; font-weight:400; color:var(--dark); }
.cover-bottom { display:flex; justify-content:center; align-items:flex-end; }
.cover-footer-note { font-size:6pt; color:var(--black); letter-spacing:0.02em; text-align:center; line-height:1.7; }
.cover-footer-firm { font-family:'Playfair Display',serif; font-size:7.5pt; font-weight:400; color:var(--black); letter-spacing:0.01em; margin-bottom:1mm; text-align:center; }

/* INHALTSSEITEN */
.content-pages { page: content; }
.page-header { display:flex; justify-content:space-between; align-items:center; padding-bottom:4mm; border-bottom:0.4pt solid var(--divider); margin-bottom:7mm; }
.page-header-brand { font-size:7pt; font-weight:500; letter-spacing:0.14em; text-transform:uppercase; color:var(--light); }
.page-header-title { font-size:7pt; color:var(--light); letter-spacing:0.04em; }

/* OBJEKTKARTE */
.objekt-card { border:0.4pt solid var(--divider); border-radius:2pt; margin-bottom:7mm; overflow:hidden; page-break-inside:avoid; }
.objekt-header { background:var(--black); display:flex; justify-content:space-between; align-items:center; padding:3.5mm 5mm; }
.objekt-rank { font-family:'Playfair Display',serif; font-size:16pt; font-weight:400; color:var(--greige-mid); line-height:1; }
.objekt-preis { font-family:'Playfair Display',serif; font-size:15pt; font-weight:500; color:var(--greige-light); }
.objekt-body { padding:5mm 5mm 4mm; background:var(--white); }
.objekt-title { font-family:'Playfair Display',serif; font-size:12pt; font-weight:500; color:var(--black); margin-bottom:2.5mm; line-height:1.3; }
.objekt-desc { font-size:8.5pt; color:var(--mid); line-height:1.65; margin-bottom:4mm; padding-left:3mm; border-left:1pt solid var(--greige-dark); }
.meta-row { display:flex; flex-wrap:wrap; gap:1.5mm; margin-bottom:4mm; }
.meta-chip { font-size:7.5pt; font-weight:500; color:var(--dark); background:var(--greige-light); padding:1mm 3mm; border-radius:1pt; }
.pc-grid { display:grid; grid-template-columns:1fr 1fr; gap:3mm; margin-bottom:4mm; }
.pc-box { border-radius:2pt; padding:3mm 3.5mm; }
.pc-pro { background:var(--pro-bg); border:0.4pt solid var(--pro-border); }
.pc-con { background:var(--con-bg); border:0.4pt solid var(--con-border); }
.pc-label { font-size:6.5pt; font-weight:600; letter-spacing:0.14em; text-transform:uppercase; margin-bottom:2mm; }
.pc-pro .pc-label { color:var(--pro-text); }
.pc-con .pc-label { color:var(--con-text); }
.pc-box ul { list-style:none; display:flex; flex-direction:column; gap:1.5mm; }
.pc-pro li::before { content:"+ "; color:var(--pro-text); font-weight:600; }
.pc-con li::before { content:"− "; color:var(--con-text); font-weight:600; }
.pc-box li { font-size:7.5pt; color:var(--dark); line-height:1.4; }
.objekt-footer { display:flex; justify-content:space-between; align-items:flex-end; padding-top:3mm; border-top:0.4pt solid var(--divider); }
.anbieter-info { display:flex; flex-direction:column; gap:0.8mm; }
.anbieter-label { font-size:6pt; font-weight:600; letter-spacing:0.12em; text-transform:uppercase; color:var(--light); }
.anbieter-name { font-size:8pt; font-weight:500; color:var(--dark); }
.plattform-tag { font-size:6.5pt; color:var(--light); }
.link-box { font-size:7pt; color:#4A6FA5; letter-spacing:0.02em; max-width:80mm; text-align:right; word-break:break-all; line-height:1.4; text-decoration:underline; }
</style>
</head>
<body>

<div class="cover">
  <div class="cover-content">
    <div class="cover-top">
      <div class="cover-brand">Suchprofil</div>
      <div class="cover-datum">${data.datum}</div>
    </div>
    <div class="cover-center">
      <div class="cover-title">Suchprofil</div>
      <div class="cover-count">${anzahl} ausgewählte Objekte</div>
      <div class="cover-subtitle">${data.suchprofil}<br>in ${data.regionen}</div>
      <div class="cover-divider"></div>
      <div class="cover-kunde">${data.kunde || ''}</div>
      <div class="cover-meta-grid">
        <div class="cover-meta-item">
          <span class="cover-meta-label">Region</span>
          <span class="cover-meta-value">${data.regionen}</span>
        </div>
        <div class="cover-meta-item">
          <span class="cover-meta-label">Größe</span>
          <span class="cover-meta-value">${data.groesse}</span>
        </div>
        <div class="cover-meta-item">
          <span class="cover-meta-label">Zimmer</span>
          <span class="cover-meta-value">${data.zimmer}</span>
        </div>
        ${data.kundenEigenschaften ? `
        <div class="cover-meta-item">
          <span class="cover-meta-label">Besondere Anforderungen</span>
          <span class="cover-meta-value">${data.kundenEigenschaften}</span>
        </div>` : ''}
      </div>
    </div>
    <div class="cover-bottom">
      <div class="cover-footer-note">
        <div class="cover-footer-firm">"My Home is my Home"</div>
        Immobilien Wolfgang Schiessendoppler &amp; Partner KG<br>
        Fürbergstraße 42A · 5020 Salzburg · FN 407346 p
      </div>
    </div>
  </div>
</div>

<div class="content-pages">
  <div class="page-header">
    <span class="page-header-brand">Suchprofil</span>
    <span class="page-header-title">${data.suchprofil} · ${data.kunde || ''} · ${data.datum}</span>
  </div>
  ${objekteHtml}
</div>

</body>
</html>`;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  try {
    const data = req.body;
    data.datum = datumDe();

    const html = buildHtml(data);

    // Use Anthropic API to convert HTML to PDF via Claude
    // We return the HTML for client-side printing as fallback
    // For full server-side PDF: use puppeteer on Vercel
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.setHeader('Content-Disposition', `attachment; filename="Suchprofil_${data.kunde || 'Export'}.html"`);
    res.send(html);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}

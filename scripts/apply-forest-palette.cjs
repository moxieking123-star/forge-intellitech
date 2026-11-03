// Approved 3 November 2026. Changes only the public preview stylesheet.
const fs = require('node:fs');
const file = 'components/forge/forge.css';
let css = fs.readFileSync(file, 'utf8');
if (css.includes('Forest & Ivory — approved')) throw new Error('Forest palette is already applied.');
const palette = {
  '#092245':'#142c25', '#01478a':'#203f35', '#ed7400':'#be542a',
  '#c65300':'#be542a', '#cf6000':'#a34320', '#a74500':'#a34320',
  '#0071c2':'#54735b', '#526277':'#536257', '#405572':'#536257',
  '#edf5fc':'#e7ddcb', '#f0f6fc':'#e7ddcb', '#f4f8fc':'#f8f5ed',
  '#e7f0fa':'#e7ddcb', '#e4ebf1':'#ded8ca', '#dce5ee':'#d8d8c9',
  '#cbd9e7':'#c7cdbd', '#d3e1ef':'#d2d8c7', '#83a4c7':'#809680',
  '#e8f2fe':'#e4ebdd', '#e8f2ff':'#e4ebdd', '#eef4f8':'#f3eee3',
  '#edf2f7':'#e7ddcb', '#e3edf5':'#e7ddcb', '#eef3f7':'#edf0e6',
  '#fff9f0':'#f1e9dc', '#fff4e4':'#eee3d1', '#fff6e9':'#f1e8d7'
};
css = css.replace(/#[0-9a-f]{6,8}\b/gi, value => {
  const key=value.slice(0,7).toLowerCase();
  return palette[key] ? palette[key]+value.slice(7) : value;
});
css += `
/* Forest & Ivory — approved by the founder, 3 November 2026. */
.forge-site{--fg-ink:#142c25;--fg-muted:#536257;--fg-blue:#203f35;--fg-orange:#be542a;--fg-line:#d8d8c9;--fg-pale:#e7ddcb;background:#f8f5ed}
.fg-header{background:rgba(248,245,237,.98)}
.fg-more>div,.fg-menu{background:#f8f5ed}
.fg-preview{background:#e7ddcb;color:#385044}
.fg-hero,.fg-page-hero{background:#f8f5ed}
.fg-stories{background:#f8f5ed}.fg-launch{background:#e7ddcb}
.fg-path,.fg-product,.fg-application{background:#f8f5ed}
.fg-button{background:#be542a;border-color:#be542a;color:#fff!important}
.fg-button:hover{background:#a34320;border-color:#a34320}
.fg-button-secondary{background:#f8f5ed;color:#203f35!important;border-color:#809680}
.fg-button-secondary:hover{background:#e7ddcb;border-color:#203f35}
.fg-button-dark{background:#203f35;border-color:#203f35}
.fg-button-dark:hover{background:#142c25;border-color:#142c25}
.fg-school{background:#203f35;color:#f8f5ed;--fg-ink:#f8f5ed;--fg-muted:#e1e8dd;--fg-blue:#f8f5ed;border-color:#38594a}
.fg-school .fg-eyebrow{color:#c6d3bd!important}
.fg-school .fg-lead{color:#e1e8dd!important}
.fg-school .fg-link{color:#f8f5ed!important}
.fg-school .fg-process span{color:#c6d3bd}
.fg-skill{background:#e7ddcb;color:#142c25;--fg-muted:#3e5145;border-color:#b6c3ad}
.fg-skill svg{color:#203f35}
.fg-form-panel,.fg-application{--fg-ink:#142c25;--fg-muted:#536257;--fg-blue:#203f35;color:#142c25;background:#f8f5ed;border-color:#d8d8c9}
.fg-school .fg-form-panel .fg-eyebrow,.fg-school .fg-form-panel .fg-link{color:#203f35!important}
.forge-site label{color:#203f35}
.forge-site :is(input:not([type=checkbox]),select,textarea){background:#fcfaf5;color:#142c25;border-color:#b3beac}
.fg-form-crosslink{border-color:#d8d8c9}.fg-form-crosslink a{color:#203f35}
.fg-movement{background:#142c25;color:#f8f5ed;--fg-ink:#f8f5ed;--fg-muted:#e1e8dd;border-color:#38594a}
.fg-movement .fg-eyebrow,.fg-movement .fg-lead,.fg-movement .fg-support-invite,.fg-movement .fg-fine{color:#e1e8dd!important}
.fg-movement .fg-support-invite a,.fg-movement .fg-mini-faq a,.fg-movement .fg-donor-steps svg{color:#f8f5ed}
.fg-movement .fg-donor-steps{border-color:#547360}
.fg-status{background:#e4ebdd;color:#203f35}.fg-status.concept{background:#eee0c8;color:#6f461c}
.fg-earn{background:#e7ddcb;border-color:#cfc5b4}
.fg-vision{background:#e7ddcb}.fg-vision p:not(.fg-eyebrow){color:#385044}
.fg-footer{background:#142c25;color:#f8f5ed;--fg-ink:#f8f5ed;--fg-muted:#d4dece;border-color:#38594a}
.fg-footer-top>div>a:not(.fg-wordmark),.fg-footer .fg-fine,.fg-footer .fg-data-toggle,.fg-footer-bottom{color:#d4dece!important}
.fg-footer-top>div>a:hover{color:#fff!important}.fg-footer-bottom{border-color:#47624f}
.fg-data-toggle[aria-checked=true] .fg-toggle-track{background:#b6c3ad}
.fg-footer .fg-wordmark span{color:#f0ad72}
.fg-legacy{background:#f8f5ed!important}
.forge-site .fg-legacy>div{background:#f8f5ed;color:#142c25}
.forge-site .fg-legacy :is(h2,h3){color:#142c25}
.forge-site .fg-legacy p{color:#536257}
@media(max-width:760px){.fg-data-light .fg-hero{background:#f8f5ed}}
`;
fs.writeFileSync(file, css);
console.log('Applied approved Forest & Ivory palette.');

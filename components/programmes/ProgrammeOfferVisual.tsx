import type { ProgrammeKey } from './programme-details';
/** Original code-native curriculum scenes; no stock or generated diagram assets. */
export default function ProgrammeOfferVisual({ programme }: { programme: ProgrammeKey }) {
  const primary = programme === 'elytech';
  return <svg viewBox="0 0 640 260" role="img" aria-label={primary ? 'ElyTech: typing keyboard, Chisanbop practice, Scratch blocks and Canva design' : 'TechUp: HTML and CSS editor, website preview and product planning'} style={{width:'100%',height:'auto',marginBottom:'1.5rem',borderRadius:12}}>
    <rect width="640" height="260" rx="12" fill="#e7e2d4"/>
    <circle cx="557" cy="42" r="74" fill="#e9b368" opacity=".45"/>
    <rect x="28" y="28" width="350" height="198" rx="10" fill="#173f31"/>
    <rect x="39" y="41" width="328" height="169" rx="5" fill="#faf7ee"/>
    {primary ? <>
      <text x="56" y="66" fill="#254b3c" fontSize="13" fontWeight="bold">HANDS. KEYS. IDEAS.</text>
      {[0,1,2].map(row=><g key={row}>{Array.from({length:10},(_,col)=><rect key={col} x={56+col*29} y={85+row*29} width="23" height="22" rx="4" fill={row===1?'#e58042':'#d5dfca'}/>)}</g>)}
      <rect x="120" y="176" width="162" height="18" rx="4" fill="#d5dfca"/>
      <rect x="399" y="34" width="210" height="85" rx="8" fill="#f5ba58"/>
      <text x="417" y="60" fill="#173f31" fontSize="13" fontWeight="bold">CHISANBOP</text>
      <text x="417" y="85" fill="#173f31" fontSize="12">Numbers at your fingertips</text>
      <path d="M402 143h98v24h-8v7h-82v-7h-8zM402 181h113v24h-8v7h-97v-7h-8z" fill="#e58042"/>
      <text x="416" y="160" fill="#173f31" fontSize="11">Scratch logic</text>
      <rect x="536" y="139" width="72" height="74" rx="5" fill="#b1c5a4"/><circle cx="556" cy="160" r="10" fill="#faf7ee"/><path d="M544 196l19-23 29 23" fill="#254b3c"/>
    </> : <>
      <rect x="51" y="54" width="142" height="143" rx="4" fill="#254b3c"/>
      <text x="62" y="83" fill="#f5ba58" fontSize="15" fontFamily="monospace">&lt;html&gt;</text>
      <text x="62" y="112" fill="#d5dfca" fontSize="12" fontFamily="monospace">&lt;h1&gt;Our idea</text>
      <text x="62" y="151" fill="#f5ba58" fontSize="12" fontFamily="monospace">display: grid;</text>
      <rect x="209" y="63" width="143" height="32" rx="3" fill="#e58042"/><path d="M209 109h113m-113 13h134" stroke="#b0bea5" strokeWidth="5"/>
      {[0,1,2].map(i=><rect key={i} x={209+i*50} y="144" width="42" height="42" rx="4" fill="#d5dfca"/>)}
      <text x="403" y="59" fill="#254b3c" fontSize="14" fontWeight="bold">THINK → MAKE → REVIEW</text>
      {['Builder','Storyteller','Strategist'].map((label,i)=><g key={label}><rect x="401" y={78+i*48} width="205" height="36" rx="5" fill={i===1?'#e58042':'#c6d3b9'}/><text x="417" y={102+i*48} fill="#173f31" fontSize="14">{label}</text></g>)}
    </>}
  </svg>;
}

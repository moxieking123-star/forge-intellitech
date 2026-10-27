import styles from './ForgeJourney.module.css';

/** Lightweight vector actors: no video download or third-party animation runtime. */
function Actor({who,x,happy=false,working=false}:{who:'Tom'|'Jerry'|'Doggy';x:number;happy?:boolean;working?:boolean}) {
  const mouse=who==='Jerry', dog=who==='Doggy';
  const coat=mouse?'#b77a43':dog?'#a9907d':'#667f98';
  return <g transform={`translate(${x} 109) scale(${mouse?.7:dog?1.05:1})`}>
    <g className={working?styles.cartoonWork:happy?styles.cheer:styles.cartoonIdle}>
      <path d={mouse?'M-8-10Q-37-6-33-29':dog?'M-12-12Q-28-15-24-25':'M-10-12Q-41-20-31-44'} stroke={coat} strokeWidth={mouse?3:8} strokeLinecap="round"/>
      <ellipse cy="-24" rx={dog?19:12} ry="22" fill={coat} stroke="#27352e" strokeWidth="1.5"/>
      <ellipse cy="-21" rx={dog?12:8} ry="15" fill="#eadbc7"/>
      <path d="M-7-8L-12 0H-3M7-8L12 0H3" fill={coat} stroke="#27352e" strokeWidth="3" strokeLinecap="round"/>
      <path d={working?'M-10-33L-19-23L-30-26M10-33L21-24L29-30':happy?'M-10-33L-23-46M10-33L23-46':'M-10-33L-18-21M10-33L18-21'} stroke={coat} strokeWidth="7" strokeLinecap="round" fill="none"/>
      <g className={styles.head}>
        {mouse?<><circle cx="-13" cy="-59" r="12" fill={coat} stroke="#27352e"/><circle cx="13" cy="-59" r="12" fill={coat} stroke="#27352e"/><circle cx="-13" cy="-59" r="8" fill="#e6a39b"/><circle cx="13" cy="-59" r="8" fill="#e6a39b"/></>:dog?<><path d="M-17-58Q-32-63-25-42L-14-45M17-58Q32-63 25-42L14-45" fill="#665348" stroke="#27352e"/></>:<><path d="M-16-49L-20-76L-3-60M16-49L20-76L3-60" fill={coat} stroke="#27352e" strokeWidth="1.5"/><path d="M-15-61L-17-69L-8-61M15-61L17-69L8-61" fill="#e5aaa4"/></>}
        <ellipse cy="-49" rx={dog?22:17} ry={dog?19:18} fill={coat} stroke="#27352e" strokeWidth="1.5"/>
        <ellipse cx="-6" cy="-52" rx="5" ry="8" fill="#fff6d9"/><ellipse cx="6" cy="-52" rx="5" ry="8" fill="#fff6d9"/>
        <g className={styles.eyes} fill="#18251f"><ellipse cx="-5" cy="-51" rx="2" ry="4"/><ellipse cx="7" cy="-51" rx="2" ry="4"/></g>
        <ellipse cy="-41" rx={dog?17:12} ry="8" fill="#efdfc9"/>
        <ellipse cy="-45" rx={dog?7:3} ry="3" fill="#25312c"/>
        <path d={happy?'M-7-39Q0-28 8-39':working?'M-6-37Q0-41 6-37':'M-5-38Q0-35 5-38'} stroke="#26352e" strokeWidth="1.5" fill={happy?'#743e35':'none'}/>
        {!happy&&<path d="M-11-62L-3-59M3-59L11-62" stroke="#26352e" strokeWidth="2"/>}
        {!mouse&&!dog&&<path d="M-11-43L-25-46M-12-39L-26-39M11-43L25-46M12-39L26-39" stroke="#26352e"/>}
      </g>
      {dog&&<><path d="M-17-35H17" stroke="#c84631" strokeWidth="6"/><path d="M-10-36l2-5 3 5M3-36l3-5 2 5" fill="#fff4dc"/></>}
    </g>
  </g>;
}

function Fence({complete=false}:{complete?:boolean}) {
  return <g className={styles.fence}>
    <path d="M113 83H274M113 100H274" stroke="#9a5b35" strokeWidth="6"/>
    {[119,145,171,197,223,249,275].map((x,i)=><g key={x} className={!complete&&i>2?styles.loosePlank:undefined} style={{animationDelay:`${i*.12}s`}}><path d={`M${x-6} 109V75L${x} 67L${x+6} 75V109Z`} fill={i%2?'#e5b369':'#cd8d4d'} stroke="#73492e" strokeWidth="1.5"/><path d={`M${x} 81V99`} stroke="#f2cb8f"/></g>)}
  </g>;
}

export default function CartoonScene({chapter,game=0}:{chapter:number;game?:number}) {
  const c=game>0?Math.min(7,game+3):chapter;
  return <svg viewBox="0 0 360 150" fill="none" aria-hidden="true" className={styles.scene}>
    <path d="M12 111H348" stroke="#7c8979" strokeDasharray="2 5"/>
    {c===0&&<g className={styles.cartoonChase}><Actor who="Tom" x={100}/><Actor who="Jerry" x={213}/><path d="M55 72H32M60 83H42M185 88H167" stroke="#d29345" strokeWidth="2"/></g>}
    {c===1&&<><g transform="translate(0 0) rotate(13 190 95)"><Fence/></g><Actor who="Tom" x={59}/><Actor who="Jerry" x={126}/><text x="144" y="37" fill="#b64a24" fontSize="21" fontWeight="800">?!</text></>}
    {c===2&&<><g className={styles.struggle}><Actor who="Tom" x={117} working/><path d="M137 76L244 45L248 57L141 88Z" fill="#cd8d4d" stroke="#73492e"/></g><Actor who="Jerry" x={284}/><path className={styles.sweat} d="M94 32l-4 6M87 28l-5 2" stroke="#2c91b2" strokeWidth="2"/></>}
    {c===3&&<><Actor who="Tom" x={95}/><Actor who="Jerry" x={179} happy/><g className={styles.idea}><circle cx="183" cy="32" r="9" fill="#f8c638" stroke="#966419"/><path d="M180 43h6M183 15V10M168 21l-5-3M198 21l5-3" stroke="#bd8425" strokeWidth="2"/></g><path d="M232 72h77v34h-77Z" fill="#f0e7d2" stroke="#6c8170"/><path d="M240 97V82l6-5 6 5v15m8 0V82l6-5 6 5v15m8 0V82l6-5 6 5v15M238 87h58" stroke="#ad7241" strokeWidth="2"/></>}
    {c===4&&<><Actor who="Tom" x={73} happy/><Actor who="Jerry" x={157} happy/><g className={styles.arrival}><Actor who="Doggy" x={270} happy/></g><path d="M185 105h37l-5-12h-27Z" fill="#dfa440" stroke="#865d29"/></>}
    {c===5&&<g className={styles.carry}><Actor who="Tom" x={84} working/><Actor who="Jerry" x={174} working happy/><Actor who="Doggy" x={282} working happy/><path d="M96 89H266" stroke="#80512f" strokeWidth="13" strokeLinecap="round"/><path d="M101 86H260" stroke="#e1b97a" strokeWidth="3"/></g>}
    {c>=6&&<><Fence complete={c===7}/><Actor who="Tom" x={62} happy={c===7} working={c===6}/><Actor who="Jerry" x={182} happy={c===7} working={c===6}/><Actor who="Doggy" x={321} happy={c===7} working={c===6}/>{c===6&&<g className={styles.hammer}><path d="M86 65L101 48" stroke="#80512f" strokeWidth="5"/><path d="M95 45l14 11" stroke="#5a717e" strokeWidth="8"/></g>}{c===7&&<><g className={styles.confetti} strokeWidth="3"><path d="M92 24l-4-5M216 26l4-7" stroke="#ef652a"/><path d="M141 15l3 6M281 24l6-4" stroke="#2f9f9a"/></g><rect x="211" y="45" width="73" height="18" rx="4" fill="#17372b"/><text x="247" y="58" textAnchor="middle" fill="#fff4db" fontSize="10" fontWeight="800">FORGED IT.</text></>}</>}
  </svg>;
}

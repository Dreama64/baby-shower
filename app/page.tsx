import Countdown from '@/components/countdown';
const asset='/invitation/';
function Art({file,x,y,w,h,flip=false}:{file:string;x:number;y:number;w:number;h?:number;flip?:boolean}) { return <img alt="" aria-hidden="true" className="art" src={asset+file} style={{left:`${x/4.746}%`,top:`${y/4.746}cqw`,width:`${w/4.746}%`,height:h?`${h/4.746}cqw`:undefined,transform:flip?'scaleX(-1)':undefined}}/>; }
function Text({y,children,className=''}:{y:number;children:React.ReactNode;className?:string}) {return <div className={'inv-text '+className} style={{top:`${y/4.746}cqw`}}>{children}</div>;}
export default function Home() { return <main className="invitation-shell"><div className="invitation" aria-label="Invitación a nuestro Baby Shower">
  <div className="white-arch"/>
  <Art file="frame.svg" x={144.7} y={93.7} w={185.3} h={287.3}/>
  <Art file="651c0f454a3392f41f01879a42d0c0ef.png" x={163.7} y={16.8} w={130.9}/>
  <Text y={180} className="title"><h1>NUESTRO<br/>BABY<br/>SHOWER</h1></Text>
  <Art file="3ad155e06e15bed641ff39c144b6bb8b.png" x={116} y={274.4} w={106.6}/>
  <Art file="3ad155e06e15bed641ff39c144b6bb8b.png" x={244.5} y={274.4} w={106.6}/>
  <Text y={407.2} className="quote">“HAY CORAZONES QUE LLEGAN PARA<br/>TRANSFORMARLO TODO...<br/>NUESTROS CORAZONES YA LATEN<br/>POR DOS BEBÉS QUE AÚN NO<br/>CONOCEMOS, PERO QUE YA AMAMOS<br/>CON TODA EL ALMA”</Text>
  <Art file="2efd6e8414bb5df7912539d7ebc54a11.png" x={26.8} y={507.4} w={148.8}/>
  <Art file="49e4abc963eca49ae95eae87ec70146f.png" x={366.3} y={486.8} w={23.7}/>
  <Text y={553.3} className="parents">MIS PADRES<br/><span>VALENTINA Y SERGIO</span><p>TIENEN EL AGRADO DE<br/>INVITARTE PARA UNA FECHA<br/>MUY ESPECIAL</p></Text>
  <Art file="2efd6e8414bb5df7912539d7ebc54a11.png" x={329.2} y={668} w={148.8}/>
  <Text y={714} className="date"><div><span>sabado</span><b>12</b><span>diciembre<small>2026</small></span></div><p>14:30 hrs</p></Text>
  <Art file="49e4abc963eca49ae95eae87ec70146f.png" x={107.9} y={768.7} w={23.7}/>
  <div className="count-position"><Countdown/></div>
  <Art file="2efd6e8414bb5df7912539d7ebc54a11.png" x={14.9} y={878.8} w={148.8}/>
  <Art file="49e4abc963eca49ae95eae87ec70146f.png" x={366.3} y={920.1} w={23.7}/>
  <Art file="pin.svg" x={222.2} y={923.7} w={30.3}/>
  <Art file="76ad68cc8518e861bebf779638043368.png" x={338} y={981.9} w={148}/>
  <Text y={984.4} className="section-title">UBICACION</Text>
  <Text y={1018.6} className="small-copy">SEDE CALLEJÓN LOS COFRES<br/>LA PUNTA, MOSTAZAL</Text>
  <a className="inv-button map-button" href="https://maps.app.goo.gl/fqgTfjXQ5Eos5D1HA" target="_blank" rel="noopener noreferrer">IR AL MAPA</a>
  <Art file="bf5ca8ccc7b09f8a753444be2d83d0f8.gif" x={293.4} y={1067.7} w={70.4}/>
  <Art file="49e4abc963eca49ae95eae87ec70146f.png" x={77.4} y={1080.3} w={23.7}/>
  <Art file="gift.svg" x={212.7} y={1162.8} w={50.3}/>
  <Art file="49e4abc963eca49ae95eae87ec70146f.png" x={349.4} y={1162.2} w={23.7}/>
  <Text y={1226.3} className="section-title">REGALITOS</Text>
  <Text y={1255.1} className="gift-copy">TU PRESENCIA SERÁ EL REGALO MÁS HERMOSO<br/>PARA NOSOTROS, SIN EMBARGO, SI DESEAS<br/>TENER UN DETALLE PARA NUESTROS<br/>PEQUEÑOS, HEMOS PREPARADO CON MUCHO<br/>CARIÑO UNA LISTA DE REGALOS QUE PUEDES<br/>ENCONTRAR AQUÍ:</Text>
  <a className="inv-button gifts-button" href="/regalos">LISTA DE REGALOS</a>
  <Art file="bf5ca8ccc7b09f8a753444be2d83d0f8.gif" x={302.7} y={1351.5} w={70.4}/>
  <Art file="49e4abc963eca49ae95eae87ec70146f.png" x={92.2} y={1340.4} w={23.7}/>
  <Art file="2efd6e8414bb5df7912539d7ebc54a11.png" x={-4.1} y={1421.7} w={148.8}/>
  <Art file="366a36349d519b2ff81f93fa8accd8a2.png" x={197.9} y={1421.1} w={101.2}/>
  <Art file="2efd6e8414bb5df7912539d7ebc54a11.png" x={310.1} y={1500.4} w={148.8}/>
  <Art file="frame.svg" x={118} y={1585.4} w={229.6} h={356}/>
  <Art file="651c0f454a3392f41f01879a42d0c0ef.png" x={169.7} y={1550.9} w={128.3}/>
  <Text y={1653.1} className="closing">TE<br/>ESPERAMOS</Text>
  <Text y={1739.8} className="rsvp">CONFIRMAR ASISTENCIA AL<br/><a href="https://wa.me/56941369931">+56941369931 MAMA</a><br/><a href="https://wa.me/56961977317">+56961977317 PAPA</a></Text>
  <Art file="3ad155e06e15bed641ff39c144b6bb8b.png" x={82.4} y={1809.3} w={132.1}/>
  <Art file="3ad155e06e15bed641ff39c144b6bb8b.png" x={241.7} y={1809.3} w={132.1}/>
</div></main>; }

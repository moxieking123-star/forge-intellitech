import sharp from 'sharp';
import {writeFileSync} from 'node:fs';
// Export the exact approved logo mark at browser and device icon sizes.
// The viewport excludes the surrounding F/r letters without redrawing the mark.
const source='public/images/brand/forge-wordmark.png';
const viewport={left:456,top:191,width:451,height:451};
async function png(size){return sharp(source).extract(viewport).resize(size,size,{kernel:'lanczos3'}).png().toBuffer();}
for(const [file,size] of [['app/icon.png',192],['public/icon-512.png',512],['app/apple-icon.png',180],['app/favicon-16x16.png',16],['app/favicon-32x32.png',32]])writeFileSync(file,await png(size));
const sizes=[16,32,48,64],images=await Promise.all(sizes.map(png));
const directory=Buffer.alloc(6+16*sizes.length);directory.writeUInt16LE(1,2);directory.writeUInt16LE(sizes.length,4);
let offset=directory.length;
images.forEach((bytes,i)=>{const at=6+i*16;directory[at]=sizes[i];directory[at+1]=sizes[i];directory.writeUInt16LE(1,at+4);directory.writeUInt16LE(32,at+6);directory.writeUInt32LE(bytes.length,at+8);directory.writeUInt32LE(offset,at+12);offset+=bytes.length;});
writeFileSync('app/favicon.ico',Buffer.concat([directory,...images]));
console.log('Exported exact Forge O icons: 16, 32, 48, 64, 180, 192 and 512 pixels.');

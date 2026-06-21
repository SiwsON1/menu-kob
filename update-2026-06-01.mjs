import { Document, Paragraph, TextRun, ExternalHyperlink, Packer, HeadingLevel } from 'docx';
import { google } from 'googleapis';
import { readFileSync, readdirSync, existsSync } from 'fs';
import { join, basename, dirname } from 'path';
import { fileURLToPath } from 'url';
import { Readable } from 'stream';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ITER = '2026-06-01';
const ROOT_FOLDER = '1iecSmMRBRLZcLU_cr7h7N6DzDn_j0kIw'; // Poprawki 2026-06-01
const SRC = [
  { rel: `teksty/kategorie/${ITER}`, sub: 'Kategorie' },
  { rel: `teksty/produkty/${ITER}`, sub: 'Produkty' },
];

function parseMd(md){const L=md.split('\n');const b=[];let buf=[];const f=()=>{if(buf.length){const t=buf.join(' ').trim();if(t)b.push({t:'p',x:t});buf=[];}};for(const l of L){if(l.startsWith('## ')){f();b.push({t:'h',x:l.slice(3).trim()});}else if(l.startsWith('# ')){f();b.push({t:'h',x:l.slice(2).trim()});}else if(l.trim()===''){f();}else buf.push(l);}f();return b;}
function inl(text){const r=[];const rx=/\[([^\]]+)\]\((https?:\/\/[^)]+|\/[^)]+)\)|\*\*(.+?)\*\*|((?:[^\[*]|\*(?!\*))+)/g;let m;while((m=rx.exec(text))!==null){if(m[1]&&m[2])r.push(new ExternalHyperlink({link:m[2],children:[new TextRun({text:m[1],style:'Hyperlink',color:'1155CC',underline:{type:'single'}})]}));else if(m[3])r.push(new TextRun({text:m[3],bold:true}));else if(m[4])r.push(new TextRun({text:m[4]}));}return r.length?r:[new TextRun({text})];}
function build(b){const c=b.map(x=>x.t==='h'?new Paragraph({heading:HeadingLevel.HEADING_2,children:[new TextRun({text:x.x,bold:true,size:28,font:'Calibri'})],spacing:{before:200,after:100}}):new Paragraph({children:inl(x.x),spacing:{before:80,after:80}}));return new Document({styles:{default:{document:{run:{font:'Calibri',size:24},paragraph:{spacing:{line:360}}}}},sections:[{children:c}]});}

const creds=JSON.parse(readFileSync(join(__dirname,'credentials.json')));
const auth=new google.auth.OAuth2(creds.installed.client_id,creds.installed.client_secret,'http://localhost:8080/oauth2callback');
auth.setCredentials(JSON.parse(readFileSync(join(__dirname,'token.json'))));
const drive=google.drive({version:'v3',auth});

const subRes=await drive.files.list({q:`'${ROOT_FOLDER}' in parents and mimeType='application/vnd.google-apps.folder' and trashed=false`,fields:'files(id,name)'});
const subId={};for(const f of subRes.data.files)subId[f.name]=f.id;

let upd=0,add=0;
for(const {rel,sub} of SRC){
  const full=join(__dirname,rel);
  if(!existsSync(full)){continue;}
  let parent=subId[sub];
  if(!parent){const r=await drive.files.create({requestBody:{name:sub,mimeType:'application/vnd.google-apps.folder',parents:[ROOT_FOLDER]},fields:'id'});parent=r.data.id;console.log('utworzono podfolder',sub);}
  for(const file of readdirSync(full).filter(f=>f.endsWith('.md'))){
    const buf=await Packer.toBuffer(build(parseMd(readFileSync(join(full,file),'utf8'))));
    const name=basename(file,'.md')+`_${ITER}.docx`;
    const ex=await drive.files.list({q:`'${parent}' in parents and name='${name}' and trashed=false`,fields:'files(id)'});
    if(ex.data.files.length){await drive.files.update({fileId:ex.data.files[0].id,media:{mimeType:'application/vnd.openxmlformats-officedocument.wordprocessingml.document',body:Readable.from(buf)}});upd++;}
    else{await drive.files.create({requestBody:{name,parents:[parent]},media:{mimeType:'application/vnd.openxmlformats-officedocument.wordprocessingml.document',body:Readable.from(buf)},fields:'id'});add++;console.log('dodano',sub+'/'+name);}
  }
}
console.log(`\nGOTOWE w folderze 2026-06-01. Zaktualizowano: ${upd}, dodano: ${add}.`);
console.log('Link: https://drive.google.com/drive/folders/'+ROOT_FOLDER);

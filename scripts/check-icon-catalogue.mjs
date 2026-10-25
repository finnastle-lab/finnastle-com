import {readFileSync, existsSync, statSync} from 'node:fs';
import {createHash} from 'node:crypto';
import assert from 'node:assert/strict';
const c=JSON.parse(readFileSync('public/icons/index.json','utf8'));
const ids=new Set();
const flat=c.families.flatMap(f=>f.variants);
assert.equal(c.familyCount,c.families.length);
assert.equal(c.count,flat.length);
assert.equal(c.icons.length,flat.length);
assert.equal(new Set(c.families.map(f=>f.id)).size,c.familyCount);
for(const family of c.families){
 assert(family.variants.some(v=>v.id===family.defaultVariant),family.id);
 for(const v of family.variants){
  assert(!ids.has(v.id),`Duplicate ${v.id}`); ids.add(v.id);
  assert(v.file.startsWith('/icons/')&&!v.file.includes('..'),v.id);
  assert(existsSync('public'+v.file),`Missing ${v.file}`);
  assert.equal(statSync('public'+v.file).size,v.bytes);
  assert(v.width>1&&v.height>1&&v.alt&&v.label,v.id);
  assert(['light','dark','checker'].includes(v.background),v.id);
  assert(c.icons.some(i=>i.name===v.id&&i.url==='https://finnastle.com'+v.file&&i.familyId===family.id),v.id);
  if(v.source.kind==='figma'){
   assert.equal(createHash('sha256').update(readFileSync(v.source.master)).digest('hex'),v.source.masterSha256);
   assert(v.source.url.includes(v.source.nodeId.replace(':','-')),v.id);
  }
 }
}
console.log(`Validated ${c.familyCount} families, ${c.count} variants and all Figma master hashes.`);

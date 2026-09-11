import {NodeIO} from '@gltf-transform/core';
import {ALL_EXTENSIONS} from '@gltf-transform/extensions';
import {dedup,prune,weld,draco} from '@gltf-transform/functions';
import draco3d from 'draco3dgltf';
import fs from 'node:fs';
const io=new NodeIO().registerExtensions(ALL_EXTENSIONS).registerDependencies({'draco3d.encoder':await draco3d.createEncoderModule(),'draco3d.decoder':await draco3d.createDecoderModule()});
for(const name of ['unda-sculpture','unda-sculpture-mobile','display','mobile','unda-type']){const p='public/models/'+name+'.glb';const doc=await io.read(p);await doc.transform(dedup(),weld(),prune({keepAttributes:true}),draco({method:'edgebreaker',quantizePosition:14,quantizeNormal:10}));await io.write(p,doc);console.log(name,fs.statSync(p).size)}
fs.mkdirSync('public/draco',{recursive:true});for(const name of ['draco_wasm_wrapper.js','draco_decoder.wasm'])fs.copyFileSync('node_modules/three/examples/jsm/libs/draco/gltf/'+name,'public/draco/'+name);

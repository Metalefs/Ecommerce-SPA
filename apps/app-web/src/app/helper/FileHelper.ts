import { Produto } from 'libs/data/src/lib/classes';

export function ObterImagensCarousel(){
  return [
    'assets/images/inicio/carousel/FAIXA10.jpg',
    'assets/images/inicio/carousel/FAIXA10.jpg',
  ]
}
export function ObterGIFProdutos(){
  return  'assets/images/GIF.gif'
}
export function ObterIcones(name){
  return  `assets/icons/${name}_icon.png`
}
export function getPreviewURL($event,fileNames,callback){

  let filelist = $event.target.files;

  return preview(filelist,fileNames,callback);
}

function preview(files,fileNames,callback) {
  if (files.length === 0)
    return;

  var mimeType = files[0].type;
  if (mimeType.match(/image\/*/) == null) {
    fileNames = "Só imagens são suportadas.";
    return;
  }
  for(let i =0; i < files.length; i++){
    fileNames+= files[i].name+',';
  }
  var reader = new FileReader();
  reader.readAsDataURL(files[0]);
  let res : string | ArrayBuffer;
  reader.onload = (_event) => {
    callback(reader.result,fileNames);
  }
}

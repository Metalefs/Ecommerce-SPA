import { Produto } from 'libs/data/src/lib/classes';

export function ObterImagensCarousel(){
  return [
    'assets/images/inicio/carousel/FAIXA10.jpg',
    'assets/images/inicio/carousel/FAIXA10.jpg',
  ]
}
export function getPreviewURL($event,Produto:Produto,fileNames){

  Produto.FileList = $event.target.files;

  return preview(Produto.FileList,Produto,fileNames);
}

function preview(files,produto,fileNames) {
  if (files.length === 0)
    return;

  var mimeType = files[0].type;
  if (mimeType.match(/image\/*/) == null) {
    fileNames = "Só imagens são suportadas.";
    return;
  }
  for(let i =0; i < produto.FileList.length; i++){
    fileNames+= produto.FileList[i].name+',';
  }
  var reader = new FileReader();
  reader.readAsDataURL(files[0]);
  reader.onload = (_event) => {
    produto.Arte = reader.result;
  }
  return produto;
}

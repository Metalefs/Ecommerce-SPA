import { BlogPost, Usuario } from 'libs/data/src/lib/classes';
import { StatusPostagem } from 'libs/data/src/lib/classes/blogPost';
import { TipoUsuario } from 'libs/data/src/lib/enums';

export function isEmpty(obj) {
  for(var key in obj) {
      if(obj.hasOwnProperty(key))
          return false;
  }
  return true;
}
export function order(a,b,desc){
  if(desc){
    if (a.Nome < b.Nome) {
      return 1;
    }
    if (a.Nome > b.Nome) {
      return -1;
    }
    // a must be equal to b
    return 0;
  }
  else{
    if (a.Nome > b.Nome) {
      return 1;
    }
    if (a.Nome < b.Nome) {
      return -1;
    }
    // a must be equal to b
    return 0;
  }
}
export function orderPreco(a,b,desc){

  if(!a.Preco)
  a.Preco = 0;

  if(!b.Preco)
  b.Preco = 0;

  if(a.Preco && b.Preco)

  if(!desc){
    if (a?.Preco < b?.Preco) {
      return 1;
    }
    if (a?.Preco > b?.Preco) {
      return -1;
    }
    // a must be equal to b
    return 0;
  }
  else{
    if (a?.Preco > b?.Preco) {
      return 1;
    }
    if (a?.Preco < b?.Preco) {
      return -1;
    }
    // a must be equal to b
    return 0;
  }
}

export function removeDuplicates(myArr, prop) {
  return myArr.filter((obj, pos, arr) => {
      return arr.map(mapObj => mapObj[prop]).indexOf(obj[prop]) === pos;
  });
}
export function translateEnum(myEnumType,myEnum){
 let values = Object.keys(myEnumType).map(key => myEnumType[myEnum]).filter(value => typeof value === 'string') as string[];
 return values[myEnum];
}
export function sum(arr) {
  var sum = 0;
  arr = arr.filter(x=>!isNaN(parseFloat(x)) && x != undefined)
  try{
    for (var index = 0; index < arr.length; index++) {
      sum += parseFloat(arr[index]);
    }
    return sum;
  }
  catch(ex){
    return 0;
  }
}

export function CanViewPost(post:BlogPost,user:Usuario){
  if(post.StatusPostagem == StatusPostagem.aberto)
      return true;
    else if((user?.Tipo ?? TipoUsuario.normal) == TipoUsuario.admin)
      return true;
    return false;
}

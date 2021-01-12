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
  try{
    for (var index = 0; index < arr.length; index++) {
      sum += arr[index];
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

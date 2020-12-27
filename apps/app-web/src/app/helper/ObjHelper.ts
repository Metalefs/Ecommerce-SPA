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

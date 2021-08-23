import {resizeImage} from './resize-image';

export function  getImage(width=140,element,callback): void {
  const file = element.target.files[0];
  const reader = new FileReader();
  reader.onloadend = () => {
    var src = reader.result.toString()
    resizeImage(src, {width}).then(function (blob:Blob) {
      //let _blob = URL.createObjectURL(blob);
      const resize_reader = new FileReader();
      resize_reader.onloadend = () => {
        var resize_src = resize_reader.result.toString()
        callback(
          resize_src
        )
      }
      resize_reader.readAsDataURL(blob);
    })
  }
  reader.readAsDataURL(file);
}

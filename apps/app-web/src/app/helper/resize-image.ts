function loadImage(img, src):Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
      img.src = src;
      img.completed ? resolve(img) : img.addEventListener('load', function () {
          resolve(img as HTMLImageElement)
      });
      img.addEventListener('error', reject);
  })
}

export function resizeImage(src, options):Promise<Blob> {

  return loadImage(document.createElement('img'), src).then( (image:HTMLImageElement) =>{

      var canvas = document.createElement('canvas');

      if (options.width && !options.height) {
          options.height = image.height * (options.width / image.width)
      } else if (!options.width && options.height) {
          options.width = image.width * (options.height / image.height)
      }

      Object.assign(canvas, options);

      canvas.getContext('2d').drawImage(image, 0, 0, canvas.width, canvas.height);

      return new Promise(function (resolve) {
          canvas.toBlob(resolve, options.type || 'image/png', options.quality)
      })
  })
}

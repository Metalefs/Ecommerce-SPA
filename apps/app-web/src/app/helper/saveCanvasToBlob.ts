export function canvasToBlob(canvas:HTMLCanvasElement):Promise<Blob>{
  return new Promise(function (resolve) {
    canvas.toBlob(resolve, 'image/png', 1)
  })
}

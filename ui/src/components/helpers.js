export function cropTo(image, size) {
  const canvas = document.createElement("canvas");
  let width = image.width;
  let height = image.height;

  if (image instanceof HTMLVideoElement) {
    width = image.videoWidth;
    height = image.videoHeight;
  }

  const min = Math.min(width, height);
  const scale = size / min;
  const scaledW = Math.ceil(width * scale);
  const scaledH = Math.ceil(height * scale);
  const dx = scaledW - size;
  const dy = scaledH - size;
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext("2d");
  ctx.drawImage(image, ~~(dx / 2) * -1, ~~(dy / 2) * -1, scaledW, scaledH);

  return canvas;
}

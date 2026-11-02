// Resize before upload so phone photographs do not consume unnecessary storage.
export async function prepareGiftPhoto(file: File): Promise<Blob> {
  if (!file.type.startsWith('image/') || file.type === 'image/svg+xml') {
    throw new Error('Elige una foto en formato JPG, PNG o WebP.');
  }
  if (file.size > 20 * 1024 * 1024) throw new Error('La foto es muy grande. Elige una de menos de 20 MB.');
  let bitmap: ImageBitmap;
  try { bitmap = await createImageBitmap(file); }
  catch { throw new Error('No pudimos abrir esa foto. Prueba con una imagen JPG, PNG o WebP.'); }
  try {
    const scale = Math.min(1, 1600 / Math.max(bitmap.width, bitmap.height));
    const canvas = document.createElement('canvas');
    canvas.width = Math.max(1, Math.round(bitmap.width * scale));
    canvas.height = Math.max(1, Math.round(bitmap.height * scale));
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('No pudimos preparar la foto en este navegador.');
    ctx.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
    const photo = await new Promise<Blob>((resolve, reject) => canvas.toBlob(
      blob => blob ? resolve(blob) : reject(new Error('No pudimos preparar la foto.')),
      'image/webp', 0.85,
    ));
    if (photo.type !== 'image/webp') throw new Error('Este navegador no permite preparar fotos. Prueba con un navegador actualizado.');
    if (photo.size > 5 * 1024 * 1024) throw new Error('La foto sigue siendo muy grande. Elige otra más pequeña.');
    return photo;
  } finally { bitmap.close(); }
}

'use client';
import { useEffect, useRef, useState } from 'react';
import { safeImage } from '@/lib/supabase';

export default function GiftPhotoPicker({ file, currentUrl, disabled, onChange }: {
  file: File | null; currentUrl: string; disabled: boolean; onChange: (file: File | null) => void;
}) {
  const input = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState('');
  const [error, setError] = useState('');
  useEffect(() => {
    if (!file) { setPreview(''); if (input.current) input.current.value = ''; return; }
    const url = URL.createObjectURL(file); setPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);
  return <div className="photo-picker">
    <span className="photo-label">Foto del regalo</span>
    <div className="photo-picker-content"><img src={preview || safeImage(currentUrl)} alt="Vista previa de la foto del regalo" onError={() => { if (file) setError('No se puede mostrar esta foto. Si no se guarda, elige un archivo JPG, PNG o WebP.'); }}/>
      <div><label className="photo-upload-button">{file ? 'Elegir otra foto' : 'Subir una foto'}
        <input ref={input} type="file" accept="image/*" disabled={disabled} onChange={e => {
          const selected = e.target.files?.[0]; if (!selected) return;
          setError('');
          if (!selected.type.startsWith('image/') || selected.type === 'image/svg+xml' || selected.size > 20 * 1024 * 1024) {
            setError('Elige una foto JPG, PNG o WebP de menos de 20 MB.'); e.target.value = ''; return;
          }
          onChange(selected);
        }}/>
      </label><p>Elige una foto de tu galería o de tu computador. Se guardará junto con el regalo.</p>
      {file && <><small className="photo-filename">{file.name}</small><button className="photo-remove" type="button" disabled={disabled} onClick={() => { onChange(null); setError(''); }}>Cancelar foto seleccionada</button></>}
      </div></div>
    {error && <p role="alert" className="error">{error}</p>}
  </div>;
}

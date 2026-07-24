import React, { useState, useRef } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Link } from 'wouter';
import { Trash2, Upload, Loader2, ArrowLeft } from 'lucide-react';
import { AdminGate } from '@/components/AdminGate';
import { fetchMedia, uploadMedia, deleteMedia, MediaCategory, MediaItem } from '@/lib/mediaApi';

const CATEGORIES: { id: MediaCategory; label: string }[] = [
  { id: 'atolye', label: 'Atölye (Galeri)' },
  { id: 'ogrenci-calismalari', label: 'Öğrenci Çalışmaları' },
  { id: 'etkinlik', label: 'Etkinlik' },
  { id: 'egitmen', label: 'Eğitmenler' },
];

const MAX_FILE_MB = 4;

function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function AdminMediaContent() {
  const queryClient = useQueryClient();
  const [activeCategory, setActiveCategory] = useState<MediaCategory>('atolye');
  const [uploadError, setUploadError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { data: items, isLoading } = useQuery({
    queryKey: ['admin-media', activeCategory],
    queryFn: () => fetchMedia(activeCategory),
  });

  const uploadMutation = useMutation({
    mutationFn: uploadMedia,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-media', activeCategory] });
      queryClient.invalidateQueries({ queryKey: ['public-media', activeCategory] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteMedia,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-media', activeCategory] });
      queryClient.invalidateQueries({ queryKey: ['public-media', activeCategory] });
    },
  });

  const handleFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    setUploadError('');

    for (const file of Array.from(files)) {
      if (!file.type.startsWith('image/')) {
        setUploadError('Sadece görsel dosyaları yükleyebilirsin.');
        continue;
      }
      if (file.size > MAX_FILE_MB * 1024 * 1024) {
        setUploadError(`"${file.name}" çok büyük (max ${MAX_FILE_MB}MB). Daha küçük bir görsel dene.`);
        continue;
      }
      const dataUrl = await fileToDataUrl(file);
      try {
        await uploadMutation.mutateAsync({ category: activeCategory, image_data: dataUrl });
      } catch (err: any) {
        setUploadError(err.message ?? 'Yükleme başarısız oldu.');
      }
    }

    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="min-h-screen bg-eskiz-dark text-eskiz-light">
      <div className="container mx-auto px-6 py-12 max-w-5xl">
        <Link href="/" className="inline-flex items-center gap-2 text-eskiz-light/60 hover:text-eskiz-gold mb-8">
          <ArrowLeft size={18} /> Ana Sayfaya Dön
        </Link>

        <h1 className="text-3xl font-serif text-eskiz-gold mb-2">Görsel Yönetimi</h1>
        <p className="text-eskiz-light/60 mb-8">
          Buradan yüklediğin görseller birkaç saniye içinde sitede otomatik görünür — kod veya
          yeniden yayınlama gerekmez.
        </p>

        <div className="flex flex-wrap gap-3 mb-8">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-5 py-2 rounded-full text-sm font-manrope transition-all ${
                activeCategory === cat.id
                  ? 'bg-eskiz-gold text-eskiz-dark font-bold'
                  : 'bg-transparent border border-eskiz-light/20 hover:border-eskiz-gold/50'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="mb-10">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => handleFiles(e.target.files)}
            className="hidden"
            id="media-upload-input"
          />
          <label
            htmlFor="media-upload-input"
            className="flex flex-col items-center justify-center gap-3 border-2 border-dashed border-eskiz-gold/30 rounded-lg py-12 cursor-pointer hover:border-eskiz-gold/60 transition-colors"
          >
            {uploadMutation.isPending ? (
              <Loader2 className="w-8 h-8 text-eskiz-gold animate-spin" />
            ) : (
              <Upload className="w-8 h-8 text-eskiz-gold" />
            )}
            <span className="font-manrope text-sm text-eskiz-light/70">
              Görsel yüklemek için tıkla (birden fazla seçebilirsin, max {MAX_FILE_MB}MB/görsel)
            </span>
          </label>
          {uploadError && <p className="text-red-400 text-sm mt-3">{uploadError}</p>}
        </div>

        {isLoading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="w-8 h-8 text-eskiz-gold animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {(items ?? []).map((item: MediaItem) => (
              <div key={item.id} className="relative group rounded-lg overflow-hidden aspect-square">
                <img src={item.image_data} alt="" className="w-full h-full object-cover" />
                <button
                  onClick={() => deleteMutation.mutate(item.id)}
                  disabled={deleteMutation.isPending}
                  className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                  title="Bu görseli sil"
                >
                  <Trash2 className="text-red-400 w-7 h-7" />
                </button>
              </div>
            ))}
            {(items ?? []).length === 0 && (
              <p className="col-span-full text-eskiz-light/50 py-8 text-center">
                Bu kategoride henüz eklenmiş görsel yok. Sitede bu kategori için varsayılan
                görseller gösterilmeye devam eder.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default function AdminMedia() {
  return (
    <AdminGate>
      <AdminMediaContent />
    </AdminGate>
  );
}

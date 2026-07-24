import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Link } from 'wouter';
import { Save, Loader2, ArrowLeft, Check } from 'lucide-react';
import { AdminGate } from '@/components/AdminGate';
import { fetchTexts, updateText, SITE_TEXT_FIELDS } from '@/lib/textsApi';

function AdminTextsContent() {
  const queryClient = useQueryClient();
  const { data: texts, isLoading } = useQuery({
    queryKey: ['site-texts'],
    queryFn: fetchTexts,
  });

  const [values, setValues] = useState<Record<string, string>>({});
  const [savedKey, setSavedKey] = useState<string | null>(null);

  useEffect(() => {
    if (texts) setValues((prev) => ({ ...texts, ...prev }));
  }, [texts]);

  const mutation = useMutation({
    mutationFn: ({ key, value }: { key: string; value: string }) => updateText(key, value),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['site-texts'] });
      setSavedKey(variables.key);
      setTimeout(() => setSavedKey(null), 2000);
    },
  });

  return (
    <div className="min-h-screen bg-eskiz-dark text-eskiz-light">
      <div className="container mx-auto px-6 py-12 max-w-3xl">
        <Link href="/" className="inline-flex items-center gap-2 text-eskiz-light/60 hover:text-eskiz-gold mb-8">
          <ArrowLeft size={18} /> Ana Sayfaya Dön
        </Link>

        <h1 className="text-3xl font-serif text-eskiz-gold mb-2">Metin Yönetimi</h1>
        <p className="text-eskiz-light/60 mb-10">
          Buradaki metinleri değiştirip kaydettiğinde, ana sayfada birkaç saniye içinde otomatik
          güncellenir — kod veya yeniden yayınlama gerekmez.
        </p>

        {isLoading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="w-8 h-8 text-eskiz-gold animate-spin" />
          </div>
        ) : (
          <div className="space-y-8">
            {SITE_TEXT_FIELDS.map((field) => (
              <div key={field.key} className="bg-[#1A1A1A] border border-eskiz-gold/10 rounded-lg p-5">
                <label className="block text-sm font-manrope text-eskiz-light/70 mb-2">
                  {field.label}
                </label>
                <textarea
                  value={values[field.key] ?? field.default}
                  onChange={(e) => setValues((v) => ({ ...v, [field.key]: e.target.value }))}
                  rows={2}
                  className="w-full bg-black/30 border border-eskiz-light/20 rounded px-4 py-3 text-eskiz-light focus:outline-none focus:border-eskiz-gold resize-none"
                />
                <div className="flex justify-end mt-3">
                  <button
                    onClick={() => mutation.mutate({ key: field.key, value: values[field.key] ?? field.default })}
                    disabled={mutation.isPending}
                    className="bg-eskiz-gold text-eskiz-dark px-5 py-2 rounded-full font-manrope text-sm font-bold flex items-center gap-2 hover:bg-eskiz-gold/90 transition-colors disabled:opacity-50"
                  >
                    {savedKey === field.key ? (
                      <Check className="w-4 h-4" />
                    ) : mutation.isPending ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Save className="w-4 h-4" />
                    )}
                    {savedKey === field.key ? 'Kaydedildi' : 'Kaydet'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function AdminTexts() {
  return (
    <AdminGate>
      <AdminTextsContent />
    </AdminGate>
  );
}

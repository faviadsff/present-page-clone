import { useEffect, useState } from "react";
import { X } from "lucide-react";

export interface GalleryItem {
  name: string;
  category: string;
  /** Foto real da miniatura impressa (placeholder até ser trocada). */
  image?: string;
}

/** Grade 2 colunas (mobile) / 4 (desktop) com lightbox em tela cheia. */
export function MiniatureGallery({ items }: { items: ReadonlyArray<GalleryItem> }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const open = openIndex !== null ? items[openIndex] : undefined;

  useEffect(() => {
    if (openIndex === null) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpenIndex(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [openIndex]);

  return (
    <>
      <ul className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
        {items.map((item, i) => (
          <li key={`${item.name}-${i}`}>
            <button
              type="button"
              onClick={() => setOpenIndex(i)}
              aria-label={`Ampliar foto: ${item.name}`}
              className="block w-full text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-xl"
            >
              <div className="aspect-square overflow-hidden rounded-xl border border-border bg-secondary">
                {item.image ? (
                  <img
                    src={item.image}
                    alt={`${item.name} — ${item.category}`}
                    loading="lazy"
                    decoding="async"
                    width={400}
                    height={400}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-xs text-muted-foreground">Foto em breve</div>
                )}
              </div>
              <p className="mt-2 truncate text-sm font-bold text-foreground">{item.name}</p>
              <p className="truncate text-xs text-primary">{item.category}</p>
            </button>
          </li>
        ))}
      </ul>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={open.name}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 p-4"
          onClick={() => setOpenIndex(null)}
        >
          <button
            type="button"
            aria-label="Fechar"
            onClick={() => setOpenIndex(null)}
            className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white"
          >
            <X className="h-5 w-5" />
          </button>
          <figure className="max-h-full max-w-2xl" onClick={(e) => e.stopPropagation()}>
            {open.image && (
              <img src={open.image} alt={open.name} className="max-h-[80vh] w-full rounded-xl object-contain" />
            )}
            <figcaption className="mt-3 text-center text-white">
              <span className="font-bold">{open.name}</span> · <span className="text-primary">{open.category}</span>
            </figcaption>
          </figure>
        </div>
      )}
    </>
  );
}

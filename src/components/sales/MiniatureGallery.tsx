import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface GalleryItem {
  name: string;
  category: string;
  /** Foto real da miniatura impressa (placeholder até ser trocada). */
  image?: string;
}

/** Duas fileiras em loop contínuo, com lightbox para as fotos originais. */
export function MiniatureGallery({ items }: { items: ReadonlyArray<GalleryItem> }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [galleryNearby, setGalleryNearby] = useState(false);
  const galleryRef = useRef<HTMLDivElement>(null);
  const open = openIndex !== null ? items[openIndex] : undefined;
  const rows = [items.slice(0, 6), items.slice(6, 12)];

  // Native lazy loading misses some images moving inside a transformed track.
  // Load only once the gallery approaches so the entire visible loop stays filled.
  useEffect(() => {
    const gallery = galleryRef.current;
    if (!gallery) return;
    if (!('IntersectionObserver' in window)) { setGalleryNearby(true); return; }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry?.isIntersecting) {
        setGalleryNearby(true);
        observer.disconnect();
      }
    }, { rootMargin: "600px 0px" });
    observer.observe(gallery);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (openIndex === null) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpenIndex(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [openIndex]);

  return (
    <>
      <div ref={galleryRef} className="miniature-gallery" aria-label="Miniaturas disponíveis">
        {rows.map((row, rowIndex) => (
          <div className="miniature-gallery-row" key={rowIndex}>
            <div className={`miniature-gallery-track ${rowIndex === 1 ? "miniature-gallery-track-reverse" : ""}`}>
              {[false, true].map((duplicate) => (
                <ul className="miniature-gallery-group" key={duplicate ? "copy" : "original"} aria-hidden={duplicate ? "true" : undefined}>
                  {row.map((item, index) => (
                    <li className="miniature-gallery-card" key={item.name}>
                      <Button
                        variant="ghost"
                        type="button"
                        tabIndex={duplicate ? -1 : undefined}
                        onClick={() => setOpenIndex(rowIndex * 6 + index)}
                        aria-label={`Ampliar foto: ${item.name}`}
                        className="relative block h-full w-full overflow-hidden rounded-lg border border-border bg-secondary p-0 text-left focus-visible:ring-2 focus-visible:ring-ring"
                      >
                        {item.image ? (
                          <img
                            src={item.image}
                            alt={duplicate ? "" : `${item.name} — ${item.category}`}
                            loading={galleryNearby ? "eager" : "lazy"}
                            decoding="async"
                            width={400}
                            height={400}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <span className="flex h-full items-center justify-center text-xs text-muted-foreground">Foto em breve</span>
                        )}
                        <span className="miniature-gallery-caption" aria-hidden={duplicate ? "true" : undefined}>{item.name}</span>
                      </Button>
                    </li>
                  ))}
                </ul>
              ))}
            </div>
          </div>
        ))}
      </div>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={open.name}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-background/95 p-4"
          onClick={() => setOpenIndex(null)}
        >
          <Button
            variant="ghost"
            type="button"
            aria-label="Fechar"
            onClick={() => setOpenIndex(null)}
            className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-foreground/10 text-foreground"
          >
            <X className="h-5 w-5" />
          </Button>
          <figure className="max-h-full max-w-2xl" onClick={(e) => e.stopPropagation()}>
            {open.image && (
              <img src={open.image} alt={open.name} className="max-h-[80vh] w-full rounded-xl object-contain" />
            )}
            <figcaption className="mt-3 text-center text-foreground">
              <span className="font-bold">{open.name}</span> · <span className="text-primary">{open.category}</span>
            </figcaption>
          </figure>
        </div>
      )}
    </>
  );
}

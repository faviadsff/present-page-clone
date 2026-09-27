import { useRef, useState } from "react";

import { cn } from "@/lib/utils";

export interface Testimonial {
  name: string;
  system: string;
  text: string;
  /** Foto da miniatura impressa pelo cliente (placeholder). */
  image?: string;
}

/** Carrossel com deslize + bolinhas no mobile; grade de 3 no desktop. */
export function TestimonialCards({ items }: { items: ReadonlyArray<Testimonial> }) {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState(0);

  const onScroll = () => {
    const track = trackRef.current;
    const card = track?.firstElementChild as HTMLElement | null;
    if (!track || !card) return;
    setActive(Math.round(track.scrollLeft / (card.offsetWidth + 16)));
  };

  const goTo = (i: number) => {
    const track = trackRef.current;
    const card = track?.children[i] as HTMLElement | undefined;
    if (track && card) track.scrollTo({ left: card.offsetLeft - track.offsetLeft, behavior: "smooth" });
  };

  return (
    <div>
      <div
        ref={trackRef}
        onScroll={onScroll}
        className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:mx-0 md:grid md:grid-cols-3 md:overflow-visible md:px-0"
      >
        {items.map((t) => (
          <article key={t.name} className="card-dark w-[85%] shrink-0 snap-center overflow-hidden !p-0 md:w-auto">
            <div className="aspect-square bg-secondary">
              {t.image && (
                <img src={t.image} alt={`Miniatura impressa por ${t.name}`} loading="lazy" decoding="async" width={400} height={400} className="h-full w-full object-cover" />
              )}
            </div>
            <div className="p-5">
              <p className="mb-2 text-primary" aria-label="5 estrelas">★★★★★</p>
              <p className="text-sm text-foreground/90">“{t.text}”</p>
              <p className="mt-4 text-sm font-bold text-foreground">{t.name}</p>
              <p className="text-xs text-muted-foreground">{t.system}</p>
            </div>
          </article>
        ))}
      </div>
      <div className="mt-4 flex justify-center gap-2 md:hidden">
        {items.map((t, i) => (
          <button
            key={t.name}
            type="button"
            onClick={() => goTo(i)}
            aria-label={`Ver depoimento ${i + 1}`}
            className={cn("h-2.5 rounded-full transition-all", active === i ? "w-6 bg-primary" : "w-2.5 bg-muted-foreground/40")}
          />
        ))}
      </div>
    </div>
  );
}

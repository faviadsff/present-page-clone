import { useRef, useState } from "react";

import { cn } from "@/lib/utils";

export interface Testimonial {
  /** Print do depoimento (WhatsApp) exibido ocupando o card inteiro. */
  image: string;
  /** Texto alternativo curto. */
  alt?: string;
}

/** Carrossel com deslize + bolinhas no mobile; grade de 3 no desktop. Cada card mostra apenas a imagem. */
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
        {items.map((t, i) => (
          <article key={t.image} className="card-dark w-[85%] shrink-0 snap-center overflow-hidden !p-0 md:w-auto">
            <img
              src={t.image}
              alt={t.alt ?? `Depoimento de cliente ${i + 1}`}
              loading="lazy"
              decoding="async"
              width={400}
              height={820}
              className="block h-full w-full object-cover"
            />
          </article>
        ))}
      </div>
      <div className="mt-4 flex justify-center gap-2 md:hidden">
        {items.map((t, i) => (
          <button
            key={t.image}
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

import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";
import { scrollToPricing } from "@/lib/checkout-utm";

/**
 * Barra fixa no rodapé (só mobile). Aparece depois do hero
 * e some enquanto a seção de preços está visível.
 */
export function MobileStickyCta() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const check = () => {
      const hero = document.getElementById("hero");
      const pricing = document.getElementById("pricing");
      const pastHero = hero ? hero.getBoundingClientRect().bottom < 0 : window.scrollY > 600;
      let pricingVisible = false;
      if (pricing) {
        const r = pricing.getBoundingClientRect();
        pricingVisible = r.top < window.innerHeight && r.bottom > 0;
      }
      setVisible(pastHero && !pricingVisible);
    };
    window.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check);
    check();
    return () => {
      window.removeEventListener("scroll", check);
      window.removeEventListener("resize", check);
    };
  }, []);

  return (
    <div
      aria-hidden={!visible}
      className={cn(
        "fixed inset-x-0 bottom-0 z-40 border-t border-primary/30 bg-card/95 px-4 py-3 backdrop-blur transition-transform duration-300 md:hidden",
        visible ? "translate-y-0" : "pointer-events-none translate-y-full",
      )}
    >
      <div className="flex items-center justify-between gap-3">
        <p className="min-w-0 text-sm font-bold leading-tight text-foreground">
          2.000 miniaturas · <span className="text-primary">R$ 37,90</span>
        </p>
        <button
          type="button"
          tabIndex={visible ? 0 : -1}
          onClick={scrollToPricing}
          className="btn-buy shrink-0 !px-5 !py-3 text-sm font-black text-foreground"
        >
          QUERO AGORA
        </button>
      </div>
    </div>
  );
}

/**
 * Repasse de parâmetros de rastreamento para os links de checkout (pay.wiapy.com).
 *
 * Regras:
 * - Lê os parâmetros da URL atual da página.
 * - Só repassa chaves conhecidas de rastreamento, sem valores fixos.
 * - Se a página foi aberta sem nenhum desses parâmetros, retorna o link original intacto.
 */
const TRACKING_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
  "fbclid",
  "src",
  "sck",
] as const;

export function buildCheckoutUrl(base: string): string {
  if (typeof window === "undefined") return base;
  try {
    const current = new URLSearchParams(window.location.search);
    const url = new URL(base);
    let added = false;
    for (const key of TRACKING_KEYS) {
      const value = current.get(key);
      if (value) {
        url.searchParams.set(key, value);
        added = true;
      }
    }
    return added ? url.toString() : base;
  } catch {
    return base;
  }
}

/** Rola suavemente até a seção de preços. */
export function scrollToPricing(): void {
  document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

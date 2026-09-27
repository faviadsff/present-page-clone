import { useEffect, useState, type ComponentProps } from "react";

import { buildCheckoutUrl } from "@/lib/checkout-utm";

interface CheckoutLinkProps extends Omit<ComponentProps<"a">, "href"> {
  /** Link base do checkout, sem parâmetros. */
  href: string;
}

/**
 * Link de checkout que repassa os parâmetros de rastreamento da página.
 * No clique o href é recalculado, garantindo que nada sobrescreva os valores reais.
 */
export function CheckoutLink({ href, onClick, ...props }: CheckoutLinkProps) {
  const [resolved, setResolved] = useState(href);

  useEffect(() => {
    setResolved(buildCheckoutUrl(href));
  }, [href]);

  return (
    <a
      {...props}
      href={resolved}
      onClick={(event) => {
        event.currentTarget.href = buildCheckoutUrl(href);
        onClick?.(event);
      }}
    />
  );
}

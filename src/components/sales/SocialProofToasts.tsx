import { useEffect } from "react";
import { ShoppingBag } from "lucide-react";
import { toast } from "sonner";

import { cn } from "@/lib/utils";

const SOCIAL_NAMES = [
  "Kevin William", "Mariana Souza", "João Pedro", "Ana Clara", "Lucas Oliveira",
  "Fernanda Lima", "Rafael Costa", "Juliana Mendes", "Bruno Henrique", "Patrícia Rocha",
  "Gabriel Martins", "Larissa Dias", "Thiago Almeida", "Camila Torres", "Diego Fernandes",
  "Beatriz Nunes", "Felipe Ribeiro", "Isabela Cardoso", "Rodrigo Pires", "Vanessa Monteiro"
];

const SOCIAL_CITIES = [
  "Curitiba PR", "São Paulo SP", "Rio de Janeiro RJ", "Belo Horizonte MG", "Porto Alegre RS",
  "Salvador BA", "Fortaleza CE", "Brasília DF", "Manaus AM", "Recife PE",
  "Florianópolis SC", "Goiânia GO", "Belém PA", "São Luís MA", "Maceió AL",
  "Natal RN", "Campo Grande MS", "Teresina PI", "João Pessoa PB", "Vitória ES"
];

const SOCIAL_TIMES = [
  "a 5 minutos", "a 8 minutos", "a 12 minutos", "a 15 minutos", "a 18 minutos",
  "a 22 minutos", "a 25 minutos", "a 30 minutos", "a 35 minutos", "a 45 minutos",
  "a 50 minutos", "a 1 hora", "a 2 horas", "a 3 horas"
];

// 3 premium, 2 basico — repete a cada 5 notificacoes
const PLAN_PATTERN: Array<"premium" | "basico"> = [
  "premium", "premium", "premium", "basico", "basico"
];

function random<T>(arr: readonly T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]!;
}

type SocialPlan = "premium" | "basico";

interface SocialToastProps {
  plan: SocialPlan;
  name: string;
  city: string;
  time: string;
}

function SocialToast({ plan, name, city, time }: SocialToastProps) {
  const planLabel = plan === "premium" ? "premium" : "básico";

  return (
    <div className="flex w-[300px] items-start gap-3 rounded-xl border border-border bg-card p-3 shadow-xl sm:w-[380px]">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
        <ShoppingBag className="h-4 w-4" />
      </div>
      <div className="flex min-w-0 flex-1 flex-col">
        <p className="truncate text-sm font-bold leading-tight text-foreground">
          {name} - {city}
        </p>
        <p className="mt-0.5 inline-flex items-center gap-1.5 text-xs text-muted-foreground">
          <span className="truncate">
            comprou o pacote{" "}
            <span
              className={cn(
                "font-semibold",
                plan === "premium" ? "text-green-500" : "text-foreground"
              )}
            >
              {planLabel}
            </span>{" "}
            {time}
          </span>
          <span
            className="h-2 w-2 shrink-0 rounded-full bg-green-500 animate-pulse"
            aria-hidden="true"
          />
        </p>
      </div>
    </div>
  );
}

export function SocialProofToasts() {
  useEffect(() => {
    let index = 0;
    let started = false;
    let interval: number | null = null;

    const show = () => {
      const plan = PLAN_PATTERN[index % PLAN_PATTERN.length] as SocialPlan;
      const name = random(SOCIAL_NAMES);
      const city = random(SOCIAL_CITIES);
      const time = random(SOCIAL_TIMES);

      toast.custom(
        () => <SocialToast plan={plan} name={name} city={city} time={time} />,
        { id: "social-proof", duration: 5000 }
      );

      index += 1;
    };

    const start = () => {
      if (started) return;
      started = true;
      show();
      interval = window.setInterval(show, 10000);
    };

    const vsl = document.getElementById("vsl");
    if (!vsl) {
      // Fallback caso o elemento nao exista
      start();
      return;
    }

    // Inicia as notificacoes somente quando o usuario rolar
    // e a VSL sair completamente da viewport
    const checkScroll = () => {
      const rect = vsl.getBoundingClientRect();
      const vslIsVisible = rect.top < window.innerHeight && rect.bottom > 0;
      if (!vslIsVisible) start();
    };

    window.addEventListener("scroll", checkScroll, { passive: true });
    checkScroll();

    return () => {
      if (interval) window.clearInterval(interval);
      window.removeEventListener("scroll", checkScroll);
    };
  }, []);

  return null;
}

import { createFileRoute } from "@tanstack/react-router";
import { Check, CheckCircle, Castle, Swords } from "lucide-react";
import { useEffect, useState } from "react";
import campaignImg from "@/assets/mago-campanha.jpg.asset.json";

export const Route = createFileRoute("/obrigado")({
  head: () => ({
    meta: [
      { title: "Obrigado pela compra! | STL do Mago" },
      {
        name: "description",
        content:
          "Seu acesso ao Pacote STL do Mago foi liberado. Aproveite a oferta exclusiva da Campanha Completa.",
      },
      { property: "og:title", content: "Obrigado pela compra! | STL do Mago" },
      {
        property: "og:description",
        content:
          "Acesso liberado ao pacote de +2.000 miniaturas STL para RPG e board games.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ObrigadoPage,
});

function ObrigadoPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* HERO */}
      <section className="relative flex min-h-screen flex-col items-center justify-center section-padding overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-secondary/50 to-background" />
        <div className="absolute top-1/4 right-1/4 h-96 w-96 rounded-full bg-primary/20 blur-3xl" />

        <div className="relative z-10 mx-auto w-full max-w-3xl">
          <div className="mb-8 flex justify-center">
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-green-500/20 shadow-[0_0_60px_hsl(140_80%_45%_/_0.3)]">
              <CheckCircle className="h-12 w-12 text-green-500" />
            </div>
          </div>

          <h1 className="mb-12 text-center text-3xl font-black leading-tight md:text-5xl lg:text-6xl">
            Parabéns! Seu acesso foi{" "}
            <span className="text-gradient">liberado</span>.
          </h1>

          {/* UPSELL */}
          <div className="card-dark mx-auto max-w-2xl border-primary/30 p-6 text-center md:p-10">
            <div className="mb-4 flex flex-col items-center justify-center gap-2 sm:flex-row sm:gap-3">
              <span className="text-xl font-black text-foreground md:text-2xl">
                Oferta especial
              </span>
              <OfferTimer />
            </div>

            <div className="mb-6 flex justify-center">
              <div className="relative h-52 w-72 rounded-2xl border-[6px] border-primary bg-primary/10 p-1 shadow-[0_0_70px_hsl(43_90%_52%_/_0.5)] md:h-72 md:w-96">
                <div className="relative h-full w-full overflow-hidden rounded-xl">
                  <img
                    src={campaignImg.url}
                    alt="Vilões Épicos + Cenário de Batalha"
                    className="h-full w-full object-cover"
                  />
                  <div className="pointer-events-none absolute inset-0 rounded-xl ring-2 ring-inset ring-primary/30" />
                </div>

                {/* Cantos medievais dourados */}
                <span className="absolute -top-1.5 -left-1.5 h-5 w-5 rounded-full border-4 border-primary bg-background" />
                <span className="absolute -top-1.5 -right-1.5 h-5 w-5 rounded-full border-4 border-primary bg-background" />
                <span className="absolute -bottom-1.5 -left-1.5 h-5 w-5 rounded-full border-4 border-primary bg-background" />
                <span className="absolute -bottom-1.5 -right-1.5 h-5 w-5 rounded-full border-4 border-primary bg-background" />
              </div>
            </div>

            <h2 className="mb-3 text-2xl font-black leading-tight md:text-3xl">
              Campanha Completa: Vilões Épicos + Cenário de Batalha
            </h2>

            <div className="mb-6 inline-flex flex-col items-center rounded-2xl border border-primary/30 bg-primary/10 px-6 py-4">
              <span className="text-sm text-red-500 line-through">
                R$ 297,90
              </span>
              <span className="text-3xl font-black text-green-500 md:text-4xl">
                R$ 37,90
              </span>
            </div>

            <ul className="mx-auto mb-8 max-w-md space-y-3 text-left">
              <UpsellItem icon={<Swords className="h-5 w-5" />}>
                Coleção de vilões e chefes épicos (minis grandes, alto detalhe)
              </UpsellItem>
              <UpsellItem icon={<Castle className="h-5 w-5" />}>
                Cenário de batalha completo (arena, castelo em ruínas, ponte
                sobre lava)
              </UpsellItem>
              <UpsellItem icon={<Check className="h-5 w-5" />}>
                Bônus extra: módulo de aventura pronta pra rodar com essas peças
              </UpsellItem>
            </ul>

            <a
              href="https://app.zuptos.com.br/checkout/8b22d48b460d1578"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-buy inline-flex w-full items-center justify-center text-foreground sm:w-auto"
            >
              QUERO A CAMPANHA COMPLETA!
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="section-padding border-t border-border/50 bg-section-1">
        <div className="container-narrow text-center">
          <p className="text-sm text-muted-foreground">
            © 2026 Mega Pacote STL 3D. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </main>
  );
}

function OfferTimer() {
  const [secondsLeft, setSecondsLeft] = useState(5 * 60);

  useEffect(() => {
    const interval = setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const minutes = Math.floor(secondsLeft / 60)
    .toString()
    .padStart(2, "0");
  const seconds = (secondsLeft % 60).toString().padStart(2, "0");

  return (
    <div className="inline-flex items-center gap-1 rounded-lg bg-primary/10 px-3 py-1.5 font-mono text-lg font-bold text-primary shadow-[0_0_20px_hsl(43_90%_52%_/_0.35)] md:text-xl">
      <span>{minutes}</span>
      <span className="animate-pulse">:</span>
      <span>{seconds}</span>
    </div>
  );
}

interface UpsellItemProps {
  icon: React.ReactNode;
  children: React.ReactNode;
}

function UpsellItem({ icon, children }: UpsellItemProps) {
  return (
    <li className="flex items-start gap-3 rounded-xl border border-border/50 bg-background/40 p-4">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
        {icon}
      </div>
      <span className="text-sm leading-relaxed text-foreground md:text-base">
        {children}
      </span>
    </li>
  );
}

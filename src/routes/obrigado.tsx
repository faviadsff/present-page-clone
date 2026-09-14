import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, CheckCircle, Crown, Home, Sparkles, Swords } from "lucide-react";

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
            <div className="mb-4 flex justify-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 shadow-[0_0_40px_hsl(43_90%_52%_/_0.2)]">
                <Crown className="h-7 w-7 text-primary" />
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
              <UpsellItem icon={<Sparkles className="h-5 w-5" />}>
                Cenário de batalha completo (arena, castelo em ruínas, ponte
                sobre lava)
              </UpsellItem>
              <UpsellItem icon={<Check className="h-5 w-5" />}>
                Bônus extra: módulo de aventura pronta pra rodar com essas peças
              </UpsellItem>
            </ul>

            <div className="flex flex-col items-center gap-4">
              <a
                href="https://app.zuptos.com.br/checkout/8b22d48b460d1578"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-buy inline-flex w-full items-center justify-center text-foreground sm:w-auto"
              >
                QUERO A CAMPANHA COMPLETA!
              </a>

              <Link
                to="/"
                className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                <Home className="h-4 w-4" />
                Voltar para a página inicial
              </Link>
            </div>
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

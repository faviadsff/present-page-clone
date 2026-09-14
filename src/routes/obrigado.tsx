import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle, Download, Home, Mail, Shield } from "lucide-react";

export const Route = createFileRoute("/obrigado")({
  head: () => ({
    meta: [
      { title: "Obrigado pela compra! | STL do Mago" },
      {
        name: "description",
        content:
          "Seu acesso ao Pacote STL do Mago foi liberado. Confira seu e-mail e comece a imprimir suas miniaturas agora mesmo.",
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
      <section className="relative flex min-h-screen items-center justify-center section-padding overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-secondary/50 to-background" />
        <div className="absolute top-1/4 right-1/4 h-96 w-96 rounded-full bg-primary/20 blur-3xl" />

        <div className="relative z-10 mx-auto w-full max-w-3xl">
          <div className="mb-8 flex justify-center">
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-green-500/20 shadow-[0_0_60px_hsl(140_80%_45%_/_0.3)]">
              <CheckCircle className="h-12 w-12 text-green-500" />
            </div>
          </div>

          <h1 className="mb-6 text-center text-3xl font-black leading-tight md:text-5xl lg:text-6xl">
            Parabéns! Seu acesso foi{" "}
            <span className="text-gradient">liberado</span>.
          </h1>

          <p className="mx-auto mb-10 max-w-2xl text-center text-lg text-muted-foreground md:text-xl">
            Você acaba de garantir o <strong className="text-foreground">Pacote STL do Mago</strong>. Enviamos os dados de acesso para o seu e-mail.
          </p>

          <div className="card-dark mx-auto max-w-2xl border-primary/30 p-8 text-center md:p-12">
            <h2 className="mb-6 text-xl font-black md:text-2xl">
              E agora? Siga os passos:
            </h2>

            <div className="space-y-4 text-left">
              <StepItem
                icon={<Mail className="h-6 w-6 text-primary" />}
                title="1. Acesse seu e-mail"
                description="Abra a mensagem de confirmação e clique no link de acesso enviado. Verifique também a caixa de spam."
              />
              <StepItem
                icon={<Download className="h-6 w-6 text-primary" />}
                title="2. Baixe seus arquivos"
                description="Dentro da área de membros você encontra todas as pastas organizadas por categoria, prontas para download."
              />
              <StepItem
                icon={<Shield className="h-6 w-6 text-primary" />}
                title="3. Imprima com segurança"
                description="Use o guia de escala incluído para ajustar 25mm ou 32mm e mande ver na impressora 3D."
              />
            </div>

            <div className="mt-8 flex flex-col items-center gap-4">
              <a
                href="https://app.zuptos.com.br/checkout/8b22d48b460d1578"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-buy inline-flex w-full items-center justify-center text-foreground sm:w-auto"
              >
                ACESSAR ÁREA DE MEMBROS
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

          <div className="mt-10 text-center">
            <p className="text-sm text-muted-foreground">
              Dúvidas? Entre em contato com o suporte respondendo ao e-mail de confirmação.
            </p>
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

interface StepItemProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function StepItem({ icon, title, description }: StepItemProps) {
  return (
    <div className="flex items-start gap-4 rounded-xl border border-border/50 bg-background/40 p-4">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
        {icon}
      </div>
      <div>
        <h3 className="mb-1 font-bold text-foreground">{title}</h3>
        <p className="text-sm leading-relaxed text-muted-foreground">
          {description}
        </p>
      </div>
    </div>
  );
}

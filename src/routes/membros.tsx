import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Castle,
  Download,
  Gift,
  Home,
  LifeBuoy,
  Lock,
  LogOut,
  Package,
  Swords,
  Users,
  Crown,
  Ghost,
  Sparkles,
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { listStlFiles, type StlFileItem } from "@/lib/stl-files.functions";
import campanhaImg from "@/assets/mago-campanha.jpg.asset.json";

export const Route = createFileRoute("/membros")({
  loader: () => listStlFiles(),
  head: () => ({
    meta: [
      { title: "Área de Membros | STL do Mago" },
      {
        name: "description",
        content:
          "Área de membros do STL do Mago. Baixe seus pacotes de miniaturas STL organizados por categoria.",
      },
      { property: "og:title", content: "Área de Membros | STL do Mago" },
      {
        property: "og:description",
        content: "Acesse e baixe seus pacotes de miniaturas STL do Mago.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: MembrosPage,
});

const TABS = ["Home", "Miniaturas", "Cenários", "Bônus", "Extras"] as const;

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  Home: <Home className="h-4 w-4" />,
  Miniaturas: <Swords className="h-4 w-4" />,
  Cenários: <Castle className="h-4 w-4" />,
  Bônus: <Gift className="h-4 w-4" />,
  Extras: <Sparkles className="h-4 w-4" />,
};

function MembrosPage() {
  const packs = Route.useLoaderData();
  const [activeTab, setActiveTab] = useState<(typeof TABS)[number]>("Home");

  const visiblePacks =
    activeTab === "Home"
      ? packs
      : packs.filter((pack) => pack.category === activeTab);

  return (
    <main className="min-h-screen overflow-x-hidden bg-background text-foreground">
      <div className="flex min-h-screen min-w-0">
        {/* SIDEBAR */}
        <aside className="hidden w-56 shrink-0 flex-col border-r border-border/50 bg-card/60 p-6 md:flex">
          <div className="mb-8 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/15 text-primary">
              <Crown className="h-5 w-5" />
            </div>
            <span className="text-sm font-black uppercase tracking-wide">
              STL do Mago
            </span>
          </div>

          <p className="mb-6 text-xs text-muted-foreground">
            Olá, aventureiro! Seus arquivos estão liberados.
          </p>

          <nav className="flex flex-col gap-1 text-sm">
            <SidebarItem icon={<Home className="h-4 w-4" />} active>
              Início
            </SidebarItem>
            <SidebarItem icon={<Swords className="h-4 w-4" />}>
              Meus Packs
            </SidebarItem>
            <SidebarItem icon={<Gift className="h-4 w-4" />}>
              Bônus
            </SidebarItem>
            <SidebarItem icon={<LifeBuoy className="h-4 w-4" />}>
              Suporte
            </SidebarItem>
            <SidebarItem icon={<LogOut className="h-4 w-4" />}>
              Sair
            </SidebarItem>
          </nav>

          <div className="mt-auto overflow-hidden rounded-xl border border-border/50">
            <img
              src={campanhaImg.url}
              alt="Campanha Completa STL do Mago"
              className="h-full w-full object-cover"
            />
          </div>
        </aside>

        {/* CONTEÚDO */}
        <div className="min-w-0 flex-1">
          <div className="members-mobile-header grid-cols-[minmax(0,1fr)_auto] items-center gap-3 border-b border-border/50 bg-card/80 px-4 py-3 backdrop-blur-sm">
            <div className="flex min-w-0 items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary">
                <Crown className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm font-black uppercase">STL do Mago</p>
                <p className="truncate text-xs text-muted-foreground">Seus arquivos estão liberados</p>
              </div>
            </div>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              aria-label="Abrir suporte"
              className="h-10 w-10 shrink-0 text-muted-foreground hover:text-primary"
            >
              <LifeBuoy />
            </Button>
          </div>

          {/* HERO BANNER */}
          <header className="relative overflow-hidden border-b border-border/50">
            <img
              src={campanhaImg.url}
              alt=""
              aria-hidden
              className="absolute inset-0 h-full w-full object-cover opacity-25"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-background/40 to-background" />
            <div className="relative z-10 flex flex-col items-center px-4 py-8 text-center sm:px-6 md:py-16">
              <h1 className="text-2xl font-black sm:text-3xl md:text-4xl">
                <span className="text-gradient">STL do Mago</span>
              </h1>
              <p className="mt-3 max-w-xl text-sm text-muted-foreground md:text-base">
                Sua coleção completa de miniaturas STL prontas pra imprimir.
                Clique nos cards abaixo para baixar cada pacote.
              </p>
              <Button asChild className="btn-buy mt-5 h-12 w-full max-w-sm !px-4 !py-3 text-sm text-foreground sm:mt-6 sm:w-auto sm:!px-5">
                <a href="#packs">
                  <Download className="h-4 w-4" />
                  COMO BAIXAR MEUS ARQUIVOS
                </a>
              </Button>
            </div>
          </header>

          {/* TABS */}
          <div className="relative min-w-0 border-b border-border/50 px-3 md:px-8">
            <div
              role="tablist"
              aria-label="Categorias de arquivos"
              className="flex max-w-full gap-1 overflow-x-auto py-3 pr-8 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              {TABS.map((tab) => (
                <Button
                  key={tab}
                  type="button"
                  role="tab"
                  aria-selected={activeTab === tab}
                  onClick={() => setActiveTab(tab)}
                  variant="ghost"
                  className={`h-11 shrink-0 gap-2 rounded-lg px-3 text-sm font-semibold transition-colors sm:px-4 ${
                  activeTab === tab
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-card hover:text-foreground"
                }`}
                >
                  {CATEGORY_ICONS[tab]}
                  {tab}
                </Button>
              ))}
            </div>
            <div aria-hidden className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-r from-transparent to-background md:hidden" />
          </div>

          {/* GRID DE PACKS */}
          <section id="packs" className="min-w-0 scroll-mt-4 px-3 py-6 sm:px-4 md:px-8 md:py-8">
            <h2 className="mb-4 flex min-w-0 items-center gap-2 text-lg font-bold sm:mb-6">
              <Ghost className="h-5 w-5 text-primary" />
              {activeTab === "Home" ? "Todos os Packs" : activeTab}
            </h2>

            {visiblePacks.length === 0 ? (
              <p className="rounded-xl border border-dashed border-border/50 p-8 text-center text-sm text-muted-foreground">
                Nenhum arquivo publicado nesta categoria ainda. Volte em breve!
              </p>
            ) : (
              <div className="grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4">
                {visiblePacks.map((pack, index) => (
                  <PackCard key={pack.id} pack={pack} index={index} />
                ))}
              </div>
            )}
          </section>

          {/* FOOTER */}
          <footer className="border-t border-border/50 px-3 py-6 text-center md:px-8">
            <p className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
              <Users className="h-3.5 w-3.5" />© 2026 STL do Mago. Todos os
              direitos reservados.
              {/* Cadeado escondido: acesso do administrador */}
              <Link
                to="/auth"
                aria-label="Acesso do administrador"
                className="text-muted-foreground/30 transition-colors hover:text-muted-foreground"
              >
                <Lock className="h-3 w-3" />
              </Link>
            </p>
          </footer>
        </div>
      </div>
    </main>
  );
}

function PackCard({ pack, index }: { pack: StlFileItem; index: number }) {
  return (
    <article
      className="card-dark overflow-hidden !p-0 animate-fade-in"
      style={{
        animationDelay: `${Math.min(index, 8) * 60}ms`,
        animationFillMode: "both",
      }}
    >
      <div className="relative aspect-[5/4] overflow-hidden sm:aspect-[4/3]">
        {pack.imageUrl ? (
          <img
            src={pack.imageUrl}
            alt={pack.name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-primary/10 text-primary">
            <Package className="h-12 w-12" />
          </div>
        )}
        <span className="absolute left-3 top-3 rounded-full bg-primary/90 px-3 py-1 text-xs font-bold uppercase tracking-wide text-primary-foreground">
          {pack.category}
        </span>
      </div>

      <div className="p-3 sm:p-4">
        <h3 className="text-sm font-black leading-tight sm:text-base">
          {pack.name}
        </h3>
        {pack.description ? (
          <p className="mt-1 text-[11px] leading-snug text-muted-foreground sm:text-xs">
            {pack.description}
          </p>
        ) : null}

        <Button asChild className="btn-buy mt-3 h-12 w-full !rounded-lg !px-3 !py-3 text-sm text-foreground sm:mt-4 sm:!px-4">
          <a href={pack.downloadUrl} target="_blank" rel="noopener noreferrer">
            <Download className="h-4 w-4" />
            Download
          </a>
        </Button>
      </div>
    </article>
  );
}

interface SidebarItemProps {
  icon: React.ReactNode;
  active?: boolean;
  children: React.ReactNode;
}

function SidebarItem({ icon, active, children }: SidebarItemProps) {
  return (
    <span
      className={`flex items-center gap-3 rounded-lg px-3 py-2 ${
        active
          ? "bg-primary/15 font-semibold text-primary"
          : "text-muted-foreground"
      }`}
    >
      {icon}
      {children}
    </span>
  );
}

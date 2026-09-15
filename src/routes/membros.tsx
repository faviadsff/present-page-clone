import { createFileRoute } from "@tanstack/react-router";
import {
  Castle,
  Download,
  Gift,
  Home,
  LifeBuoy,
  LogOut,
  Swords,
  Users,
  Crown,
  Ghost,
  Sparkles,
} from "lucide-react";
import { useState } from "react";
import heroisImg from "@/assets/herois-e-racas.jpg.asset.json";
import monstrosImg from "@/assets/monstros-e-feras.jpg.asset.json";
import viloesImg from "@/assets/viloes-e-chefes.jpg.asset.json";
import npcsImg from "@/assets/npcs.jpg.asset.json";
import cenariosImg from "@/assets/cenarios.jpg.asset.json";
import muitoMaisImg from "@/assets/muito-mais.jpg.asset.json";
import bonusImg from "@/assets/bonus-especial.jpg.asset.json";
import campanhaImg from "@/assets/mago-campanha.jpg.asset.json";

export const Route = createFileRoute("/membros")({
  head: () => ({
    meta: [
      { title: "Área de Membros | STL do Mago" },
      {
        name: "description",
        content:
          "Área de membros do STL do Mago. Baixe seus pacotes de miniaturas STL organizados por categoria.",
      },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: MembrosPage,
});

// Troque pelos links reais de download (Google Drive, Dropbox, etc.)
const DOWNLOAD_LINK = "#";

interface Pack {
  name: string;
  description: string;
  image: string;
  category: string;
}

const PACKS: Pack[] = [
  {
    name: "Heróis e Raças",
    description: "Guerreiros, magos, elfos, anões e todas as raças jogáveis",
    image: heroisImg.url,
    category: "Miniaturas",
  },
  {
    name: "Monstros e Feras",
    description: "Dragões, goblins, bestas e criaturas selvagens",
    image: monstrosImg.url,
    category: "Miniaturas",
  },
  {
    name: "Vilões e Chefes",
    description: "Chefes épicos em escala grande, alto nível de detalhe",
    image: viloesImg.url,
    category: "Miniaturas",
  },
  {
    name: "NPCs",
    description: "Comerciantes, taverneiros, guardas e personagens de apoio",
    image: npcsImg.url,
    category: "Miniaturas",
  },
  {
    name: "Cenários e Dioramas",
    description: "Arenas, castelos, masmorras e terrenos de batalha",
    image: cenariosImg.url,
    category: "Cenários",
  },
  {
    name: "Muito Mais",
    description: "Props, itens mágicos, marcadores e peças extras",
    image: muitoMaisImg.url,
    category: "Extras",
  },
  {
    name: "Bônus 1: Miniaturas e Figuras",
    description: "Pack extra de miniaturas e figuras exclusivas",
    image: bonusImg.url,
    category: "Bônus",
  },
  {
    name: "Bônus 2: Monstros e Criaturas",
    description: "Pack extra de monstros e criaturas",
    image: monstrosImg.url,
    category: "Bônus",
  },
  {
    name: "Bônus 3: Designs Decorativos",
    description: "Peças decorativas para pintura e exposição",
    image: muitoMaisImg.url,
    category: "Bônus",
  },
  {
    name: "Bônus 4: Cenários e Dioramas",
    description: "Pack extra de cenários e dioramas completos",
    image: cenariosImg.url,
    category: "Bônus",
  },
  {
    name: "Campanha Completa",
    description: "Vilões épicos + cenário de batalha + módulo de aventura",
    image: campanhaImg.url,
    category: "Extras",
  },
];

const TABS = ["Home", "Miniaturas", "Cenários", "Bônus", "Extras"] as const;

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  Home: <Home className="h-4 w-4" />,
  Miniaturas: <Swords className="h-4 w-4" />,
  Cenários: <Castle className="h-4 w-4" />,
  Bônus: <Gift className="h-4 w-4" />,
  Extras: <Sparkles className="h-4 w-4" />,
};

function MembrosPage() {
  const [activeTab, setActiveTab] = useState<(typeof TABS)[number]>("Home");

  const visiblePacks =
    activeTab === "Home"
      ? PACKS
      : PACKS.filter((pack) => pack.category === activeTab);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="flex min-h-screen">
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
        <div className="flex-1">
          {/* HERO BANNER */}
          <header className="relative overflow-hidden border-b border-border/50">
            <img
              src={campanhaImg.url}
              alt=""
              aria-hidden
              className="absolute inset-0 h-full w-full object-cover opacity-25"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-background/40 to-background" />
            <div className="relative z-10 flex flex-col items-center px-6 py-12 text-center md:py-16">
              <h1 className="text-3xl font-black md:text-4xl">
                <span className="text-gradient">STL do Mago</span>
              </h1>
              <p className="mt-3 max-w-xl text-sm text-muted-foreground md:text-base">
                Sua coleção completa de miniaturas STL prontas pra imprimir.
                Clique nos cards abaixo para baixar cada pacote.
              </p>
              <a
                href="#packs"
                className="btn-buy mt-6 inline-flex items-center gap-2 !px-5 !py-2.5 text-sm text-foreground"
              >
                <Download className="h-4 w-4" />
                COMO BAIXAR MEUS ARQUIVOS
              </a>
            </div>
          </header>

          {/* TABS */}
          <div className="border-b border-border/50 px-4 md:px-8">
            <div className="flex gap-1 overflow-x-auto py-3">
              {TABS.map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  className={`inline-flex items-center gap-2 whitespace-nowrap rounded-lg px-4 py-2 text-sm font-semibold transition-colors ${
                    activeTab === tab
                      ? "bg-green-600 text-foreground"
                      : "text-muted-foreground hover:bg-card hover:text-foreground"
                  }`}
                >
                  {CATEGORY_ICONS[tab]}
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* GRID DE PACKS */}
          <section id="packs" className="px-4 py-8 md:px-8">
            <h2 className="mb-6 flex items-center gap-2 text-lg font-bold">
              <Ghost className="h-5 w-5 text-primary" />
              {activeTab === "Home" ? "Todos os Packs" : activeTab}
            </h2>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {visiblePacks.map((pack, index) => (
                <article
                  key={pack.name}
                  className="card-dark overflow-hidden !p-0 animate-fade-in"
                  style={{
                    animationDelay: `${Math.min(index, 8) * 60}ms`,
                    animationFillMode: "both",
                  }}
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={pack.image}
                      alt={pack.name}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                    <span className="absolute left-3 top-3 rounded-full bg-primary/90 px-3 py-1 text-xs font-bold uppercase tracking-wide text-primary-foreground">
                      {pack.category}
                    </span>
                  </div>

                  <div className="p-4">
                    <h3 className="text-base font-black leading-tight">
                      {pack.name}
                    </h3>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {pack.description}
                    </p>

                    <a
                      href={DOWNLOAD_LINK}
                      className="btn-buy mt-4 flex w-full items-center justify-center gap-2 !rounded-lg !px-4 !py-2.5 !text-sm text-foreground"
                    >
                      <Download className="h-4 w-4" />
                      Download
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </section>

          {/* FOOTER */}
          <footer className="border-t border-border/50 px-4 py-6 text-center md:px-8">
            <p className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
              <Users className="h-3.5 w-3.5" />© 2026 STL do Mago. Todos os
              direitos reservados.
            </p>
          </footer>
        </div>
      </div>
    </main>
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

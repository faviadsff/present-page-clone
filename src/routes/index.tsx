import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import { Castle, Check, CreditCard, Diamond, Lock, Shield, Skull, Sparkles, Swords, X } from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CheckoutLink } from "@/components/sales/CheckoutLink";
import { MiniatureGallery, type GalleryItem } from "@/components/sales/MiniatureGallery";
import { MobileStickyCta } from "@/components/sales/MobileStickyCta";
import { TestimonialCards, type Testimonial } from "@/components/sales/TestimonialCards";
import { VslPlayer } from "@/components/sales/VslPlayer";
import { scrollToPricing } from "@/lib/checkout-utm";

import imgViloes from "@/assets/viloes-e-chefes.jpg.asset.json";
import imgMonstros from "@/assets/monstros-e-feras.jpg.asset.json";
import imgHerois from "@/assets/herois-e-racas.jpg.asset.json";
import imgNPCs from "@/assets/npcs.jpg.asset.json";
import imgCenarios from "@/assets/cenarios.jpg.asset.json";
import imgMuitoMais from "@/assets/muito-mais.jpg.asset.json";
import g01 from "@/assets/stl-g01.webp.asset.json";
import g02 from "@/assets/stl-g02.webp.asset.json";
import g03 from "@/assets/stl-g03.webp.asset.json";
import g04 from "@/assets/stl-g04.webp.asset.json";
import g05 from "@/assets/stl-g05.webp.asset.json";
import g06 from "@/assets/stl-g06.webp.asset.json";
import g07 from "@/assets/stl-g07.webp.asset.json";
import g08 from "@/assets/stl-g08.webp.asset.json";
import g09 from "@/assets/stl-g09.webp.asset.json";
import g10 from "@/assets/stl-g10.webp.asset.json";
import g11 from "@/assets/stl-g11.webp.asset.json";
import g12 from "@/assets/stl-g12.webp.asset.json";
import b1 from "@/assets/stl-b1.webp.asset.json";
import b2 from "@/assets/stl-b2.webp.asset.json";
import b3 from "@/assets/stl-b3.webp.asset.json";
import b4 from "@/assets/stl-b4.webp.asset.json";
import thumbPremium from "@/assets/pacote-premium.jpg.asset.json";
import thumbBasico from "@/assets/pacote-basico.jpg.asset.json";
import thumbPremiumDesconto from "@/assets/pacote-premium-desconto.jpg.asset.json";

/* Links de checkout — NÃO alterar. */
const CHECKOUT_PREMIUM = "https://pay.wiapy.com/Ey_3zhXcvuRm";
const CHECKOUT_BASIC = "https://pay.wiapy.com/Lmot7yzK4XXe";
const CHECKOUT_DOWNSELL = "https://pay.wiapy.com/ubjw8IZYMUK6";

/**
 * PLACEHOLDERS da galeria: troque `image` pelas fotos reais das miniaturas impressas.
 * Por enquanto usam as artes das categorias.
 */
const GALLERY: ReadonlyArray<GalleryItem> = [
  { name: "Lich Ancião", category: "Vilões e Chefes", image: g01.url },
  { name: "Dragão Vermelho", category: "Monstros e Feras", image: g02.url },
  { name: "Paladino Anão", category: "Heróis e Raças", image: g03.url },
  { name: "Taverneiro", category: "NPCs", image: g04.url },
  { name: "Torre em Ruínas", category: "Cenários", image: g05.url },
  { name: "Baú do Tesouro", category: "Cenários", image: g06.url },
  { name: "Hidra das Profundezas", category: "Monstros e Feras", image: g07.url },
  { name: "Elfa Arqueira", category: "Heróis e Raças", image: g08.url },
  { name: "Mercador Viajante", category: "NPCs", image: g09.url },
  { name: "Ponte de Pedra", category: "Cenários", image: g10.url },
  { name: "Cavaleiro Sombrio", category: "Vilões e Chefes", image: g11.url },
  { name: "Troll das Cavernas", category: "Monstros e Feras", image: g12.url },
];

/** Depoimentos reais: prints de WhatsApp dos clientes. */
const TESTIMONIALS: ReadonlyArray<Testimonial> = [
  { image: depoWa1.url, alt: "Depoimento de cliente no WhatsApp sobre o pack de miniaturas" },
  { image: depoWa2.url, alt: "Depoimento de cliente no WhatsApp sobre os modelos organizados" },
  { image: depoWa3.url, alt: "Depoimento de cliente no WhatsApp sobre venda de miniaturas impressas" },
];

const BONUSES: ReadonlyArray<{ icon: ReactNode; image: string; title: string; description: string }> = [
  { icon: <Swords className="h-6 w-6" />, image: b1.url, title: "Pack de Miniaturas e Figuras", description: "Heróis e figuras extras para montar seu grupo." },
  { icon: <Skull className="h-6 w-6" />, image: b2.url, title: "Pack de Monstros e Criaturas", description: "Criaturas prontas para qualquer encontro." },
  { icon: <Sparkles className="h-6 w-6" />, image: b3.url, title: "Pack de Designs Decorativos", description: "Peças decorativas para enfeitar a mesa e a estante." },
  { icon: <Castle className="h-6 w-6" />, image: b4.url, title: "Pack de Cenários e Dioramas", description: "Terrenos e dioramas para batalhas épicas." },
];

const PREMIUM_FEATURES: ReadonlyArray<string> = [
  "+2.000 miniaturas STL organizadas por sistema",
  "Guia de escala 25mm/32mm e impressão",
  "Bônus 1: Pack de Miniaturas e Figuras",
  "Bônus 2: Pack de Monstros e Criaturas",
  "Bônus 3: Pack de Designs Decorativos",
  "Bônus 4: Pack de Cenários e Dioramas",
];

const FAQ_ITEMS: ReadonlyArray<{ question: string; answer: string }> = [
  { question: "Vale a pena se tem arquivo grátis na internet?", answer: "Os gratuitos costumam vir com malha quebrada e sem organização. Aqui está tudo testado, catalogado e pronto pra imprimir sem perder tempo." },
  { question: "Como eu recebo os arquivos?", answer: "Acesso liberado na hora, direto no seu e-mail, com link de download organizado por pastas." },
  { question: "Funciona pra qualquer impressora 3D?", answer: "Sim, os arquivos STL são compatíveis com qualquer impressora e fatiador (Cura, PrusaSlicer, etc)." },
  { question: "Preciso saber modelar em 3D?", answer: "Não. É só baixar o arquivo, jogar no fatiador e imprimir. Nenhuma edição necessária." },
  { question: "Os arquivos já vêm no tamanho certo pra RPG?", answer: "Sim, o guia de escala mostra como ajustar pra base padrão 25mm ou 32mm de mesa." },
  { question: "E se eu não gostar?", answer: "Você tem 7 dias de garantia incondicional. Devolvemos 100% do valor." },
  { question: "O acesso é vitalício?", answer: "Sim, pagamento único e acesso pra sempre, sem mensalidade." },
  { question: "Posso usar pra board game também?", answer: "Sim, boa parte do acervo (cenários, monstros, NPCs) serve pra qualquer board game de fantasia." },
];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "STL do Mago | +2.000 Miniaturas STL de RPG Prontas pra Imprimir" },
      { name: "description", content: "Pare de pagar caro por miniatura: +2.000 STLs de RPG e board games organizados por sistema. Pagamento único, acesso imediato e garantia de 7 dias." },
      { property: "og:title", content: "STL do Mago | +2.000 Miniaturas STL de RPG Prontas pra Imprimir" },
      { property: "og:description", content: "Monstros, heróis, vilões, NPCs e cenários prontos pra imprimir. Pagamento único e acesso vitalício." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    scripts: [
      {
        type: "text/javascript",
        children: `!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '1608076314324559');
fbq('track', 'PageView');`,
      },
    ],
  }),
  component: SalesPage,
});

function CtaButton({ children = "QUERO MINHAS 2.000 MINIATURAS" }: { children?: ReactNode }) {
  return (
    <button
      type="button"
      onClick={scrollToPricing}
      className="btn-buy animate-pulse-glow-green inline-flex w-full items-center justify-center text-center text-base font-black text-foreground sm:w-auto sm:text-lg"
    >
      {children}
    </button>
  );
}

function PaymentTrust() {
  return (
    <div className="mt-4 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs text-muted-foreground">
      <span className="inline-flex items-center gap-1"><Diamond className="h-4 w-4 text-green-500" /> Pix</span>
      <span className="inline-flex items-center gap-1"><CreditCard className="h-4 w-4 text-green-500" /> Cartão</span>
      <span className="inline-flex items-center gap-1 text-green-500"><Lock className="h-4 w-4" /> Compra 100% segura</span>
    </div>
  );
}

function SectionTitle({ children }: { children: ReactNode }) {
  return <h2 className="mb-8 text-center text-2xl font-black md:mb-12 md:text-4xl">{children}</h2>;
}

function SalesPage() {
  const [downsellOpen, setDownsellOpen] = useState(false);

  return (
    <>
      <div
        aria-hidden="true"
        dangerouslySetInnerHTML={{
          __html: `<noscript><img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id=1608076314324559&ev=PageView&noscript=1" /></noscript>`,
        }}
      />
      <div className="sticky top-0 z-50 w-full bg-primary px-3 py-2 text-center text-primary-foreground">
        <p className="text-xs font-bold sm:text-sm">🎁 4 bônus exclusivos inclusos por tempo limitado</p>
      </div>
      <MobileStickyCta />

      <main className="min-h-screen bg-background">
        {/* HERO */}
        <section id="hero" className="relative overflow-hidden pb-10 pt-8">
          <div className="absolute inset-0 bg-gradient-to-b from-secondary/50 to-background" />
          <div className="absolute right-1/4 top-1/4 h-96 w-96 rounded-full bg-primary/20 blur-3xl" />
          <div className="relative z-10 mx-auto w-full max-w-6xl px-4">
            <div className="mb-8 flex flex-col items-center text-center">
              <h1 className="mb-6 max-w-4xl text-[1.7rem] font-black leading-tight tracking-tight text-foreground sm:text-4xl md:text-5xl">
                Pare de pagar R$ 60 por miniatura: <span className="text-gradient">+2.000 STLs de RPG</span> prontos pra imprimir hoje
              </h1>
              <CtaButton />
              <ul className="mt-4 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-xs text-muted-foreground sm:text-sm">
                <li>✓ Acesso imediato</li>
                <li aria-hidden="true">·</li>
                <li>✓ Pagamento único</li>
                <li aria-hidden="true">·</li>
                <li>✓ Garantia de 7 dias</li>
              </ul>
            </div>
            <div id="vsl" className="vsl-frame">
              <VslPlayer />
            </div>
          </div>
        </section>

        {/* GALERIA */}
        <section className="overflow-hidden bg-section-2 px-0 py-0 md:py-16">
          <div className="container-narrow">
            <h2 className="mb-2 px-4 text-center text-2xl font-black md:mb-10 md:text-4xl">
              Veja algumas das miniaturas <span className="text-gradient">que você vai receber</span>
            </h2>
            <MiniatureGallery items={GALLERY} />
            <div className="mt-1 flex justify-center px-4 md:mt-10">
              <CtaButton />
            </div>
          </div>
        </section>

        {/* SEM / COM */}
        <section className="section-padding bg-section-1">
          <div className="container-narrow">
            <div className="grid gap-4 md:grid-cols-2 md:gap-6">
              <CompareCard
                tone="bad"
                title="SEM O STL DO MAGO"
                items={["Gasta uma fortuna em miniatura oficial", "Perde tempo caçando arquivo em grupo", "Baixa STL grátis e a malha vem quebrada"]}
                result="Resultado: mesa sem graça, dinheiro no lixo"
              />
              <CompareCard
                tone="good"
                title="COM O STL DO MAGO"
                items={["+2.000 miniaturas prontas pra imprimir", "Guia de escala 25mm/32mm incluso", "Paga uma vez, acesso vitalício"]}
                result="Resultado: mesa épica, gastando pouco"
              />
            </div>
            <div className="mt-6 flex flex-col items-center justify-center gap-2 rounded-xl border border-primary/40 bg-primary/10 p-4 text-center text-sm font-bold sm:flex-row sm:text-base">
              <span className="text-destructive">1 miniatura oficial: R$ 40 a R$ 80</span>
              <span className="text-primary" aria-hidden="true">→</span>
              <span className="text-green-500">2.000 miniaturas aqui: R$ 37,90</span>
            </div>
          </div>
        </section>

        {/* DEPOIMENTOS */}
        <section className="section-padding bg-section-2">
          <div className="container-narrow">
            <SectionTitle>
              VEJA O QUE OS NOSSOS <span className="text-gradient">CLIENTES ESTÃO DIZENDO:</span>
            </SectionTitle>
            <TestimonialCards items={TESTIMONIALS} />
          </div>
        </section>

        {/* BÔNUS */}
        <section className="section-padding bg-section-1">
          <div className="container-narrow">
            <div className="mb-8 text-center">
              <p className="mb-2 text-2xl font-black md:text-3xl">🎁 NÃO ACABOU!</p>
              <p className="text-base text-muted-foreground md:text-lg">Bônus liberados por tempo limitado</p>
            </div>
            <div className="grid grid-cols-2 gap-3 md:gap-4 lg:grid-cols-4">
              {BONUSES.map((b, i) => (
                <div key={b.title} className="card-dark flex flex-col items-center text-center">
                  <img src={b.image} alt={b.title} loading="lazy" decoding="async" width={400} height={400} className="mb-3 aspect-square w-full rounded-xl object-cover" />
                  <p className="text-xs font-bold uppercase text-primary">Bônus {i + 1}</p>
                  <h3 className="mt-1 font-bold text-foreground">{b.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{b.description}</p>
                </div>
              ))}
            </div>
            <p className="mt-8 text-center text-lg font-black text-green-500 md:text-xl">Inclusos GRÁTIS no Pacote Premium</p>
          </div>
        </section>

        {/* PREÇOS */}
        <section id="pricing" className="section-padding bg-section-2">
          <div className="container-narrow">
            <div className="mb-10 text-center">
              <span className="highlight-box mb-4 inline-block">Preço promocional por tempo limitado</span>
              <h2 className="mt-4 text-2xl font-black md:text-4xl">ESCOLHA SEU PACOTE</h2>
            </div>
            <div className="mx-auto grid max-w-4xl items-center gap-6 md:grid-cols-2">
              <div className="card-dark relative overflow-hidden border-2 !border-primary shadow-[0_0_40px_hsl(43_90%_52%_/_0.25)] md:scale-105">
                <div className="absolute right-0 top-0 rounded-bl-lg bg-primary px-4 py-1 text-xs font-bold text-primary-foreground">MAIS VENDIDO</div>
                <img src={thumbPremium.url} alt="Pacote Premium do STL do Mago" loading="lazy" decoding="async" width={1000} height={1000} className="mb-4 aspect-square w-full rounded-xl object-cover" />
                <h3 className="mb-4 text-center text-2xl font-bold">Pacote Premium</h3>
                <ul className="mb-6 space-y-2">
                  {PREMIUM_FEATURES.map((f) => (
                    <li key={f} className="flex items-center gap-3">
                      <Check className="h-4 w-4 flex-shrink-0 text-green-500" />
                      <span className="text-sm text-foreground/90">{f}</span>
                    </li>
                  ))}
                </ul>
                <div className="mb-6 text-center">
                  <div className="flex items-center justify-center gap-1">
                    <span className="text-2xl font-bold">R$</span>
                    <span className="text-6xl font-black text-gradient">37,90</span>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">pagamento único · acesso vitalício</p>
                </div>
                <CheckoutLink
                  id="begin_checkout"
                  href={CHECKOUT_PREMIUM}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-buy animate-pulse-glow-green inline-flex w-full items-center justify-center text-center font-black text-foreground"
                >
                  LIBERAR ACESSO AGORA · R$ 37,90
                </CheckoutLink>
                <PaymentTrust />
              </div>

              <div className="card-dark">
                <img src={thumbBasico.url} alt="Pacote Básico do STL do Mago" loading="lazy" decoding="async" width={1000} height={1000} className="mb-4 aspect-square w-full rounded-xl object-cover" />
                <h3 className="mb-4 text-center text-2xl font-bold">Pacote Básico</h3>
                <ul className="mb-6 space-y-3">
                  {["Acesso a uma seleção de arquivos STL", "Download digital instantâneo"].map((f) => (
                    <li key={f} className="flex items-center gap-3">
                      <Check className="h-5 w-5 flex-shrink-0 text-green-500" />
                      <span className="text-sm text-foreground/90">{f}</span>
                    </li>
                  ))}
                </ul>
                <div className="mb-6 text-center">
                  <div className="flex items-center justify-center gap-1">
                    <span className="text-2xl font-bold">R$</span>
                    <span className="text-5xl font-black text-primary">17,90</span>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">pagamento único · acesso vitalício</p>
                </div>
                <button
                  id="begin_checkout_basic"
                  type="button"
                  onClick={() => setDownsellOpen(true)}
                  className="inline-flex w-full cursor-pointer items-center justify-center rounded-lg border-2 border-white bg-transparent px-6 py-4 text-center font-bold text-white"
                >
                  QUERO O PACOTE BÁSICO!
                </button>
                <PaymentTrust />
              </div>
            </div>
          </div>
        </section>

        {/* GARANTIA */}
        <section className="section-padding bg-section-1">
          <div className="container-narrow">
            <div className="card-dark mx-auto flex max-w-3xl flex-col items-center gap-6 border-green-500/30 p-6 text-center md:flex-row md:p-10 md:text-left">
              <div className="relative flex h-32 w-28 shrink-0 items-center justify-center">
                <Shield className="absolute inset-0 h-full w-full fill-primary/15 text-primary" strokeWidth={1.5} />
                <div className="relative text-center leading-none">
                  <p className="text-3xl font-black text-primary">7</p>
                  <p className="text-sm font-black text-primary">DIAS</p>
                </div>
              </div>
              <div>
                <h2 className="mb-3 text-2xl font-black md:text-3xl">GARANTIA DE 7 DIAS</h2>
                <p className="mb-6 text-muted-foreground md:text-lg">
                  Se você não gostar do pacote, pode pedir reembolso total em até 7 dias. Risco zero para você.
                </p>
                <CtaButton>QUERO MINHAS 2.000 MINIATURAS SEM RISCO</CtaButton>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="section-padding bg-section-2">
          <div className="container-narrow mx-auto max-w-3xl">
            <SectionTitle>
              PERGUNTAS <span className="text-gradient">FREQUENTES</span>
            </SectionTitle>
            <Accordion type="single" collapsible defaultValue="item-0" className="space-y-4">
              {FAQ_ITEMS.map((item, index) => (
                <AccordionItem key={item.question} value={`item-${index}`} className="card-dark border-border/50 px-6">
                  <AccordionTrigger className="text-left font-semibold hover:text-primary hover:no-underline">{item.question}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">{item.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* RODAPÉ */}
        <footer className="section-padding border-t border-border/50 bg-section-1 pb-28 md:pb-12">
          <div className="container-narrow text-center">
            <p className="text-sm text-muted-foreground">© 2026 Mega Pacote STL 3D. Todos os direitos reservados.</p>
            <p className="mt-2 text-xs text-muted-foreground/60">
              Este site é um canal de distribuição digital de arquivos STL. Os modelos são indicados para impressão 3D pessoal e comercial de peças físicas, conforme os termos de cada licença.
            </p>
            <Link
              to="/obrigado"
              aria-label="Área reservada"
              className="mt-4 inline-flex rounded-sm opacity-20 transition-opacity hover:opacity-100 focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <Lock className="h-4 w-4 text-muted-foreground" />
            </Link>
          </div>
        </footer>
      </main>

      {/* DOWNSELL */}
      {downsellOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true">
          <div className="absolute inset-0 bg-black/80" onClick={() => setDownsellOpen(false)} aria-hidden="true" />
          <div className="relative z-10 w-full max-w-md rounded-lg border border-border bg-card p-6 shadow-lg">
            <button
              type="button"
              onClick={() => setDownsellOpen(false)}
              className="absolute right-4 top-4 rounded-sm text-muted-foreground transition-opacity hover:text-foreground"
              aria-label="Fechar"
            >
              <X className="h-4 w-4" />
            </button>
            <div className="mb-4 text-center">
              <h2 className="text-xl font-black text-gradient">ESPERE! OFERTA ESPECIAL</h2>
              <p className="mt-1 text-sm text-muted-foreground">A equipe STL dos Magos preparou uma oferta exclusiva para você.</p>
            </div>
            <div className="space-y-4">
              <img src={thumbPremiumDesconto.url} alt="Pacote Premium com desconto especial" loading="lazy" decoding="async" width={1000} height={1000} className="mx-auto mb-4 aspect-square w-full max-w-56 rounded-xl object-cover" />
              <p className="text-center text-foreground">
                Ganhe <span className="font-bold text-green-500">R$ 10,00 de desconto</span> no Pacote Premium e leve todos os bônus inclusos!
              </p>
              <div className="rounded-lg bg-secondary/50 p-4 text-center">
                <p className="text-sm text-muted-foreground line-through">De R$ 37,90</p>
                <p className="text-3xl font-black text-gradient">R$ 27,90</p>
                <p className="text-xs text-muted-foreground">Pacote Premium + todos os bônus</p>
              </div>
              <CheckoutLink
                id="begin_checkout_downsell"
                href={CHECKOUT_DOWNSELL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-buy inline-flex w-full items-center justify-center text-center text-foreground"
                onClick={() => setDownsellOpen(false)}
              >
                EU QUERO ESSA OFERTA!
              </CheckoutLink>
              <CheckoutLink
                id="begin_checkout_basic"
                href={CHECKOUT_BASIC}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center text-sm text-muted-foreground underline underline-offset-4 hover:text-foreground"
                onClick={() => setDownsellOpen(false)}
              >
                Quero continuar com o pacote básico
              </CheckoutLink>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

interface CompareCardProps {
  tone: "bad" | "good";
  title: string;
  items: ReadonlyArray<string>;
  result: string;
}

function CompareCard({ tone, title, items, result }: CompareCardProps) {
  const bad = tone === "bad";
  const color = bad ? "text-destructive" : "text-green-500";
  return (
    <div className={`card-dark p-5 md:p-6 ${bad ? "border-destructive/30 bg-destructive/5" : "border-green-500/30"}`}>
      <h3 className={`mb-5 text-center text-lg font-black md:text-xl ${color}`}>{title}</h3>
      <ul className="space-y-3">
        {items.map((text) => (
          <li key={text} className={`flex items-center gap-3 rounded-lg border bg-background/40 p-3 ${bad ? "border-destructive/10" : "border-green-500/10"}`}>
            <span className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full ${bad ? "bg-destructive/20" : "bg-green-500/20"}`}>
              {bad ? <X className={`h-5 w-5 ${color}`} strokeWidth={3} /> : <Check className={`h-5 w-5 ${color}`} strokeWidth={3} />}
            </span>
            <span className="text-sm font-semibold text-foreground md:text-base">{text}</span>
          </li>
        ))}
      </ul>
      <div className={`mt-4 rounded-lg border p-3 text-center ${bad ? "border-destructive/20 bg-destructive/10" : "border-green-500/20 bg-green-500/10"}`}>
        <span className={`text-sm font-bold ${color}`}>{result}</span>
      </div>
    </div>
  );
}


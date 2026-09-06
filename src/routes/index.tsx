import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Check, AlertTriangle } from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import img0 from "@/assets/bordados-DKIxUOCc.jpg.asset.json";
import img1 from "@/assets/copa-DXg8eKat.webp.asset.json";
import img2 from "@/assets/imgi_10_KbRcbyJ-CCbV1Pyn.webp.asset.json";
import img3 from "@/assets/imgi_11_KbRcyjR-C9wKcza2.webp.asset.json";
import img4 from "@/assets/imgi_12_KbRcDva-BRBrykzJ.webp.asset.json";
import img5 from "@/assets/imgi_13_fIIKkSn-3q6nPj8Y.webp.asset.json";
import img6 from "@/assets/imgi_14_fIIKOFt-DrlOT3L8.webp.asset.json";
import img7 from "@/assets/imgi_15_KbRrXUX-B7dNbi2d.webp.asset.json";
import img8 from "@/assets/imgi_1_KQNPeWB-D9d9-B09.webp.asset.json";
import img9 from "@/assets/imgi_2_KbRrVfI-DADcOfDM.webp.asset.json";
import img10 from "@/assets/imgi_3_KQNPtft-jJrvJbbN.webp.asset.json";
import img11 from "@/assets/imgi_4_KQNPPbR-Hp0QWFjQ.webp.asset.json";
import img12 from "@/assets/imgi_5_KQNPD0X-Bl-v5W96.webp.asset.json";
import img13 from "@/assets/imgi_6_KbRrWlt-CrrCAzgT.webp.asset.json";
import img14 from "@/assets/imgi_7_Impressao-07-B3RCvh-G.webp.asset.json";
import img15 from "@/assets/imgi_8_Impressao-08-BuvyrUKU.webp.asset.json";
import img16 from "@/assets/imgi_9_KbRcpTv-DoT3QpJN.webp.asset.json";
import img17 from "@/assets/mascote-89sfIWzW.webp.asset.json";

/** Mapa nome-do-arquivo -> URL do asset publicado em CDN. */
const IMG: Record<string, string> = {
  "bordados-DKIxUOCc.jpg": img0.url,
  "copa-DXg8eKat.webp": img1.url,
  "imgi_10_KbRcbyJ-CCbV1Pyn.webp": img2.url,
  "imgi_11_KbRcyjR-C9wKcza2.webp": img3.url,
  "imgi_12_KbRcDva-BRBrykzJ.webp": img4.url,
  "imgi_13_fIIKkSn-3q6nPj8Y.webp": img5.url,
  "imgi_14_fIIKOFt-DrlOT3L8.webp": img6.url,
  "imgi_15_KbRrXUX-B7dNbi2d.webp": img7.url,
  "imgi_1_KQNPeWB-D9d9-B09.webp": img8.url,
  "imgi_2_KbRrVfI-DADcOfDM.webp": img9.url,
  "imgi_3_KQNPtft-jJrvJbbN.webp": img10.url,
  "imgi_4_KQNPPbR-Hp0QWFjQ.webp": img11.url,
  "imgi_5_KQNPD0X-Bl-v5W96.webp": img12.url,
  "imgi_6_KbRrWlt-CrrCAzgT.webp": img13.url,
  "imgi_7_Impressao-07-B3RCvh-G.webp": img14.url,
  "imgi_8_Impressao-08-BuvyrUKU.webp": img15.url,
  "imgi_9_KbRcpTv-DoT3QpJN.webp": img16.url,
  "mascote-89sfIWzW.webp": img17.url,
};

const FAQ_ITEMS: ReadonlyArray<{ question: string; answer: string }> = [
  {
    "question": "Esses arquivos funcionam na minha impressora 3D?",
    "answer": "Sim! Os arquivos STL são universais e funcionam em praticamente todas as impressoras 3D do mercado, como Ender 3, Anycubic, Creality, Prusa e muitas outras. Basta usar seu fatiador preferido (Cura, PrusaSlicer, etc.) e mandar imprimir."
  },
  {
    "question": "Como eu acesso os arquivos depois de pagar?",
    "answer": "Logo após a confirmação do pagamento, você receberá um e-mail com o link de acesso para baixar todos os arquivos. O acesso é imediato e vitalício."
  },
  {
    "question": "Os arquivos estão organizados?",
    "answer": "Sim! Todos os arquivos estão separados por pastas e categorias, facilitando a busca pelo modelo que você precisa. Você não vai perder tempo procurando."
  },
  {
    "question": "Preciso baixar todos os arquivos de uma vez?",
    "answer": "Não! Você pode baixar apenas as pastas e categorias que interessam no momento. Não precisa ocupar todo o espaço do seu computador de uma vez."
  },
  {
    "question": "Preciso saber modelar em 3D pra usar o pack?",
    "answer": "Não! Os modelos já vêm prontos. Você só precisa abrir no fatiador, configurar os parâmetros de impressão e mandar imprimir. É simples assim."
  },
  {
    "question": "Posso vender as impressões dos modelos?",
    "answer": "Sim! Você pode imprimir e vender as peças físicas sem problemas. Muitos de nossos clientes já lucram vendendo na Shopee, OLX, Mercado Livre e feiras locais."
  },
  {
    "question": "Vale a pena pagar por isso se há modelos grátis?",
    "answer": "Com certeza! Modelos gratuitos geralmente vêm com erros, são incompletos ou de baixa qualidade. Nosso pack tem arquivos testados, organizados e prontos para uso profissional, economizando horas de busca e frustração."
  },
  {
    "question": "Recebo o acesso na hora?",
    "answer": "Sim! Após a confirmação do pagamento (que é instantânea para PIX e cartão), você recebe o acesso imediatamente no seu e-mail."
  },
  {
    "question": "Funciona pra iniciante em impressão 3D?",
    "answer": "Sim! Muitos de nossos clientes são iniciantes. Os arquivos são fáceis de usar e você pode começar com modelos simples até pegar prática."
  }
];

const PREMIUM_BONUSES: ReadonlyArray<string> = [
  "Bônus 1: Modelos de Veículos 3D Profissionais",
  "Bônus 2: Coleção Heróis da Marvel",
  "Bônus 3: Pack de Chaveiros Personalizados",
  "Bônus 4: Ferramentas 3D Úteis e Inovadoras",
  "Bônus 5: Modelos Flexíveis e Articulados",
  "Bônus 6: Coleção Clássicos dos Desenhos",
  "Bônus 7: Coleção Máscaras 3D",
  "Bônus 8: Coleção Pokémon 3D",
  "Bônus 9: Módulo Copa do Mundo",
  "Bônus 10: Módulo Mascotes",
  "Bônus 11: Módulo Bordados"
];

const PLAYER_ID = "696bdc9c9e020389f6684bd5";
const PLAYER_ACCOUNT = "d9d9e187-4260-4eb4-9363-5bcdac2c24d6";
const CHECKOUT_PREMIUM = "https://ggcheckout.app/checkout/v5/US0R6AVPEESuj1qmeYcF";
const CHECKOUT_BASIC = "https://ggcheckout.app/checkout/v5/k22Mgh9AbZBrC7iQ1jhO";

/**
 * VSL da converteai/vturb. O src do iframe é definido apos a montagem porque o
 * SDK precisa estar carregado antes do embed para registrar o player.
 */
function VslPlayer() {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const sdkSrc = "https://scripts.converteai.net/lib/js/smartplayer-wc/v4/sdk.js";
    if (!document.querySelector(`script[src="${sdkSrc}"]`)) {
      const script = document.createElement("script");
      script.src = sdkSrc;
      script.async = true;
      document.head.appendChild(script);
    }

    const applySrc = () => {
      const frame = iframeRef.current;
      if (!frame) return;
      const current = frame.src;
      if (!current || current.includes("about:blank")) {
        frame.src =
          `https://scripts.converteai.net/${PLAYER_ACCOUNT}/players/${PLAYER_ID}/v4/embed.html` +
          (window.location.search || "?") +
          "&vl=" +
          encodeURIComponent(window.location.href);
      }
    };

    const timers = [100, 500, 1500].map((delay) => window.setTimeout(applySrc, delay));
    return () => timers.forEach((timer) => window.clearTimeout(timer));
  }, []);

  return (
    <div id={`ifr_${PLAYER_ID}_wrapper`} style={{ margin: "0 auto", width: "100%", maxWidth: "400px" }}>
      <div
        id={`ifr_${PLAYER_ID}_aspect`}
        style={{ position: "relative", padding: "177.77777777777777% 0 0 0" }}
      >
        <iframe
          ref={iframeRef}
          frameBorder="0"
          allowFullScreen
          src="about:blank"
          id={`ifr_${PLAYER_ID}`}
          title="VSL STL Video"
          referrerPolicy="origin"
          style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
        />
      </div>
    </div>
  );
}

function FaqAccordion() {
  return (
    <Accordion type="single" collapsible className="space-y-4">
      {FAQ_ITEMS.map((item, index) => (
        <AccordionItem key={item.question} value={`item-${index}`} className="card-dark border-border/50 px-6">
          <AccordionTrigger className="text-left font-semibold hover:text-primary hover:no-underline">
            {item.question}
          </AccordionTrigger>
          <AccordionContent className="text-muted-foreground">{item.answer}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

function UpsellDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button id="begin_checkout" variant="outline" className="w-full py-6 text-lg font-bold border-border hover:bg-secondary">
          ESCOLHER O BÁSICO
        </Button>
      </DialogTrigger>
      <DialogContent className="!inset-0 !m-auto !h-fit !translate-x-0 !translate-y-0 flex max-h-[85dvh] w-[calc(100%-1.5rem)] max-w-md flex-col gap-3 overflow-hidden rounded-xl p-4 sm:max-w-lg sm:p-5">
        <DialogHeader className="shrink-0 pr-6">
          <DialogTitle className="text-center text-lg font-black sm:text-xl">
            Desconto exclusivo para o Premium
          </DialogTitle>
        </DialogHeader>
        <div className="min-h-0 flex-1 space-y-3 overflow-y-auto overscroll-contain pr-1">
          <div className="rounded-lg border border-primary/40 bg-primary/10 p-3 text-center">
            <p className="text-xs text-muted-foreground sm:text-sm">Leve o Premium agora por apenas:</p>
            <div className="mt-1 flex items-center justify-center gap-1">
              <span className="text-xl font-bold">R$</span>
              <span className="text-4xl font-black text-primary">19,90</span>
            </div>
          </div>
          <div>
            <p className="mb-2 text-center text-xs font-semibold text-muted-foreground sm:text-sm">
              Todos os pacotes extras inclusos no Premium:
            </p>
            <div className="grid gap-1.5 sm:grid-cols-2">
              {PREMIUM_BONUSES.map((bonus) => (
                <div key={bonus} className="flex items-start gap-2">
                  <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-green-500" />
                  <span className="text-foreground/90 text-xs leading-snug">{bonus}</span>
                </div>
              ))}
              <div className="flex items-start gap-2 rounded-md bg-red-500/10 p-1.5 sm:col-span-2">
                <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-red-400" />
                <span className="text-xs font-semibold text-red-400">🎁 BÔNUS ESPECIAL: Coleção 3D de Natal</span>
              </div>
            </div>
          </div>
        </div>
        <div className="grid shrink-0 gap-2 border-t border-border/50 pt-3">
          <a
            href={CHECKOUT_PREMIUM}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-cta inline-flex w-full items-center justify-center px-3 py-3 text-center text-sm text-foreground sm:text-base"
          >
            QUERO O PREMIUM COM DESCONTO
          </a>
          <Button variant="secondary" className="w-full text-sm text-muted-foreground" asChild>
            <a href={CHECKOUT_BASIC} target="_blank" rel="noopener noreferrer">
              continuar com o pacote basico
            </a>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Ultimate Pack STL | +100.000 Arquivos para Impressão 3D" },
      {
        name: "description",
        content:
          "Transforme sua impressora 3D em uma fonte constante de renda com mais de 100 mil projetos prontos, testados e organizados para imprimir e vender.",
      },
      { property: "og:title", content: "Ultimate Pack STL | +100.000 Arquivos para Impressão 3D" },
      {
        property: "og:description",
        content:
          "Mais de 100 mil modelos STL prontos para imprimir e vender. Acesso imediato e vitalício.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SalesPage,
});

/** Contador regressivo de oferta exibido no topo da pagina. */
function CountdownBar() {
  const [secondsLeft, setSecondsLeft] = useState(15 * 60);

  useEffect(() => {
    const id = window.setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => window.clearInterval(id);
  }, []);

  const minutes = String(Math.floor(secondsLeft / 60)).padStart(2, "0");
  const seconds = String(secondsLeft % 60).padStart(2, "0");

  return (
    <div className="sticky top-0 z-50 w-full bg-primary px-3 py-2 text-center text-primary-foreground">
      <p className="text-xs font-bold uppercase tracking-wide sm:text-sm">
        Oferta por tempo limitado - expira em{" "}
        <span className="tabular-nums">
          {minutes}:{seconds}
        </span>
      </p>
    </div>
  );
}

const MODEL_SLIDES: { key: string; label: string }[] = [
  { key: "imgi_1_KQNPeWB-D9d9-B09.webp", label: "Animes" },
  { key: "imgi_2_KbRrVfI-DADcOfDM.webp", label: "Desenhos" },
  { key: "imgi_3_KQNPtft-jJrvJbbN.webp", label: "Religião" },
  { key: "imgi_4_KQNPPbR-Hp0QWFjQ.webp", label: "Mitologia" },
  { key: "imgi_5_KQNPD0X-Bl-v5W96.webp", label: "Decoração" },
  { key: "imgi_6_KbRrWlt-CrrCAzgT.webp", label: "E muito mais" },
];

function ModelsMarquee() {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const pausedRef = useRef(false);
  const offsetRef = useRef(0);
  const targetRef = useRef(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let raf = 0;
    let last = performance.now();
    const speed = 40; // px por segundo

    const tick = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.1);
      last = now;
      const half = track.scrollWidth / 2;

      // avanca suavemente ate o alvo definido pelas setas
      const delta = targetRef.current - offsetRef.current;
      if (Math.abs(delta) > 0.5) {
        offsetRef.current += delta * Math.min(1, dt * 8);
      } else {
        offsetRef.current = targetRef.current;
        if (!pausedRef.current && !reduced) {
          offsetRef.current += speed * dt;
          targetRef.current = offsetRef.current;
        }
      }

      if (half > 0 && offsetRef.current >= half) {
        offsetRef.current -= half;
        targetRef.current -= half;
      }
      if (offsetRef.current < 0 && half > 0) {
        offsetRef.current += half;
        targetRef.current += half;
      }

      track.scrollLeft = offsetRef.current;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const step = (dir: -1 | 1) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector("figure");
    const amount = card ? card.clientWidth + 16 : 280;
    targetRef.current += dir * amount;
  };

  const pause = () => {
    pausedRef.current = true;
  };
  const resume = () => {
    pausedRef.current = false;
  };

  return (
    <div className="relative w-full px-10 sm:px-14">
      <div
        ref={trackRef}
        onMouseEnter={pause}
        onMouseLeave={resume}
        onPointerDown={pause}
        onPointerUp={resume}
        onPointerCancel={resume}
        onTouchStart={pause}
        onTouchEnd={resume}
        className="flex gap-4 overflow-hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >

        {[0, 1].map((copy) =>
          MODEL_SLIDES.map((slide) => (
            <figure
              key={`${copy}-${slide.key}`}
              aria-hidden={copy === 1}
              className="w-[240px] shrink-0 overflow-hidden rounded-lg shadow-lg sm:w-[280px]"
            >
              <img
                src={IMG[slide.key]}
                alt={`Modelos 3D da categoria ${slide.label}`}
                loading="lazy"
                decoding="async"
                width={400}
                height={400}
                className="aspect-square h-full w-full object-cover"
              />
              <figcaption className="rounded-b-lg border border-border bg-card p-4 text-center text-xl font-bold capitalize tracking-tight text-card-foreground">
                {slide.label}
              </figcaption>
            </figure>
          )),
        )}
      </div>
      <button
        type="button"
        onClick={() => step(-1)}
        aria-label="Modelo anterior"
        className="absolute -left-0 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-card/80 text-foreground transition-colors hover:bg-card sm:left-2"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 19-7-7 7-7" /><path d="M19 12H5" /></svg>
      </button>
      <button
        type="button"
        onClick={() => step(1)}
        aria-label="Próximo modelo"
        className="absolute -right-0 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-card/80 text-foreground transition-colors hover:bg-card sm:right-2"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
      </button>
    </div>
  );
}


function SalesPage() {
  return (
    <>
    <CountdownBar />
    <main className="min-h-screen bg-background"><section className="relative min-h-screen flex items-center section-padding overflow-hidden"><div className="absolute inset-0 bg-gradient-to-b from-secondary/50 to-background"></div><div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl"></div><div className="container-narrow relative z-10 w-full"><div className="flex justify-center mb-4 animate-fade-in"><span className="highlight-box flex items-center gap-2 bg-red-500/20 text-red-400 border-red-500/30 text-center px-3 py-1">🎅 NATAL 3D! Aproveite os descontos especiais de dezembro.</span></div><div className="flex justify-center mb-6 animate-fade-in"><span className="highlight-box flex items-center gap-2 justify-center"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-star w-4 h-4 fill-current"><path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" /></svg>4,98 (5286 AVALIAÇÕES)</span></div><h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-center leading-tight mb-6 px-2">TRANSFORME SUA IMPRESSORA 3D EM UMA <span className="text-gradient">MÁQUINA DE LUCRO</span> COM +DE 100 MIL PROJETOS!</h1><p className="text-lg md:text-xl text-muted-foreground text-center max-w-2xl mx-auto mb-4 px-4">Com esse PACK você tem acesso imediato a milhares de modelos prontos para lucrar!</p><div className="flex flex-col items-center gap-2 mb-8 text-foreground/90 px-4"><p className="flex items-center gap-2 justify-center text-center w-full max-w-md"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-zap w-4 h-4 text-primary flex-shrink-0"><path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z" /></svg><span className="text-sm md:text-base">Não precisa criar nada do zero, basta baixar e imprimir</span></p><p className="flex items-center gap-2 justify-center text-center w-full max-w-md"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-zap w-4 h-4 text-primary flex-shrink-0"><path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z" /></svg><span className="text-sm md:text-base">Arquivos testados, otimizados e organizados por nichos</span></p><p className="flex items-center gap-2 justify-center text-center w-full max-w-md"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-zap w-4 h-4 text-primary flex-shrink-0"><path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z" /></svg><span className="text-sm md:text-base">Modelos que já vendem na Shopee e OLX</span></p><p className="flex items-center gap-2 justify-center text-center w-full max-w-md"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-zap w-4 h-4 text-primary flex-shrink-0"><path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z" /></svg><span className="text-sm md:text-base">Acesso imediato</span></p></div><div className="flex justify-center mb-8 px-4"><VslPlayer></VslPlayer></div><div className="flex flex-col items-center gap-4 mb-8"><button onClick={() => document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth", block: "start" })} className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-primary hover:bg-primary/90 h-10 px-4 py-2 btn-cta text-foreground w-full sm:w-auto text-lg"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-download mr-2 w-5 h-5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" x2="12" y1="15" y2="3" /></svg>BAIXAR PACOTE COM DESCONTO!<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right ml-2 w-5 h-5"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg></button></div><div className="flex flex-wrap justify-center items-center gap-8 text-sm text-muted-foreground"><div className="flex items-center gap-2"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-package w-5 h-5 text-primary"><path d="M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z" /><path d="M12 22V12" /><path d="m3.3 7 7.703 4.734a2 2 0 0 0 1.994 0L20.7 7" /><path d="m7.5 4.27 9 5.15" /></svg><span>+100.000 arquivos STL</span></div><div className="flex items-center gap-2"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-star w-5 h-5 text-accent fill-accent"><path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" /></svg><span>4.98/5 avaliações</span></div><div className="flex items-center gap-2"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-download w-5 h-5 text-green-500"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" x2="12" y1="15" y2="3" /></svg><span>Acesso imediato</span></div></div></div></section><section className="section-padding bg-secondary/30"><div className="container-narrow"><div className="text-center mb-12"><span className="highlight-box mb-4 inline-block"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-lightbulb w-4 h-4 inline mr-2"><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" /><path d="M9 18h6" /><path d="M10 22h4" /></svg>ESTE PACK FOI FEITO PARA FACILITAR A SUA VIDA...</span></div><div className="grid md:grid-cols-2 gap-4 mb-12"><div className="flex items-start gap-4 p-5 rounded-xl bg-card/50 border border-border/50 hover:border-primary/30 transition-colors"><div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x w-4 h-4 text-primary"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg></div><p className="text-foreground/90 text-lg">Chega de perder horas procurando modelos 3D e acabar com arquivos ruins.</p></div><div className="flex items-start gap-4 p-5 rounded-xl bg-card/50 border border-border/50 hover:border-primary/30 transition-colors"><div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x w-4 h-4 text-primary"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg></div><p className="text-foreground/90 text-lg">Pare de gastar caro comprando modelos individuais que nem sempre valem o investimento.</p></div><div className="flex items-start gap-4 p-5 rounded-xl bg-card/50 border border-border/50 hover:border-primary/30 transition-colors"><div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x w-4 h-4 text-primary"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg></div><p className="text-foreground/90 text-lg">Diga adeus à frustração de ter sua impressora parada por falta de variedade.</p></div><div className="flex items-start gap-4 p-5 rounded-xl bg-card/50 border border-border/50 hover:border-primary/30 transition-colors"><div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x w-4 h-4 text-primary"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg></div><p className="text-foreground/90 text-lg">Comece a lucrar de verdade com milhares de modelos prontos para imprimir e vender.</p></div></div></div></section><section className="section-padding"><div className="container-narrow"><div className="text-center mb-12"><h2 className="text-2xl md:text-4xl font-black mt-4">COM NOSSO MATERIAL <span className="text-gradient">VOCÊ TERÁ:</span></h2></div><div className="grid md:grid-cols-2 gap-6 mb-12"><div className="card-dark text-center hover:border-primary/50 transition-all duration-300 hover:-translate-y-1"><div className="w-14 h-14 rounded-2xl bg-primary/20 flex items-center justify-center mx-auto mb-4"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-lightbulb w-7 h-7 text-primary"><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" /><path d="M9 18h6" /><path d="M10 22h4" /></svg></div><h3 className="text-xl font-bold mb-2">IDEIAS INFINITAS PARA VENDER</h3><p className="text-muted-foreground">Tenha acesso a uma biblioteca com milhares de temas e categorias.</p></div><div className="card-dark text-center hover:border-primary/50 transition-all duration-300 hover:-translate-y-1"><div className="w-14 h-14 rounded-2xl bg-primary/20 flex items-center justify-center mx-auto mb-4"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-clock w-7 h-7 text-primary"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg></div><h3 className="text-xl font-bold mb-2">MAIS TEMPO LIVRE</h3><p className="text-muted-foreground">Tudo organizado e separado por pastas, pronto para imprimir.</p></div><div className="card-dark text-center hover:border-primary/50 transition-all duration-300 hover:-translate-y-1"><div className="w-14 h-14 rounded-2xl bg-primary/20 flex items-center justify-center mx-auto mb-4"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-trending-up w-7 h-7 text-primary"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17" /><polyline points="16 7 22 7 22 13" /></svg></div><h3 className="text-xl font-bold mb-2">LUCROS PREVISÍVEIS</h3><p className="text-muted-foreground">Modelos testados e aprovados que vendem com frequência e garantem retorno constante.</p></div><div className="card-dark text-center hover:border-primary/50 transition-all duration-300 hover:-translate-y-1"><div className="w-14 h-14 rounded-2xl bg-primary/20 flex items-center justify-center mx-auto mb-4"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-shield w-7 h-7 text-primary"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" /></svg></div><h3 className="text-xl font-bold mb-2">ACESSO RÁPIDO E SEGURO</h3><p className="text-muted-foreground">Baixe tudo de forma simples e use no computador, celular ou HD externo.</p></div></div></div></section><section className="section-padding bg-secondary/30"><div className="container-narrow"><div className="text-center mb-12"><h2 className="text-2xl md:text-4xl font-black">VEJA OS MODELOS QUE <span className="text-gradient">VOCÊ IRÁ RECEBER:</span></h2></div><ModelsMarquee></ModelsMarquee></div></section><section className="section-padding"><div className="container-narrow"><div className="grid md:grid-cols-2 gap-6"><div className="card-dark border-destructive/30"><h3 className="text-xl font-bold text-center mb-6 text-destructive">SEM O NOSSO MEGA PACK:</h3><div className="space-y-4"><div className="flex items-start gap-3"><div className="flex-shrink-0 w-6 h-6 rounded-full bg-destructive/20 flex items-center justify-center mt-0.5"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x w-3 h-3 text-destructive"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg></div><span className="text-muted-foreground">Perde tempo caçando arquivos em sites e grupos</span></div><div className="flex items-start gap-3"><div className="flex-shrink-0 w-6 h-6 rounded-full bg-destructive/20 flex items-center justify-center mt-0.5"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x w-3 h-3 text-destructive"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg></div><span className="text-muted-foreground">Encontra modelos quebrados, incompletos ou incompatíveis</span></div><div className="flex items-start gap-3"><div className="flex-shrink-0 w-6 h-6 rounded-full bg-destructive/20 flex items-center justify-center mt-0.5"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x w-3 h-3 text-destructive"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg></div><span className="text-muted-foreground">Precisa pagar caro por cada modelo individual</span></div><div className="flex items-start gap-3"><div className="flex-shrink-0 w-6 h-6 rounded-full bg-destructive/20 flex items-center justify-center mt-0.5"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x w-3 h-3 text-destructive"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg></div><span className="text-muted-foreground">Fica limitado a poucos projetos e ideias</span></div><div className="flex items-start gap-3"><div className="flex-shrink-0 w-6 h-6 rounded-full bg-destructive/20 flex items-center justify-center mt-0.5"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x w-3 h-3 text-destructive"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg></div><span className="text-muted-foreground">Corre risco com arquivos maliciosos</span></div></div></div><div className="card-dark border-green-500/30"><h3 className="text-xl font-bold text-center mb-6 text-green-500">COM O NOSSO MEGA PACK:</h3><div className="space-y-4"><div className="flex items-start gap-3"><div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center mt-0.5"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check w-3 h-3 text-green-500"><path d="M20 6 9 17l-5-5" /></svg></div><span className="text-foreground/90">Acesso instantâneo a mais de 100 mil modelos organizados</span></div><div className="flex items-start gap-3"><div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center mt-0.5"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check w-3 h-3 text-green-500"><path d="M20 6 9 17l-5-5" /></svg></div><span className="text-foreground/90">Arquivos testados, compatíveis e prontos para uso</span></div><div className="flex items-start gap-3"><div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center mt-0.5"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check w-3 h-3 text-green-500"><path d="M20 6 9 17l-5-5" /></svg></div><span className="text-foreground/90">Economia total, sem mensalidade nem taxas extras</span></div><div className="flex items-start gap-3"><div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center mt-0.5"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check w-3 h-3 text-green-500"><path d="M20 6 9 17l-5-5" /></svg></div><span className="text-foreground/90">Material exclusivo com temas variados</span></div><div className="flex items-start gap-3"><div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center mt-0.5"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check w-3 h-3 text-green-500"><path d="M20 6 9 17l-5-5" /></svg></div><span className="text-foreground/90">Suporte completo e acesso vitalício</span></div></div></div></div></div></section><section className="section-padding bg-secondary/30"><div className="container-narrow"><div className="text-center mb-12"><h2 className="text-2xl md:text-4xl font-black">FACILIDADES QUE SÓ <span className="text-gradient">ESSE PACK OFERECE!</span></h2></div><div className="grid md:grid-cols-2 gap-6"><div className="card-dark hover:border-primary/50 transition-all duration-300"><div className="flex items-start gap-4"><span className="text-3xl">🕒</span><div><h3 className="text-lg font-bold mb-2">MAIS TEMPO PARA LUCRAR</h3><p className="text-muted-foreground">Pare de perder horas procurando arquivos e use esse tempo para imprimir e vender mais.</p></div></div></div><div className="card-dark hover:border-primary/50 transition-all duration-300"><div className="flex items-start gap-4"><span className="text-3xl">💰</span><div><h3 className="text-lg font-bold mb-2">UM NEGÓCIO PRONTO</h3><p className="text-muted-foreground">Com milhares de modelos disponíveis, você começa a lucrar rapidamente, mesmo com pouca experiência.</p></div></div></div><div className="card-dark hover:border-primary/50 transition-all duration-300"><div className="flex items-start gap-4"><span className="text-3xl">🧠</span><div><h3 className="text-lg font-bold mb-2">LIBERDADE PARA PRODUZIR</h3><p className="text-muted-foreground">Imprima o que quiser, quando quiser, e tenha liberdade total pra gerenciar suas vendas.</p></div></div></div><div className="card-dark hover:border-primary/50 transition-all duration-300"><div className="flex items-start gap-4"><span className="text-3xl">🔥</span><div><h3 className="text-lg font-bold mb-2">VENDAS CONSISTENTES</h3><p className="text-muted-foreground">Use modelos com alta demanda e conquiste um fluxo constante de pedidos e faturamento.</p></div></div></div></div></div></section><section className="section-padding bg-background"><div className="container-narrow"><div className="text-center mb-8"><h2 className="mb-8 font-black text-3xl text-white md:text-4xl">COMPRE HOJE E GANHE 11 BÔNUS EXCLUSIVOS 🎁</h2></div><div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 mb-8"><div className="flex flex-col overflow-hidden rounded-xl bg-white text-gray-800 shadow-lg"><div className="p-2 text-center text-white bg-primary"><h3 className="font-bold uppercase text-lg">BÔNUS 1:</h3></div><div className="flex flex-1 flex-col p-6"><h4 className="mb-4 text-center text-2xl font-bold uppercase text-[#1E2A38]">Pack de Veículos 3D Profissionais</h4><div className="mb-4 overflow-hidden rounded-lg"><img alt="Image for bonus 1" loading="lazy" width="400" height="300" decoding="async" className="aspect-[4/3] w-full object-cover" src={IMG["imgi_7_Impressao-07-B3RCvh-G.webp"]} /></div><p className="flex-grow mb-4 text-center text-lg font-medium text-gray-800">Carros, motos, caminhões e muito mais prontos para impressão 3D. Crie miniaturas detalhadas, peças colecionáveis ou personalize modelos para revenda.</p><div className="mt-auto text-center"><p className="text-lg font-bold"><span className="text-base font-normal text-red-500 line-through">De R$ 29,90</span><br /><span className="font-bold text-xl text-green-600">VAI SAIR DE GRAÇA</span></p></div></div></div><div className="flex flex-col overflow-hidden rounded-xl bg-white text-gray-800 shadow-lg"><div className="p-2 text-center text-white bg-primary"><h3 className="font-bold uppercase text-lg">BÔNUS 2:</h3></div><div className="flex flex-1 flex-col p-6"><h4 className="mb-4 text-center text-2xl font-bold uppercase text-[#1E2A38]">Coleção Heróis da Marvel</h4><div className="mb-4 overflow-hidden rounded-lg"><img alt="Image for bonus 2" loading="lazy" width="400" height="300" decoding="async" className="aspect-[4/3] w-full object-cover" src={IMG["imgi_8_Impressao-08-BuvyrUKU.webp"]} /></div><p className="flex-grow mb-4 text-center text-lg font-medium text-gray-800">Receba uma coleção incrível de modelos STL de heróis lendários da Marvel: personagens, símbolos e acessórios que fazem sucesso entre colecionadores e fãs.</p><div className="mt-auto text-center"><p className="text-lg font-bold"><span className="text-base font-normal text-red-500 line-through">De R$ 39,90</span><br /><span className="font-bold text-xl text-green-600">VAI SAIR DE GRAÇA</span></p></div></div></div><div className="flex flex-col overflow-hidden rounded-xl bg-white text-gray-800 shadow-lg"><div className="p-2 text-center text-white bg-primary"><h3 className="font-bold uppercase text-lg">BÔNUS 3:</h3></div><div className="flex flex-1 flex-col p-6"><h4 className="mb-4 text-center text-2xl font-bold uppercase text-[#1E2A38]">Pack de Chaveiros Personalizados</h4><div className="mb-4 overflow-hidden rounded-lg"><img alt="Image for bonus 3" loading="lazy" width="400" height="300" decoding="async" className="aspect-[4/3] w-full object-cover" src={IMG["imgi_9_KbRcpTv-DoT3QpJN.webp"]} /></div><p className="flex-grow mb-4 text-center text-lg font-medium text-gray-800">Mais de 1.000 modelos criativos e exclusivos, incluindo logos, personagens, esportes e temas geek. Perfeito para vender como brindes ou acessórios colecionáveis.</p><div className="mt-auto text-center"><p className="text-lg font-bold"><span className="text-base font-normal text-red-500 line-through">De R$ 19,90</span><br /><span className="font-bold text-xl text-green-600">VAI SAIR DE GRAÇA</span></p></div></div></div><div className="flex flex-col overflow-hidden rounded-xl bg-white text-gray-800 shadow-lg"><div className="p-2 text-center text-white bg-primary"><h3 className="font-bold uppercase text-lg">BÔNUS 4:</h3></div><div className="flex flex-1 flex-col p-6"><h4 className="mb-4 text-center text-2xl font-bold uppercase text-[#1E2A38]">UTENSÍLIOS DOMÉSTICOS</h4><div className="mb-4 overflow-hidden rounded-lg"><img alt="Image for bonus 4" loading="lazy" width="400" height="300" decoding="async" className="aspect-[4/3] w-full object-cover" src={IMG["imgi_10_KbRcbyJ-CCbV1Pyn.webp"]} /></div><p className="flex-grow mb-4 text-center text-lg font-medium text-gray-800">Inclui modelos práticos para uso doméstico e profissional: suportes, organizadores, gabaritos e adaptadores. Tenha impressões funcionais que resolvem problemas reais no dia a dia.</p><div className="mt-auto text-center"><p className="text-lg font-bold"><span className="text-base font-normal text-red-500 line-through">De R$ 49,90</span><br /><span className="font-bold text-xl text-green-600">VAI SAIR DE GRAÇA</span></p></div></div></div><div className="flex flex-col overflow-hidden rounded-xl bg-white text-gray-800 shadow-lg"><div className="p-2 text-center text-white bg-primary"><h3 className="font-bold uppercase text-lg">BÔNUS 5:</h3></div><div className="flex flex-1 flex-col p-6"><h4 className="mb-4 text-center text-2xl font-bold uppercase text-[#1E2A38]">Modelos Flexíveis e Articulados</h4><div className="mb-4 overflow-hidden rounded-lg"><img alt="Image for bonus 5" loading="lazy" width="400" height="300" decoding="async" className="aspect-[4/3] w-full object-cover" src={IMG["imgi_11_KbRcyjR-C9wKcza2.webp"]} /></div><p className="flex-grow mb-4 text-center text-lg font-medium text-gray-800">Mais de 1.300 modelos com mecanismos de clique e movimento, como animais, brinquedos e colecionáveis interativos. Peças prontas que mais vendem em marketplaces e lojas de impressão 3D.</p><div className="mt-auto text-center"><p className="text-lg font-bold"><span className="text-base font-normal text-red-500 line-through">De R$ 59,90</span><br /><span className="font-bold text-xl text-green-600">VAI SAIR DE GRAÇA</span></p></div></div></div><div className="flex flex-col overflow-hidden rounded-xl bg-white text-gray-800 shadow-lg"><div className="p-2 text-center text-white bg-primary"><h3 className="font-bold uppercase text-lg">BÔNUS 6:</h3></div><div className="flex flex-1 flex-col p-6"><h4 className="mb-4 text-center text-2xl font-bold uppercase text-[#1E2A38]">Coleção Clássicos dos Desenhos</h4><div className="mb-4 overflow-hidden rounded-lg"><img alt="Image for bonus 6" loading="lazy" width="400" height="300" decoding="async" className="aspect-[4/3] w-full object-cover" src={IMG["imgi_12_KbRcDva-BRBrykzJ.webp"]} /></div><p className="flex-grow mb-4 text-center text-lg font-medium text-gray-800">Uma seleção nostálgica com mais de 30 personagens amados da TV: Johnny Bravo, As Meninas Superpoderosas, Dexter, Scooby Doo, Tom & Jerry e muito mais. Perfeito para colecionadores e fãs de animações.</p><div className="mt-auto text-center"><p className="text-lg font-bold"><span className="text-base font-normal text-red-500 line-through">De R$ 89,90</span><br /><span className="font-bold text-xl text-green-600">VAI SAIR DE GRAÇA</span></p></div></div></div><div className="flex flex-col overflow-hidden rounded-xl bg-white text-gray-800 shadow-lg"><div className="p-2 text-center text-white bg-primary"><h3 className="font-bold uppercase text-lg">BÔNUS 7:</h3></div><div className="flex flex-1 flex-col p-6"><h4 className="mb-4 text-center text-2xl font-bold uppercase text-[#1E2A38]">COLEÇÃO MÁSCARAS 3D</h4><div className="mb-4 overflow-hidden rounded-lg"><img alt="Image for bonus 7" loading="lazy" width="400" height="300" decoding="async" className="aspect-[4/3] w-full object-cover" src={IMG["imgi_13_fIIKkSn-3q6nPj8Y.webp"]} /></div><p className="flex-grow mb-4 text-center text-lg font-medium text-gray-800">Dezenas de máscaras detalhadas, prontas para imprimir. Ideais para cosplay, decoração e peças de alto valor. Perfeitas para vender, colecionar ou personalizar.</p><div className="mt-auto text-center"><p className="text-lg font-bold"><span className="text-base font-normal text-red-500 line-through">De R$ 69,90</span><br /><span className="font-bold text-xl text-green-600">VAI SAIR DE GRAÇA</span></p></div></div></div><div className="flex flex-col overflow-hidden rounded-xl bg-white text-gray-800 shadow-lg"><div className="p-2 text-center text-white bg-primary"><h3 className="font-bold uppercase text-lg">BÔNUS 8:</h3></div><div className="flex flex-1 flex-col p-6"><h4 className="mb-4 text-center text-2xl font-bold uppercase text-[#1E2A38]">COLEÇÃO POKÉMON 3D</h4><div className="mb-4 overflow-hidden rounded-lg"><img alt="Image for bonus 8" loading="lazy" width="400" height="300" decoding="async" className="aspect-[4/3] w-full object-cover" src={IMG["imgi_14_fIIKOFt-DrlOT3L8.webp"]} /></div><p className="flex-grow mb-4 text-center text-lg font-medium text-gray-800">Mais de 100 modelos das primeiras gerações de Pokémon. Criaturas icônicas, evoluções e itens temáticos. Perfeita para fãs, colecionadores e vendas online.</p><div className="mt-auto text-center"><p className="text-lg font-bold"><span className="text-base font-normal text-red-500 line-through">De R$ 39,90</span><br /><span className="font-bold text-xl text-green-600">VAI SAIR DE GRAÇA</span></p></div></div></div><div className="flex flex-col overflow-hidden rounded-xl bg-white text-gray-800 shadow-lg"><div className="p-2 text-center text-white bg-primary"><h3 className="font-bold uppercase text-lg">BÔNUS 9:</h3></div><div className="flex flex-1 flex-col p-6"><h4 className="mb-4 text-center text-2xl font-bold uppercase text-[#1E2A38]">MÓDULO COPA DO MUNDO</h4><div className="mb-4 overflow-hidden rounded-lg"><img alt="Image for bonus 9" loading="lazy" width="400" height="300" decoding="async" className="aspect-[4/3] w-full object-cover" src={IMG["copa-DXg8eKat.webp"]} /></div><p className="flex-grow mb-4 text-center text-lg font-medium text-gray-800">Modelos exclusivos com tema de Copa do Mundo: troféus, estádios, bolas e peças decorativas. Aproveite a onda do futebol e venda produtos temáticos com alta demanda na temporada.</p><div className="mt-auto text-center"><p className="text-lg font-bold"><span className="text-base font-normal text-red-500 line-through">De R$ 59,90</span><br /><span className="font-bold text-xl text-green-600">VAI SAIR DE GRAÇA</span></p></div></div></div><div className="flex flex-col overflow-hidden rounded-xl bg-white text-gray-800 shadow-lg"><div className="p-2 text-center text-white bg-primary"><h3 className="font-bold uppercase text-lg">BÔNUS 10:</h3></div><div className="flex flex-1 flex-col p-6"><h4 className="mb-4 text-center text-2xl font-bold uppercase text-[#1E2A38]">MÓDULO MASCOTES</h4><div className="mb-4 overflow-hidden rounded-lg"><img alt="Image for bonus 10" loading="lazy" width="400" height="300" decoding="async" className="aspect-[4/3] w-full object-cover" src={IMG["mascote-89sfIWzW.webp"]} /></div><p className="flex-grow mb-4 text-center text-lg font-medium text-gray-800">Coleção completa de mascotes 3D prontos para imprimir. Personagens carismáticos e modelos colecionáveis ideais para brindes, decoração e revenda em eventos e marketplaces.</p><div className="mt-auto text-center"><p className="text-lg font-bold"><span className="text-base font-normal text-red-500 line-through">De R$ 39,90</span><br /><span className="font-bold text-xl text-green-600">VAI SAIR DE GRAÇA</span></p></div></div></div><div className="flex flex-col overflow-hidden rounded-xl bg-white text-gray-800 shadow-lg"><div className="p-2 text-center text-white bg-primary"><h3 className="font-bold uppercase text-lg">BÔNUS 11:</h3></div><div className="flex flex-1 flex-col p-6"><h4 className="mb-4 text-center text-2xl font-bold uppercase text-[#1E2A38]">MÓDULO BORDADOS</h4><div className="mb-4 overflow-hidden rounded-lg"><img alt="Image for bonus 11" loading="lazy" width="400" height="300" decoding="async" className="aspect-[4/3] w-full object-cover" src={IMG["bordados-DKIxUOCc.jpg"]} /></div><p className="flex-grow mb-4 text-center text-lg font-medium text-gray-800">Dezenas de modelos com efeito de bordado para impressão 3D. Placas, quadros e peças decorativas com acabamento detalhado, perfeitas para personalização e presentes exclusivos.</p><div className="mt-auto text-center"><p className="text-lg font-bold"><span className="text-base font-normal text-red-500 line-through">De R$ 29,90</span><br /><span className="font-bold text-xl text-green-600">VAI SAIR DE GRAÇA</span></p></div></div></div></div><div className="my-8 text-center text-white"><p className="text-3xl font-bold mb-2">🎅 NÃO ACABOU!</p><p className="text-2xl"><span className="font-bold italic bg-red-600 px-2 rounded-md text-[25px]">BÔNUS ESPECIAL</span> liberado apenas esse mês de novembro!</p></div><div className="flex justify-center mb-8"><div className="w-full md:w-1/2 lg:w-1/3"><div className="flex flex-col overflow-hidden rounded-xl bg-white text-gray-800 shadow-lg"><div className="p-2 text-center text-white bg-red-600"><h3 className="font-bold uppercase text-lg">🎁 BÔNUS DE NATAL:</h3></div><div className="flex flex-1 flex-col p-6"><h4 className="mb-4 text-center text-2xl font-bold uppercase text-[#1E2A38]">Coleção 3D de Natal</h4><div className="mb-4 overflow-hidden rounded-lg"><img alt="Image for Christmas 3D models bonus" loading="lazy" width="400" height="300" decoding="async" className="aspect-[4/3] w-full object-cover" src={IMG["imgi_15_KbRrXUX-B7dNbi2d.webp"]} /></div><p className="flex-grow mb-4 text-center text-lg font-medium text-gray-800">Coleção exclusiva com centenas de modelos natalinos: árvores, enfeites, personagens e decorações prontas para impressão 3D. Transforme o espírito natalino em lucro com produtos personalizados e temáticos para esta temporada!</p><div className="mt-auto text-center"><p className="text-lg font-bold"><span className="text-base font-normal text-red-500 line-through">De R$ 79,90</span><br /><span className="font-bold text-xl text-green-600">VAI SAIR DE GRAÇA</span></p></div></div></div></div></div><p className="mt-8 text-lg font-medium text-white text-center">Esses bônus valem <span className="font-bold">R$ 608,80</span> e somente hoje você recebe eles <span className="font-bold text-green-600">GRATUITAMENTE!</span></p></div></section><section className="section-padding bg-secondary/30"><div className="container-narrow"><div className="text-center mb-12"><span className="highlight-box mb-4 inline-block">Depoimentos Reais</span><h2 className="text-2xl md:text-4xl font-black mt-4">VEJA O QUE OS NOSSOS <span className="text-gradient">CLIENTES ESTÃO DIZENDO:</span></h2></div><div className="grid md:grid-cols-3 gap-6"><div className="card-dark hover:border-primary/30 transition-all duration-300"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-quote w-8 h-8 text-primary/30 mb-4"><path d="M16 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z" /><path d="M5 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z" /></svg><p className="text-foreground/90 mb-6 text-sm leading-relaxed">"Tenho uma Ender 3 basicona e fiquei com medo dos modelos não rodarem. Mas já fiz mais de 40 impressões aqui e tudo saindo perfeitamente. Os arquivos são super compatíveis."</p><div className="flex items-center gap-1 mb-3"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-star w-4 h-4 text-accent fill-accent"><path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" /></svg><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-star w-4 h-4 text-accent fill-accent"><path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" /></svg><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-star w-4 h-4 text-accent fill-accent"><path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" /></svg><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-star w-4 h-4 text-accent fill-accent"><path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" /></svg><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-star w-4 h-4 text-accent fill-accent"><path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" /></svg></div><div className="flex items-center gap-2"><div><p className="font-semibold">Mariana S.</p><p className="text-sm text-muted-foreground flex items-center gap-1"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-circle-check-big w-3 h-3 text-green-500"><path d="M21.801 10A10 10 0 1 1 17 3.335" /><path d="m9 11 3 3L22 4" /></svg>Cliente Verificado</p></div></div></div><div className="card-dark hover:border-primary/30 transition-all duration-300"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-quote w-8 h-8 text-primary/30 mb-4"><path d="M16 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z" /><path d="M5 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z" /></svg><p className="text-foreground/90 mb-6 text-sm leading-relaxed">"Tinha duvida se ia conseguir vender mas comecei postando no marketplace, primeira semana nada. Ajustei fotos e preço, na segunda semana começou a vender. Hoje, 1 mês depois, já tenho cliente fixo pedindo toda semana. Ter 100 mil opções ajuda demais pra testar vários nichos."</p><div className="flex items-center gap-1 mb-3"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-star w-4 h-4 text-accent fill-accent"><path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" /></svg><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-star w-4 h-4 text-accent fill-accent"><path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" /></svg><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-star w-4 h-4 text-accent fill-accent"><path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" /></svg><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-star w-4 h-4 text-accent fill-accent"><path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" /></svg><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-star w-4 h-4 text-accent fill-accent"><path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" /></svg></div><div className="flex items-center gap-2"><div><p className="font-semibold">Adriano P.</p><p className="text-sm text-muted-foreground flex items-center gap-1"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-circle-check-big w-3 h-3 text-green-500"><path d="M21.801 10A10 10 0 1 1 17 3.335" /><path d="m9 11 3 3L22 4" /></svg>Cliente Verificado</p></div></div></div><div className="card-dark hover:border-primary/30 transition-all duration-300"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-quote w-8 h-8 text-primary/30 mb-4"><path d="M16 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z" /><path d="M5 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z" /></svg><p className="text-foreground/90 mb-6 text-sm leading-relaxed">"Achei que ia ser muita quantidade para pouca qualidade, mas testei uns 20 modelos aleatórios e todos imprimiram perfeito. Zero arquivo corrompido, zero erro. Tem coisa muito bem feita no pack. Tô usando faz 3 semanas e ainda nem explorei 5% do que tem lá dentro."</p><div className="flex items-center gap-1 mb-3"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-star w-4 h-4 text-accent fill-accent"><path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" /></svg><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-star w-4 h-4 text-accent fill-accent"><path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" /></svg><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-star w-4 h-4 text-accent fill-accent"><path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" /></svg><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-star w-4 h-4 text-accent fill-accent"><path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" /></svg><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-star w-4 h-4 text-accent fill-accent"><path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" /></svg></div><div className="flex items-center gap-2"><div><p className="font-semibold">João D.</p><p className="text-sm text-muted-foreground flex items-center gap-1"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-circle-check-big w-3 h-3 text-green-500"><path d="M21.801 10A10 10 0 1 1 17 3.335" /><path d="m9 11 3 3L22 4" /></svg>Cliente Verificado</p></div></div></div></div></div></section><section id="pricing" className="section-padding"><div className="container-narrow"><div className="text-center mb-12"><span className="highlight-box mb-4 inline-block">Oferta Especial</span><h2 className="text-2xl md:text-4xl font-black mt-4">ESCOLHA SEU PACOTE</h2></div><div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto"><div className="card-dark"><div className="text-center mb-6"><h3 className="text-2xl font-bold mb-2">Pacote Básico</h3></div><div className="space-y-3 mb-6"><div className="flex items-center gap-3"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check w-5 h-5 text-green-500 flex-shrink-0"><path d="M20 6 9 17l-5-5" /></svg><span className="text-foreground/90 text-sm">Pack com +100.000 arquivos STL</span></div><div className="flex items-center gap-3"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check w-5 h-5 text-green-500 flex-shrink-0"><path d="M20 6 9 17l-5-5" /></svg><span className="text-foreground/90 text-sm">Acesso vitalício</span></div></div><div className="text-center mb-6"><p className="text-sm text-muted-foreground mb-2">De <span className="line-through">R$ 189,90</span> por apenas:</p><div className="flex items-center justify-center gap-1"><span className="text-2xl font-bold">R$</span><span className="text-5xl font-black text-primary">9,90</span></div></div><UpsellDialog></UpsellDialog><div className="flex items-center justify-center gap-2 mt-4 text-sm text-muted-foreground"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-shield w-4 h-4"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" /></svg><span>Compra Segura</span></div></div><div className="card-dark border-primary/50 relative overflow-hidden"><div className="absolute top-0 right-0 bg-primary text-primary-foreground text-xs font-bold px-4 py-1 rounded-bl-lg">MAIS VENDIDO</div><div className="text-center mb-4"><h3 className="text-2xl font-bold mb-2">Pacote Premium</h3><div className="flex items-center justify-center gap-1 text-sm text-muted-foreground"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-star w-4 h-4 text-accent fill-accent"><path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" /></svg><span>4,98 (5286 AVALIAÇÕES)</span></div></div><div className="space-y-2 mb-6"><div className="flex items-center gap-3"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check w-4 h-4 text-green-500 flex-shrink-0"><path d="M20 6 9 17l-5-5" /></svg><span className="text-foreground/90 text-sm">Pack com +100.000 arquivos STL</span></div><div className="flex items-center gap-3"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check w-4 h-4 text-green-500 flex-shrink-0"><path d="M20 6 9 17l-5-5" /></svg><span className="text-foreground/90 text-sm">Acesso vitalício</span></div><div className="flex items-center gap-3"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check w-4 h-4 text-green-500 flex-shrink-0"><path d="M20 6 9 17l-5-5" /></svg><span className="text-foreground/90 text-sm">Bônus 1: Pack de Veículos 3D Profissionais</span></div><div className="flex items-center gap-3"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check w-4 h-4 text-green-500 flex-shrink-0"><path d="M20 6 9 17l-5-5" /></svg><span className="text-foreground/90 text-sm">Bônus 2: Coleção Heróis da Marvel</span></div><div className="flex items-center gap-3"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check w-4 h-4 text-green-500 flex-shrink-0"><path d="M20 6 9 17l-5-5" /></svg><span className="text-foreground/90 text-sm">Bônus 3: Pack de Chaveiros Personalizados</span></div><div className="flex items-center gap-3"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check w-4 h-4 text-green-500 flex-shrink-0"><path d="M20 6 9 17l-5-5" /></svg><span className="text-foreground/90 text-sm">Bônus 4: Ferramentas 3D Úteis e Inovadoras</span></div><div className="flex items-center gap-3"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check w-4 h-4 text-green-500 flex-shrink-0"><path d="M20 6 9 17l-5-5" /></svg><span className="text-foreground/90 text-sm">Bônus 5: Modelos Flexíveis e Articulados</span></div><div className="flex items-center gap-3"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check w-4 h-4 text-green-500 flex-shrink-0"><path d="M20 6 9 17l-5-5" /></svg><span className="text-foreground/90 text-sm">Bônus 6: Coleção Clássicos dos Desenhos</span></div><div className="flex items-center gap-3"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check w-4 h-4 text-green-500 flex-shrink-0"><path d="M20 6 9 17l-5-5" /></svg><span className="text-foreground/90 text-sm">Bônus 7: Coleção Máscaras 3D</span></div><div className="flex items-center gap-3"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check w-4 h-4 text-green-500 flex-shrink-0"><path d="M20 6 9 17l-5-5" /></svg><span className="text-foreground/90 text-sm">Bônus 8: Coleção Pokémon 3D</span></div><div className="flex items-center gap-3"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check w-4 h-4 text-green-500 flex-shrink-0"><path d="M20 6 9 17l-5-5" /></svg><span className="text-foreground/90 text-sm">Bônus 9: Módulo Copa do Mundo</span></div><div className="flex items-center gap-3"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check w-4 h-4 text-green-500 flex-shrink-0"><path d="M20 6 9 17l-5-5" /></svg><span className="text-foreground/90 text-sm">Bônus 10: Módulo Mascotes</span></div><div className="flex items-center gap-3"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check w-4 h-4 text-green-500 flex-shrink-0"><path d="M20 6 9 17l-5-5" /></svg><span className="text-foreground/90 text-sm">Bônus 11: Módulo Bordados</span></div><div className="flex items-center gap-3 bg-red-500/10 p-2 rounded-lg"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-tree-pine w-4 h-4 text-red-400 flex-shrink-0"><path d="m17 14 3 3.3a1 1 0 0 1-.7 1.7H4.7a1 1 0 0 1-.7-1.7L7 14h-.3a1 1 0 0 1-.7-1.7L9 9h-.2A1 1 0 0 1 8 7.3L12 3l4 4.3a1 1 0 0 1-.8 1.7H15l3 3.3a1 1 0 0 1-.7 1.7H17Z" /><path d="M12 22v-3" /></svg><span className="text-red-400 text-sm font-semibold">🎁 BÔNUS ESPECIAL: Coleção 3D de Natal</span></div></div><div className="text-center mb-6"><p className="text-sm text-muted-foreground mb-2">De <span className="line-through">R$ 489,90</span> por apenas:</p><div className="flex items-center justify-center gap-1"><span className="text-2xl font-bold">R$</span><span className="text-5xl font-black text-gradient">27,90</span></div></div><a id="begin_checkout" href="https://ggcheckout.app/checkout/v5/X5ZHG65K5U9esfliTICX" target="_blank" rel="noopener noreferrer" className="btn-cta w-full text-foreground animate-pulse-glow inline-flex items-center justify-center text-center">QUERO ESSA SUPER OFERTA!</a><div className="text-center mt-4"><p className="text-sm text-red-400">🎅 NATAL 3D! Aproveite os descontos especiais de dezembro.</p></div><div className="flex items-center justify-center gap-2 mt-4 text-sm text-muted-foreground"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-shield w-4 h-4"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" /></svg><span>Compra Segura</span></div></div></div></div></section><section className="section-padding bg-secondary/30"><div className="container-narrow"><div className="card-dark p-8 md:p-12 text-center max-w-2xl mx-auto border-green-500/30"><div className="w-24 h-24 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-6"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-shield w-12 h-12 text-green-500"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" /></svg></div><span className="text-xs bg-green-500/20 text-green-500 px-3 py-1 rounded-full font-semibold">Selo de Garantia</span><h2 className="text-2xl md:text-3xl font-black mt-4 mb-4">GARANTIA INCONDICIONAL DE <span className="text-green-500">14 DIAS</span></h2><p className="text-muted-foreground text-lg mb-6">Nós confiamos tanto na qualidade do Ultimate Pack STL que oferecemos uma garantia total de 14 dias. Se, por qualquer motivo, você não ficar satisfeito com o material, basta solicitar o reembolso dentro desse prazo e devolvemos <strong className="text-foreground">100% do seu dinheiro</strong>, sem burocracia e sem perguntas.</p><button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-primary hover:bg-primary/90 h-10 px-4 py-2 btn-cta text-foreground">COMPRAR COM GARANTIA</button></div></div></section><section className="section-padding"><div className="container-narrow"><div className="text-center mb-12"><span className="highlight-box mb-4 inline-block">FAQ</span><h2 className="text-2xl md:text-4xl font-black mt-4">PERGUNTAS <span className="text-gradient">FREQUENTES</span></h2></div><div className="max-w-2xl mx-auto"><FaqAccordion></FaqAccordion></div></div></section><section className="section-padding bg-gradient-to-b from-secondary/50 to-background"><div className="container-narrow text-center"><div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-6"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-package w-10 h-10 text-primary"><path d="M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z" /><path d="M12 22V12" /><path d="m3.3 7 7.703 4.734a2 2 0 0 0 1.994 0L20.7 7" /><path d="m7.5 4.27 9 5.15" /></svg></div><h2 className="text-2xl md:text-4xl font-black mb-4"><span className="text-gradient">Ultimate Pack STL</span></h2><p className="text-lg text-muted-foreground max-w-xl mx-auto mb-8">O maior e mais completo pacote de arquivos STL para impressão 3D do Brasil.</p><button onClick={() => document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth", block: "start" })} className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-primary hover:bg-primary/90 btn-cta text-foreground text-xl px-12 py-6 h-auto animate-pulse-glow"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-download mr-2 w-6 h-6"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" x2="12" y1="15" y2="3" /></svg>BAIXAR PACOTE AGORA!</button></div></section><footer className="py-8 px-4 border-t border-border/50"><div className="container-narrow text-center"><h3 className="text-2xl md:text-3xl font-black mb-4"><span className="text-gradient">Ultimate Pack STL</span></h3><p className="text-sm text-muted-foreground mb-4">O maior e mais completo pacote de arquivos STL para impressão 3D do Brasil.</p><div className="mb-4"><p className="text-sm text-muted-foreground mb-2">Informações de Contato:</p><p className="text-sm text-muted-foreground">Email para suporte: ultimatepackstl@gmail.com</p></div><div className="flex justify-center gap-6 text-sm text-muted-foreground mb-4"><a href="#" className="hover:text-foreground transition-colors">Termos de Uso</a><span>|</span><a href="#" className="hover:text-foreground transition-colors">Política de Privacidade</a></div><p className="text-xs text-muted-foreground mb-2">Ultimate Pack STL © 2025 — Todos os direitos reservados.</p><p className="text-xs text-muted-foreground/50">Este site não é afiliado ao Facebook ou a qualquer entidade do Facebook. Depois que você sair do Facebook, a responsabilidade não é deles e sim do nosso site.</p></div></footer></main>
    </>
  );
}

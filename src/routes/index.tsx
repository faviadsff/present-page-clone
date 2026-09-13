import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { ShoppingBag } from "lucide-react";
import { toast } from "sonner";

import { cn } from "@/lib/utils";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

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
import testimonial1 from "@/assets/depoimento-whatsapp-1.jpg.asset.json";
import testimonial2 from "@/assets/depoimento-whatsapp-2.jpg.asset.json";
import testimonial3 from "@/assets/depoimento-whatsapp-3.jpg.asset.json";
import testimonial4 from "@/assets/depoimento-whatsapp-4.jpg.asset.json";
import testimonial5 from "@/assets/depoimento-whatsapp-5.jpg.asset.json";

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

function imgUrl(key: keyof typeof IMG): string {
  return IMG[key]!;
}

const FAQ_ITEMS: ReadonlyArray<{ question: string; answer: string }> = [
  {
    question: "Esses arquivos funcionam na minha impressora 3D?",
    answer: "Sim! Os arquivos STL são universais e funcionam em praticamente todas as impressoras 3D, seja de resina ou FDM (Ender 3, Anycubic, Creality, Prusa, Phrozen, ELEGOO e outras). Basta importar no fatiador (Cura, PrusaSlicer, Lychee, Chitubox) e mandar imprimir."
  },
  {
    question: "Quais categorias estão inclusas no pacote?",
    answer: "O pacote conta com modelos inspirados em anime, miniaturas e figuras, acessórios para cosplay, designs funcionais e decorativos. Tudo organizado em pastas claras para você encontrar o arquivo certo em segundos."
  },
  {
    question: "Recebo acesso na hora da compra?",
    answer: "Sim! Após a confirmação do pagamento (instantânea para PIX e cartão), você recebe o link de acesso imediato no seu e-mail. O acesso é vitalício, então você pode baixar quando quiser."
  },
  {
    question: "Posso usar os arquivos em projetos pessoais e comerciais?",
    answer: "Sim! Você pode usar os arquivos STL tanto para projetos pessoais quanto para comerciais. Muitos clientes lucram vendendo impressões físicas, peças acabadas e produtos customizados em marketplaces e lojas online."
  },
  {
    question: "Preciso saber modelar 3D?",
    answer: "Não! Os modelos já vêm prontos. Você só precisa fatiar, adicionar suportes quando indicado e imprimir. O conteúdo é adequado para iniciantes e experientes."
  },
  {
    question: "O pacote realmente tem mais de 20 milhões de arquivos?",
    answer: "Sim. Você recebe acesso a um acervo massivo com milhões de arquivos STL organizados, cobrindo dezenas de nichos e estilos. É um verdadeiro mega pacote para quem quer variedade sem limites."
  },
  {
    question: "Qual a diferença deste pacote para acervos pequenos?",
    answer: "Aqui você não paga por poucos modelos. Recebe milhões de arquivos organizados em um só lugar, com acesso vitalício e atualizações constantes do acervo."
  },
  {
    question: "Funciona para quem quer revender peças?",
    answer: "Sim! O pacote é ideal para vendedores do Etsy, lojas online, criadores de cosplay, designers de miniaturas e entusiastas de impressão em resina que querem revender impressões físicas."
  }
];

const PREMIUM_BONUSES: ReadonlyArray<string> = [
  "Bônus 1: Pack Anime & Mangá",
  "Bônus 2: Pack de Miniaturas e Figuras",
  "Bônus 3: Pack de Acessórios para Cosplay",
  "Bônus 4: Pack de Designs Funcionais",
  "Bônus 5: Pack de Designs Decorativos",
  "Bônus 6: Pack de Cenários e Dioramas",
  "Bônus 7: Pack de Monstros e Criaturas",
  "Bônus 8: Pack de Peças Articuladas"
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


export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Pacote STL 3D | +20.500.000 Arquivos para Impressão 3D | 300 TB" },
      {
        name: "description",
        content:
          "Desbloqueie mais de 20 milhões de arquivos STL de alta qualidade para impressão 3D. Anime, miniaturas, cosplay, designs funcionais e decorativos. Download instantâneo.",
      },
      { property: "og:title", content: "Pacote STL 3D | +20.500.000 Arquivos para Impressão 3D | 300 TB" },
      {
        property: "og:description",
        content:
          "Mega pacote de arquivos STL para impressão 3D. Resina e FDM, acesso vitalício, uso pessoal e comercial.",
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
  { key: "imgi_1_KQNPeWB-D9d9-B09.webp", label: "anime" },
  { key: "imgi_2_KbRrVfI-DADcOfDM.webp", label: "miniaturas" },
  { key: "imgi_3_KQNPtft-jJrvJbbN.webp", label: "cosplay" },
  { key: "imgi_4_KQNPPbR-Hp0QWFjQ.webp", label: "funcionais" },
  { key: "imgi_5_KQNPD0X-Bl-v5W96.webp", label: "decorativos" },
  { key: "imgi_6_KbRrWlt-CrrCAzgT.webp", label: "muito mais" },
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

  const pause = () => {
    pausedRef.current = true;
  };
  const resume = () => {
    pausedRef.current = false;
  };

  return (
    <div className="relative w-full">
      <div
        ref={trackRef}
        onMouseEnter={pause}
        onMouseLeave={resume}
        onPointerDown={pause}
        onPointerUp={resume}
        onPointerCancel={resume}
        onTouchStart={pause}
        onTouchEnd={resume}
        className="flex items-start gap-4 overflow-hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {[0, 1].map((copy) =>
          MODEL_SLIDES.map((slide) => (
            <figure
              key={`${copy}-${slide.key}`}
              aria-hidden={copy === 1}
              className="w-[280px] shrink-0 overflow-hidden rounded-lg shadow-lg sm:w-[340px]"
            >
              <img
                src={IMG[slide.key]}
                alt={`Modelos 3D da categoria ${slide.label}`}
                loading="lazy"
                decoding="async"
                width={400}
                height={400}
                className="aspect-square w-full object-cover"
              />
              <figcaption className="rounded-b-lg border border-gray-300 bg-gray-100 p-4 text-center text-xl font-bold tracking-tight text-gray-800">
                {slide.label}
              </figcaption>
            </figure>
          )),
        )}
      </div>
    </div>
  );
}

const TESTIMONIAL_IMAGES = [
  testimonial1.url,
  testimonial2.url,
  testimonial3.url,
  testimonial4.url,
  testimonial5.url,
];

function TestimonialsMarquee() {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const pausedRef = useRef(false);
  const offsetRef = useRef(0);
  const targetRef = useRef(0);
  const resumeTimerRef = useRef<number | null>(null);

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
    return () => {
      cancelAnimationFrame(raf);
      if (resumeTimerRef.current) window.clearTimeout(resumeTimerRef.current);
    };
  }, []);

  const pause = () => {
    pausedRef.current = true;
  };

  const resume = () => {
    pausedRef.current = false;
  };

  const scheduleResume = () => {
    if (resumeTimerRef.current) window.clearTimeout(resumeTimerRef.current);
    pausedRef.current = true;
    resumeTimerRef.current = window.setTimeout(() => {
      pausedRef.current = false;
    }, 3000);
  };

  const step = (dir: -1 | 1) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector("figure");
    const amount = card ? card.clientWidth + 16 : 300;
    targetRef.current += dir * amount;
    scheduleResume();
  };

  const ArrowButton = ({
    dir,
    label,
  }: {
    dir: -1 | 1;
    label: string;
  }) => (
    <button
      type="button"
      onClick={() => step(dir)}
      aria-label={label}
      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-foreground shadow-sm transition-colors hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      {dir === -1 ? (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 19-7-7 7-7" /><path d="M19 12H5" /></svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
      )}
    </button>
  );

  return (
    <div className="space-y-6">
      <div
        ref={trackRef}
        onMouseEnter={pause}
        onMouseLeave={resume}
        onTouchStart={pause}
        onTouchEnd={resume}
        className="flex touch-pan-y gap-4 overflow-hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        aria-label="Depoimentos de clientes em movimento. Passe o mouse ou toque para pausar."
      >
        {[0, 1].map((copy) => (
          <div key={copy} aria-hidden={copy === 1} className="flex shrink-0 gap-4">
            {TESTIMONIAL_IMAGES.map((image, index) => (
              <figure
                key={`${copy}-${image}`}
                className="w-[82vw] max-w-[270px] shrink-0 overflow-hidden rounded-lg border border-border bg-card shadow-lg sm:w-[calc((100vw-1rem)/2)] sm:max-w-[300px] lg:w-[calc((56rem-4rem)/5)]"
              >
                <img
                  src={image}
                  alt={copy === 0 ? `Conversa com depoimento de cliente ${index + 1}` : ""}
                  loading={copy === 0 ? "eager" : "lazy"}
                  decoding="async"
                  width={393}
                  height={800}
                  className="block h-auto w-full object-contain"
                />
              </figure>
            ))}
          </div>
        ))}
      </div>
      <div className="flex items-center justify-center gap-4">
        <ArrowButton dir={-1} label="Depoimento anterior" />
        <ArrowButton dir={1} label="Próximo depoimento" />
      </div>
    </div>
  );
}

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

function SocialProofToasts() {
  useEffect(() => {
    let index = 0;

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

    show();
    const interval = window.setInterval(show, 10000);
    return () => window.clearInterval(interval);
  }, []);

  return null;
}

function SalesPage() {
  return (
    <>
      <CountdownBar />
      <SocialProofToasts />
      <main className="min-h-screen bg-background">
        {/* HERO */}
        <section className="relative min-h-screen flex items-center section-padding overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-secondary/50 to-background"></div>
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl"></div>
          <div className="container-narrow relative z-10 w-full">
            <div className="flex justify-center mb-4 animate-fade-in">
              <span className="highlight-box flex items-center gap-2 bg-red-500/20 text-red-400 border-red-500/30 text-center px-3 py-1">
                Aproveite os descontos especiais apenas nesse mês de setembro.
              </span>
            </div>
            <div className="flex justify-center mb-6 animate-fade-in">
              <span className="highlight-box flex items-center gap-2 justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-star w-4 h-4 fill-current"><path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" /></svg>
                4,98 (5286 AVALIAÇÕES)
              </span>
            </div>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-center leading-tight mb-6 px-2">
              PACOTE DE ARQUIVOS STL 3D COM{" "}
              <span className="text-gradient">+20.500.000 MODELOS</span> PARA IMPRESSÃO
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground text-center max-w-2xl mx-auto mb-4 px-4">
              Desbloqueie uma enorme coleção de arquivos STL de alta qualidade com este pacote definitivo para impressão 3D. Desenvolvido para criadores, entusiastas e profissionais que buscam variedade sem limites.
            </p>
            <div className="flex justify-center mb-8 px-4">
              <VslPlayer />
            </div>

            {/* CARROSSEL — VEJA O QUE VOCÊ IRÁ RECEBER */}
            <section className="section-padding bg-section-2">
              <div className="container-narrow">
                <div className="text-center mb-12">
                  <h2 className="text-2xl md:text-4xl font-black">
                    VEJA OS MODELOS QUE <span className="text-gradient">VOCÊ IRÁ RECEBER:</span>
                  </h2>
                </div>
                <ModelsMarquee />
              </div>
            </section>

            <div className="flex flex-col items-center gap-4 mb-8">
              <button
                onClick={() => document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth", block: "start" })}
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-primary hover:bg-primary/90 h-10 px-4 py-2 btn-cta text-foreground w-full sm:w-auto text-lg"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-download mr-2 w-5 h-5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" x2="12" y1="15" y2="3" /></svg>
                BAIXAR PACOTE COM DESCONTO!
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right ml-2 w-5 h-5"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
              </button>
            </div>
            <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-package w-5 h-5 text-primary"><path d="M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z" /><path d="M12 22V12" /><path d="m3.3 7 7.703 4.734a2 2 0 0 0 1.994 0L20.7 7" /><path d="m7.5 4.27 9 5.15" /></svg>
                <span>+20.500.000 arquivos STL</span>
              </div>
              <div className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-star w-5 h-5 text-accent fill-accent"><path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" /></svg>
                <span>4.98/5 avaliações</span>
              </div>
              <div className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-download w-5 h-5 text-green-500"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" x2="12" y1="15" y2="3" /></svg>
                <span>Acesso imediato</span>
              </div>
            </div>
          </div>
        </section>

        {/* SEÇÃO DE DOR */}
        <section className="section-padding bg-section-1">
          <div className="container-narrow">
            <div className="text-center mb-12">
              <span className="highlight-box mb-4 inline-block">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-lightbulb w-4 h-4 inline mr-2"><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" /><path d="M9 18h6" /><path d="M10 22h4" /></svg>
                ESTE PACK FOI FEITO PARA QUEM QUER VARIEDADE SEM LIMITES...
              </span>
            </div>
            <div className="grid md:grid-cols-2 gap-4 mb-12">
              <div className="flex items-start gap-4 p-5 rounded-xl bg-card/50 border border-border/50 hover:border-primary/30 transition-colors">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x w-4 h-4 text-primary"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                </div>
                <p className="text-foreground/90 text-lg">Chega de perder horas procurando modelos STL isolados na internet.</p>
              </div>
              <div className="flex items-start gap-4 p-5 rounded-xl bg-card/50 border border-border/50 hover:border-primary/30 transition-colors">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x w-4 h-4 text-primary"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                </div>
                <p className="text-foreground/90 text-lg">Pare de pagar caro por pacotes pequenos que não suprem suas ideias.</p>
              </div>
              <div className="flex items-start gap-4 p-5 rounded-xl bg-card/50 border border-border/50 hover:border-primary/30 transition-colors">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x w-4 h-4 text-primary"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                </div>
                <p className="text-foreground/90 text-lg">Não fique mais limitado a poucos designs para seus projetos e impressões.</p>
              </div>
              <div className="flex items-start gap-4 p-5 rounded-xl bg-card/50 border border-border/50 hover:border-primary/30 transition-colors">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x w-4 h-4 text-primary"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                </div>
                <p className="text-foreground/90 text-lg">Tenha milhões de arquivos profissionais sem precisar modelar nada do zero.</p>
              </div>
            </div>
          </div>
        </section>

        {/* BENEFÍCIOS */}
        <section className="section-padding bg-section-2">
          <div className="container-narrow">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-4xl font-black mt-4">
                COM NOSSO PACOTE <span className="text-gradient">VOCÊ RECEBE:</span>
              </h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6 mb-12">
              <div className="card-dark text-center hover:border-primary/50 transition-all duration-300 hover:-translate-y-1">
                <div className="w-14 h-14 rounded-2xl bg-primary/20 flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-lightbulb w-7 h-7 text-primary"><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" /><path d="M9 18h6" /><path d="M10 22h4" /></svg>
                </div>
                <h3 className="text-xl font-bold mb-2">GRANDE COLEÇÃO DE ARQUIVOS STL</h3>
                <p className="text-muted-foreground">Mais de 20.500.000 arquivos STL organizados em categorias para qualquer tipo de projeto.</p>
              </div>
              <div className="card-dark text-center hover:border-primary/50 transition-all duration-300 hover:-translate-y-1">
                <div className="w-14 h-14 rounded-2xl bg-primary/20 flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-clock w-7 h-7 text-primary"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
                </div>
                <h3 className="text-xl font-bold mb-2">DOWNLOAD INSTANTÂNEO</h3>
                <p className="text-muted-foreground">Acesso imediato após a compra. Baixe no computador, celular ou HD externo quando quiser.</p>
              </div>
              <div className="card-dark text-center hover:border-primary/50 transition-all duration-300 hover:-translate-y-1">
                <div className="w-14 h-14 rounded-2xl bg-primary/20 flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-trending-up w-7 h-7 text-primary"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17" /><polyline points="16 7 22 7 22 13" /></svg>
                </div>
                <h3 className="text-xl font-bold mb-2">AMPLA VARIEDADE DE CATEGORIAS</h3>
                <p className="text-muted-foreground">Anime, miniaturas, figuras, acessórios para cosplay, designs funcionais e decorativos em um só lugar.</p>
              </div>
              <div className="card-dark text-center hover:border-primary/50 transition-all duration-300 hover:-translate-y-1">
                <div className="w-14 h-14 rounded-2xl bg-primary/20 flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-shield w-7 h-7 text-primary"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" /></svg>
                </div>
                <h3 className="text-xl font-bold mb-2">USO PESSOAL E COMERCIAL</h3>
                <p className="text-muted-foreground">Adequado para projetos pessoais e para quem quer imprimir e revender peças físicas.</p>
              </div>
            </div>
          </div>
        </section>


        {/* SEM / COM */}
        <section className="section-padding bg-section-1">
          <div className="container-narrow">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="card-dark border-destructive/30">
                <h3 className="text-xl font-bold text-center mb-6 text-destructive">SEM O NOSSO PACK:</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-destructive/20 flex items-center justify-center mt-0.5">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x w-3 h-3 text-destructive"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                    </div>
                    <span className="text-muted-foreground">Gasta tempo e dinheiro comprando modelos avulsos de qualidade incerta</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-destructive/20 flex items-center justify-center mt-0.5">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x w-3 h-3 text-destructive"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                    </div>
                    <span className="text-muted-foreground">Perde horas procurando arquivos STL em diferentes sites e repositórios</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-destructive/20 flex items-center justify-center mt-0.5">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x w-3 h-3 text-destructive"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                    </div>
                    <span className="text-muted-foreground">Fica limitado a poucos designs para projetos e impressões</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-destructive/20 flex items-center justify-center mt-0.5">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x w-3 h-3 text-destructive"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                    </div>
                    <span className="text-muted-foreground">Não encontra categorias variadas como anime, cosplay e peças funcionais</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-destructive/20 flex items-center justify-center mt-0.5">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x w-3 h-3 text-destructive"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                    </div>
                    <span className="text-muted-foreground">Corre risco com arquivos maliciosos ou de qualidade duvidosa</span>
                  </div>
                </div>
              </div>
              <div className="card-dark border-green-500/30">
                <h3 className="text-xl font-bold text-center mb-6 text-green-500">COM O NOSSO PACK:</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center mt-0.5">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check w-3 h-3 text-green-500"><path d="M20 6 9 17l-5-5" /></svg>
                    </div>
                    <span className="text-foreground/90">Mais de 20.500.000 arquivos STL organizados em pastas</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center mt-0.5">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check w-3 h-3 text-green-500"><path d="M20 6 9 17l-5-5" /></svg>
                    </div>
                    <span className="text-foreground/90">Modelos prontos para impressão 3D em resina e FDM</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center mt-0.5">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check w-3 h-3 text-green-500"><path d="M20 6 9 17l-5-5" /></svg>
                    </div>
                    <span className="text-foreground/90">Economia total: paga uma vez e acessa o acervo para sempre</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center mt-0.5">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check w-3 h-3 text-green-500"><path d="M20 6 9 17l-5-5" /></svg>
                    </div>
                    <span className="text-foreground/90">Anime, miniaturas, cosplay, funcionais e decorativos em um só lugar</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center mt-0.5">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check w-3 h-3 text-green-500"><path d="M20 6 9 17l-5-5" /></svg>
                    </div>
                    <span className="text-foreground/90">Acesso vitalício e download digital instantâneo</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FACILIDADES */}
        <section className="section-padding bg-section-1">
          <div className="container-narrow">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-4xl font-black">
                POR QUE ESCOLHER <span className="text-gradient">ESTE PACOTE STL?</span>
              </h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="card-dark hover:border-primary/50 transition-all duration-300">
                <div className="flex items-start gap-4">
                  <span className="text-3xl">🎯</span>
                  <div>
                    <h3 className="text-lg font-bold mb-2">PERFEITO PARA CRIADORES</h3>
                    <p className="text-muted-foreground">Ideal para entusiastas da impressão 3D, vendedores do Etsy, criadores de cosplay, designers de miniaturas e entusiastas de resina.</p>
                  </div>
                </div>
              </div>
              <div className="card-dark hover:border-primary/50 transition-all duration-300">
                <div className="flex items-start gap-4">
                  <span className="text-3xl">💰</span>
                  <div>
                    <h3 className="text-lg font-bold mb-2">ECONOMIA REAL</h3>
                    <p className="text-muted-foreground">Pague uma única vez e tenha acesso a milhões de arquivos, sem precisar comprar modelos avulsos.</p>
                  </div>
                </div>
              </div>
              <div className="card-dark hover:border-primary/50 transition-all duration-300">
                <div className="flex items-start gap-4">
                  <span className="text-3xl">🧩</span>
                  <div>
                    <h3 className="text-lg font-bold mb-2">VARIEDADE SEM FIM</h3>
                    <p className="text-muted-foreground">Anime, miniaturas, figuras, acessórios para cosplay, designs funcionais e decorativos em um só pacote.</p>
                  </div>
                </div>
              </div>
              <div className="card-dark hover:border-primary/50 transition-all duration-300">
                <div className="flex items-start gap-4">
                  <span className="text-3xl">⚡</span>
                  <div>
                    <h3 className="text-lg font-bold mb-2">ACESSO INSTANTÂNEO</h3>
                    <p className="text-muted-foreground">Receba o link de download imediatamente após a compra e comece a imprimir seus designs favoritos agora mesmo.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>



        {/* PREÇOS */}
        <section id="pricing" className="section-padding bg-section-2">
          <div className="container-narrow">
            <div className="text-center mb-12">
              <span className="highlight-box mb-4 inline-block">Oferta Especial</span>
              <h2 className="text-2xl md:text-4xl font-black mt-4">ESCOLHA SEU PACOTE</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              <div className="card-dark">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold mb-2">Pacote Básico</h3>
                </div>
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check w-5 h-5 text-green-500 flex-shrink-0"><path d="M20 6 9 17l-5-5" /></svg>
                    <span className="text-foreground/90 text-sm">Acesso a uma seleção de arquivos STL</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check w-5 h-5 text-green-500 flex-shrink-0"><path d="M20 6 9 17l-5-5" /></svg>
                    <span className="text-foreground/90 text-sm">Download digital instantâneo</span>
                  </div>
                </div>
                <div className="text-center mb-6">
                  <p className="text-sm text-muted-foreground mb-2">De <span className="line-through">R$ 189,90</span> por apenas:</p>
                  <div className="flex items-center justify-center gap-1">
                    <span className="text-2xl font-bold">R$</span>
                    <span className="text-5xl font-black text-primary">9,90</span>
                  </div>
                </div>
                <a id="begin_checkout_basic" href={CHECKOUT_BASIC} target="_blank" rel="noopener noreferrer" className="btn-cta w-full text-foreground animate-pulse-glow inline-flex items-center justify-center text-center">
                  QUERO O PACOTE BÁSICO!
                </a>
                <div className="flex items-center justify-center gap-2 mt-4 text-sm text-muted-foreground">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-shield w-4 h-4"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" /></svg>
                  <span>Compra Segura</span>
                </div>
              </div>

              <div className="card-dark border-primary/50 relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-xs font-bold px-4 py-1 rounded-bl-lg">MAIS VENDIDO</div>
                <div className="text-center mb-4">
                  <h3 className="text-2xl font-bold mb-2">Pacote Premium</h3>
                  <div className="flex items-center justify-center gap-1 text-sm text-muted-foreground">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-star w-4 h-4 text-accent fill-accent"><path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" /></svg>
                    <span>4,98 (5286 AVALIAÇÕES)</span>
                  </div>
                </div>
                <div className="space-y-2 mb-6">
                  {PREMIUM_BONUSES.map((bonus, i) => (
                    <div key={bonus} className="flex items-center gap-3">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check w-4 h-4 text-green-500 flex-shrink-0"><path d="M20 6 9 17l-5-5" /></svg>
                      <span className="text-foreground/90 text-sm">{bonus}</span>
                    </div>
                  ))}
                  <div className="flex items-center gap-3 bg-red-500/10 p-2 rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-gift w-4 h-4 text-red-400 flex-shrink-0"><rect x="3" y="8" width="18" height="4" rx="1" /><path d="M12 8v13" /><path d="M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7" /><path d="M7.5 8a2.5 2.5 0 0 1 0-5 2.5 2.5 0 0 1 2.5 2.5v5" /><path d="M16.5 8v-2.5a2.5 2.5 0 0 1 5 0 2.5 2.5 0 0 1-2.5 2.5h-5" /></svg>
                    <span className="text-red-400 text-sm font-semibold">🎁 BÔNUS ESPECIAL: Pack de Modelos para Impressão 3D Premium</span>
                  </div>
                </div>
                <div className="text-center mb-6">
                  <p className="text-sm text-muted-foreground mb-2">De <span className="line-through">R$ 489,90</span> por apenas:</p>
                  <div className="flex items-center justify-center gap-1">
                    <span className="text-2xl font-bold">R$</span>
                    <span className="text-5xl font-black text-gradient">27,90</span>
                  </div>
                </div>
                <a id="begin_checkout" href={CHECKOUT_PREMIUM} target="_blank" rel="noopener noreferrer" className="btn-cta w-full text-foreground animate-pulse-glow inline-flex items-center justify-center text-center">
                  QUERO ESSE MEGA PACOTE!
                </a>
                <div className="text-center mt-4">
                  <p className="text-sm text-red-400">🎁 DESCONTO ESPECIAL! Aproveite apenas esse mês de setembro.</p>
                </div>
                <div className="flex items-center justify-center gap-2 mt-4 text-sm text-muted-foreground">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-shield w-4 h-4"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" /></svg>
                  <span>Compra Segura</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* GARANTIA */}
        <section className="section-padding bg-section-1">
          <div className="container-narrow">
            <div className="card-dark p-8 md:p-12 text-center max-w-2xl mx-auto border-green-500/30">
              <div className="w-24 h-24 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-shield w-12 h-12 text-green-500"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" /></svg>
              </div>
              <h2 className="text-2xl md:text-3xl font-black mb-4">GARANTIA DE 7 DIAS</h2>
              <p className="text-muted-foreground text-lg mb-6">
                Se você não gostar do pacote, pode pedir reembolso total em até 7 dias. Risco zero para você.
              </p>
              <a href="#pricing" onClick={(e) => { e.preventDefault(); document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth", block: "start" }); }} className="btn-cta inline-flex items-center justify-center text-foreground">
                QUERO GARANTIR MEU ACESSO
              </a>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="section-padding bg-section-2">
          <div className="container-narrow max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-4xl font-black">
                PERGUNTAS <span className="text-gradient">FREQUENTES</span>
              </h2>
            </div>
            <FaqAccordion />
          </div>
        </section>

        {/* FOOTER */}
        <footer className="section-padding bg-section-1 border-t border-border/50">
          <div className="container-narrow text-center">
            <p className="text-muted-foreground text-sm">
              © 2026 Mega Pacote STL 3D. Todos os direitos reservados.
            </p>
            <p className="text-muted-foreground/60 text-xs mt-2">
              Este site é um canal de distribuição digital de arquivos STL. Os modelos são indicados para impressão 3D pessoal e comercial de peças físicas, conforme os termos de cada licença.
            </p>
          </div>
        </footer>
      </main>
    </>
  );
}

interface BonusCardProps {
  index: number;
  title: string;
  image: string;
  description: string;
  oldPrice: string;
}

function BonusCard({ index, title, image, description, oldPrice }: BonusCardProps) {
  return (
    <div className="flex flex-col overflow-hidden rounded-xl bg-white text-gray-800 shadow-lg">
      <div className="p-2 text-center text-white bg-primary">
        <h3 className="font-bold uppercase text-lg">BÔNUS {index}:</h3>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h4 className="mb-4 text-center text-2xl font-bold uppercase text-[#1E2A38]">{title}</h4>
        <div className="mb-4 overflow-hidden rounded-lg">
          <img alt={`Imagem do ${title}`} loading="lazy" width="400" height="300" decoding="async" className="aspect-[4/3] w-full object-cover" src={image} />
        </div>
        <p className="flex-grow mb-4 text-center text-lg font-medium text-gray-800">{description}</p>
        <div className="mt-auto text-center">
          <p className="text-lg font-bold">
            <span className="text-base font-normal text-red-500 line-through">De {oldPrice}</span>
            <br />
            <span className="font-bold text-xl text-green-600">VAI SAIR DE GRAÇA</span>
          </p>
        </div>
      </div>
    </div>
  );
}

import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Play, Pause, ShoppingBag, X, Lock } from "lucide-react";
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


import img10 from "@/assets/imgi_3_KQNPtft-jJrvJbbN.webp.asset.json";
import img11 from "@/assets/imgi_4_KQNPPbR-Hp0QWFjQ.webp.asset.json";
import img12 from "@/assets/imgi_5_KQNPD0X-Bl-v5W96.webp.asset.json";
import img13 from "@/assets/imgi_6_KbRrWlt-CrrCAzgT.webp.asset.json";
import img14 from "@/assets/imgi_7_Impressao-07-B3RCvh-G.webp.asset.json";
import img15 from "@/assets/imgi_8_Impressao-08-BuvyrUKU.webp.asset.json";
import img16 from "@/assets/imgi_9_KbRcpTv-DoT3QpJN.webp.asset.json";
import img17 from "@/assets/mascote-89sfIWzW.webp.asset.json";
import imgViloes from "@/assets/viloes-e-chefes.jpg.asset.json";
import imgMonstros from "@/assets/monstros-e-feras.jpg.asset.json";
import imgHerois from "@/assets/herois-e-racas.jpg.asset.json";
import imgNPCs from "@/assets/npcs.jpg.asset.json";
import imgCenarios from "@/assets/cenarios.jpg.asset.json";
import imgMuitoMais from "@/assets/muito-mais.jpg.asset.json";
import imgBonusEspecial from "@/assets/bonus-especial.jpg.asset.json";
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
  "viloes-e-chefes.jpg": imgViloes.url,
  "monstros-e-feras.jpg": imgMonstros.url,
  "herois-e-racas.jpg": imgHerois.url,
  "npcs.jpg": imgNPCs.url,
  "cenarios.jpg": imgCenarios.url,
  "muito-mais.jpg": imgMuitoMais.url,
  "bonus-especial.jpg": imgBonusEspecial.url,
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
    question: "Como eu recebo os arquivos?",
    answer: "Acesso liberado na hora, direto no seu e-mail, com link de download organizado por pastas."
  },
  {
    question: "Funciona pra qualquer impressora 3D?",
    answer: "Sim, os arquivos STL são compatíveis com qualquer impressora e fatiador (Cura, PrusaSlicer, etc)."
  },
  {
    question: "Preciso saber modelar em 3D?",
    answer: "Não. É só baixar o arquivo, jogar no fatiador e imprimir. Nenhuma edição necessária."
  },
  {
    question: "Os arquivos já veem no tamanho certo pra RPG?",
    answer: "Sim, o guia de escala mostra como ajustar pra base padrão 25mm ou 32mm de mesa."
  },
  {
    question: "E se eu não gostar?",
    answer: "Você tem 14 dias de garantia incondicional. Devolvemos 100% do valor."
  },
  {
    question: "O acesso é vitalício?",
    answer: "Sim, pagamento único e acesso pra sempre, sem mensalidade."
  },
  {
    question: "Posso usar pra board game também?",
    answer: "Sim, boa parte do acervo (cenários, monstros, NPCs) serve pra qualquer board game de fantasia."
  },
  {
    question: "Vale a pena se tem arquivo grátis na internet?",
    answer: "Os gratuitos costumam vir com malha quebrada e sem organização. Aqui está tudo testado, catalogado e pronto pra imprimir sem perder tempo."
  }
];

const PREMIUM_BONUSES: ReadonlyArray<string> = [
  "Bônus 1: Pack de Miniaturas e Figuras",
  "Bônus 2: Pack de Monstros e Criaturas",
  "Bônus 3: Pack de Designs Decorativos",
  "Bônus 4: Pack de Cenários e Dioramas"
];

const CHECKOUT_PREMIUM = "https://app.zuptos.com.br/checkout/8b22d48b460d1578";
const CHECKOUT_BASIC = "https://ggcheckout.app/checkout/v5/k22Mgh9AbZBrC7iQ1jhO";

/**
 * VSL hospedado no Vimeo (formato vertical) com HUD oculta e
 * progress bar customizado verde na base.
 *
 * Tentativa de autoplay com som. Se o navegador bloquear
 * (política de autoplay), cai para mudo e ativa o áudio
 * automaticamente na primeira interação do usuário com a página.
 */
function VslPlayer() {
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const playerRef = useRef<InstanceType<typeof import("@vimeo/player").default> | null>(null);
  const [progress, setProgress] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let destroyed = false;
    let player: InstanceType<typeof import("@vimeo/player").default> | null = null;
    let removeUnlockListener: (() => void) | null = null;

    const init = async () => {
      const { default: Player } = await import("@vimeo/player");
      if (!iframeRef.current || destroyed) return;
      player = new Player(iframeRef.current);
      playerRef.current = player;

      player.on("timeupdate", (data: { seconds: number; duration: number }) => {
        if (data.duration > 0) {
          setProgress((data.seconds / data.duration) * 100);
        }
      });

      player.on("play", () => setPlaying(true));
      player.on("pause", () => setPlaying(false));
      player.on("ended", () => setPlaying(false));

      await player.ready();
      if (destroyed) return;
      setReady(true);

      // 1) Tenta iniciar COM som
      await player.setVolume(1).catch(() => {});
      try {
        await player.play();
      } catch {
        // 2) Navegador bloqueou autoplay com som — inicia mudo
        await player.setVolume(0).catch(() => {});
        await player.play().catch(() => {});

        // 3) Na primeira interação do usuário em qualquer lugar, liga o som
        const unlock = () => {
          player?.setVolume(1).catch(() => {});
          window.removeEventListener("pointerdown", unlock);
          window.removeEventListener("keydown", unlock);
          window.removeEventListener("touchstart", unlock);
          removeUnlockListener = null;
        };
        window.addEventListener("pointerdown", unlock);
        window.addEventListener("keydown", unlock);
        window.addEventListener("touchstart", unlock);
        removeUnlockListener = () => {
          window.removeEventListener("pointerdown", unlock);
          window.removeEventListener("keydown", unlock);
          window.removeEventListener("touchstart", unlock);
        };
      }
    };

    init();

    return () => {
      destroyed = true;
      removeUnlockListener?.();
      player?.destroy().catch(() => {});
      playerRef.current = null;
    };
  }, []);

  const togglePlay = async () => {
    const player = playerRef.current;
    if (!player || !ready) return;
    const isPaused = await player.getPaused().catch(() => true);
    if (isPaused) {
      await player.setVolume(1).catch(() => {});
      await player.play().catch(() => {});
    } else {
      await player.pause().catch(() => {});
    }
  };

  return (
    <div className="w-full">
      <div className="relative mx-auto aspect-[9/16] w-full max-w-3xl sm:max-w-4xl lg:max-w-5xl">
        <iframe
          ref={iframeRef}
          src="https://player.vimeo.com/video/1226402707?controls=0&title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479&dnt=1&playsinline=1&autoplay=1&muted=0"
          frameBorder="0"
          allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
          allowFullScreen
          title="VSL STL do Mago"
          className="absolute inset-0 h-full w-full rounded-xl"
        />

        {/* Botão de play/pause customizado — a HUD do Vimeo está oculta */}
        <button
          type="button"
          onClick={togglePlay}
          aria-label={playing ? "Pausar vídeo" : "Reproduzir vídeo"}
          className={cn(
            "absolute inset-0 z-10 flex items-center justify-center bg-black/20 transition-opacity duration-300",
            playing ? "opacity-0 hover:opacity-100" : "opacity-100"
          )}
        >
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white/90 text-black shadow-lg backdrop-blur-sm transition-transform hover:scale-105">
            {playing ? <Pause className="h-7 w-7 fill-current" /> : <Play className="h-7 w-7 fill-current" />}
          </span>
          {!playing && isMuted && (
            <span className="absolute translate-y-14 rounded-full bg-black/70 px-4 py-1.5 text-xs font-medium text-white backdrop-blur-sm">
              Toque para ativar o som
            </span>
          )}
        </button>

        {/* Controle de som */}
        <button
          type="button"
          onClick={toggleMute}
          aria-label={isMuted ? "Ativar som" : "Desativar som"}
          className="absolute right-3 top-3 z-30 flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-white shadow-md backdrop-blur-sm transition-transform hover:scale-105"
        >
          {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
        </button>

        {/* Progress bar verde colada na base do vídeo */}
        <div className="absolute bottom-0 left-0 right-0 z-20 h-2 overflow-hidden rounded-b-xl bg-white/20">
          <div
            className="h-full bg-green-500 transition-[width] duration-300 ease-linear"
            style={{ width: `${progress}%` }}
            aria-hidden="true"
          />
        </div>
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
      { title: "Pacote STL 3D | +2.000 Miniaturas para Impressão 3D | RPG e Board Games" },
      {
        name: "description",
        content:
          "Desbloqueie mais de 2.000 miniaturas STL de alta qualidade para impressão 3D. RPG, board games, monstros, heróis, cenários e muito mais. Download instantâneo.",
      },
      { property: "og:title", content: "Pacote STL 3D | +2.000 Miniaturas para Impressão 3D | RPG e Board Games" },
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
    <div className="sticky top-0 z-50 w-full bg-destructive px-3 py-2 text-center text-destructive-foreground">
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
  { key: "viloes-e-chefes.jpg", label: "Vilões e Chefes" },
  { key: "monstros-e-feras.jpg", label: "Monstros e Feras" },
  { key: "herois-e-racas.jpg", label: "Heróis e Raças" },
  { key: "npcs.jpg", label: "NPCs" },
  { key: "cenarios.jpg", label: "Cenários" },
  { key: "muito-mais.jpg", label: "Muito Mais" },
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
  const [downsellOpen, setDownsellOpen] = useState(false);

  return (
    <>
      <CountdownBar />
      <SocialProofToasts />
      <main className="min-h-screen bg-background">
        {/* HERO */}
        <section className="relative min-h-screen flex items-center section-padding overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-secondary/50 to-background"></div>
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl"></div>
          <div className="relative z-10 mx-auto w-full max-w-6xl">
            <div className="flex justify-center mb-6 animate-fade-in">
              <span className="highlight-box flex items-center gap-2 justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-star w-4 h-4 fill-current"><path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" /></svg>
                4,98 (5286 AVALIAÇÕES)
              </span>
            </div>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-center leading-tight mb-6 px-2">
              +2.000 Miniaturas STL de{" "}
              <span className="text-gradient">RPG e Board Games</span> Prontas pra Imprimir
            </h1>
            <div className="vsl-frame mb-8">
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
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:opacity-90 h-10 px-4 py-2 btn-buy text-foreground w-full sm:w-auto text-lg animate-pulse-glow-green"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-download mr-2 w-5 h-5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" x2="12" y1="15" y2="3" /></svg>
                BAIXAR PACOTE COM DESCONTO!
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right ml-2 w-5 h-5"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
              </button>
            </div>
            <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-package w-5 h-5 text-primary"><path d="M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z" /><path d="M12 22V12" /><path d="m3.3 7 7.703 4.734a2 2 0 0 0 1.994 0L20.7 7" /><path d="m7.5 4.27 9 5.15" /></svg>
                <span>+2.000 miniaturas STL</span>
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


        {/* SEM / COM */}
        <section className="section-padding bg-section-1">
          <div className="container-narrow">
            <div className="grid md:grid-cols-2 gap-4 md:gap-6">
              <div className="card-dark border-destructive/30 p-5 md:p-6">
                <h3 className="text-lg md:text-xl font-black text-center mb-5 text-destructive">SEM O STL DO MAGO</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-background/40 border border-destructive/10">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-destructive/20 flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x w-4 h-4 text-destructive"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                    </div>
                    <span className="text-sm md:text-base font-semibold text-foreground/80">Gasta uma fortuna em miniatura oficial</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-background/40 border border-destructive/10">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-destructive/20 flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x w-4 h-4 text-destructive"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                    </div>
                    <span className="text-sm md:text-base font-semibold text-foreground/80">Perde tempo caçando arquivo em grupo</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-background/40 border border-destructive/10">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-destructive/20 flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x w-4 h-4 text-destructive"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                    </div>
                    <span className="text-sm md:text-base font-semibold text-foreground/80">Baixa STL grátis e a malha vem quebrada</span>
                  </div>
                  <div className="mt-4 p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-center">
                    <span className="text-sm font-bold text-destructive">Resultado: mesa sem graça, dinheiro no lixo</span>
                  </div>
                </div>
              </div>
              <div className="card-dark border-green-500/30 p-5 md:p-6">
                <h3 className="text-lg md:text-xl font-black text-center mb-5 text-green-500">COM O STL DO MAGO</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-background/40 border border-green-500/10">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check w-4 h-4 text-green-500"><path d="M20 6 9 17l-5-5" /></svg>
                    </div>
                    <span className="text-sm md:text-base font-bold text-foreground">+2.000 miniaturas prontas pra imprimir</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-background/40 border border-green-500/10">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check w-4 h-4 text-green-500"><path d="M20 6 9 17l-5-5" /></svg>
                    </div>
                    <span className="text-sm md:text-base font-bold text-foreground">Guia de escala 25mm/32mm incluso</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-background/40 border border-green-500/10">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check w-4 h-4 text-green-500"><path d="M20 6 9 17l-5-5" /></svg>
                    </div>
                    <span className="text-sm md:text-base font-bold text-foreground">Paga uma vez, acesso vitalício</span>
                  </div>
                  <div className="mt-4 p-3 rounded-lg bg-green-500/10 border border-green-500/20 text-center">
                    <span className="text-sm font-bold text-green-500">Resultado: mesa épica, gastando pouco</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* DEPOIMENTOS */}
        <section className="section-padding bg-section-1">
          <div className="container-narrow">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-4xl font-black">
                VEJA O QUE OS NOSSOS <span className="text-gradient">CLIENTES ESTÃO DIZENDO:</span>
              </h2>
            </div>
            <TestimonialsMarquee />
          </div>
        </section>

        {/* BÔNUS */}
        <section className="section-padding bg-section-2">
          <div className="container-narrow">
            <div className="my-8 text-center text-white">
              <p className="text-3xl font-bold mb-2">🎁 NÃO ACABOU!</p>
              <p className="text-2xl">
                <span className="font-bold italic bg-red-600 px-2 rounded-md text-[25px]">BÔNUS ESPECIAL</span> liberado apenas esse mês de setembro!
              </p>
            </div>
            <div className="flex justify-center mb-8">
              <div className="w-full md:w-1/2 lg:w-1/3">
                <div className="flex flex-col overflow-hidden rounded-xl bg-white text-gray-800 shadow-lg">
                  <div className="p-2 text-center text-white bg-red-600">
                    <h3 className="font-bold uppercase text-lg">🎁 BÔNUS ESPECIAL:</h3>
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <h4 className="mb-4 text-center text-2xl font-bold uppercase text-[#1E2A38]">4 Bônus exclusivos do STL do Mago</h4>
                    <div className="mb-4 overflow-hidden rounded-lg">
                      <img alt="3 Bônus exclusivo do STL do Mago" loading="lazy" width="400" height="300" decoding="async" className="aspect-[4/3] w-full object-cover" src={IMG["bonus-especial.jpg"]} />
                    </div>
                    <div className="flex-grow mb-4 space-y-1 text-left">
                      <p className="text-sm font-medium text-gray-800 leading-snug"><span className="font-bold text-red-600">Bônus 1:</span> Pack de Miniaturas e Figuras</p>
                      <p className="text-sm font-medium text-gray-800 leading-snug"><span className="font-bold text-red-600">Bônus 2:</span> Pack de Monstros e Criaturas</p>
                      <p className="text-sm font-medium text-gray-800 leading-snug"><span className="font-bold text-red-600">Bônus 3:</span> Pack de Designs Decorativos</p>
                      <p className="text-sm font-medium text-gray-800 leading-snug"><span className="font-bold text-red-600">Bônus 4:</span> Pack de Cenários e Dioramas</p>
                    </div>
                    <div className="mt-auto text-center">
                      <p className="text-lg font-bold">
                        <span className="text-base font-normal text-red-500 line-through">De R$ 297,90</span>
                        <br />
                        <span className="font-bold text-xl text-green-600">VAI SAIR DE GRAÇA</span>
                      </p>
                    </div>
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
                <button
                  id="begin_checkout_basic"
                  type="button"
                  onClick={() => setDownsellOpen(true)}
                  className="w-full bg-transparent text-white font-bold border-2 border-white rounded-lg px-6 py-4 inline-flex items-center justify-center text-center cursor-pointer"
                >
                  QUERO O PACOTE BÁSICO!
                </button>
                <div className="flex items-center justify-center gap-2 mt-4 text-sm text-green-500">
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
                </div>
                <div className="text-center mb-6">
                  <p className="text-sm text-muted-foreground mb-2">De <span className="line-through">R$ 489,90</span> por apenas:</p>
                  <div className="flex items-center justify-center gap-1">
                    <span className="text-2xl font-bold">R$</span>
                    <span className="text-5xl font-black text-gradient">27,90</span>
                  </div>
                </div>
                <a id="begin_checkout" href={CHECKOUT_PREMIUM} target="_blank" rel="noopener noreferrer" className="btn-buy w-full text-foreground animate-pulse-glow-green inline-flex items-center justify-center text-center">
                  QUERO ESSE MEGA PACOTE!
                </a>
                <div className="text-center mt-4">
                  <p className="text-sm text-red-400">🎁 DESCONTO ESPECIAL! Aproveite apenas esse mês de setembro.</p>
                </div>
                <div className="flex items-center justify-center gap-2 mt-4 text-sm text-green-500">
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
              <a href="#pricing" onClick={(e) => { e.preventDefault(); document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth", block: "start" }); }} className="btn-buy inline-flex items-center justify-center text-foreground">
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
            <Link
              to="/obrigado"
              aria-label="Área reservada"
              className="mt-4 inline-flex opacity-20 transition-opacity hover:opacity-100 focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
            >
              <Lock className="h-4 w-4 text-muted-foreground" />
            </Link>
          </div>
        </footer>
      </main>

      {/* DOWSELL */}
      {downsellOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true">
          <div
            className="absolute inset-0 bg-black/80"
            onClick={() => setDownsellOpen(false)}
            aria-hidden="true"
          />
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
              <h2 className="text-xl font-black text-gradient">
                ESPERE! OFERTA ESPECIAL
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                A equipe STL dos Magos preparou uma oferta exclusiva para você.
              </p>
            </div>
            <div className="space-y-4">
              <p className="text-center text-foreground">
                Ganhe <span className="font-bold text-green-500">R$ 10,00 de desconto</span> no Pacote Premium e leve todos os bônus inclusos!
              </p>
              <div className="rounded-lg bg-secondary/50 p-4 text-center">
                <p className="text-sm text-muted-foreground line-through">De R$ 27,90</p>
                <p className="text-3xl font-black text-gradient">R$ 17,90</p>
                <p className="text-xs text-muted-foreground">Pacote Premium + todos os bônus</p>
              </div>
              <a
                id="begin_checkout_downsell"
                href={CHECKOUT_PREMIUM}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-buy w-full inline-flex items-center justify-center text-center text-foreground"
                onClick={() => setDownsellOpen(false)}
              >
                EU QUERO ESSA OFERTA!
              </a>
              <button
                type="button"
                onClick={() => {
                  setDownsellOpen(false);
                  window.open(CHECKOUT_BASIC, "_blank", "noopener,noreferrer");
                }}
                className="w-full text-sm text-muted-foreground underline underline-offset-4 hover:text-foreground"
              >
                Quero continuar com o pacote básico
              </button>
            </div>
          </div>
        </div>
      )}
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

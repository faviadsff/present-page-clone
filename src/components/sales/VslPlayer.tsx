import { useCallback, useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";

import { cn } from "@/lib/utils";
import vslThumb from "@/assets/vsl-thumb.png.asset.json";

const VIDEO_ID = "1226402707";
const THUMBNAIL = vslThumb.url;

type VimeoPlayer = InstanceType<typeof import("@vimeo/player").default>;

/**
 * VSL vertical do Vimeo. Até o clique mostra só uma capa com botão de play
 * (nada do player é carregado). Após o clique, carrega o player e já toca com som.
 * Moldura dourada + barra de progresso abaixo do vídeo.
 */
export function VslPlayer() {
  const [activated, setActivated] = useState(false);
  const [progress, setProgress] = useState(0);
  const handleProgress = useCallback((value: number) => setProgress(value), []);

  return (
    <div className="w-full">
      <div
        className="relative mx-auto aspect-[9/16] w-full max-w-[300px] overflow-hidden rounded-xl border-2 bg-card shadow-[0_0_35px_hsl(43_90%_52%_/_0.35)] sm:max-w-sm md:max-w-md lg:max-w-lg"
        style={{ borderColor: "hsl(43 90% 52%)" }}
      >
        {activated ? (
          <ActivePlayer onProgress={handleProgress} />
        ) : (
          <button
            type="button"
            onClick={() => setActivated(true)}
            aria-label="Reproduzir vídeo"
            className="group absolute inset-0 flex items-center justify-center"
          >
            <img
              src={THUMBNAIL}
              alt="Capa do vídeo STL do Mago"
              fetchPriority="high"
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <span className="absolute inset-0 bg-black/30" aria-hidden="true" />
            <span className="relative flex h-20 w-20 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-[0_0_40px_hsl(43_90%_52%_/_0.6)] transition-transform group-hover:scale-105">
              <Play className="ml-1 h-9 w-9 fill-current" />
            </span>
          </button>
        )}
      </div>
      {/* Barra de progresso abaixo do vídeo */}
      <div className="mx-auto mt-3 h-2 w-full max-w-[300px] overflow-hidden rounded-full bg-white/15 sm:max-w-sm md:max-w-md lg:max-w-lg">
        <div
          className="h-full bg-green-500 transition-[width] duration-300 ease-linear"
          style={{ width: `${progress}%` }}
          aria-hidden="true"
        />
      </div>
    </div>
  );
}

function ActivePlayer({ onProgress }: { onProgress: (value: number) => void }) {
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const playerRef = useRef<VimeoPlayer | null>(null);
  const [playing, setPlaying] = useState(true);

  useEffect(() => {
    let destroyed = false;
    let player: VimeoPlayer | null = null;

    const init = async () => {
      const { default: Player } = await import("@vimeo/player");
      if (!iframeRef.current || destroyed) return;
      player = new Player(iframeRef.current);
      playerRef.current = player;
      player.on("timeupdate", (d: { seconds: number; duration: number }) => {
        if (d.duration > 0) onProgress((d.seconds / d.duration) * 100);
      });
      player.on("play", () => setPlaying(true));
      player.on("pause", () => setPlaying(false));
      player.on("ended", () => setPlaying(false));
      await player.ready();
      if (destroyed) return;
      await player.setVolume(1).catch(() => {});
      await player.play().catch(() => {});
    };
    void init();

    return () => {
      destroyed = true;
      player?.destroy().catch(() => {});
      playerRef.current = null;
    };
  }, [onProgress]);

  const togglePlay = async () => {
    const player = playerRef.current;
    if (!player) return;
    const paused = await player.getPaused().catch(() => true);
    if (paused) {
      await player.setVolume(1).catch(() => {});
      await player.play().catch(() => {});
    } else {
      await player.pause().catch(() => {});
    }
  };

  return (
    <>
      <iframe
        ref={iframeRef}
        src={`https://player.vimeo.com/video/${VIDEO_ID}?autoplay=1&controls=0&title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479&dnt=1&playsinline=1`}
        frameBorder="0"
        allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
        allowFullScreen
        title="VSL STL do Mago"
        className="absolute inset-0 h-full w-full"
      />
      <button
        type="button"
        onClick={togglePlay}
        aria-label={playing ? "Pausar vídeo" : "Reproduzir vídeo"}
        className={cn(
          "absolute inset-0 z-10 flex items-center justify-center bg-black/20 transition-opacity duration-300",
          playing ? "opacity-0 hover:opacity-100" : "opacity-100",
        )}
      >
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white/90 text-black shadow-lg">
          {playing ? <Pause className="h-7 w-7 fill-current" /> : <Play className="h-7 w-7 fill-current" />}
        </span>
      </button>
    </>
  );
}

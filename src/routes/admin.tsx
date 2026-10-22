import { createFileRoute, useNavigate } from "@tanstack/react-router";
import {
  Crown,
  ImagePlus,
  Loader2,
  LogOut,
  Package,
  Plus,
  Trash2,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/admin")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Dashboard | STL do Mago" },
      { name: "description", content: "Dashboard do administrador." },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminPage,
});

const CATEGORIES = ["Miniaturas", "Cenários", "Bônus", "Extras"] as const;

interface AdminFile {
  id: string;
  name: string;
  description: string;
  category: string;
  image_path: string | null;
  download_url: string;
  created_at: string;
}

function AdminPage() {
  const navigate = useNavigate();
  const [status, setStatus] = useState<"loading" | "ready">("loading");
  const [files, setFiles] = useState<AdminFile[]>([]);
  const [thumbUrls, setThumbUrls] = useState<Record<string, string>>({});

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<(typeof CATEGORIES)[number]>("Miniaturas");
  const [downloadUrl, setDownloadUrl] = useState("");
  const [photo, setPhoto] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const loadFiles = useCallback(async () => {
    const { data, error } = await supabase
      .from("stl_files")
      .select("id, name, description, category, image_path, download_url, created_at")
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: true });

    if (error) {
      toast.error("Erro ao carregar os arquivos.");
      return;
    }

    const rows = (data ?? []) as AdminFile[];
    setFiles(rows);

    const thumbs: Record<string, string> = {};
    await Promise.all(
      rows.map(async (row) => {
        if (!row.image_path) return;
        const { data: signed } = await supabase.storage
          .from("stl-images")
          .createSignedUrl(row.image_path, 60 * 60);
        if (signed?.signedUrl) thumbs[row.id] = signed.signedUrl;
      }),
    );
    setThumbUrls(thumbs);
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function guard() {
      const { data } = await supabase.auth.getUser();
      const userId = data.user?.id;
      if (!userId) {
        navigate({ to: "/auth", replace: true });
        return;
      }
      const { data: isAdmin } = await supabase.rpc("has_role", {
        _user_id: userId,
        _role: "admin",
      });
      if (!isAdmin) {
        await supabase.auth.signOut();
        navigate({ to: "/auth", replace: true });
        return;
      }
      if (cancelled) return;
      setStatus("ready");
      await loadFiles();
    }

    guard();
    return () => {
      cancelled = true;
    };
  }, [navigate, loadFiles]);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (saving) return;

    if (!name.trim() || !downloadUrl.trim()) {
      toast.error("Preencha o nome e o link do arquivo.");
      return;
    }

    setSaving(true);
    try {
      let imagePath: string | null = null;

      if (photo) {
        const ext = photo.name.split(".").pop() ?? "jpg";
        imagePath = `${crypto.randomUUID()}.${ext}`;
        const { error: uploadError } = await supabase.storage
          .from("stl-images")
          .upload(imagePath, photo, { contentType: photo.type });
        if (uploadError) {
          toast.error("Erro ao enviar a foto.");
          return;
        }
      }

      const { error: insertError } = await supabase.from("stl_files").insert({
        name: name.trim(),
        description: description.trim(),
        category,
        download_url: downloadUrl.trim(),
        image_path: imagePath,
      });

      if (insertError) {
        toast.error("Erro ao salvar o arquivo.");
        return;
      }

      toast.success("Arquivo publicado na área de membros!");
      setName("");
      setDescription("");
      setCategory("Miniaturas");
      setDownloadUrl("");
      setPhoto(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
      await loadFiles();
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(file: AdminFile) {
    if (deletingId) return;
    setDeletingId(file.id);
    try {
      const { error } = await supabase.from("stl_files").delete().eq("id", file.id);
      if (error) {
        toast.error("Erro ao remover o arquivo.");
        return;
      }
      if (file.image_path) {
        await supabase.storage.from("stl-images").remove([file.image_path]);
      }
      toast.success("Arquivo removido.");
      await loadFiles();
    } finally {
      setDeletingId(null);
    }
  }

  async function handleSignOut() {
    await supabase.auth.signOut();
    navigate({ to: "/auth", replace: true });
  }

  if (status === "loading") {
    return (
      <main className="flex min-h-screen items-center justify-center bg-background text-foreground">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border/50 bg-card/80">
        <div className="mx-auto flex max-w-4xl items-center justify-between gap-3 px-4 py-4">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary">
              <Crown className="h-5 w-5" />
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-black uppercase">Dashboard</p>
              <p className="truncate text-xs text-muted-foreground">
                Gerencie os arquivos da área de membros
              </p>
            </div>
          </div>
          <Button
            type="button"
            variant="ghost"
            onClick={handleSignOut}
            className="h-10 shrink-0 gap-2 text-muted-foreground hover:text-foreground"
          >
            <LogOut className="h-4 w-4" />
            Sair
          </Button>
        </div>
      </header>

      <div className="mx-auto grid max-w-4xl gap-6 px-4 py-6 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        {/* FORMULÁRIO */}
        <section className="card-dark !p-5">
          <h2 className="mb-4 flex items-center gap-2 text-base font-bold">
            <Plus className="h-5 w-5 text-primary" />
            Novo arquivo
          </h2>

          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <label className="flex flex-col gap-1.5 text-xs font-semibold text-muted-foreground">
              Nome do pacote
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="h-11 rounded-lg border border-border/50 bg-background px-3 text-sm text-foreground outline-none focus:border-primary"
                placeholder="Ex.: Heróis e Raças"
              />
            </label>

            <label className="flex flex-col gap-1.5 text-xs font-semibold text-muted-foreground">
              Descrição
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={2}
                className="rounded-lg border border-border/50 bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-primary"
                placeholder="Ex.: Guerreiros, magos, elfos e anões"
              />
            </label>

            <label className="flex flex-col gap-1.5 text-xs font-semibold text-muted-foreground">
              Categoria
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as (typeof CATEGORIES)[number])}
                className="h-11 rounded-lg border border-border/50 bg-background px-3 text-sm text-foreground outline-none focus:border-primary"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </label>

            <label className="flex flex-col gap-1.5 text-xs font-semibold text-muted-foreground">
              Link do arquivo (Google Drive, Dropbox…)
              <input
                type="url"
                required
                value={downloadUrl}
                onChange={(e) => setDownloadUrl(e.target.value)}
                className="h-11 rounded-lg border border-border/50 bg-background px-3 text-sm text-foreground outline-none focus:border-primary"
                placeholder="https://…"
              />
            </label>

            <label className="flex flex-col gap-1.5 text-xs font-semibold text-muted-foreground">
              Foto da capa (opcional)
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={(e) => setPhoto(e.target.files?.[0] ?? null)}
                className="rounded-lg border border-border/50 bg-background px-3 py-2.5 text-sm text-foreground file:mr-3 file:rounded-md file:border-0 file:bg-primary/15 file:px-3 file:py-1 file:text-xs file:font-semibold file:text-primary"
              />
            </label>

            <Button
              type="submit"
              disabled={saving}
              className="btn-buy mt-2 h-12 w-full text-sm text-foreground"
            >
              {saving ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <ImagePlus className="h-4 w-4" />
              )}
              PUBLICAR ARQUIVO
            </Button>
          </form>
        </section>

        {/* LISTA */}
        <section className="card-dark !p-5">
          <h2 className="mb-4 flex items-center gap-2 text-base font-bold">
            <Package className="h-5 w-5 text-primary" />
            Arquivos publicados ({files.length})
          </h2>

          {files.length === 0 ? (
            <p className="rounded-lg border border-dashed border-border/50 p-6 text-center text-sm text-muted-foreground">
              Nenhum arquivo publicado ainda. Adicione o primeiro pelo
              formulário ao lado.
            </p>
          ) : (
            <ul className="flex flex-col gap-3">
              {files.map((file) => (
                <li
                  key={file.id}
                  className="flex items-center gap-3 rounded-xl border border-border/50 bg-background/40 p-3"
                >
                  {thumbUrls[file.id] ? (
                    <img
                      src={thumbUrls[file.id]}
                      alt={file.name}
                      className="h-14 w-14 shrink-0 rounded-lg object-cover"
                    />
                  ) : (
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <Package className="h-6 w-6" />
                    </div>
                  )}
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-bold">{file.name}</p>
                    <p className="truncate text-xs text-muted-foreground">
                      {file.category}
                    </p>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    aria-label={`Remover ${file.name}`}
                    disabled={deletingId === file.id}
                    onClick={() => handleDelete(file)}
                    className="h-10 w-10 shrink-0 text-muted-foreground hover:text-red-500"
                  >
                    {deletingId === file.id ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Trash2 className="h-4 w-4" />
                    )}
                  </Button>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  );
}

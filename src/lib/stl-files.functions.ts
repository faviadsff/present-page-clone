import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";

export interface StlFileItem {
  id: string;
  name: string;
  description: string;
  category: string;
  imageUrl: string | null;
  downloadUrl: string;
}

// Lista pública dos arquivos STL da área de membros.
// As fotos ficam em bucket privado: aqui geramos links temporários de leitura
// e reescrevemos a origem para a URL pública, acessível pelo navegador.
export const listStlFiles = createServerFn({ method: "GET" }).handler(
  async (): Promise<StlFileItem[]> => {
    const key = process.env["SUPABASE_PUBLISHABLE_KEY"]!;
    const supabasePublic = createClient<Database>(
      process.env["SUPABASE_URL"]!,
      key,
      {
        auth: { persistSession: false },
        global: {
          fetch: (input, init) => {
            const h = new Headers(init?.headers);
            if (key.startsWith("sb_") && h.get("Authorization") === `Bearer ${key}`) {
              h.delete("Authorization");
            }
            h.set("apikey", key);
            return fetch(input, { ...init, headers: h });
          },
        },
      },
    );

    const { data, error } = await supabasePublic
      .from("stl_files")
      .select("id, name, description, category, image_path, download_url")
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: true });

    if (error) throw error;

    const browserBase = process.env["VITE_SUPABASE_URL"];
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    return Promise.all(
      (data ?? []).map(async (row) => {
        let imageUrl: string | null = null;
        if (row.image_path) {
          const { data: signed } = await supabaseAdmin.storage
            .from("stl-images")
            .createSignedUrl(row.image_path, 60 * 60);
          if (signed?.signedUrl) {
            if (browserBase) {
              const signedUrl = new URL(signed.signedUrl);
              const publicOrigin = new URL(browserBase).origin;
              imageUrl = `${publicOrigin}${signedUrl.pathname}${signedUrl.search}`;
            } else {
              imageUrl = signed.signedUrl;
            }
          }
        }
        return {
          id: row.id,
          name: row.name,
          description: row.description,
          category: row.category,
          imageUrl,
          downloadUrl: row.download_url,
        };
      }),
    );
  },
);

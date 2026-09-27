<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->
- Checkout links (pay.wiapy.com) must render through `CheckoutLink` so URL tracking params (utm_*, fbclid, src, sck) are forwarded on click — why: Utmify rewrites hrefs with empty/organic values.
- The miniature gallery uses duplicated six-item CSS tracks with reduced-motion manual scrolling; keep each track step equal to one group plus its gap to avoid a visible loop seam.

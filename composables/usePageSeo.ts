/**
 * Per-page SEO in one place: title, description, canonical URL and the
 * Open Graph / Twitter basics. No og:image yet — add `image` here once there is
 * one, and every page picks it up.
 */
export function usePageSeo(opts: {
  title: string;
  description: string;
  type?: "website" | "article";
}) {
  const siteUrl = useSiteConfig().url;
  const path = useRoute().path.replace(/\/$/, "") || "/";

  useSeoMeta({
    title: opts.title,
    description: opts.description,
    ogTitle: opts.title,
    ogDescription: opts.description,
    ogType: opts.type ?? "website",
    ogSiteName: "shhyydh",
    twitterCard: "summary",
  });
  useHead({ link: [{ rel: "canonical", href: `${siteUrl}${path === "/" ? "" : path}` }] });
}

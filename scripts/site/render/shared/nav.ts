import { Locale } from "./paths";

export type NavItem = {
  label: string;
  href: string;
};

/**
 * Build navigation HTML (shared renderer).
 */
export function buildNavHtml(opts: {
  locale: Locale;
  nav: NavItem[];
  activePath?: string;
}): string {
  const { nav, activePath } = opts;

  const items = nav
    .map((item) => {
      const isActive =
        activePath && activePath === item.href ? "active" : "";
      return `<a href="${item.href}" class="${isActive}">${item.label}</a>`;
    })
    .join("");

  return `<nav>${items}</nav>`;
}
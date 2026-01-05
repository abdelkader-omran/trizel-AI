import { NavItem } from "../shared/nav";

export function getFrNav(): NavItem[] {
  return [
    { label: "Accueil", href: "/fr/index.html" },
    { label: "Spécifications", href: "/fr/spec/index.html" },
    { label: "Audit", href: "/fr/audit/index.html" },
    { label: "Juridique", href: "/fr/legal/ip-non-appropriation.html" },
    { label: "EN", href: "/en/index.html" },
  ];
}
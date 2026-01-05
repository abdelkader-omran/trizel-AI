import { NavItem } from "../shared/nav";

export function navEn(): NavItem[] {
  return [
    { label: "Home", href: "/en/index.html" },
    { label: "Specification", href: "/en/spec/index.html" },
    { label: "Audit", href: "/en/audit/index.html" },
    { label: "Legal", href: "/en/legal/ip-non-appropriation.html" },
    { label: "FR", href: "/fr/index.html" },
  ];
}
import { SidebarTab } from "@/lib/types";
import { TbTools, TbShield, TbHorseToy } from "react-icons/tb";

export const tabs: Record<string, SidebarTab> = {
  Útil: {
    icon: TbTools,
    subTabs: [
      {
        name: "Embeds",
        path: "/embeds",
      },
    ],
  },
  Moderação: {
    icon: TbShield,
    subTabs: [
      {
        name: "Pote de Mel",
        path: "/honeypot",
      },
    ],
  },
  Entretenimento: {
    icon: TbHorseToy,
    subTabs: [
      {
        name: "Níveis",
        path: "/levels",
      },
      {
        name: "Gatilhos",
        path: "/triggers",
      },
    ],
  },
};

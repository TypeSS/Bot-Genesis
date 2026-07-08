export type Guild = {
  banner: string;
  splash: string;
  features: string[];
  icon: string;
  id: string;
  name: string;
  owner: boolean;
  permissions: string;
  approximate_member_count: number;
  approximate_presence_count: number;
};

export type SidebarTab = {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  subTabs: {
    name: string;
    path: string;
  }[];
};

export type BusinessData = {
  id: number;
  name: string;
  slug: string;

  google_url?: string | null;
  instagram_url?: string | null;
  maps_url?: string | null;
  phone?: string | null;

  template?: string | null;

  active: boolean;
  status?: string | null;
};

export type BusinessTemplateProps = {
  business: BusinessData;
  card?: string;
};
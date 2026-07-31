export interface MenuItem {
  cat_id: string;
  cat_name: string;
  slug: string;
}

export interface MenuResponse {
  status: string;
  data: {
    menu: MenuItem[];
  };
}
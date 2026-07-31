export interface ThumbUrl {
  size_200_300?: string;
  size_480_320?: string;
  size_768_1920?: string;
  size_1080_1920?: string;
  size_360_1280?: string;
  h_thumburl?: string;
  v_thumburl?: string;
}

export interface Movie {
  entryid?: string | null;
  id?: number;
  slug?: string;
  name: string;
  thumburl: ThumbUrl;
  ispremium?: number | null;
  number_thumburl?: string;
  category_id?: number;
  category_type?: string;
}

export interface Section {
  cat_type:
    | "top_10"
    | "continue_watching"
    | "cat"
    | "ser"
    | string;
  title_tag_name: string;
  image_type?: string;
  search_tag: Movie[];
}

export interface HomeResponse {
  status: string;
  data: {
    home: Section[];
    banner: any[];
    message: string;
    total_count: number;
  };
}
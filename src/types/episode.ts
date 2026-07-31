export interface EpisodeThumb {
  size_1080_1920?: string;
  size_768_1920?: string;
  size_480_320?: string;
  size_360_1280?: string;
  size_200_300?: string;
  v_thumburl?: string;
  h_thumburl?: string;
}

export interface Episode {
  name: string;
  duration: number;
  ispremium: number;
  entryid: string;
  thumburl: EpisodeThumb;
  description: string;
  category_id: number;
  season_id: number;
  age_limit?: string;
}

export interface EpisodeListResponse {
  status: string;
  data: {
    episodes: Episode[];
    total_count: number;
  };
}
export interface SeasonThumb {
  size_1080_1920?: string;
  size_768_1920?: string;
  size_480_320?: string;
  size_360_1280?: string;
  size_200_300?: string;
  v_thumburl?: string;
  h_thumburl?: string;
}

export interface Season {
  seasons_id: number;
  seasons_name: string;
  season_episodes_count: number;
  slug: string;
  title: string;
  seasons_description: string;
  seasons_thumbnail: SeasonThumb;
}

export interface SeasonListResponse {
  status: string;
  data: {
    seasons: Season[];
  };
}
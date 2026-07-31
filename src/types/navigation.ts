import { Section } from "./home";


export type RootStackParamList = {
  Login: undefined;
  OTP: {
    mobile: string;
  };
  Home: undefined;
  CategoryList: {
    title: string;
    section: Section;
  };
  SeasonList: {
    categoryId: string;
    title: string;
  };
  EpisodeList: {
    seasonId: string;
    seasonName: string;
    seriesTitle: string;
  };
  Player: {
    entryid: string;
    title: string;
    resumeFrom?: number;
  };
};
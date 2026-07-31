export interface SkipRange {
  start: number;
  end: number;
}

export interface AwsSignedCookie {
  "CloudFront-Policy": string;
  "CloudFront-Signature": string;
  "CloudFront-Key-Pair-Id": string;
}

export interface VideoData {
  entryid: string;
  name: string;
  long_description: string;
  duration: number;
  ispremium: number;
  status: number;
  message: string;
  is_drm: number;
  drm_license_url: string;
  certificate_url: string;
  download_url: string | null; // null when gated (e.g. subscription required)
  audio_url?: string;
  aws?: AwsSignedCookie | null; // CloudFront signed-cookie auth for download_url
  skip_intro: SkipRange;
  skip_credit: SkipRange;
}

export interface PlayResponse {
  status: string;
  data: {
    video: VideoData[];
    play_button_message?: string;
  };
}
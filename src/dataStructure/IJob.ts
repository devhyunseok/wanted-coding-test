export interface IJob {
    id: number;
    address: { country: string; location: string; };
    company: { id: number; industry_name: string; name: string; };
    compare_country: boolean;
    is_bookmark: boolean;
    is_like: boolean;
    like_count: number;
    logo_img: { origin: string; thumb: string;}
    position: string;
    reward: { formatted_total: string; formatted_recommendee: string; formatted_recommender: string;};
    status: string;
    title_img: { origin: string; thumb: string;}
  }
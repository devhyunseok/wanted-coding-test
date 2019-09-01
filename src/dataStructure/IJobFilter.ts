export interface IJobFilterParams {
    country: string;
    tag_type_id: number;
    job_sort: string;
    year: number;
    locations: string[];
    limit?: number;
    offset?: number;
}

export interface IFilterParams {
  countries: any;
  job_sort: any;
  years: any;
}
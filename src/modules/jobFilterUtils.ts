import { IFilterParams } from 'dataStructure/IJobFilter';

export const classifySelectedFilter = ({countries, job_sort, years} : IFilterParams) => {
  const country = countries.filter((item:any) => item.selected)[0];
  const jobSort = job_sort.filter((item:any) => item.selected)[0];
  const year = years.filter((item:any) => item.selected)[0];
  const locations = country.locations.length > 0 ? country.locations.filter((item:any) => item.selected) : [];

  return {
    country,
    jobSort,
    year,
    locations
  }
}

 
  
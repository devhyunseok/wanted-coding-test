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

export const makeFilterQueryString = (countryKey: string, sortKey: string, yearKey: number, locations: any) => {
  let locationsString = '';
  
  if(locations.length > 0) {
    locationsString = locations.reduce((acc:string, cur:any) => {
      return `${acc}&locations=${cur.key}`;
    }, '');
  }
 
  return `/?country=${countryKey}&job_sort=${sortKey}&year=${yearKey}${locationsString}`;
};
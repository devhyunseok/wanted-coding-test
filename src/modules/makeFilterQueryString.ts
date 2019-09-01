const makeFilterQueryString = (countryKey: string, sortKey: string, yearKey: number, locations: any) => {
  let locationsString = '';
  
  if(locations.length > 0) {
    locationsString = locations.reduce((acc:string, cur:any) => {
      return `${acc}&locations=${cur.key}`;
    }, '');
  }
 
  return `/?country=${countryKey}&job_sort=${sortKey}&year=${yearKey}${locationsString}`;
};

export default makeFilterQueryString;
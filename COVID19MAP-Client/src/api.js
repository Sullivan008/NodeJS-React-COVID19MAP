export const covidDataByCountriesSummarizeJson = async () => {
    const serviceResponse = await window.fetch('http://localhost:3001/get-covid-data-by-countries-summarize');
    
    return await serviceResponse.json();
}
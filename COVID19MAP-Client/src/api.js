export const getJsonCovidData = async () => {
    const serviceResponse = await window.fetch('http://localhost:3001/get-covid-data');
    
    return await serviceResponse.json();
}
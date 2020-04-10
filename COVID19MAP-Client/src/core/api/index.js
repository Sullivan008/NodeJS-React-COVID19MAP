const BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3001';

export const getJsonCovidData = async () => {
    const serviceResponse = await window.fetch(`${BASE_URL}/get-covid-data`);
    
    return await serviceResponse.json();
}
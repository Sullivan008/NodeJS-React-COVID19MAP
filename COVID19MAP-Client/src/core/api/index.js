const BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3001';

export const getJsonCovidData = async () => {
    const serviceResponse = await window.fetch(`${BASE_URL}/get-covid-data`);
    
    return await serviceResponse.json();
}

export const getCovidMapPlaceDatas = async() => {
    const serviceResponse = await window.fetch(`${BASE_URL}/get-covid-map-place-datas`);
    
    return await serviceResponse.json();
}

export const getTotalConfirmedValue = async() => {
    const serviceResponse = await window.fetch(`${BASE_URL}/get-total-confirmed-value`);
    
    return await serviceResponse.json();
}

export const getConfirmedRows = async() => {
    const serviceResponse = await window.fetch(`${BASE_URL}/get-confirmed-rows`);
    
    return await serviceResponse.json();
}

export const getTotalDeathsValue = async() => {
    const serviceResponse = await window.fetch(`${BASE_URL}/get-total-deaths-value`);
    
    return await serviceResponse.json();
}

export const getDeathRows = async() => {
    const serviceResponse = await window.fetch(`${BASE_URL}/get-death-rows`);
    
    return await serviceResponse.json();
}

export const getDeathRowById = async(rowId) => {
    const serviceResponse = await window.fetch(`${BASE_URL}/get-death-row-by-id?rowId=${rowId}`);
    
    return await serviceResponse.json();
}

export const getTotalRecoveredValue = async() => {
    const serviceResponse = await window.fetch(`${BASE_URL}/get-total-recovered-value`);
    
    return await serviceResponse.json();
}

export const getRecoveredRows = async() => {
    const serviceResponse = await window.fetch(`${BASE_URL}/get-recovered-rows`);
    
    return await serviceResponse.json();
}

export const getRecoveredRowById = async(rowId) => {
    const serviceResponse = await window.fetch(`${BASE_URL}/get-recovered-row-by-id?rowId=${rowId}`);
    
    return await serviceResponse.json();
}
# NodeJS - React - Global Coronavirus (COVID-19) Map with Google Maps - Web Application [Year of Development: 2020]

About the application technologies and operation:

### Technologies:
- Programming Language: NodeJS
- FrontEnd Side: React (^13.13.1)
- BackEnd Side: NodeJS (^10.16.3)
- Descriptive Language: HTML5 
- Style Description Language: CSS
- Other used modul **FrontEnd Side**: 
  - react (^16.13.1)
  - react-dom (^16.13.1)
  - react-google-maps (^9.4.5)
  - react-scripts (^3.4.1)
  - yarn (^1.22.4)
- Other used modul **BackEnd Side**:
  - axios (^0.19.2)
  - cors (^2.8.5)
  - cron (^1.8.2)
  - cross-env (^7.0.2)
  - csv-parse (^4.8.8)
  - express (^4.17.1)
  - moment (^2.24.0)

### Installation/ Configuration:

1. Restore necessary **node_modules**, so run the following command in **GIT Bash Console** in the application **COVID19MAP-Client** and **COVID19MAP-Server** root directory

   ```
   - npm install
   ```

2. Restore necessary application packages and dependencies, so run the following command in **GIT Bash Console** in the application **COVID19MAP-Client** root directory

   ```
   - yarn install
   ```

4. Start the application server side on **3001 PORT**, so run the following command in **GIT Bash Console** in the application **COVID19MAP-Server** root directory

   ```
   - cross-env PORT=3001 nodemon
   ``` 

5. If the nodemon bach command not found, run the following command in **GIT Bash Console** in the application **COVID19MAP-Server** root directory

   ```
   - npm install -g nodemon
   ```  

6. Start the application client side, so run the following command in **GIT Bash Console** in the application **COVID19MAP-Client** root directory

   ```
   - npm start
   ``` 

7. Insert your **Google API Key**. If you are running the application in an installed environment, you will need to specify the following environment variable **REACT_APP_GOOGLE_MAPS_API_KEY** and its associated **Google Maps API Key**. If you are running the application on localhost, you will need to enter your **Google Maps API Key** in the line below (*src/core/components/App/App.js line: 157*).

   ```javascript
    googleMapURL = {`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY || 'YOUR_GOOGLE_API_KEY'}`}
   ``` 

8. If you are running the application for the first time, you need to invoke the following server method, for example, from a **Postman web client** (in order not to wait an hour). This method initializes the required data. If you are not using on localhost, of course insert the correct path!:

   ```
   http://localhost:3001/update-covid-data
   ``` 

### Data Sources:

The map is based on multiple sources (see below for details). If you are interested, the integrated dataset can be found here. Note that numbers in different data sources may not match with each other exactly.

The application uses the following data set as the data source (Based on data provided by Johns Hopkins University (JHU)): https://github.com/CSSEGISandData/COVID-19/tree/master/csse_covid_19_data/csse_covid_19_daily_reports

The data source is queried hourly, today's data set. If this is not found, yesterday's data set will be downloaded and processed, so it is important to point out that in most cases the **SYSTEM ONLY WORKS FROM YEARYESTERDAY'S DATA**.

**Attention**: The last data set tested is **April 14, 2020**. If the structure of the data source has changed, the application will not work properly! In this case, paste the following line into the **data-management.js** file so that the application works from the surely running **April 14, 2020** data that can be used to test the application.

```javascript
const DATA_URL = 'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports/14-04-2020.csv';
```

I cite data sources according to the data sources listed in the GitHub repository published by Johns Hopkins University (JHU) (I made the summons on April 14, 2020 https://github.com/CSSEGISandData/COVID-19): 

#### "*Data Sources:*

  - *World Health Organization (WHO): https://www.who.int/*
  - *DXY.cn. Pneumonia. 2020. http://3g.dxy.cn/newh5/view/pneumonia.*
  - *BNO News: https://bnonews.com/index.php/2020/02/the-latest-coronavirus-cases/*
  - *National Health Commission of the People’s Republic of China (NHC): http://www.nhc.gov.cn/xcs/yqtb/list_gzbd.shtml*
  - *China CDC (CCDC): http://weekly.chinacdc.cn/news/TrackingtheEpidemic.htm*
  - *Hong Kong Department of Health: https://www.chp.gov.hk/en/features/102465.html*
  - *Macau Government: https://www.ssm.gov.mo/portal/*
  - *Taiwan CDC: https://sites.google.com/cdc.gov.tw/2019ncov/taiwan?authuser=0*
  - *US CDC: https://www.cdc.gov/coronavirus/2019-ncov/index.html*
  - *Government of Canada: https://www.canada.ca/en/public-health/services/diseases/coronavirus.html*
  - *Australia Government Department of Health: https://www.health.gov.au/news/coronavirus-update-at-a-glance*
  - *European Centre for Disease Prevention and Control (ECDC): https://www.ecdc.europa.eu/en/geographical-distribution-2019-ncov-cases*
  - *Ministry of Health Singapore (MOH): https://www.moh.gov.sg/covid-19*
  - *Italy Ministry of Health: http://www.salute.gov.it/nuovocoronavirus*
  - *1Point3Arces: https://coronavirus.1point3acres.com/en*
  - *WorldoMeters: https://www.worldometers.info/coronavirus/*
  - *COVID Tracking Project: https://covidtracking.com/data. (US Testing and Hospitalization Data. We use the maximum reported value from "Currently" and "Cumulative" Hospitalized for our hospitalization number report ed for each state.)*"

I also quote the following about the Github account provided by Johns Hopkins University (JHU) (I made the summons on April 14, 2020 https://github.com/CSSEGISandData/COVID-19):

#### "*Terms of Use:*

*This GitHub repo and its contents herein, including all data, mapping, and analysis, copyright 2020 Johns Hopkins University, all rights reserved, is provided to the public strictly for educational and academic research purposes. The Website relies upon publicly available data from multiple sources, that do not always agree. The Johns Hopkins University hereby disclaims any and all representations and warranties with respect to the Website, including accuracy, fitness for use, and merchantability. Reliance on the Website for medical guidance or use of the Website in commerce is strictly prohibited.*"

### About the application:

  - The purpose of the web application is to present the **COVID-19** *Total Confirmed and Confirmed Cases by Province/State/Dependency for worldwide*, **COVID-19** *Total Deaths and Death Numbers by Province/State/Dependency for worldwide* and **COVID-19** *Total Recovered and Recovered Numbers by Province/State/Dependency for worldwide*.
  - The surface consists of **3 parts**:
    - **The left column** contains the numbers *Total Confirmed* and *Confirmed Cases by Province/State/Dependency for worldwide*.
    - **The middle column** contains the *visual appearance*.
    - **The right column** contains *Total Deaths* and *Death Numbers by Province/State/Dependency for worldwide* and *Total Recovered* and *Recovered Numbers by Province/State/Dependency for worldwide*.
  - For visual appearance, we use **Google Maps** provided by **Google**.
  - The visual display:
    - Based on the data received from the server side, based on the *Latitude* and *Longitude* for each *Confirmed Cases*, a red circle is displayed on the map.
    - The diameter of the circle is calculated by a simple logarithm. We multiply the logarithm of the number of confirmed cases for a given case by an arbitrary number that will result in a magnification of the circle.
  - Magnified on the map, after an *appropriate Zoom size*, the *Label for the circle* is displayed, which contains the *Name of the Marker for Latitude and Longitude*, the *number of confirmed cases*, the *number of deaths* and the *number of recovered*.
    - If you make the *Zoom size smaller*, this Label will disappear.
    - **NOTE**: *Circles appearing on the map are locations based on the "Province-Country" ID, not all locations with a "combinedKey" ID as defined by the reporting organization, as they are for drawing Labels the map would be impenetrable].*
  - If you *click on an item in the Confirmed Cases list*, Focus will move to that circle on the Map, and the numbers and items in the *Total Deaths*, *Deaths List*, *Total Recovered*, *Recovered List* will be the values for that location.
  - You can change the selections as you like, as the selected item will be displayed in a *different color*.
  - If *you click on the selected item again*, the selection will be *deselected*, the data will be reset to all data.
  - Data is **updated hourly**:
    - From the previously mentioned data source, it is *queried hourly, today's data set*. **If this is not found**, *yesterday's data set will be downloaded and processed*, so it is important to point out that in most cases the **SYSTEM ONLY WORKS FROM YEARYESTERDAY'S DATA.**
    - Because the data is constantly updated and each block is updated separately, each block has a *Loading Screen* that is displayed until the data is downloaded!
    
**Attention**: The last data set tested is **April 14, 2020**. If the structure of the data source has changed, the application will not work properly! In this case, paste the following line into the **data-management.js** file so that the application works from the surely running **April 14, 2020** data that can be used to test the application.

```javascript
const DATA_URL = 'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports/14-04-2020.csv
```

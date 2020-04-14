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

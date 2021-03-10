/*
*
*
**** Author : Ankit Rana ****
*
*
*/

import { Card, CardContent, FormControl, MenuItem, Select } from '@material-ui/core';
import { useState, useEffect } from 'react';
import './App.css';
import InfoBox from './InfoBox'
import Map from './Map'
import Table from './Table';
import {sortData, prettyPrintStat} from './util';
import LineGraph from './LineGraph';
import "leaflet/dist/leaflet.css";


function App() {
  // using state to declare variables
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState('worldwide')
  const [countryInfo,setCountryInfo] = useState({});
  const [tableData,setTableData] = useState([]);
  const [mapCountries, setMapCountries] = useState([])
  const [casesType, setCasesType] = useState("cases");
  // center initially points to center of pacific ocean as its center of whole of the map
  const [mapCenter, setMapCenter] = useState({ lat: 34.80746, lng: -40.4796 });
  
  // zoom 3 is the zoom from where all of the map is visible
  const [mapZoom, setMapZoom] = useState(3);
  //  https://disease.sh/v3/covid-19/countries
  // UseEffect =>  Runs a Piece Of Code On The Basis Of Some Given Condition
  
  // This will load the worldwide data when a page is refreshed/loaded
  useEffect(()=>{
    fetch('https://disease.sh/v3/covid-19/all').then(response => response.json()).then((data) =>{
    // set info (covid cases, recovered, deaths) about all countries  
    setCountryInfo(data);
    });
  },[])
  
  useEffect(()=>{
    // [] -> The Code Will Run Once The App Loads & Once When The Component Loads
  // async -> sends a request, wait for it, do something with it
  // fetch()  works well for get request so haven't used the external dependency (axios)
    const getCountriesData = async () => {
      
      await fetch("https://disease.sh/v3/covid-19/countries")
      .then((response) => response.json())
      .then((data) =>{ // map helps to create an array of objects
        // creating an object that will help us to access each country's name and ID
        const countries = data.map((country)=>(
          {
            name : country.country, // United States, United Kingdom, France,...
            value : country.countryInfo.iso2 // UK, USA, FR,....
          }
        ));
        const sortedData = sortData(data);
        //sorted countries on the basis of number of cases
        setTableData(sortedData);
        setCountries(countries);
       
        // sending all the information received in data to setMapCountries
        setMapCountries(data);
      });
    }
    getCountriesData();
  },[]);

  // this function handles the changes happening while selecting an option from the Drop Down Menu
  const onCountryChange = async (event) =>{
   
    const countryCode = event.target.value;

     // Worldwide statistics are obtained from : https://disease.sh/v3/covid-19/all
    // Making a Call to https://disease.sh/v3/covid-19/countries/[COUNTRY_CODE] and it will pull the information for a specific country
    // Setting URL based on Conditions :
    const url = countryCode === 'worldwide'
    ? 'https://disease.sh/v3/covid-19/all' 
    : `https://disease.sh/v3/covid-19/countries/${countryCode}`
    
    await fetch(url)
    .then( response => response.json())
    .then(data =>{
      setCountry(countryCode);
      // All the data from response is saved
      setCountryInfo(data); 
      
      // Our Api also gives us the information related to Latitude and Longitute of Country
      if(countryCode === 'worldwide') 
      {setMapCenter([34.80746,-40.4796])
      setMapZoom(3);
      }
      else
      setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
      
      setMapZoom(4);
    });
  };

  return (
    
    <div className="app">
       
      <div className="app__left">
         {/* Header */}
        <div className="app__header">
          {/* Title */}
          <h1 onClick={() => window.location.reload()}>COVID-19 Tracker</h1>
          <FormControl className="app__dropdown">
              {/*  Select Input Dropdown Field */}
            <Select
            variant="outlined"
            value = {country}  
            onChange = {onCountryChange}
            >
             {/* Manually Inserting Worldwide Option As It Isn't Available From The API */}
             <MenuItem value = "worldwide">Worldwide</MenuItem>
             {/* Loop Through The Countries and Display the Options */}
              {countries.map((country)=>(
                <MenuItem value = {country.value}>{country.name}</MenuItem>
              ))}

             {/* Manually Inserting Options Example
              <MenuItem value = "worldwide">Option 2</MenuItem>
              <MenuItem value = "worldwide">Option 8</MenuItem>
              <MenuItem value = "worldwide">Option 9</MenuItem>
            */}
            </Select>
          </FormControl>

      </div>
      
      {/* Displaying Stats : Active , Recovered , Deaths */}
      <div className="app__stats">
         
          {/* Info Box : Corona Virus Cases */}
           <InfoBox 
              isRed
             onClick={(e) => setCasesType("cases")}
             active={casesType === "cases"}
            title ="Covid Cases"
            cases = {prettyPrintStat(countryInfo.todayCases)}
             total = {countryInfo.cases}
              />
          {/* Info Boxe : Corona Virus Recoveries */}
           <InfoBox
            onClick={(e) => setCasesType("recovered")}
            active={casesType === "recovered"}
            title ="Recovered" 
           cases = {prettyPrintStat(countryInfo.todayRecovered)} 
           total = {countryInfo.recovered}
            />
          {/* Info Box : Corona Virus Deaths */}
           <InfoBox
           isRed 
           onClick={(e) => setCasesType("deaths")}
           active={casesType === "deaths"}
           title ="Deaths" 
           cases = {prettyPrintStat(countryInfo.todayDeaths)} 
           total = {countryInfo.deaths}
           />
      </div>


      {/* Map */}
      <Map 
          countries = {mapCountries}
          center={mapCenter}
          zoom={mapZoom}
          casesType = {casesType}
      />
    </div>
      
      <Card className="app__right">
       <CardContent>
         <h3>Live Cases By Country</h3>
          <Table countries= {tableData} />
       {/* Table */}
  
        {/* Graph */}
        <h3 className="graph__title">Worldwide New {casesType}</h3>
        <LineGraph className ="app__graph" casesType={casesType} />
        
       </CardContent>
    </Card>
    
  </div>
  

  );
}

export default App;

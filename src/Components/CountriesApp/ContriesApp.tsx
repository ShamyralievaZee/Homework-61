import '../../App.css';
import { ICountry } from '../../types';
import React, { useState, useEffect } from 'react';
import axios, { AxiosResponse } from 'axios';

const BASE_URL = 'https://restcountries.com/v2/';
const ALL_COUNTRIES_URL = 'all?fields=alpha3Code,name,capital,population,borders,region';

const CountryApp: React.FC = () => {
  const [countries, setCountries] = useState<ICountry[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<ICountry | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCountries = async (): Promise<void> => {
    try {
      const response: AxiosResponse<ICountry[]> = await axios.get<ICountry[]>(`${BASE_URL}${ALL_COUNTRIES_URL}`);
      setCountries(response.data);
    } catch (error) {
      setError('Error getting the country list');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCountryData = async (alphaCode: string): Promise<void> => {
    try {
      const response: AxiosResponse<ICountry> = await axios.get<ICountry>(`${BASE_URL}alpha/${alphaCode}`);
      setSelectedCountry(response.data);
    } catch (error) {
      setError('Error getting country data');
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    (async () => {
      await fetchCountries();
    })();
  }, []);

  return (
    <div className='main-container'>
      <div className='countryList'>
        <h2>Country List</h2>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          countries.map(country => (
            <div
              key={country.alpha3Code}
              onClick={() => fetchCountryData(country.alpha3Code)}
              className='countryNameElement'>
              {country.name}
            </div>
          ))
        )}
      </div>

      <div className="countryInfo">
        {selectedCountry ? (
          <div>
            <div className='flagWrapper'>
              <img src={selectedCountry.flag} alt={`Flag of ${selectedCountry.name}`} className='flagElement'/>
            </div>
            <div className="countyInfoWrapper">
              <h2>{selectedCountry.name}</h2>
              <p><strong>Capital:</strong> {selectedCountry.capital ?? 'No capital'}</p>
              <p><strong>Population:</strong> {selectedCountry.population ?? 'Unknown'}</p>
              <p><strong>Region:</strong> {selectedCountry.region}</p>
              <p><strong>Borders with:</strong></p>
              <ul>
                {selectedCountry.borders && selectedCountry.borders.length > 0 ? (
                  selectedCountry.borders.map(borderCode => {
                    const borderCountry = countries.find(c => c.alpha3Code === borderCode);
                    return (
                      <li key={borderCode}>
                        {borderCountry ? borderCountry.name : borderCode}
                      </li>
                    );
                  })
                ) : (
                  <li>No bordering countries</li>
                )}
              </ul>
            </div>
          </div>
        ) : (
          <p>Choose a country</p>
        )}
      </div>
    </div>
  );
};

export default CountryApp;

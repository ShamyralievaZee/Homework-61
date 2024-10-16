import '../../App.css';
// const BASE_URL = 'https://restcountries.com/v2/';
// const ALL_COUNTRIES_URL = 'all?fields=alpha3Code,name,capital,population,borders,region';
const CountryApp= () => {

  return (
    <div className='main-container'>
      <div className='countryList'>
        <h2>Country List</h2>
      </div>

      <div className='countryInfo'>
            <img src='#' alt='flag'
                 style={{width: '100px', height: 'auto'}}/>
            <h2>Name</h2>
            <p><strong>Capital:</strong> Capital</p>
            <p><strong>Population:</strong> Population</p>
            <p><strong>Region:</strong>Region </p>
            <p><strong>Borders with:</strong></p>
      </div>
    </div>
  );
};

export default CountryApp;

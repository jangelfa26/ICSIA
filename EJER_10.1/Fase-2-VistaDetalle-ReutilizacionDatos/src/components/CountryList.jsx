import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function CountryList({ onCountrySelect }) {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetch('https://restcountries.com/v3.1/region/europe')
      .then((response) => response.json())
      .then((data) => setCountries(data));
  }, []);

  const filteredCountries = countries.filter(country =>
    country.name.common.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="sidebar">
      <h2>Países del Mundo</h2> <br />
      <p>Datos cargados desde <a href="https://restcountries.com/" target="_blank" rel="noopener noreferrer">restcountries.com</a></p>
      <br />
      <input 
        type="text" 
        placeholder="Buscar país..." 
        value={search} 
        onChange={(e) => setSearch(e.target.value)} 
      />
      <ul>
        {filteredCountries.map(country => (
          <li key={country.cca3}>
            <Link to={`/country/${country.name.common.toLowerCase()}`}>
              <img src={country.flags.svg} alt={`${country.name.common} flag`} />
              {country.name.common}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CountryList;

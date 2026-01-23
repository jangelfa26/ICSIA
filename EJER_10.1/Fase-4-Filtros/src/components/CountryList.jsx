import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function CountryList({ countries }) {
  const [search, setSearch] = useState('');
  const [filteredCountries, setFilteredCountries] = useState(countries);

  useEffect(() => {
    setFilteredCountries(
      countries.filter(country =>
        country.name.common.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, countries]);

  return (
    <div className="sidebar">
      <h2>Países del Mundo</h2>
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

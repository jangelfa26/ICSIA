import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

function CountryDetails() {
  const { countryName } = useParams();
  const [country, setCountry] = useState(null);

  useEffect(() => {
    fetch(`https://restcountries.com/v3.1/name/${countryName}`)
      .then(response => response.json())
      .then(data => setCountry(data[0]));
  }, [countryName]);

  if (!country) {
    return <p>Cargando...</p>;
  }

  return (
    <div className="country-details">
      <img src={country.flags.svg} alt={country.name.common} />
      <h2>{country.name.official}</h2>
      <p><strong>Capital:</strong> {country.capital}</p>
      <p><strong>Población:</strong> {country.population.toLocaleString()}</p>
      <p><strong>Continente:</strong> {country.region}</p>
      <p><strong>Idiomas:</strong> {Object.values(country.languages).join(', ')}</p>

      <div className="borders">
        <strong>Países Fronterizos:</strong>
        {country.borders ? (
          country.borders.map((border) => (
            <Link key={border} to={`/country/${border.toLowerCase()}`}>{border}</Link>
          ))
        ) : (
          <p>No tiene fronteras</p>
        )}
      </div>
    </div>
  );
}

export default CountryDetails;

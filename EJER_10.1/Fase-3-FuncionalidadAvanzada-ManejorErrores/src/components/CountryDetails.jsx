import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

function CountryDetails({ countries }) {
  const { countryName } = useParams();
  const [country, setCountry] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch(`https://restcountries.com/v3.1/name/${countryName}`)
      .then(response => response.json())
      .then(data => {
        if (data && data[0]) {
          setCountry(data[0]);
          setError(false);
        } else {
          setError(true);
        }
      })
      .catch(() => setError(true));
  }, [countryName]);

  const getBorderCountryName = (borderCode) => {
    const borderCountry = countries.find(c => c.cca3 === borderCode);
    return borderCountry ? borderCountry.name.common : borderCode;
  };

  if (error) {
    return (
      <div className="error-page">
        <h2>País no encontrado</h2>
        <p>Lo sentimos, no pudimos encontrar el país que buscabas.</p>
        <Link to="/">Volver al inicio</Link>
      </div>
    );
  }

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
      <p><strong>Subregión:</strong> {country.subregion}</p>
      <p><strong>Idiomas:</strong> {Object.values(country.languages).join(', ')}</p>

      <div className="borders">
        <h3>Países Fronterizos:</h3><br />
        {country.borders ? (
          country.borders.map((border) => (
            <Link key={border} to={`/country/${getBorderCountryName(border).toLowerCase()}`}>
              {getBorderCountryName(border)}
            </Link>
          ))
        ) : (
          <p>No tiene fronteras</p>
        )}
      </div>
    </div>
  );
}

export default CountryDetails;

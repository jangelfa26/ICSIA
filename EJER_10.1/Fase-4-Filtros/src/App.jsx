import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import CountryList from './components/CountryList';
import CountryDetails from './components/CountryDetails';
import ErrorPage from './components/ErrorPage';

function App() {
  const [countries, setCountries] = useState([]);
  const [isError, setIsError] = useState(false); 

  useEffect(() => {
    fetch('https://restcountries.com/v3.1/region/europe')
      .then((response) => response.json())
      .then((data) => {
        setCountries(data);
        setIsError(false);
      })
      .catch(() => {
        setIsError(true);
      });
  }, []);

  return (
    <Router>
      <div className="app-layout">
        <aside>
          <CountryList countries={countries} />
        </aside>
        <main className="main-content">
          <Routes>
            <Route path="/" element={<h1>Bienvenido a la Exploración de Países</h1>} />
            <Route 
              path="/country/:countryName" 
              element={<CountryDetails countries={countries} />} 
              errorElement={<ErrorPage />}
            />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;

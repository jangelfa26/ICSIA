import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import CountryList from './components/CountryList';
import CountryDetails from './components/CountryDetails';

function App() {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    fetch('https://restcountries.com/v3.1/region/europe')
      .then((response) => response.json())
      .then((data) => setCountries(data));
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
            <Route path="/country/:countryName" element={<CountryDetails countries={countries} />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;

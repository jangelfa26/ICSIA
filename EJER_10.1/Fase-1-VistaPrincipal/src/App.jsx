import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CountryList from './components/CountryList';
import CountryDetails from './components/CountryDetails';

function App() {
  return (
    <Router>
      <div className="app-layout">
        <aside className="sidebar">
          <CountryList />
        </aside>
        <main className="main-content">
          <Routes>
            <Route path="/" element={<h1>Bienvenido a la Exploración de Países</h1>} />
            <Route path="/country/:countryName" element={<CountryDetails />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;

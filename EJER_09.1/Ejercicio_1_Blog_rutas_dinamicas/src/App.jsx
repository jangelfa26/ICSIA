import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BarraNavegacion from './components/Navbar';
import PaginaInicio from './components/HomePage';
import PaginaArticulos from './components/PostsListPage';
import PaginaDetalleArticulo from './components/PostDetailPage';
import './App.css';

function App() {
  return (
    <div className="app-container">
      <Router>
        <BarraNavegacion />
        <Routes>
          <Route path="/" element={<PaginaInicio />} />
          <Route path="/posts" element={<PaginaArticulos />} />
          <Route path="/posts/:postId" element={<PaginaDetalleArticulo />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

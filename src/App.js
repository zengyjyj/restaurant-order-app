import React from 'react'; 
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Contact from "./pages/Contact"; 
import Panier from './pages/Panier';
 import './App.css';

//import images
import panierIcon from './images/panier.png';

function App() {
  return (
    <Router>
      <div className="App">
        <nav>
          <ul>
            <li><Link to="/">Accueil</Link></li>
            <li><Link to="/menu">Menu</Link></li>
            <li><Link to="/contact">Contact</Link></li> 
            <li>
              <Link to="/panier">
                <img src={panierIcon} alt="Panier" className="panier-icon" />
              </Link>
            </li> 
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/contact" element={<Contact />} /> 
          <Route path="/panier" element={<Panier />} /> 
        </Routes>
      </div>
    </Router>
  );
}

export default App;

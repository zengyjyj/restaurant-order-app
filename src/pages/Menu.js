import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import bouillons from '../menuData/Bouillons';
import viandes from '../menuData/Viande';
import legumes from '../menuData/Legumes';
import accompagnements from '../menuData/Accompagnements';
import MenuItem from '../menuData/MenuItem';
import './Menu.css';

const Menu = () => {
    //le page de bouillons par default
  const [categorie, setCategorie] = useState('bouillons');
  const location = useLocation();

  const getItems = () => {
    switch (categorie) {
      case 'bouillons':
        return bouillons;
      case 'viandes':
        return viandes;
      case 'legumes':
        return legumes;
      case 'accompagnements':
        return accompagnements;
      default:
        return [];
    }
  };

  useEffect(() => {
    const hash = location.hash.replace('#', '');
    if (hash) {
      setCategorie(hash);
      const element = document.getElementById(hash);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100); // petit délai pour laisser le rendu se faire
      }
    }
  }, [location]);
  
  return (
    <div className="menu-container">
      <aside className="menu-sidebar">
        <h3>Catégories</h3>
        <ul>
            <li onClick={() => setCategorie('bouillons')}>🍲 Bouillons</li>
            <li onClick={() => setCategorie('viandes')}>🥩 Viandes</li>
            <li onClick={() => setCategorie('legumes')}>🥬 Légumes</li>
            <li onClick={() => setCategorie('accompagnements')}>🥤 Accompagnements</li>
        </ul>
      </aside>

      <main className="menu-content">
      <h2 id={categorie}>{categorie.toUpperCase()}</h2>
        {getItems().map((item, index) => (
          <MenuItem key={index} {...item} />
        ))}
      </main>
    </div>
  );
};

export default Menu;
